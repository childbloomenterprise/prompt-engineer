# ELPROM v0.1 — Master Prompt (What We Built)

*A 1:1 reconstruction spec of the current build. Hand this to any capable AI to rebuild or extend exactly what exists today.*

---

## THE PROMPT

Build **ELPROM** — a premium, mobile-first, **client-side** web app. Brand line: **"Start from what works."** It turns one line of intent into a **7-day content calendar** of proven, ready-to-post social frameworks (hero user: Instagram/Reels creators). **Zero backend, zero inference cost**: it assembles the week from a local library of proven frameworks, and each day's prompt opens in the user's *own* ChatGPT/Claude/Gemini.

### Stack & architecture (exactly this)
- **Static site.** CDN **React 18 + ReactDOM (production UMD)**, no framework, no router.
- JSX is **pre-compiled with esbuild** (`jsx: transform`, `jsxFactory: React.createElement`) into a `.build.js` — no in-browser Babel.
- **Three files:**
  1. `elprom.html` — design tokens (CSS `:root`), all styles, and ordered script loads.
  2. `elprom-app.jsx` — the entire app (compiles to `elprom-app.build.js`).
  3. Reuses an existing **data layer** `promptundo-data.js` exposing `window.PA = { BLUEPRINTS, NICHES, VIRTUAL_TOTAL, ... }`, and `promptundo-icons.build.js` exposing a global `Icon` component (`<Icon name size />`).
- **Script load order (critical):** React → ReactDOM → `promptundo-data.js` → `promptundo-icons.build.js` → `elprom-app.build.js`. Mount into `#root`.

### Design system (single source of truth — CSS variables in `:root`, prefixed `el-`)
- **Light:** bg `#F7F7FC`, surface `#FFFFFF`, tint `#EFEFF6`, text `#1D1D1F`/`#62626B`/`#9A9AA2`, border `#E8E8F0`/`#D8D8E4`, **accent `#5E5CE6`** (press `#4A48CC`, soft `#ECECFB`, tint `#F0F0FE`), energy gradient `#FFBE00→#F97316`, ok `#1F9A5B`.
- **Dark** (`[data-theme="dark"]`): bg `#0C0C16`, surface `#141420`, accent `#7C7AEF`, etc.
- **Glass:** `--glass-bg:rgba(255,255,255,.72)` (dark `rgba(20,20,36,.78)`), `backdrop-filter:blur(22px) saturate(200%)`.
- **Radius:** sm 12 / md 16 / lg 22 / xl 26 / pill 999. **Shadows:** sm/md/lg tiers.
- **Motion:** ease `cubic-bezier(.2,.7,.3,1)`; durations 150/250/400/600ms. **`prefers-reduced-motion` disables all animation + transforms.**
- **Fonts:** display Inter Tight / SF Pro feel; body Inter; mono JetBrains Mono (`--mono`).
- **Background:** fixed triple radial-gradient mesh on `body::before` (purple/blue/orange), stronger in dark.
- **One height system:** buttons/inputs 44px standard, 54px lg, 34px sm; identical radii. 8px spacing rhythm.

### Components & behavior
**Nav** (`.el-nav`, sticky, glass, blurs + shadow on scroll>8px): logo (gradient mark + "ELPROM"), dark-mode toggle (persists to `localStorage 'el_theme'`, defaults to system), "Start free" button (focuses the input).

**Hero** (centered): eyebrow chip "`{VIRTUAL_TOTAL→K}+` proven frameworks · no blank box"; H1 "Start from **what works.**" (last two words in a purple→orange gradient text clip); subhead; a **generate row** = one `el-input` ("What do you make content about?") + primary **"Generate my week →"** button (Enter also submits); trust chips. All hero children stagger in via `el-rise`.

**Generate flow:** on submit (empty → focus input), set `loading`, scroll to results, after ~900ms call `buildWeek(input)` and render. While loading show a **skeleton grid** (7 shimmer cards).

