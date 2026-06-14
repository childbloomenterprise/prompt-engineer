# MASTER PLAN — The "Proven Content" Engine

*(Working name: **Postwave** / **Reelm** — TBD. Free library keeps the **PromptUndo** name as the funnel.)*

---

## 0. The Master Prompt (the company's "system prompt")

> We turn one line of intent into a week of finished, proven, channel-ready content.
> Every other tool hands a creator a **blank box** and asks them to be a prompt
> engineer. We hand them **what already works** — a library of battle-tested
> frameworks — and do the work for them. The free product is so useful it spreads
> itself: every output we generate carries our mark, so each user becomes a
> billboard. We monetize the moment a creator wants it faster, cleaner, and
> unbranded. We run lean, global, and near-zero-cost — the user's own AI does the
> heavy lifting until they pay us to do it for them.

Everything below is downstream of that paragraph. If a decision doesn't serve it, we don't do it.

---

## 1. How It Works (end-to-end user journey)

**Step 1 — Land (free, no login).**
User arrives via a shared post, a Google search, or a friend. They see the free library (650K prompts) and the new hero: *"Type your niche → get a week of content."*

**Step 2 — Generate (the magic moment).**
They type one line: *"vegan meal-prep creator, want more reach."*
→ We produce a **7-day content calendar**: each day = a proven format + hook + caption + hashtags, plus a ready-to-download carousel/quote graphic.
→ Backbone = our existing **BLUEPRINTS × NICHES** engine (the "proven frameworks"), not a blank LLM box.

**Step 3 — Use it (two paths, both $0 to us).**
- *Free path:* per-slot prompts open in their **own** ChatGPT/Claude/Gemini ("Open in AI"). Their subscription pays for inference. We pay nothing.
- *Managed path (Pro):* we run the generation for them on the cheapest capable model — funded by their $25/mo.
- Graphics render **in the browser** (Canvas/SVG) → $0 images. Free graphics carry a **"Made with"** watermark.

**Step 4 — Share (the growth engine).**
They download/post the content. The watermark + share links carry our brand to **their** audience → new visitors → loop repeats.

**Step 5 — Upgrade (the money moment).**
They hit a cap or want the watermark gone, unlimited calendars, brand-voice memory, and scheduling → **Pro $25/mo**.

---

## 2. Business Model

**Shape:** Freemium → Pro subscription. Product-led, self-serve, global, $0 inference burn.

| Tier | Price | What they get | Our cost |
|---|---|---|---|
| **Free** | $0 | Full 650K library, 1 calendar/week, watermarked graphics, "Open in AI" | **$0** (offloaded) |
| **Pro** | **$25/mo** | Unlimited managed calendars, no watermark, brand voice, scheduling reminders, AI images (phase 2), 30% affiliate | covered ~100× by the sub |

**The $0-burn keystone:** free users' inference runs on *their* AI accounts; Pro users' inference is funded by *their* subscription. Cost only ever exists where revenue already does. Graphics are client-rendered, not AI-generated.

**The math:**
- $1M ARR ≈ **~3,300 Pro subs**.
- $10M ARR ≈ **~33,000 subs**.
- At a modest 2–3% free→Pro conversion, that's ~110K–165K free users for $1M. The viral loop is how we get there at ~$0 CAC.

**Billing:** Stripe (global), UPI add-on for India later.
**Expansion revenue (later):** AI image credits, native scheduling, team/SMB seats, API access, **proven-content marketplace take-rate (see §4.5)**.

---

## 3. Content & Growth Strategy

**One primary loop, gone deep: *every output is an ad.***

1. **Built-in virality (the core).** Every free graphic + shared calendar carries a "Made with [brand]" backlink (the Canva / Loom / Calendly playbook). Users market us for free by simply using us. Removing the mark = the #1 upgrade trigger → growth and revenue are the *same lever*.

2. **Affiliate army (30% lifetime).** Recruit creators to promote daily; they keep 30% forever. This is the proven Submagic / HeadshotPro path to $1M ARR without a sales team.

3. **Founder content (the spark).** Post jaw-dropping **before/after demos** on Reels, TikTok, X: *"One line → a week of content in 8 seconds."* One viral demo seeded Submagic's first 40–50 customers.

4. **SEO flywheel (the slow compounder).** The 650K-prompt library is a massive long-tail search surface that ranks for years and feeds the funnel for free.

