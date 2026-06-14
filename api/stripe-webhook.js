/* ELPROM — POST /api/stripe-webhook  (Vercel serverless, Node runtime)
 *
 * Signature-verified Stripe webhook. Updates the user's plan in Supabase based
 * on verified subscription events. Entitlements come ONLY from verified webhook
 * state, never from client claims.
 *
 * Required env: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET,
 *               SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 *
 * NOTE: Stripe signature verification needs the RAW body. We disable Vercel's
 * body parser below so we can read the raw bytes.
 */

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-06-20' });
const WH_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const config = { api: { bodyParser: false } };

function readRaw(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

async function setPlan(userId, plan) {
  await fetch(`${SUPABASE_URL}/rest/v1/el_profiles?user_id=eq.${userId}`, {
    method: 'PATCH',
    headers: {
      apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json', Prefer: 'return=minimal',
    },
    body: JSON.stringify({ plan, updated_at: new Date().toISOString() }),
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).end('Method not allowed'); return; }
  if (!WH_SECRET || !SUPABASE_URL || !SERVICE_KEY) { res.status(503).end('Not configured'); return; }

  let event;
  try {
    const raw = await readRaw(req);
    const sig = req.headers['stripe-signature'];
    event = stripe.webhooks.constructEvent(raw, sig, WH_SECRET); // throws if invalid
  } catch (err) {
    console.error('stripe signature verification failed');
    res.status(400).end('Invalid signature');
    return;
  }

  try {
    const obj = event.data.object;
    const userId = obj.client_reference_id || (obj.metadata && obj.metadata.user_id);
    switch (event.type) {
      case 'checkout.session.completed':
      case 'customer.subscription.updated':
        if (userId && (obj.status === 'active' || obj.payment_status === 'paid' || obj.status === undefined)) {
          await setPlan(userId, 'pro');
        }
        break;
      case 'customer.subscription.deleted':
        if (userId) await setPlan(userId, 'free');
        break;
      default:
        break;
    }
    res.status(200).json({ received: true });
  } catch (e) {
    console.error('webhook handler error:', e && e.message);
    res.status(500).end('Handler error');
  }
};
