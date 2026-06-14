/* ELPROM — POST /api/generate-calendar  (Vercel serverless, Node runtime)
 *
 * Managed (Pro) generation of a 7-day content calendar from one line of intent.
 * Security: auth-gated, input-validated, rate-limited, secrets in env, generic errors.
 * Zero new npm deps — uses global fetch + Supabase REST.
 *
 * Required env vars (set in Vercel, never hardcode):
 *   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_ANON_KEY
 *   GEMINI_API_KEY            (or swap the callModel() body for your provider)
 */

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ANON_KEY = process.env.SUPABASE_ANON_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const FREE_WEEKLY_LIMIT = 1;     // free: 1 managed calendar / week
const PRO_DAILY_LIMIT = 50;      // abuse guard even for Pro

function json(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

// --- auth: validate the Supabase access token, return the user ---------------
async function getUser(token) {
  if (!token) return null;
  try {
    const r = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: { apikey: ANON_KEY, Authorization: `Bearer ${token}` },
    });
    if (!r.ok) return null;
    return await r.json(); // { id, email, ... }
  } catch (e) { return null; }
}

// --- rate limit + entitlement via a Supabase table (service role) ------------
// Expects table public.el_usage (see supabase/migrations/0001_elprom_init.sql)
async function checkAndRecord(userId, isPro) {
  const since = isPro
    ? new Date(Date.now() - 86400000).toISOString()     // 24h for Pro
    : new Date(Date.now() - 7 * 86400000).toISOString(); // 7d for Free
  const limit = isPro ? PRO_DAILY_LIMIT : FREE_WEEKLY_LIMIT;

  const countRes = await fetch(
    `${SUPABASE_URL}/rest/v1/el_usage?user_id=eq.${userId}&created_at=gte.${since}&select=id`,
    { headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, Prefer: 'count=exact' } }
  );
  const range = countRes.headers.get('content-range') || '*/0';
  const used = parseInt(range.split('/')[1] || '0', 10);
  if (used >= limit) return { ok: false, used, limit };

  await fetch(`${SUPABASE_URL}/rest/v1/el_usage`, {
    method: 'POST',
    headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId }),
  });
  return { ok: true, used: used + 1, limit };
}

async function isProUser(userId) {
  try {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/el_profiles?user_id=eq.${userId}&select=plan`,
      { headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` } }
    );
    const rows = await r.json();
    return Array.isArray(rows) && rows[0] && rows[0].plan === 'pro';
  } catch (e) { return false; }
}

// --- LLM call (swap provider here) -------------------------------------------
async function callModel(intent) {
  const prompt = `You are ELPROM, a social content engine. Produce a 7-day Instagram content calendar as STRICT JSON for the niche/goal: "${intent}". Return an array "week" of 7 objects with keys: day (Mon..Sun), format (Reel|Carousel|Story), framework (short label), hook (<=90 chars), caption (2-4 short lines), hashtags (array of 4-5). No prose, JSON only.`;
  const r = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', temperature: 0.8 },
      }),
    }
  );
  if (!r.ok) throw new Error('model_error');
  const data = await r.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
  return JSON.parse(text);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });
  if (!SUPABASE_URL || !SERVICE_KEY || !GEMINI_API_KEY) {
    return json(res, 503, { error: 'Service not configured' });
  }

  // --- auth ---
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  const user = await getUser(token);
  if (!user || !user.id) return json(res, 401, { error: 'Sign in required' });

  // --- input validation ---
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const intent = String((body && body.intent) || '').trim();
  if (intent.length < 2 || intent.length > 280) {
    return json(res, 400, { error: 'Intent must be 2–280 characters' });
  }

  // --- rate limit + entitlement ---
  try {
    const pro = await isProUser(user.id);
    const gate = await checkAndRecord(user.id, pro);
    if (!gate.ok) {
      return json(res, 429, { error: pro ? 'Daily limit reached' : 'Free plan: 1 calendar/week. Upgrade to Pro for unlimited.', upgrade: !pro });
    }
    const result = await callModel(intent);
    return json(res, 200, { week: result.week || result, used: gate.used, limit: gate.limit });
  } catch (e) {
    console.error('generate-calendar error:', e && e.message);
    return json(res, 500, { error: 'Generation failed. Please try again.' });
  }
};
