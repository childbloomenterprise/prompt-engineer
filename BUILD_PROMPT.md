# ELPROM — The Master Build Prompt (A→Z, 100/100)

*Hand this to a top-tier AI builder, or use it as the engineering spec. It builds the entire brand as ONE unified, Apple-grade, secure, animated system.*

---

## THE PROMPT

Build **ELPROM** — a premium, mobile-first web application — to a flawless, Apple-grade standard. ELPROM turns one line of intent into a full week of finished, ready-to-post social content (captions, hooks, hashtags, designed carousel/quote graphics). It starts from **proven content frameworks**, never a blank box. Hero user: global Instagram/Reels creators. Brand line: **"Start from what works."**

Build it so that **every element is perfectly aligned, every surface shares one design system, and the marketing site and the app feel like a single organism — one product, not two.** Smoothness, precision, and security are non-negotiable.

---

### 0) THE PRIME DIRECTIVE — "One System, Not Two"
- **Single source of truth.** Every color, font size, space, radius, shadow, and motion curve is a **named design token** used everywhere. No hard-coded values in components. The landing page and the in-app screens consume the *same* tokens and the *same* component library.
- **One grid.** Everything sits on an **8px baseline grid**. Spacing only ever uses the scale below. Optical alignment where math isn't enough (icons, text baselines).
- **One motion language.** All animation uses the shared easing + duration tokens. Nothing animates "its own way."
- **One voice.** Calm, confident, premium. No clutter, no exclamation-mark hype.
- Result: a user moving from the homepage into the app should feel **zero seam**.

---

### 1) DESIGN TOKENS (the foundation — define first, use everywhere)

**Color — Light**
```
--bg:#F7F7FC  --surface:#FFFFFF  --surface-2:#FAFAFF  --tint:#EFEFF6
--text:#1D1D1F  --text-2:#62626B  --text-3:#9A9AA2
--border:#E8E8F0  --border-2:#D8D8E4
--accent:#5E5CE6  --accent-press:#4A48CC  --accent-soft:#ECECFB
--energy-from:#FFBE00  --energy-to:#F97316
--ok:#1F9A5B  --danger:#E5484D
```
**Color — Dark**
```
--bg:#0C0C16  --surface:#141420  --surface-2:#1C1C2C
--text:#F0F0F7  --text-2:#9898B0  --text-3:#55556A
--border:#262638  --border-2:#32324A  --accent:#7C7AEF
```
**Glass:** `--glass-bg:rgba(255,255,255,.72)` (dark: `rgba(20,20,36,.78)`), 1px iridescent gradient border, `backdrop-filter:blur(22px) saturate(200%)`.

**Type scale** (Display: Inter Tight / General Sans; Body: Inter; Mono: JetBrains Mono)
```
display:56/700/-0.038em   h1:38/700   h2:24/680   h3:18/660
body:16/430   small:14/480   label:12/680 uppercase   mono-stat:38/700
```
Mobile display scales to 35–40px. Line-height 1.05 headlines, 1.55 body.

**Spacing (8px grid):** 4, 8, 12, 16, 20, 24, 32, 40, 56, 72, 96.
**Radius:** sm 12, md 16, lg 22, xl 26, pill 999.
**Shadow:** sm `0 1px 3px rgba(17,17,26,.06)`, md `0 12px 38px rgba(17,17,26,.09)`, lg `0 32px 80px rgba(17,17,26,.22)`.
**Motion:** ease `cubic-bezier(.2,.7,.3,1)`; durations fast 150ms, base 250ms, slow 400ms, entrance 600ms. **Always honor `prefers-reduced-motion`.**
**Z-index scale:** base 0, nav 60, sticky 50, dropdown 70, modal 100, toast 300.

---

### 2) LAYOUT & ALIGNMENT RULES (the "perfectly aligned" mandate)
- Max content width 1200px, 24px gutters (16px mobile), centered.
- Cards in a grid use equal gaps from the spacing scale; all cards in a row share equal height.
- Vertical rhythm: section padding 84px desktop / 60px mobile.
- Buttons/inputs/chips share one height system (40px standard, 50px large, 34px small) and identical corner radii.
- Icons optically centered, consistent stroke weight, sized in even steps (12/15/16/20/22).
- Text left edges align to a shared column; numbers right-align in stats.

---

### 3) COMPONENT LIBRARY (build once, reuse — each with all states)
Glass **Card**; **Button** (primary/ghost/danger, states: default/hover/active-with-press-ripple/disabled/loading); **Input & Textarea** (focus = 1px accent border + soft ring + subtle scale, error state); **Chip/Pill** (scrollable row on mobile, active state); **Toast**; **Bottom-sheet Modal** (slides up on mobile, centered pop on desktop, backdrop blur, focus-trapped); **Skeleton loader** (shimmer); **Usage meter / progress bar**; **Dark-mode toggle**; **Watermark badge** + **"Made with ELPROM" attribution badge**; **Dropdown** (Open-in-AI: ChatGPT/Claude/Gemini); **Avatar/Account menu**; **Tooltip**. Every interactive element: visible focus ring, 44px min touch target, aria labels.

---

### 4) SCREENS (mobile-first, then scale up — all share the components above)

1. **Landing / Hero** — headline *"Start from what works."*, sub *"Type one line. Get a whole week of proven, ready-to-post content — words and visuals."*, one glowing input + CTA **"Generate my week →"**, animated hero device showing a 7-day calendar materializing, trust chips (*Free · No login to start · 650K proven frameworks*), aurora/mesh-gradient background, floating glass cards. Sections below: How-it-works (3 steps), proof/social, Free-vs-Pro, footer.