**Channel priority for a part-time solo founder:** Virality (build it into the product) → Affiliates (recruit, don't sell) → Founder demos (1–2 posts/week) → SEO (automatic). No paid ads until unit economics are proven.

**Content cadence we practice + preach:** we use our own tool to run our own channels — proof + dogfooding + marketing in one.

---

## 4. Product Architecture (overview)

- **Frontend:** the existing static CDN-React app, extended with a **Calendar** view + result UI + client-side graphic renderer (Canvas/SVG).
- **Backend (new):** reuse the ChildBloom stack you know — **Supabase** (Google-OAuth auth + DB for accounts, saved calendars, subscription state) + **Vercel serverless** for the generation endpoint.
- **Generation:** `api/generate-calendar` → cheapest capable model (Gemini Flash / Haiku / Groq), rate-limited + tier-gated (reuse ChildBloom's `checkRateLimit` pattern).
- **Billing:** Stripe subscription; watermark-removal + unlimited gated behind Pro.
- **Analytics (new, critical):** events for signup, calendars generated, share clicks, watermark-link visits, free→Pro conversion, W1 retention, viral coefficient.
- **Security:** run `security-review` before each of auth, the generate endpoint, and Stripe — and before every deploy (your standing rule).

---

## 4.5 The Proven-Content Marketplace (Phase 3 — the network-effects layer)

*Not* a prompt marketplace (those are commoditizing). A **proven-content marketplace**: top creators sell the frameworks/packs that actually performed for them, we take a **20–30% cut**.

**Why it's powerful (three wins at once):**
1. **Supply stocks itself** — creators fill our shelves for free, so the library compounds without our effort.
2. **The moat deepens** — our entire pitch is "stuff that works"; now real creators *prove* it with their own numbers (views, follows). Proof becomes the product.
3. **Two-sided network + new revenue** — creators earn, we earn a take-rate, buyers get higher-quality recipes. Classic App-Store flywheel: more recipes → better book → more creators.

**Timing is everything — a marketplace with no shoppers is an empty store.** So we sequence it *after* we have a crowd:
- Phase 1–2: we are the recipe book (free) + the kitchen (Pro), building the user base.
- Phase 3: open the marketplace so creators sell *proven* packs into an audience that already exists.

This is the part of the market that's *growing* (executable, monetizable workflows) rather than the part that's dying (static prompt sales).

## 5. Roadmap

- **Phase 0 — Funnel (DONE):** mobile-optimized library + XP live.
- **Phase 1 — MVP (weeks 1–4):** auth → `generate-calendar` → calendar view + carousel renderer + watermark → Stripe Pro gate → ship the viral demo.
- **Phase 2 — Virality & conversion (weeks 5–12):** attribution on every output, affiliate program, brand voice + AI images as Pro upsells, founder content, iterate conversion/retention.
- **Phase 3 — Scale, marketplace & raise (month ~4–6):** native scheduling via Ayrshare/Buffer (no Meta review), more platforms (LinkedIn/X/TikTok), SMB seats, **open the proven-content marketplace (§4.5)** once the crowd exists → hit raise metrics → pre-seed.

**Publishing decision:** MVP does *not* build native auto-posting (Meta API review is poison for a solo part-timer). We do copy/download + 1-click-open + reminders, then add scheduling via a third-party gateway post-traction.

---

## 6. Metrics That Matter

- **North-star:** calendars generated / week.
- **Growth:** viral coefficient (target > 0.5), watermark-link click-through.
- **Money:** free→Pro conversion %, MRR, churn.
- **Health:** week-1 retention.
- **Raise-readiness gate:** ~$10–20K MRR + viral coefficient > 0.5 + strong W1 retention → raise $500K–$1.5M pre-seed on solo capital-efficiency + PLG.

---

## 7. Guardrails (what we will NOT do)

- No enterprise sales, no demos-to-close, no ops-heavy publishing approvals.
- No upfront inference burn — if a feature can't be offloaded or funded by a sub, it waits.
- No blank-box generic AI — we always start from a proven framework (that's the moat).
- No feature that doesn't serve the Master Prompt in §0.

---

---

# 📡 The 10-Year Vision (separate section)

*Where this goes if the loop compounds.*

**Year 1–2 — The Content Engine.**
We win Instagram creators globally with "one line → a week of content." Free library funnels millions; Pro crosses $1M then $5M ARR. We raise a seed, stay lean. The brand becomes shorthand for *"don't start from a blank box."*

**Year 3–4 — The Multi-Channel Operating System.**
Every creator surface — Reels, Shorts, TikTok, LinkedIn, X, newsletters, podcasts. One brain learns each creator's voice, audience, and what performed, and plans the next week automatically. We move from *"generate content"* to *"run my content."* Small businesses (shops, D2C, coaches) become a second, higher-paying segment. ARR into eight figures.

**Year 5–6 — The Autonomous Creator Agent.**
The product stops being a tool you open and becomes an **agent that works while you sleep**: it watches what's trending in your niche, drafts the week, renders the assets, schedules everything, reads the results, and adapts — you approve from your phone. "Context engineering" (memory + performance data + brand) is the moat; the prompt library is the seed corn it grew from. This is the vertical AI agent the 2026 market was pointing at — we got there first, from the funnel.

**Year 7–8 — The Distribution Layer for Anyone With Something to Say.**
Not just creators and SMBs — nonprofits, teachers, local governments, solo experts, anyone in any language. Vernacular comes home: the India/Hinglish DNA becomes a 40-language advantage Silicon Valley ignored. Hundreds of millions of pieces of content a month flow through us. We're infrastructure, not an app.

**Year 9–10 — The Standard.**
"Made with [brand]" is as ubiquitous as "Sent from my iPhone" once was — except it's on a meaningful share of the internet's everyday content. We're the default first step between *having an idea* and *it being live, everywhere, in your voice*. The company is either a category-defining independent business throwing off serious profit, or acquired into a platform that needed exactly this layer. Either way, the Master Prompt held: **we turned intent into finished content for the whole world — and let the world spread it for us.**

**The throughline:** prompts → calendars → multi-channel OS → autonomous agent → global distribution layer. Each stage is funded by the last, each makes the next cheaper to reach, and the viral mark on every output is the engine the entire decade runs on.
