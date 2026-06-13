# PromptAdda 🪄

**Free, battle-tested AI prompts for Indian creators.** Captions, Reels, YouTube scripts,
reselling, brand deals & more — fill in the blanks, copy, paste into ChatGPT/Claude, done.

54+ prompts · No login · Free forever · Built with React + Vite + Tailwind v4.

---

## Run it locally

```bash
npm install
npm run dev      # → http://localhost:5173
```

Build for production:

```bash
npm run build    # outputs to /dist
npm run preview  # preview the production build
```

## Deploy (Vercel — 2 minutes)

1. Push this folder to a GitHub repo.
2. Go to [vercel.com](https://vercel.com) → New Project → import the repo.
3. Framework preset: **Vite**. Build command `npm run build`, output dir `dist`.
4. Deploy. That's it — you get a free `*.vercel.app` URL (add a custom domain later).

> No backend, no database, no env vars needed for v1. It's a static site.

## How it's organised

```
src/
  data/
    prompts.js      ← THE LIBRARY. Add/edit prompts here (the main file you'll touch).
    categories.js   ← category pills (id, label, emoji)
    tools.js        ← affiliate "tools we recommend" — put YOUR links here
  components/
    Header / Hero / CategoryBar / PromptCard / CustomizeModal
    HowItWorks / ToolsSection / Footer
  App.jsx           ← search + filter + modal state
```

### Add a new prompt
Open `src/data/prompts.js` and add an object. Use `[SQUARE_BRACKETS]` for any blank —
the Customize panel auto-detects them and turns each into a fill-in field:

```js
{
  id: 'my-new-prompt',
  title: 'My New Prompt',
  category: 'instagram',            // must match an id in categories.js
  description: 'One line on what it does.',
  tags: ['caption', 'sales'],
  prompt: `Write a caption for [PRODUCT] aimed at [AUDIENCE]...`,
}
```

Tip: add `, e.g. something` inside a blank to show a placeholder hint, e.g.
`[PRICE, e.g. ₹499]`.

## Making money (without charging users)

- **Affiliates:** edit `src/data/tools.js` with your real affiliate links (Canva, Hostinger,
  Razorpay etc. — these pay in India). The Tools section is already wired up.
- **Audience → email:** add a newsletter signup later; the audience is the real asset.
- **Pro tier (later):** when traffic is real, gate advanced packs / a bulk tool behind a paywall.

## Roadmap ideas
- [ ] Newsletter capture (turn visitors into an email list)
- [ ] "Copy count" social proof per prompt
- [ ] Favourites (localStorage)
- [ ] More niches (regional languages, specific creator types)
- [ ] Submit-a-prompt form (community / UGC)

---

Made with ❤️ for creators. Prompts work with ChatGPT, Claude & Gemini.
