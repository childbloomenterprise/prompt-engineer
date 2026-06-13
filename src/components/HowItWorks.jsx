const STEPS = [
  {
    n: '1',
    title: 'Find a prompt',
    body: 'Search or pick a category — captions, Reels, YouTube, selling, brand deals.',
    emoji: '🔍',
  },
  {
    n: '2',
    title: 'Fill the blanks',
    body: 'Hit Customize. Type your product, niche & audience into simple boxes.',
    emoji: '🧩',
  },
  {
    n: '3',
    title: 'Copy & paste',
    body: 'One click copies your finished prompt. Paste into ChatGPT or Claude.',
    emoji: '📋',
  },
  {
    n: '4',
    title: 'Post & grow',
    body: 'Get a caption/script you can actually use — in seconds, not hours.',
    emoji: '🚀',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center">
        <h2 className="text-2xl font-extrabold sm:text-3xl">From blank screen to posted in 60 seconds</h2>
        <p className="mx-auto mt-2 max-w-lg text-mut">
          No prompt-writing skills needed. We did the hard part — you just fill in your details.
        </p>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s) => (
          <div key={s.n} className="relative rounded-2xl border border-line bg-panel p-5">
            <div className="mb-3 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet/15 text-xl">
                {s.emoji}
              </span>
              <span className="text-3xl font-black text-line">{s.n}</span>
            </div>
            <h3 className="font-bold text-white">{s.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-mut">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
