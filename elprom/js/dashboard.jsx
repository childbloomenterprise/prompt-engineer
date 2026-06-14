/* ELPROM — Auth + Dashboard screens */

const { useState:useStateD } = React;

/* ---------------- Auth ---------------- */
function AuthScreen({ onBack, onAuthed }) {
  const [loading, setLoading] = useStateD(false);
  const go = () => { setLoading(true); setTimeout(()=>{ setLoading(false); onAuthed(); }, 1200); };
  return (
    <div className="auth-screen">
      <div className="aurora" />
      <button className="auth-back" onClick={onBack} aria-label="Back"><Icon name="chevronRight" size={18} style={{transform:'rotate(180deg)'}} /></button>
      <div className="auth-inner">
        <div className="auth-logo"><span className="brand-mark" style={{width:46,height:46,borderRadius:14}}><Icon name="bolt" size={22} /></span></div>
        <h1 className="t-h1 auth-title">Save your week.</h1>
        <p className="t-body text-2 auth-sub">Create a free account to keep your calendars, track usage, and pick up where you left off.</p>
        <button className="google-btn" onClick={go} disabled={loading}>
          {loading? <span className="btn-spin" style={{borderTopColor:'var(--accent)',borderColor:'var(--accent-ring)'}} /> : <Icon name="google" size={20} />}
          {loading? 'Signing you in…' : 'Continue with Google'}
        </button>
        <p className="t-small text-3 auth-fine">No passwords. We only use this to save your work.<br/>By continuing you agree to our Terms & Privacy.</p>
      </div>
    </div>
  );
}

/* ---------------- Dashboard ---------------- */
function DashboardScreen({ onHome, onAccount, onOpenCalendar, theme, onToggleTheme }) {
  const saved = window.ELPROM_SAVED;
  const [voice, setVoice] = useStateD("Confident & concise");
  const voices = ["Confident & concise","Warm & personal","Bold & contrarian"];
  return (
    <div className="dash-screen">
      <div className="appbar">
        <div className="appbar-top">
          <button className="appbar-logo" onClick={onHome} aria-label="ELPROM home"><span className="brand-mark" style={{width:26,height:26,borderRadius:8}}><Icon name="bolt" size={13} /></span></button>
          <div className="appbar-title"><span className="t-label text-3">Dashboard</span></div>
          <button className="avatar" onClick={onAccount}>A</button>
        </div>
      </div>

      <div className="dash-scroll">
        <div className="dash-hello">
          <h2 className="t-h2">Hey, Ava</h2>
          <p className="t-small text-2">Here’s your content workspace.</p>
        </div>

        {/* usage meter */}
        <div className="dash-usage card">
          <div className="du-row">
            <span className="t-small" style={{fontWeight:620}}>Free plan</span>
            <span className="pro-badge"><Icon name="bolt" size={11} />Upgrade</span>
          </div>
          <Meter value={1} max={1} />
          <div className="du-row">
            <span className="t-small text-2">1 of 1 calendars this week</span>
            <span className="t-small text-3">Resets Mon</span>
          </div>
          <Button size="sm" onClick={onAccount} className="du-cta" iconRight="arrowRight">Go unlimited with Pro — $25/mo</Button>
        </div>

        {/* saved calendars */}
        <div className="dash-sec-head">
          <span className="t-label text-3">Saved calendars</span>
          <button className="dash-new" onClick={()=>onOpenCalendar(0)}><Icon name="plus" size={14} />New</button>
        </div>
        <div className="dash-grid">
          {saved.map((c,i)=>(
            <button key={c.title} className="cal-card card card-hover" onClick={()=>onOpenCalendar(i)}>
              <div className="cal-thumb">
                <GraphicCard data={window.ELPROM_WEEK[i%7].graphic} watermark={false} size={0.62} />
                {c.live && <span className="cal-live"><span className="cal-live-dot" />This week</span>}
              </div>
              <div className="cal-meta">
                <div className="t-small cal-title">{c.title}</div>
                <div className="t-small text-3">{c.days} days · {c.date}</div>
              </div>
            </button>
          ))}
        </div>

        {/* settings */}
        <div className="dash-sec-head"><span className="t-label text-3">Brand voice & theme</span></div>
        <div className="dash-settings card">
          <div className="ds-row">
            <div><div className="t-small" style={{fontWeight:600}}>Brand voice</div><div className="t-small text-3">Applied to every generation</div></div>
          </div>
          <div className="chip-row" style={{marginTop:4}}>
            {voices.map(v=> <Chip key={v} active={voice===v} onClick={()=>setVoice(v)}>{v}</Chip>)}
          </div>
          <div className="ds-divider" />
          <div className="ds-row">
            <div><div className="t-small" style={{fontWeight:600}}>Appearance</div><div className="t-small text-3">{theme==='dark'?'Dark':'Light'} mode</div></div>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
        </div>

        <div className="result-foot"><div className="attr-badge"><Icon name="bolt" size={13} />Made with ELPROM</div></div>
      </div>
    </div>
  );
}

/* ---------------- Account sheet ---------------- */
function AccountSheet({ onClose, onDashboard, onSignOut, onUpgrade }) {
  return (
    <Modal onClose={onClose} className="account-sheet">
      <div className="as-head">
        <div className="avatar" style={{width:44,height:44,fontSize:17}}>A</div>
        <div><div className="t-h3">Ava Mirza</div><div className="t-small text-3">ava@buildwith.co · Free plan</div></div>
      </div>
      <div className="as-list">
        <button className="dropdown-item" onClick={onDashboard}><Icon name="grid" size={18} className="text-2" />Dashboard</button>
        <button className="dropdown-item" onClick={onUpgrade}><Icon name="bolt" size={18} className="text-accent" />Upgrade to Pro</button>
        <button className="dropdown-item" onClick={onClose}><Icon name="settings" size={18} className="text-2" />Settings</button>
        <button className="dropdown-item" onClick={onSignOut}><Icon name="arrowRight" size={18} className="text-2" />Sign out</button>
      </div>
    </Modal>
  );
}

Object.assign(window, { AuthScreen, DashboardScreen, AccountSheet });
