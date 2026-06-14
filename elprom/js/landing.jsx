/* ELPROM — Landing / marketing page (desktop-first, responsive) */

function Landing({ theme, onToggleTheme, onGenerate, onSignIn }) {
  const [intent, setIntent] = React.useState("");
  const [focus, setFocus] = React.useState(false);
  const suggestions = [
  "Grow my founder audience while building in public",
  "Promote my productivity app to remote workers",
  "Build authority as a fractional CMO"];

  const go = () => onGenerate(intent.trim() || suggestions[0]);

  return (
    <div className="landing">
      {/* ---------- Nav ---------- */}
      <header className="nav">
        <div className="container nav-inner">
          <a className="brand" href="#top" aria-label="ELPROM home">
            <span className="brand-mark"><Icon name="bolt" size={16} /></span>
            <span className="brand-name">ELPROM</span>
          </a>
          <nav className="nav-links">
            <a href="#how">How it works</a>
            <a href="#proof">Proof</a>
            <a href="#pricing">Pricing</a>
          </nav>
          <div className="nav-actions">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <button className="nav-signin" onClick={onSignIn}>Sign in</button>
            <Button size="sm" onClick={go}>Generate my week</Button>
          </div>
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="hero" id="top">
        <div className="aurora" />
        <div className="container hero-grid">
          <div className="hero-copy" style={{ fontFamily: "\"Fira Sans\"" }}>
            <div className="hero-eyebrow"><span className="dot" />Start from proven frameworks, never a blank box</div>
            <h1 className="t-display hero-title">Start from<br />what works.</h1>
            <p className="t-body hero-sub">Type one line. Get a whole week of proven, ready-to-post content — words <em>and</em> visuals.</p>

            <div className={`hero-input ${focus ? 'focus' : ''}`}>
              <Icon name="sparkle" size={18} className="hero-input-icon" />
              <input
                className="hero-input-field"
                placeholder="What do you want to be known for?"
                value={intent}
                onChange={(e) => setIntent(e.target.value)}
                onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
                onKeyDown={(e) => {if (e.key === 'Enter') go();}}
                aria-label="Describe your content goal" />
              
              <Button onClick={go} iconRight="arrowRight" className="hero-input-cta">Generate my week</Button>
            </div>

            <div className="hero-suggest">
              <span className="text-3 t-small">Try:</span>
              <div className="chip-row">
                {suggestions.map((s) =>
                <button key={s} className="chip" onClick={() => setIntent(s)}>{s}</button>
                )}
              </div>
            </div>

            <div className="trust-row">
              <span className="trust"><Icon name="check" size={14} />Free to start</span>
              <span className="trust"><Icon name="check" size={14} />No login required</span>
              <span className="trust"><Icon name="check" size={14} />650K proven frameworks</span>
            </div>
          </div>

          <div className="hero-right">
            <HeroDevice />
            <div className="float-card fc-1 card-glass">
              <FormatChip type="Reel" />
              <div className="fc-text">Hook scored <b>92/100</b></div>
            </div>
            <div className="float-card fc-2 card-glass">
              <div className="avatar" style={{ width: 28, height: 28, fontSize: 12 }}>A</div>
              <div className="fc-text">Posted to <b>@buildwithava</b></div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="section how" id="how">
        <div className="container">
          <Rise className="sec-head">
            <span className="t-label text-accent">How it works</span>
            <h2 className="t-h1">From one line to a finished week.</h2>
          </Rise>
          <div className="how-grid">
            {[
            { n: "01", icon: "edit", t: "Type one line of intent", d: "Your niche, your goal, your platform. One sentence is all ELPROM needs to begin." },
            { n: "02", icon: "sparkle", t: "We start from what works", d: "Every post is built on a proven framework from a library of 650K — never a blank box." },
            { n: "03", icon: "calendar", t: "Get a ready-to-post week", d: "Seven days of hooks, captions, hashtags and designed graphics. Copy, download, done." }].
            map((s, i) =>
            <Rise key={s.n} delay={i * 90} className="how-card card card-hover">
                <div className="how-num t-mono-stat text-3">{s.n}</div>
                <div className="how-icon"><Icon name={s.icon} size={20} /></div>
                <h3 className="t-h3">{s.t}</h3>
                <p className="t-small text-2">{s.d}</p>
              </Rise>
            )}
          </div>
        </div>
      </section>

      {/* ---------- Proof ---------- */}
      <section className="section proof" id="proof">
        <div className="container">
          <Rise className="stat-strip card-glass">
            {[
            { v: "650K", l: "Proven frameworks" },
            { v: "~8s", l: "To a full week" },
            { v: "7 days", l: "Finished every run" },
            { v: "4.3×", l: "More consistent posting" }].
            map((s) =>
            <div className="stat" key={s.l}>
                <div className="t-mono-stat">{s.v}</div>
                <div className="t-small text-2">{s.l}</div>
              </div>
            )}
          </Rise>
          <div className="quotes">
            {[
            { q: "I went from posting twice a month to every single day. The frameworks do the thinking — I just hit publish.", n: "Ava Mirza", r: "Founder, Loomly", a: "A" },
            { q: "It feels like a ghostwriter who already studied my niche. The Monday carousel alone got us 40 demo signups.", n: "Devin Okafor", r: "Building Hopscotch", a: "D" },
            { q: "The 7-day view is the unlock. I can see my whole week of content land in seconds and edit from there.", n: "Priya Sundar", r: "Solo SaaS founder", a: "P" }].
            map((c, i) =>
            <Rise key={c.n} delay={i * 80} className="quote card card-hover">
                <p className="t-body quote-text">“{c.q}”</p>
                <div className="quote-by">
                  <div className="avatar">{c.a}</div>
                  <div><div className="t-small" style={{ fontWeight: 640 }}>{c.n}</div><div className="t-small text-3">{c.r}</div></div>
                </div>
              </Rise>
            )}
          </div>
        </div>
      </section>

      {/* ---------- Pricing / Free vs Pro ---------- */}
      <section className="section pricing" id="pricing">
        <div className="container">
          <Rise className="sec-head center">
            <span className="t-label text-accent">Pricing</span>
            <h2 className="t-h1">Start free. Upgrade when it’s working.</h2>
          </Rise>
          <div className="plans">
            <Rise className="plan card">
              <div className="plan-head">
                <span className="t-h3">Free</span>
                <div className="plan-price"><span className="t-mono-stat">$0</span></div>
                <p className="t-small text-2">Everything you need to feel the magic.</p>
              </div>
              <ul className="plan-list">
                {["1 calendar per week", "Hooks, captions & hashtags", "Designed graphics", "“Open in AI” offload", "“Made with ELPROM” watermark"].map((f) =>
                <li key={f}><Icon name="check" size={16} className="text-accent" />{f}</li>
                )}
              </ul>
              <Button variant="ghost" onClick={() => onGenerate(suggestions[0])} className="plan-cta">Start free</Button>
            </Rise>
            <Rise delay={80} className="plan plan-pro card">
              <div className="plan-glow" />
              <div className="plan-head">
                <div className="row gap-8"><span className="t-h3">Pro</span><span className="pro-badge"><Icon name="bolt" size={11} />Most popular</span></div>
                <div className="plan-price"><span className="t-mono-stat">$25</span><span className="text-2">/mo</span></div>
                <p className="t-small text-2">For creators who post to grow.</p>
              </div>
              <ul className="plan-list">
                {["Unlimited calendars", "No watermark", "Your brand voice", "Scheduling reminders", "AI-generated images", "Priority generation"].map((f) =>
                <li key={f}><Icon name="check" size={16} className="text-accent" />{f}</li>
                )}
              </ul>
              <Button onClick={onSignIn} className="plan-cta">Go Pro</Button>
              <div className="plan-foot text-3 t-small">Cancel anytime.</div>
            </Rise>
          </div>
        </div>
      </section>

      {/* ---------- CTA + Footer ---------- */}
      <section className="final-cta">
        <div className="aurora" />
        <div className="container final-inner">
          <h2 className="t-h1">A week of your content,<br />in the next eight seconds.</h2>
          <Button size="lg" onClick={go} iconRight="arrowRight">Generate my week</Button>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <div className="brand"><span className="brand-mark"><Icon name="bolt" size={16} /></span><span className="brand-name">ELPROM</span></div>
          <p className="t-small text-3">Start from what works.</p>
          <div className="footer-links">
            <a href="#how">Product</a><a href="#pricing">Pricing</a><a href="#proof">Stories</a><a href="#top">Privacy</a>
          </div>
        </div>
      </footer>
    </div>);

}

window.Landing = Landing;