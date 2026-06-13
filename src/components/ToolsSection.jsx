import { TOOLS } from '../data/tools'

export default function ToolsSection() {
  return (
    <section id="tools" className="mx-auto max-w-6xl px-4 py-16">
      <div className="rounded-3xl border border-line bg-panel p-6 sm:p-10">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">Tools we actually recommend</h2>
            <p className="mt-2 max-w-lg text-mut">
              The kit most Indian creators use to design, edit, host & get paid. Some links may
              earn us a small commission — it keeps PromptAdda free for you. 🙏
            </p>
          </div>
          <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold">
            Keeps the site free
          </span>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((t) => (
            <a
              key={t.name}
              href={t.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="group flex items-start gap-3 rounded-2xl border border-line bg-ink/40 p-4 transition hover:border-violet-2/50 hover:bg-panel-2"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet/15 text-sm font-bold text-violet-2">
                {t.name[0]}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{t.name}</span>
                  <span className="rounded-md bg-white/5 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-mut">
                    {t.badge}
                  </span>
                </div>
                <p className="mt-0.5 text-sm leading-relaxed text-mut">{t.blurb}</p>
              </div>
              <span className="ml-auto self-center text-mut transition group-hover:translate-x-0.5 group-hover:text-white">
                ↗
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
