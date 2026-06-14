/* ELPROM — POST /api/generate-calendar  (Cloudflare Pages Function)
 *
 * Cloudflare Workers runtime: uses Web-standard Request/Response, not Node req/res.
 * Env vars come from context.env, not process.env.
 */

const FREE_WEEKLY_LIMIT = 1;
const PRO_DAILY_LIMIT = 50;

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
}

async function getUser(token, SUPABASE_URL, ANON_KEY) {
  if (!token) return null;
  try {
    const r = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: { apikey: ANON_KEY, Authorization: `Bearer ${token}` },
    });
    if (!r.ok) return null;
    return await r.json();
  } catch (e) { return null; }
}

async function isProUser(userId, SUPABASE_URL, SERVICE_KEY) {
  try {
    const r = await fetch(
      `${SUPABASE_URL}/rest/v1/el_profiles?user_id=eq.${userId}&select=plan`,
      { headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` } }
    );
    const rows = await r.json();
    return Array.isArray(rows) && rows[0] && rows[0].plan === 'pro';
  } catch (e) { return false; }
}

async function checkAndRecord(userId, isPro, SUPABASE_URL, SERVICE_KEY) {
  const since = isPro
    ? new Date(Date.now() - 86400000).toISOString()
    : new Date(Date.now() - 7 * 86400000).toISOString();
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

async function callModel(intent, GEMINI_API_KEY) {
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

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Authorization, Content-Type' } });
  }
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  const SUPABASE_URL = env.SUPABASE_URL;
  const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;
  const ANON_KEY = env.SUPABASE_ANON_KEY;
  const GEMINI_API_KEY = env.GEMINI_API_KEY;

  if (!SUPABASE_URL || !SERVICE_KEY || !GEMINI_API_KEY) {
    return json({ error: 'Service not configured' }, 503);
  }

  const auth = request.headers.get('authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  const user = await getUser(token, SUPABASE_URL, ANON_KEY);
  if (!user || !user.id) return json({ error: 'Sign in required' }, 401);

  let body;
  try { body = await request.json(); } catch (e) { body = {}; }
  const intent = String((body && body.intent) || '').trim();
  if (intent.length < 2 || intent.length > 280) {
    return json({ error: 'Intent must be 2–280 characters' }, 400);
  }

  try {
    const pro = await isProUser(user.id, SUPABASE_URL, SERVICE_KEY);
    const gate = await checkAndRecord(user.id, pro, SUPABASE_URL, SERVICE_KEY);
    if (!gate.ok) {
      return json({
        error: pro ? 'Daily limit reached' : 'Free plan: 1 calendar/week. Upgrade to Pro for unlimited.',
        upgrade: !pro,
      }, 429);
    }
    const result = await callModel(intent, GEMINI_API_KEY);
    return json({ week: result.week || result, used: gate.used, limit: gate.limit });
  } catch (e) {
    console.error('generate-calendar error:', e && e.message);
    return json({ error: 'Generation failed. Please try again.' }, 500);
  }
}
