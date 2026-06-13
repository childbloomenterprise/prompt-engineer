import { useMemo, useState } from 'react'
import { PROMPTS } from './data/prompts'
import { CATEGORIES } from './data/categories'
import Header from './components/Header'
import Hero from './components/Hero'
import CategoryBar from './components/CategoryBar'
import PromptCard from './components/PromptCard'
import CustomizeModal from './components/CustomizeModal'
import HowItWorks from './components/HowItWorks'
import ToolsSection from './components/ToolsSection'
import Footer from './components/Footer'

export default function App() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [active, setActive] = useState(null) // prompt open in modal

  // counts per category (for the pills) — respects search
  const searched = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return PROMPTS
    return PROMPTS.filter((p) =>
      (p.title + ' ' + p.description + ' ' + p.tags.join(' ') + ' ' + p.prompt)
        .toLowerCase()
        .includes(q),
    )
  }, [query])

  const counts = useMemo(() => {
    const c = { all: searched.length }
    for (const cat of CATEGORIES) {
      if (cat.id === 'all') continue
      c[cat.id] = searched.filter((p) => p.category === cat.id).length
    }
    return c
  }, [searched])

  const visible = useMemo(
    () => (category === 'all' ? searched : searched.filter((p) => p.category === category)),
    [searched, category],
  )

  return (
    <div className="min-h-screen">
      <Header />
      <Hero query={query} onQuery={setQuery} />

      <main id="library" className="mx-auto max-w-6xl px-4 pb-8">
        <CategoryBar active={category} onChange={setCategory} counts={counts} />

        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-lg font-bold text-white">
            {visible.length} prompt{visible.length !== 1 ? 's' : ''}
            {query && <span className="text-mut"> for “{query}”</span>}
          </h2>
          {(query || category !== 'all') && (
            <button
              onClick={() => {
                setQuery('')
                setCategory('all')
              }}
              className="text-sm text-violet-2 hover:underline"
            >
              Reset
            </button>
          )}
        </div>

        {visible.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line bg-panel/50 p-12 text-center">
            <p className="text-4xl">🤔</p>
            <p className="mt-3 font-semibold text-white">No prompts match that.</p>
            <p className="mt-1 text-sm text-mut">
              Try a simpler word like “caption”, “reel”, “sale” or “email”.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => (
              <PromptCard key={p.id} prompt={p} onCustomize={setActive} />
            ))}
          </div>
        )}
      </main>

      <HowItWorks />
      <ToolsSection />
      <Footer />

      {active && <CustomizeModal prompt={active} onClose={() => setActive(null)} />}
    </div>
  )
}
