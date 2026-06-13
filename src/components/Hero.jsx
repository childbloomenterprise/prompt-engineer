import { PROMPT_COUNT } from '../data/prompts'

export default function Hero({ query, onQuery }) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-16 sm:pt-24 text-center">
        <span className="fade-up inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1 text-xs font-medium text-mut">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          Free forever · No login · Built for Indian creators
        </span>

        <h1 className="fade-up mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl">
          Stop fighting with AI.
          <br />
          <span className="grad-text">Just copy a prompt that works.</span>
        </h1>

        <p className="fade-up mx-auto mt-5 max-w-xl text-base text-mut sm:text-lg">
          {PROMPT_COUNT}+ battle-tested prompts for captions, Reels, YouTube scripts,
          reselling & brand deals. Fill in the blanks, copy, paste into ChatGPT — done in seconds.
        </p>

        {/* search */}
        <div className="fade-up mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-2xl border border-line bg-panel px-4 py-3 shadow-2xl shadow-black/40 focus-within:border-violet-2/60">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0 text-mut">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="m20 20-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search: caption, Reel, brand deal, Diwali sale…"
            className="w-full bg-transparent text-base text-white outline-none placeholder:text-mut"
          />
          {query && (
            <button
              onClick={() => onQuery('')}
              className="rounded-md px-2 text-sm text-mut hover:text-white"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <div className="fade-up mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-mut">
          <span>⚡ Copy in 1 click</span>
          <span>🧩 Fill-in-the-blanks</span>
          <span>🇮🇳 Hinglish-friendly</span>
          <span>💸 ₹0 — always</span>
        </div>
      </div>
    </section>
  )
}
