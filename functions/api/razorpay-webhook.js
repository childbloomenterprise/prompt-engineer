/* ELPROM — POST /api/razorpay-webhook  (Cloudflare Pages Function)
 *
 * Verifies Razorpay webhook signature (HMAC-SHA256) and updates the
 * user's plan in Supabase. Plan changes come ONLY from verified events.
 *
 * Required env: RAZORPAY_WEBHOOK_SECRET,
 *               SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */

async function hmacSHA256(secret, message) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function setPlan(userId, plan, SUPABASE_URL, SERVICE_KEY) {
  await fetch(`${SUPABASE_URL}/rest/v1/el_profiles?user_id=eq.${userId}`, {
    method: 'PATCH',
    headers: {
      apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json', Prefer: 'return=minimal',
    },
    body: JSON.stringify({ plan, updated_at: new Date().toISOString() }),
  });
}

export async function onRequest(context) {
  const { request, env } = context;
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  const WH_SECRET = env.RAZORPAY_WEBHOOK_SECRET;
  const SUPABASE_URL = env.SUPABASE_URL;
  const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!WH_SECRET || !SUPABASE_URL || !SERVICE_KEY) return new Response('Not configured', { status: 503 });

  const body = await request.text();
  const receivedSig = request.headers.get('x-razorpay-signature') || '';

  const expectedSig = await hmacSHA256(WH_SECRET, body);
  if (expectedSig !== receivedSig) {
    console.error('razorpay signature mismatch');
    return new Response('Invalid signature', { status: 400 });
  }

  try {
    const event = JSON.parse(body);
    const entity = event?.payload?.payment?.entity || event?.payload?.subscription?.entity || {};
    const userId = entity?.notes?.user_id;

    switch (event.event) {
      case 'payment.captured':
        if (userId) await setPlan(userId, 'pro', SUPABASE_URL, SERVICE_KEY);
        break;
      case 'subscription.activated':
        if (userId) await setPlan(userId, 'pro', SUPABASE_URL, SERVICE_KEY);
        break;
      case 'subscription.cancelled':
      case 'subscription.completed':
        if (userId) await setPlan(userId, 'free', SUPABASE_URL, SERVICE_KEY);
        break;
    }
    return new Response(JSON.stringify({ received: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error('razorpay webhook handler error:', e && e.message);
    return new Response('Handler error', { status: 500 });
  }
}
