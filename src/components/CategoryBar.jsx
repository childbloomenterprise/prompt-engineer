import { CATEGORIES } from '../data/categories'

export default function CategoryBar({ active, onChange, counts }) {
  return (
    <div className="sticky top-[57px] z-20 -mx-4 mb-6 border-y border-line/70 bg-ink/80 px-4 py-3 backdrop-blur">
      <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {CATEGORIES.map((c) => {
          const isActive = active === c.id
          const n = counts[c.id] ?? 0
          return (
            <button
              key={c.id}
              onClick={() => onChange(c.id)}
              className={
                'flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition ' +
                (isActive
                  ? 'border-violet-2 bg-violet/20 text-white'
                  : 'border-line bg-panel text-mut hover:border-violet-2/50 hover:text-white')
              }
            >
              <span>{c.emoji}</span>
              <span>{c.label}</span>
              <span
                className={
                  'rounded-full px-1.5 text-xs ' +
                  (isActive ? 'bg-violet-2/30 text-white' : 'bg-white/5 text-mut')
                }
              >
                {n}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
