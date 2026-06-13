import { useEffect, useMemo, useState } from 'react'
import { CATEGORY_MAP } from '../data/categories'

// Extract unique placeholders, keep first-seen order.
function extractBlanks(text) {
  const matches = text.match(/\[[^\]]+\]/g) || []
  const seen = new Map()
  for (const raw of matches) {
    if (!seen.has(raw)) {
      const inner = raw.slice(1, -1) // strip [ ]
      const [labelPart] = inner.split(/,\s*/) // "PRICE, e.g. 499" -> "PRICE"
      const hintMatch = inner.match(/e\.g\.?\s*(.+)$/i)
      seen.set(raw, {
        token: raw,
        label: labelPart
          .toLowerCase()
          .replace(/_/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase()),
        hint: hintMatch ? hintMatch[1].trim() : '',
        long: /PASTE|TRANSCRIPT|NOTES|DRAFT|STATS|QUESTIONS|STORY|BACKSTORY/i.test(inner),
      })
    }
  }
  return [...seen.values()]
}

function fill(text, values) {
  let out = text
  for (const [token, val] of Object.entries(values)) {
    if (val && val.trim()) {
      // replace every occurrence of this exact token
      out = out.split(token).join(val.trim())
    }
  }
  return out
}

export default function CustomizeModal({ prompt, onClose }) {
  const blanks = useMemo(() => extractBlanks(prompt.prompt), [prompt])
  const [values, setValues] = useState({})
  const [copied, setCopied] = useState(false)
  const cat = CATEGORY_MAP[prompt.category]

  const filled = useMemo(() => fill(prompt.prompt, values), [prompt, values])
  const doneCount = blanks.filter((b) => values[b.token]?.trim()).length

  // close on Escape
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  async function copyFilled() {
    try {
      await navigator.clipboard.writeText(filled)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.prompt('Copy your prompt:', filled)
    }
  }

  function openInChatGPT() {
    // pre-fills ChatGPT with the prompt
    const url = 'https://chat.openai.com/?q=' + encodeURIComponent(filled)
    window.open(url, '_blank', 'noopener')
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-line bg-panel shadow-2xl sm:rounded-3xl fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex items-start justify-between gap-3 border-b border-line p-5">
          <div>
            <span className="text-xs font-medium text-mut">{cat?.emoji} {cat?.label}</span>
            <h2 className="mt-1 text-lg font-bold leading-snug text-white">{prompt.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line text-mut hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* body: two columns on desktop */}
        <div className="grid flex-1 grid-cols-1 gap-0 overflow-hidden md:grid-cols-2">
          {/* inputs */}
          <div className="overflow-y-auto border-line p-5 md:border-r">
            {blanks.length === 0 ? (
              <p className="text-sm text-mut">
                This prompt has no blanks — it's ready to copy as-is. 🎉
              </p>
            ) : (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">Fill in your details</p>
                  <span className="text-xs text-mut">
                    {doneCount}/{blanks.length} done
                  </span>
                </div>
                <div className="space-y-4">
                  {blanks.map((b) => (
                    <label key={b.token} className="block">
                      <span className="mb-1 block text-sm font-medium text-white/90">
                        {b.label}
                      </span>
                      {b.long ? (
                        <textarea
                          rows={3}
                          value={values[b.token] || ''}
                          onChange={(e) =>
                            setValues((v) => ({ ...v, [b.token]: e.target.value }))
                          }
                          placeholder={b.hint || 'Type here…'}
                          className="w-full resize-y rounded-lg border border-line bg-ink/60 px-3 py-2 text-sm text-white outline-none placeholder:text-mut/60 focus:border-violet-2"
                        />
                      ) : (
                        <input
                          value={values[b.token] || ''}
                          onChange={(e) =>
                            setValues((v) => ({ ...v, [b.token]: e.target.value }))
                          }
                          placeholder={b.hint || 'Type here…'}
                          className="w-full rounded-lg border border-line bg-ink/60 px-3 py-2 text-sm text-white outline-none placeholder:text-mut/60 focus:border-violet-2"
                        />
                      )}
                    </label>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* live preview */}
          <div className="flex min-h-[200px] flex-col overflow-hidden bg-ink/40">
            <div className="flex items-center justify-between px-5 pt-4 text-xs text-mut">
              <span>Live preview</span>
              <span>{filled.length} chars</span>
            </div>
            <pre className="flex-1 overflow-y-auto whitespace-pre-wrap px-5 py-3 text-[12.5px] leading-relaxed text-white/85">
              {filled}
            </pre>
          </div>
        </div>

        {/* footer actions */}
        <div className="flex flex-col gap-2 border-t border-line p-4 sm:flex-row">
          <button
            onClick={copyFilled}
            className={
              'flex-1 rounded-xl px-4 py-2.5 text-sm font-bold transition ' +
              (copied
                ? 'bg-emerald-500 text-white'
                : 'bg-violet text-white shadow-lg shadow-violet/30 hover:bg-violet-2 hover:text-ink')
            }
          >
            {copied ? '✓ Copied to clipboard' : '📋 Copy filled prompt'}
          </button>
          <button
            onClick={openInChatGPT}
            className="rounded-xl border border-line bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Open in ChatGPT ↗
          </button>
        </div>
      </div>
    </div>
  )
}
