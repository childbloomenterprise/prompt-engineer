# ELPROM — Go-Live Setup

What's **live now** (no keys needed) and what flips the **paid backend** on.

## ✅ Live now (free tier, $0 cost)
- Full ELPROM site at `/elprom/ELPROM.html` (landing + app + result + dashboard).
- **Real generation**: any niche you type → a real 7-day calendar, assembled client-side from proven frameworks. Each card copies or opens in the user's own ChatGPT/Claude/Gemini.
- Privacy (`/elprom/privacy.html`) + Terms (`/elprom/terms.html`).
- "Made with ELPROM" watermark + Pro upsell (Pro toggle works as a front-end demo).

## 🔑 To turn on the paid backend (auth + managed AI + Stripe)
The code is built and security-hardened; it just needs credentials. All return `503 "Service not configured"` until env is set, so deploying is safe today.

1. **Supabase** — create a project → run `supabase/migrations/0001_elprom_init.sql` (tables + RLS) → enable **Google** OAuth. Copy `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
2. **LLM key** — `GEMINI_API_KEY` (or swap `callModel()` in `api/generate-calendar.js` for another provider).
3. **Stripe** — create a $25/mo recurring price (`STRIPE_PRICE_ID`), get `STRIPE_SECRET_KEY`, add a webhook to `/api/stripe-webhook` and copy its `STRIPE_WEBHOOK_SECRET`.
4. Put all of the above in **Vercel → Project → Settings → Environment Variables** (see `.env.example`). Redeploy.

## Security posture (already implemented)
- Secrets only in env (never hardcoded); `.env*` gitignored.
- `/api/generate-calendar`: auth-gated (Supabase token), input-validated (2–280 chars), rate-limited (free 1/week, Pro 50/day), generic errors, no secrets logged.
- `/api/stripe-webhook`: **signature-verified**; plan entitlements come only from verified webhook events, never client claims.
- Supabase **RLS on every table**, user-scoped; plan changes are service-role-only.

## Files
- Frontend: `elprom/` (html + css + `js/*.jsx` → built to `*.build.js`)
- Engine: `elprom/js/engine.jsx` (`window.buildElpromWeek`)
- Backend: `api/generate-calendar.js`, `api/stripe-webhook.js`
- DB: `supabase/migrations/0001_elprom_init.sql`
- Build: `npm run build` (data + promptundo + elprom)
