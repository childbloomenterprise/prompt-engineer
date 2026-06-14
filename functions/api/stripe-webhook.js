/* ELPROM — POST /api/stripe-webhook  (Cloudflare Pages Function)
 *
 * Cloudflare Workers runtime. Uses constructEventAsync + SubtleCrypto
 * so no Node.js Buffer dependency is needed.
 */

import Stripe from 'stripe';

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

  const WH_SECRET = env.STRIPE_WEBHOOK_SECRET;
  const SUPABASE_URL = env.SUPABASE_URL;
  const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!WH_SECRET || !SUPABASE_URL || !SERVICE_KEY) return new Response('Not configured', { status: 503 });

  const stripe = new Stripe(env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2024-06-20',
    httpClient: Stripe.createFetchHttpClient(),
  });

  let event;
  try {
    const body = await request.text();
    const sig = request.headers.get('stripe-signature');
    const cryptoProvider = Stripe.createSubtleCryptoProvider();
    event = await stripe.webhooks.constructEventAsync(body, sig, WH_SECRET, undefined, cryptoProvider);
  } catch (err) {
    console.error('stripe signature verification failed');
    return new Response('Invalid signature', { status: 400 });
  }

  try {
    const obj = event.data.object;
    const userId = obj.client_reference_id || (obj.metadata && obj.metadata.user_id);
    switch (event.type) {
      case 'checkout.session.completed':
      case 'customer.subscription.updated':
        if (userId && (obj.status === 'active' || obj.payment_status === 'paid' || obj.status === undefined)) {
          await setPlan(userId, 'pro', SUPABASE_URL, SERVICE_KEY);
        }
        break;
      case 'customer.subscription.deleted':
        if (userId) await setPlan(userId, 'free', SUPABASE_URL, SERVICE_KEY);
        break;
    }
    return new Response(JSON.stringify({ received: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error('webhook handler error:', e && e.message);
    return new Response('Handler error', { status: 500 });
  }
}
