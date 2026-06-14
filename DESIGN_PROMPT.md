# ELPROM — Cloud Design Prompt

*Paste the block below into v0.dev / Lovable / Bolt / Figma Make to generate the new UI.*

---

## THE PROMPT

Build a premium, mobile-first marketing + web-app UI for a product called **ELPROM**.

### What ELPROM is
ELPROM turns one line of intent into a full week of finished, ready-to-post social media content (captions, hooks, hashtags, and designed carousel/quote graphics). The wedge: every other AI tool gives you a scary blank box; ELPROM starts from **proven content frameworks** and does the work for you. Hero use-case: **Instagram / Reels creators, global.** Tagline candidates: *"Start from what works."* / *"One line. A week of content."*

### Brand & art direction
- Feel: **Apple-grade. Calm, confident, premium.** Lots of whitespace, soft depth, glassy surfaces, buttery micro-animations. Think Linear × Apple × a touch of creator-app energy.
- **Liquid-glass** cards: subtle backdrop blur, 1px iridescent gradient borders, soft layered shadows.
- Motion: smooth `cubic-bezier(.2,.7,.3,1)` easing, 4–8px movements (never dramatic), staggered entrances, gentle float on the hero device. Respect `prefers-reduced-motion`.
- Rounded corners (16–24px), generous padding, crisp typographic hierarchy.

### Color
- Primary accent: indigo/violet `#5E5CE6` (press `#4A48CC`, soft tint `#ECECFB`).
- Light bg: warm off-white `#F7F7FC`; surfaces `#FFFFFF`. Text `#1D1D1F` / muted `#62626B`.
- Full **dark mode** (bg `#0C0C16`, surfaces `#141420`, accent `#7C7AEF`). Toggle in nav.
- A second "energy" accent for highlights/badges: a warm gold→coral gradient (`#FFBE00 → #F97316`).

### Type
- Display/headlines: a modern grotesk (Inter Tight / General Sans / SF Pro Display feel), tight letter-spacing, bold but elegant.
- Body: Inter. Mono (JetBrains Mono) for small labels/stats.

### Screens to design (mobile-first, then desktop)

1. **Landing / Hero**
   - Big headline: *"Start from what works."* Sub: *"Type one line. Get a whole week of proven, ready-to-post content — words and visuals."*
   - A single prominent input: *"What do you make content about?"* with a glowing CTA *"Generate my week →"*.
   - Animated hero device showing a 7-day calendar materializing.
   - Trust chips: *"Free · No login to start · 650K proven frameworks."*
   - Aurora/mesh-gradient background, floating glass cards.

2. **The magic moment — Generation result (the core screen)**
   - Input bar at top (their one line, editable).
   - A **7-day content calendar**: 7 day-cards (Mon–Sun). Each card shows: platform/format chip (Reel / Carousel / Story), a bold **hook**, the **caption** (expandable), **hashtags**, and a **thumbnail of the generated graphic**.
   - Per-card actions: **Copy**, **Download**, **Open in AI** (small dropdown: ChatGPT / Claude / Gemini), **Regenerate**.
   - A free-tier graphic preview shows a subtle **"Made with ELPROM"** watermark on the image.
   - Smooth staggered entrance as cards generate (skeleton → filled).

3. **Carousel / graphic preview modal**
   - Full-screen on mobile (bottom sheet), centered on desktop.
   - Swipeable carousel slides (text-on-gradient, quote-card styles), a watermark toggle (locked for free → "Upgrade to remove"), Download / Share buttons.

4. **Paywall / Upgrade (Pro $25/mo)**
   - Clean comparison: Free vs **Pro**. Pro highlights: *unlimited calendars, no watermark, brand voice, scheduling reminders, AI images*. Single confident CTA. Trust line: *"Cancel anytime."*

5. **Account / Dashboard (light)**
   - Saved calendars grid, usage meter (free: "1 of 1 calendars this week"), upgrade nudge, settings (brand voice, theme).

6. **Auth**
   - Minimal **Continue with Google** screen, ELPROM logo, one warm line.

### Reusable components
- Liquid-glass card, primary/ghost buttons with press-ripple, chips/pills (scrollable row on mobile), input with focus-scale, toast, bottom-sheet modal, skeleton loaders, watermark badge, "Made with ELPROM" attribution badge, progress/usage meter, dark-mode toggle.

### Logo / wordmark
- Wordmark **"ELPROM"** — confident, slightly geometric. A simple mark: a spark / play-triangle / blooming dot in the accent indigo. Provide a 26–32px square app icon version.

### Requirements
- **Mobile-first**, fully responsive, 44px min touch targets, safe-area insets (notch-safe).
- Light + dark mode.
- Tasteful micro-animations everywhere (entrance stagger, button ripple, input focus, card hover/press). 60fps, reduced-motion safe.
- Accessible: semantic markup, focus states, aria labels, good contrast.
- Output as clean React + Tailwind components.

### Emotional goal
A first-time creator should feel: *"Whoa — it just did a week of my content in seconds, and it looks GOOD."* Premium, effortless, a little magical.

---

## Notes for after you get the design back
- Keep the existing **Liquid-glass / indigo / dark-mode** language — it matches what's already built, so the free library (PromptUndo funnel) and ELPROM feel like one family.
- Make sure the **"Made with ELPROM"** watermark + attribution is visually present from day one (it's the growth engine, not an afterthought).
- The **7-day calendar result screen** is the hero — spend the most polish there.
