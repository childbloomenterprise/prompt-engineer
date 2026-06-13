export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line/80 glass">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet text-white shadow-lg shadow-violet/30">
            {/* simple mark */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 7h14M5 12h14M5 17h8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              <circle cx="17.5" cy="17" r="2" fill="#facc15" />
            </svg>
          </span>
          <span className="text-lg font-extrabold tracking-tight">
            Prompt<span className="text-violet-2">Adda</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm text-mut sm:flex">
          <a href="#library" className="transition hover:text-white">Library</a>
          <a href="#how" className="transition hover:text-white">How it works</a>
          <a href="#tools" className="transition hover:text-white">Tools</a>
          <a href="#about" className="transition hover:text-white">About</a>
        </nav>

        <a
          href="#library"
          className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/15"
        >
          Browse free →
        </a>
      </div>
    </header>
  )
}
