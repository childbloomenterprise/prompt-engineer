/* ELPROM — Generation Result (7-day showpiece) + Carousel modal */

const { useState:useStateR, useEffect:useEffectR, useRef:useRefR } = React;

/* ---------------- In-app top bar ---------------- */
function AppBar({ intent, setIntent, onHome, onAccount, onRegenAll, generating }) {
  return (
    <div className={`appbar ${generating?'appbar-dim':''}`}>
      <div className="appbar-top">
        <button className="appbar-logo" onClick={onHome} aria-label="ELPROM home">
          <span className="brand-mark" style={{width:26,height:26,borderRadius:8}}><Icon name="bolt" size={13} /></span>
        </button>
        <div className="appbar-title">
          <span className="t-label text-3">Your week</span>
        </div>
        <button className="avatar" onClick={onAccount} aria-label="Account">A</button>
      </div>
      <div className="appbar-input">
        <Icon name="sparkle" size={16} className="text-accent" style={{flex:'none'}} />
        <input value={intent} onChange={e=>setIntent(e.target.value)} aria-label="Edit your intent" />
        <button className="appbar-regen" onClick={onRegenAll} disabled={generating} aria-label="Regenerate week">
          <Icon name="refresh" size={16} />
        </button>
      </div>
    </div>
  );
}

/* ---------------- Open-in-AI dropdown ---------------- */
function OpenInAI({ onPick }) {
  const ais = [
    { k:"ChatGPT", c:"#10A37F", l:"GPT" },
    { k:"Claude",  c:"#D97757", l:"C" },
    { k:"Gemini",  c:"#4285F4", l:"G" },
  ];
  return (
    <Dropdown align="right" trigger={
      <button className="day-action"><Icon name="share" size={15} />Open in AI<Icon name="chevronDown" size={13} /></button>
    }>
      {ais.map(a=>(
        <button key={a.k} className="dropdown-item" onClick={()=>onPick(a.k)}>
          <span className="dropdown-ai-icon" style={{background:a.c}}>{a.l}</span>{a.k}
        </button>
      ))}
    </Dropdown>
  );
}

/* ---------------- Day card ---------------- */
function DayCard({ d, index, revealed, onOpenCarousel, watermark=true }) {
  const [expanded, setExpanded] = useStateR(false);
  const [regen, setRegen] = useStateR(false);
  const toast = useToast();
  const copy = () => { navigator.clipboard && navigator.clipboard.writeText(`${d.hook}\n\n${d.caption}\n\n${d.hashtags.join(' ')}`); toast("Caption copied"); };
  const doRegen = () => { setRegen(true); setTimeout(()=>{ setRegen(false); toast("Regenerated"); }, 1100); };

  if (!revealed) {
    return (
      <div className="day-card sk-card">
        <div className="dc-head"><Sk w={64} h={22} r={999} /><Sk w={40} h={12} /></div>
        <Sk w="92%" h={18} style={{marginTop:14}} /><Sk w="70%" h={18} style={{marginTop:8}} />
        <div className="dc-skgfx"><Sk w="100%" h="100%" r={14} /></div>
      </div>
    );
  }

  return (
    <div className={`day-card ${regen?'regenning':''}`} data-screen-label={d.day}>
      <div className="dc-head">
        <div className="dc-daywrap">
          <span className="dc-day">{d.day}</span>
          <span className="dc-date">{d.date}</span>
        </div>
        <FormatChip type={d.format} />
      </div>

      <div className="dc-framework"><Icon name="bookmark" size={12} />{d.framework}</div>
      <h3 className="dc-hook t-h3">{d.hook}</h3>

      <div className={`dc-caption ${expanded?'open':''}`}>
        {d.caption.split('\n').map((l,i)=> l.trim()? <p key={i}>{l}</p> : <div key={i} className="dc-gap" />)}
      </div>
      <button className="dc-more" onClick={()=>setExpanded(e=>!e)}>
        {expanded?'Show less':'Show caption'} <Icon name={expanded?'chevronDown':'chevronRight'} size={13} style={{transform:expanded?'rotate(180deg)':'none'}} />
      </button>

      <div className="dc-tags">{d.hashtags.map(h=> <span key={h} className="dc-tag">{h}</span>)}</div>

      <button className="dc-gfx" onClick={()=>onOpenCarousel(index)} aria-label={`Preview ${d.day} graphic`}>
        <GraphicCard data={d.graphic} watermark={watermark} />
        <span className="dc-gfx-hint"><Icon name="grid" size={13} />Preview</span>
      </button>

      <div className="dc-actions">
        <button className="day-action" onClick={copy}><Icon name="copy" size={15} />Copy</button>
        <button className="day-action" onClick={()=>toast("Graphic downloaded")}><Icon name="download" size={15} />Download</button>
        <OpenInAI onPick={(k)=>toast(`Sent to ${k}`)} />
        <button className="day-action icon-only" onClick={doRegen} aria-label="Regenerate"><Icon name="refresh" size={15} /></button>
      </div>
    </div>
  );
}