2. **Generation Result — THE HERO SCREEN (most polish here):** editable one-line input at top → a **7-day calendar** of day-cards (Mon–Sun). Each card: format chip (Reel/Carousel/Story), bold **hook**, expandable **caption**, **hashtags**, **graphic thumbnail**. Card actions: Copy, Download, **Open in AI** dropdown, Regenerate. Cards arrive with **staggered skeleton→filled** animation. Free graphics show a subtle **"Made with ELPROM"** watermark.

3. **Carousel/Graphic Preview Modal** — swipeable slides (text-on-gradient, quote cards), watermark toggle (locked for free → "Upgrade to remove"), Download/Share.

4. **Paywall / Upgrade (Pro $25/mo)** — clean Free vs **Pro** comparison (Pro: unlimited calendars, no watermark, brand voice, scheduling reminders, AI images), one confident CTA, *"Cancel anytime."*

5. **Dashboard** — saved calendars grid, usage meter (*"1 of 1 calendars this week"* free), brand-voice + theme settings, upgrade nudge.

6. **Auth** — minimal **Continue with Google**, logo, one warm line.

---

### 5) INTERACTION & ANIMATION SPEC (smooth, named, consistent)
- **Page/section entrance:** fade + 16–24px rise, staggered children (30–60ms steps).
- **Buttons:** press = scale .96 + radial ripple; hover = soft lift + shadow grow.
- **Inputs:** focus = 1.02 scale + ring.
- **Cards:** hover lift -6px + iridescent border reveal; press scale .98 (touch).
- **Modal:** mobile = sheet slide-up; desktop = scale-in from .97. Backdrop fades.
- **Result cards:** skeleton shimmer → content cross-fade as each day "lands."
- **Hero device:** gentle 6.5s float; calendar cards stagger in on load.
- **Toast:** slide-up + fade from bottom-center.
- All at 60fps, GPU-friendly (transform/opacity only), **reduced-motion disables non-essential motion.**

---

### 6) ARCHITECTURE & STACK (build it real, not a mock)
- **Frontend:** React + Tailwind, the shared token/component system above. Light + dark. Fully responsive, safe-area-inset aware.
- **Auth:** Supabase, **Google OAuth only** (no passwords). Session-gated app routes.
- **Generation API:** Vercel serverless `POST /api/generate-calendar` → cheapest capable model (Gemini Flash / Haiku / Groq). Input: niche/goal/platform. Output: structured 7-day JSON. Built on a library of **proven frameworks** (the moat), not raw freeform.
- **Tiering:** Free = 1 calendar/week + "Open in AI" offload + watermarked graphics; **Pro $25/mo** = unlimited managed generation, no watermark, brand voice, scheduling reminders, AI images.
- **Graphics:** rendered **client-side** (Canvas/SVG) for $0 cost; watermark layer for free tier.
- **Billing:** **Stripe** subscription; webhooks update Supabase subscription state; Pro gate on watermark-removal + unlimited.
- **Analytics:** events — signup, calendar_generated, share_click, watermark_link_visit, upgrade_view, subscribe, retention. (Privacy-respecting.)
- **Virality:** every free output carries a "Made with ELPROM" link; share flows for each day-card.

---

### 7) SECURITY (must-have, not optional)
- **Secrets server-side only.** No API keys, service-role keys, or Stripe secrets ever in client code or the bundle. Use env vars in serverless functions.
- **Supabase RLS on every table**, user-scoped policies; default deny. Service-role key used only server-side.
- **Rate limiting** on `/api/generate-calendar` (per-user + per-IP, multi-tier: e.g., free 1/week + burst guard; abuse caps).
- **Input validation & sanitization** on all endpoints; reject oversized/malformed payloads; never echo raw user input into generation without bounds.
- **Auth gating** on all write/generation endpoints — return 401 JSON without a valid token.
- **Stripe webhooks signature-verified**; entitlements derived from verified webhook state, never from client claims.
- **Output encoding / XSS-safe rendering** (no `dangerouslySetInnerHTML` with user/AI content unsanitized).
- **HTTPS only, secure headers** (CSP, X-Content-Type-Options, Referrer-Policy), `noopener noreferrer` on external links.
- **No PII beyond what's needed**; account deletion path that fully removes user data.
- Treat every new endpoint as a review surface before shipping.

---

### 8) PERFORMANCE & QUALITY BUDGETS
- First load fast; lazy-load heavy views; images optimized; fonts preloaded.
- 60fps interactions; no layout shift (reserve space, skeletons).
- Lighthouse targets: Performance ≥ 90, Accessibility ≥ 95, Best-Practices ≥ 95.

### 9) ACCESSIBILITY
- Semantic HTML, logical heading order, full keyboard nav, visible focus, aria labels/roles, focus-trapped modals, WCAG AA contrast in both themes, reduced-motion support.

---

### 10) ACCEPTANCE CRITERIA — the 100/100 checklist
- [ ] Every value comes from a shared token; zero stray hard-coded colors/sizes.
- [ ] Marketing site and app share one component library and feel seamless.
- [ ] Everything sits on the 8px grid; rows are equal-height; edges align.
- [ ] All motion uses shared easing/durations; reduced-motion respected; 60fps.
- [ ] Light + dark mode flawless on every screen.
- [ ] Mobile-first: 44px targets, safe-area insets, no horizontal scroll, perfect at 375px.
- [ ] Auth, generation, Stripe all functional end-to-end (test mode).
- [ ] Security checklist (§7) fully satisfied; no secrets in client; RLS on; rate-limited; webhooks verified.
- [ ] "Made with ELPROM" watermark + attribution present and Pro-removable.
- [ ] The 7-day result screen is the visual showpiece.
- [ ] A first-time user feels: *"Whoa — a week of my content in seconds, and it looks GOOD."*

Deliver clean, documented React + Tailwind code, organized by tokens → components → screens → api, ready to run.
```
```
