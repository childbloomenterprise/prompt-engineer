import { useState } from 'react'
import { CATEGORY_MAP } from '../data/categories'

// count placeholders like [LIKE_THIS]
function countBlanks(text) {
  const m = text.match(/\[[^\]]+\]/g)
  return m ? new Set(m).size : 0
}

export default function PromptCard({ prompt, onCustomize }) {
  const [copied, setCopied] = useState(false)
  const cat = CATEGORY_MAP[prompt.category]
  const blanks = countBlanks(prompt.prompt)

  async function copyRaw() {
    try {
      await navigator.clipboard.writeText(prompt.prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // clipboard blocked — fallback
      window.prompt('Copy this prompt:', prompt.prompt)
    }
  }

  return (
    <article className="group flex flex-col rounded-2xl border border-line bg-panel p-5 transition hover:border-violet-2/50 hover:bg-panel-2">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium text-mut">
          <span>{cat?.emoji}</span> {cat?.label}
        </span>
        {blanks > 0 && (
          <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-semibold text-gold">
            {blanks} blank{blanks > 1 ? 's' : ''}
          </span>
        )}
      </div>

      <h3 className="text-[15px] font-bold leading-snug text-white">{prompt.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-mut">{prompt.description}</p>

      {/* preview */}
      <pre className="mt-3 max-h-24 overflow-hidden rounded-lg border border-line/70 bg-ink/60 p-3 text-[11.5px] leading-relaxed text-mut/90 [mask-image:linear-gradient(180deg,#000_55%,transparent)]">
        {prompt.prompt}
      </pre>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {prompt.tags.slice(0, 3).map((t) => (
          <span key={t} className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-mut">
            #{t}
          </span>
        ))}
      </div>

      <div className="mt-4 flex gap-2 pt-1">
        <button
          onClick={() => onCustomize(prompt)}
          className="flex-1 rounded-xl bg-violet px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-violet/25 transition hover:bg-violet-2 hover:text-ink"
        >
          🧩 Customize
        </button>
        <button
          onClick={copyRaw}
          className={
            'rounded-xl border px-3 py-2 text-sm font-semibold transition ' +
            (copied
              ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300'
              : 'border-line bg-white/5 text-white hover:bg-white/10')
          }
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
    </article>
  )
}
