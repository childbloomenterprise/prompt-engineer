import { PROMPT_COUNT } from '../data/prompts'

export default function Footer() {
  return (
    <footer id="about" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-14">
        {/* about / mission */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 7h14M5 12h14M5 17h8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                  <circle cx="17.5" cy="17" r="2" fill="#facc15" />
                </svg>
              </span>
              <span className="text-lg font-extrabold">
                Prompt<span className="text-violet-2">Adda</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mut">
              A free library of {PROMPT_COUNT}+ AI prompts built for Indian creators & small
              businesses. Made so you can spend less time prompting and more time creating.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm text-mut">
              <li><a href="#library" className="hover:text-white">Browse all prompts</a></li>
              <li><a href="#how" className="hover:text-white">How it works</a></li>
              <li><a href="#tools" className="hover:text-white">Recommended tools</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white">The promise</h4>
            <ul className="mt-4 space-y-2 text-sm text-mut">
              <li>✅ Free, always</li>
              <li>✅ No sign-up, no email wall</li>
              <li>✅ New prompts added often</li>
              <li>✅ Made in India 🇮🇳</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-mut sm:flex-row">
          <span>© {new Date().getFullYear()} PromptAdda. Free for creators everywhere.</span>
          <span>
            Built with ❤️ for creators · Prompts work with ChatGPT, Claude & Gemini
          </span>
        </div>
      </div>
    </footer>
  )
}