/* ---------------- Result screen ---------------- */
function ResultScreen({ intent, setIntent, onHome, onAccount, onOpenCarousel, onUpgrade, watermark=true }) {
  // Generate from the user's intent via the real engine ($0, client-side).
  // Falls back to the sample week if engine/data hasn't loaded.
  const build = () => {
    try {
      if (window.buildElpromWeek) {
        const r = window.buildElpromWeek(intent || window.ELPROM_INTENT);
        window.ELPROM_CAROUSEL = r.carousel;
        return r.week;
      }
    } catch (e) {}
    return window.ELPROM_WEEK;
  };
  const [week, setWeek] = useStateR(build);
  const [count, setCount] = useStateR(0);
  const [generating, setGenerating] = useStateR(true);
  const [upsellGone, setUpsellGone] = useStateR(false);

  const run = () => {
    const fresh = build();
    setWeek(fresh);
    setCount(0); setGenerating(true);
    let i = 0;
    const tick = () => {
      i++; setCount(i);
      if (i >= fresh.length) { setGenerating(false); return; }
      setTimeout(tick, 240);
    };
    setTimeout(tick, 500);
  };
  useEffectR(() => { run(); /* eslint-disable-next-line */ }, []);

  return (
    <div className="result-screen">
      <AppBar intent={intent} setIntent={setIntent} onHome={onHome} onAccount={onAccount} onRegenAll={run} generating={generating} />
      <div className="result-scroll">
        <div className="result-meta">
          <span className="t-small text-2">{generating? <><span className="gen-pulse" />Building from proven frameworks…</> : <><Icon name="check" size={14} className="text-accent" style={{verticalAlign:'-2px'}}/> 7 days · ready to post</>}</span>
          <span className="result-week t-small text-3">Jun 15–21</span>
        </div>
        <div className={`result-list ${generating?'is-generating':''}`}>
          {week.map((d,i)=>(
            <DayCard key={d.day} d={d} index={i} revealed={i < count} onOpenCarousel={onOpenCarousel} watermark={watermark} />
          ))}
        </div>

        {!generating && watermark && !upsellGone && (
          <div className="upsell">
            <button className="upsell-x" onClick={()=>setUpsellGone(true)} aria-label="Dismiss"><Icon name="x" size={15} /></button>
            <div className="upsell-body">
              <div className="t-h3">Posting more than once a week?</div>
              <p className="t-small text-2">Go Pro for unlimited calendars, no watermark, your brand voice, and AI images.</p>
            </div>
            <Button size="sm" onClick={onUpgrade} iconRight="arrowRight">Upgrade to Pro — $25/mo</Button>
          </div>
        )}

        <div className="result-foot">
          <div className="attr-badge"><Icon name="bolt" size={13} />Made with ELPROM</div>
          {!watermark && <p className="t-small text-3"><span className="pro-badge"><Icon name="bolt" size={11}/>Pro</span> Unlimited · watermark removed.</p>}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Carousel / graphic preview modal ---------------- */
function CarouselModal({ startIndex=0, onClose, watermark=true }) {
  const slides = window.ELPROM_CAROUSEL;
  const [i, setI] = useStateR(0);
  const [wm, setWm] = useStateR(watermark);
  const toast = useToast();
  const go = (n) => setI(Math.max(0, Math.min(slides.length-1, n)));
  const startX = useRefR(0);

  return (
    <Modal onClose={onClose} className="carousel-modal">
      <div className="cm-head">
        <div><div className="t-h3">Carousel preview</div><div className="t-small text-3">{i+1} of {slides.length} slides</div></div>
        <button className="icon-btn" onClick={onClose} aria-label="Close"><Icon name="x" size={18} /></button>
      </div>

      <div className="cm-stage"
        onTouchStart={e=>startX.current=e.touches[0].clientX}
        onTouchEnd={e=>{ const dx=e.changedTouches[0].clientX-startX.current; if(dx<-40) go(i+1); if(dx>40) go(i-1); }}>
        <button className="cm-nav left" onClick={()=>go(i-1)} disabled={i===0} aria-label="Previous"><Icon name="chevronRight" size={20} style={{transform:'rotate(180deg)'}} /></button>
        <div className="cm-slide-wrap">
          <div className="cm-track" style={{ transform:`translateX(${-i*100}%)` }}>
            {slides.map((s,idx)=>(
              <div className="cm-slide" key={idx}><GraphicCard data={s} watermark={wm} size={1.15} /></div>
            ))}
          </div>
        </div>
        <button className="cm-nav right" onClick={()=>go(i+1)} disabled={i===slides.length-1} aria-label="Next"><Icon name="chevronRight" size={20} /></button>
      </div>

      <div className="cm-dots">
        {slides.map((_,idx)=> <button key={idx} className={`cm-dot ${idx===i?'on':''}`} onClick={()=>go(idx)} aria-label={`Slide ${idx+1}`} />)}
      </div>

      <div className="cm-foot">
        <button className={`cm-wm-toggle ${wm?'':'off'}`} onClick={()=>{ if(!watermark){ setWm(w=>!w); } else { toast("Removing the watermark is a Pro feature"); } }}>
          <Icon name={wm?'lock':'check'} size={14} />
          {wm? 'Watermark on · Upgrade to remove' : 'Watermark removed'}
        </button>
        <div className="cm-foot-actions">
          <Button variant="ghost" size="sm" icon="share" onClick={()=>toast("Share link copied")}>Share</Button>
          <Button size="sm" icon="download" onClick={()=>toast("Carousel downloaded")}>Download</Button>
        </div>
      </div>
    </Modal>
  );
}

Object.assign(window, { ResultScreen, CarouselModal });
