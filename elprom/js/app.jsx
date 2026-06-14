/* ELPROM — Root: flow/routing, theme, tweaks */

const { useState:useStateA, useEffect:useEffectA } = React;

const ACCENTS = [
  { name:"indigo",  hex:"#5E5CE6" },
  { name:"violet",  hex:"#7C5CFF" },
  { name:"blue",    hex:"#2A6FDB" },
  { name:"emerald", hex:"#11A668" },
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "indigo",
  "plan": "Free"
}/*EDITMODE-END*/;

function ELPROM() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [theme, setTheme] = useStateA(() => { try { return localStorage.getItem('el_theme') || 'dark'; } catch(e){ return 'dark'; } });
  const watermark = t.plan !== "Pro";

  const [screen, setScreen] = useStateA("landing");     // landing | app
  const [appView, setAppView] = useStateA("result");    // result | auth | dashboard
  const [modal, setModal] = useStateA(null);            // {type:'carousel',index} | {type:'account'}
  const [intent, setIntent] = useStateA(window.ELPROM_INTENT);
  const toast = useToast();

  useEffectA(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem('el_theme', theme); } catch(e){}
  }, [theme]);
  useEffectA(() => {
    document.documentElement.setAttribute("data-accent", t.accent);
  }, [t.accent]);

  const toggleTheme = () => setTheme(p => p === 'dark' ? 'light' : 'dark');
  const goPro = () => { setTweak("plan", "Pro"); toast("Welcome to Pro · watermark removed"); };

  const generate = (text) => { setIntent(text); setScreen("app"); setAppView("result"); setModal(null); window.scrollTo(0,0); };
  const goLanding = () => { setScreen("landing"); setModal(null); };
  const accentHex = (ACCENTS.find(a=>a.name===t.accent)||ACCENTS[0]).hex;

  return (
    <>
      {screen === "landing" && (
        <Landing
          theme={theme}
          onToggleTheme={toggleTheme}
          onGenerate={generate}
          onSignIn={()=>{ setScreen("app"); setAppView("auth"); }}
        />
      )}

      {screen === "app" && (
        <div className="app-stage">
          <button className="app-exit" onClick={goLanding}>
            <Icon name="chevronRight" size={16} style={{transform:'rotate(180deg)'}} /><span>Back to site</span>
          </button>

          <PhoneFrame>
            {appView === "result" && (
              <ResultScreen
                intent={intent} setIntent={setIntent}
                onHome={goLanding}
                onAccount={()=>setModal({type:'account'})}
                onOpenCarousel={(i)=>setModal({type:'carousel',index:i})}
                onUpgrade={goPro}
                watermark={watermark}
              />
            )}
            {appView === "auth" && (
              <AuthScreen onBack={goLanding} onAuthed={()=>{ setAppView("dashboard"); toast("Signed in"); }} />
            )}
            {appView === "dashboard" && (
              <DashboardScreen
                onHome={goLanding}
                onAccount={()=>setModal({type:'account'})}
                onOpenCalendar={()=>setAppView("result")}
                theme={theme} onToggleTheme={toggleTheme}
              />
            )}
          </PhoneFrame>
        </div>
      )}

      {/* ---------- Overlays ---------- */}
      {modal?.type === "carousel" && (
        <CarouselModal startIndex={modal.index} onClose={()=>setModal(null)} watermark={watermark} />
      )}
      {modal?.type === "account" && (
        <AccountSheet
          onClose={()=>setModal(null)}
          onDashboard={()=>{ setAppView("dashboard"); setModal(null); }}
          onUpgrade={()=>{ goPro(); setModal(null); }}
          onSignOut={()=>{ setModal(null); goLanding(); }}
        />
      )}

      {/* ---------- Tweaks ---------- */}
      <TweaksPanel>
        <TweakSection label="Appearance" />
        <TweakToggle label="Dark mode" value={theme==='dark'} onChange={(v)=>setTheme(v?'dark':'light')} />
        <TweakColor label="Accent" value={accentHex}
          options={ACCENTS.map(a=>a.hex)}
          onChange={(hex)=>{ const a = ACCENTS.find(x=>x.hex===hex); if(a) setTweak("accent", a.name); }} />
        <TweakSection label="Plan" />
        <TweakRadio label="Tier" value={t.plan} options={["Free","Pro"]} onChange={(v)=>setTweak("plan", v)} />
        <div style={{padding:"2px 4px 0", fontSize:12, color:"var(--text-3)", lineHeight:1.5}}>
          Pro removes the “Made with ELPROM” watermark across graphics.
        </div>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <ToastProvider><ELPROM /></ToastProvider>
);
