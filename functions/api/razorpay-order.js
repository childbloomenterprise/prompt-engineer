/* ELPROM — POST /api/razorpay-order  (Cloudflare Pages Function)
 *
 * Creates a Razorpay order when a user clicks "Go Pro".
 * The frontend opens Razorpay checkout with the returned order_id.
 * On payment success, Razorpay fires the webhook → /api/razorpay-webhook.
 *
 * Required env: RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET,
 *               SUPABASE_URL, SUPABASE_ANON_KEY
 */

const PRO_PRICE_PAISE = 199900; // ₹1999/mo in paise (adjust as needed)

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

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Authorization, Content-Type' },
    });
  }
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  const KEY_ID = env.RAZORPAY_KEY_ID;
  const KEY_SECRET = env.RAZORPAY_KEY_SECRET;
  const SUPABASE_URL = env.SUPABASE_URL;
  const ANON_KEY = env.SUPABASE_ANON_KEY;

  if (!KEY_ID || !KEY_SECRET || !SUPABASE_URL) return json({ error: 'Service not configured' }, 503);

  const auth = request.headers.get('authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  const user = await getUser(token, SUPABASE_URL, ANON_KEY);
  if (!user || !user.id) return json({ error: 'Sign in required' }, 401);

  try {
    const basicAuth = btoa(`${KEY_ID}:${KEY_SECRET}`);
    const r = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: { Authorization: `Basic ${basicAuth}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: PRO_PRICE_PAISE,
        currency: 'INR',
        notes: { user_id: user.id, email: user.email || '' },
      }),
    });
    if (!r.ok) throw new Error('razorpay_order_failed');
    const order = await r.json();
    return json({ order_id: order.id, amount: order.amount, currency: order.currency, key_id: KEY_ID });
  } catch (e) {
    console.error('razorpay-order error:', e && e.message);
    return json({ error: 'Could not create order. Please try again.' }, 500);
  }
}