**`buildWeek(input)` logic:**
- Read `window.PA.BLUEPRINTS` (each: `{id,cat,title,desc,tags,body}` with `{LABEL}{AUD}{NAME}` and `[TOPIC][PRODUCT][GOAL][TONE]` placeholders).
- Use a fixed **WEEK_RECIPE** of 7 slots mapping to preferred blueprint ids + a display format:
  `reel-hooks→Reel, ig-carousel→Carousel, ig-caption→Post, reel-script→Reel, ig-story→Story, ig-quote→Carousel, ig-poll→Story`. Fallback to any blueprint in that `cat` if id missing.
- `fill()` replaces `{LABEL}/{NAME}`→the niche, `{AUD}`→"people who care about {niche}", `[TOPIC]/[PRODUCT]`→niche, `[GOAL]`→"grow your audience", `[TONE]`→"authentic and engaging".
- `hookFor(format,label)` returns a short punchy hook line for the visual card.
- Returns 7 objects: `{id,day(Mon–Sun),format,grad,hook,title,body,tags}`. `grad` cycles a 7-gradient palette.

**Day card** (`.el-card`, glass, hover lift -5px, staggered `el-rise` by index×60ms):
- Top row: day chip (gradient dot + "Mon") + format pill.
- **Visual block** (`.el-visual`, gradient bg, min 118px): the **hook** in bold white + a fixed **"⚡ Made with ELPROM" watermark** bottom-right (this is the growth/virality mechanism — always present on free output).
- Title (personalized blueprint title); body (the personalized framework prompt, mono, fade-masked overflow); up to 3 hashtags.
- Actions: **Copy** (writes `body` to clipboard, 1.4s "Copied" state, toast) + **Open in AI** dropdown (ChatGPT `https://chatgpt.com/?q=`, Claude `https://claude.ai/new?q=`, Gemini `https://gemini.google.com/app?q=` — opens new tab with `encodeURIComponent(body)`, $0 to us). Dropdown closes on outside-click.

**After results:** a **Pro upsell** banner ("Want unlimited weeks + no watermark?" → "$25/mo", CTA shows a "coming soon" toast) and a **Regenerate** button in the results header.

**Empty state (pre-generate):** a 3-step "How it works" grid (Tell us your niche → Get a proven week → Copy or open in AI).

**Toast** (`.el-toast`, bottom-center pill, auto-dismiss 2.2s). **Footer**: "© 2026 ELPROM · Start from what works."

### Animations present (all token-driven, 60fps, reduced-motion safe)
Hero stagger (`el-rise`), input focus scale 1.01 + ring, button press scale .96 + radial ripple, primary hover lift, card hover lift + entrance stagger, skeleton shimmer, dropdown pop, toast slide-up, gradient-text hero, nav scroll blur/shadow, spinner during build.

### Requirements
Mobile-first (single-column grid, stacked generate row, 44px targets, `env(safe-area-inset-*)`), full light/dark, accessible (aria labels, focus states, semantic), no secrets, no network calls except opening the user's AI tab. Output: `elprom.html` + `elprom-app.jsx` (esbuild-compiled), reusing the existing data + icons globals.

---

## What is NOT built yet (next phases — needs `security-review` first)
- **Supabase auth** (Google OAuth), accounts, saved calendars.
- **`/api/generate-calendar`** serverless endpoint (managed AI generation, rate-limited, tier-gated) — currently the "generation" is a 900ms simulated beat + local framework assembly; real per-card generation is offloaded to the user's own AI.
- **Stripe** Pro subscription + watermark-removal gate (currently the "Go Pro" CTA is a placeholder toast).
- **Client-side graphic export/download** (the visual is a styled DOM block, not yet a downloadable PNG).
- **Analytics events**, real brand-voice memory, scheduling, marketplace.

## How to run / build
- Build: add `'elprom-app'` to the esbuild file list, run the compile step → `elprom-app.build.js`.
- Serve the project root statically → open `/elprom.html`.
- Deploy: static (Vercel), same as the existing site.
