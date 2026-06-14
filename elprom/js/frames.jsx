/* ELPROM — Device frames, graphic renderer, animated hero device */

const { useState:useStateF, useEffect:useEffectF, useRef:useRefF } = React;

/* ---------------- Graphic card (the generated social visual) ----------------
   Style: dark canvas, purple accent — matches selected graphic direction.    */
function GraphicCard({ data, watermark=true, size=1, slide=false }) {
  const s = (v) => v*size;
  return (
    <div className="gfx" style={{ fontSize:s(16) }}>
      <div className="gfx-mesh" />
      <div className="gfx-inner">
        {data.num && <div className="gfx-num">{data.num}</div>}
        {data.kicker && <div className="gfx-kicker">{data.kicker}</div>}
        <div className={`gfx-title ${data.cta?'gfx-cta':''}`}>
          {(data.title||data.big||'').split('\n').map((l,i)=><span key={i}>{l}</span>)}
        </div>
        {data.small && <div className="gfx-small">{data.small}</div>}
        {(data.footer||data.foot) && <div className="gfx-foot">{data.footer||data.foot}</div>}
      </div>
      {watermark && (
        <div className="gfx-wm"><span className="gfx-wm-dot" />Made with ELPROM</div>
      )}
    </div>
  );
}

/* ---------------- Phone frame ---------------- */
function PhoneFrame({ children, statusDark=false, className='', scale }) {
  return (
    <div className={`phone ${className}`} style={scale?{ transform:`scale(${scale})` }:undefined}>
      <div className="phone-bezel">
        <div className="phone-island" />
        <div className={`phone-status ${statusDark?'dark':''}`}>
          <span className="ps-time">9:41</span>
          <span className="ps-right">
            <svg width="18" height="11" viewBox="0 0 18 11" aria-hidden="true"><rect x="0" y="3" width="3" height="8" rx="1" fill="currentColor"/><rect x="5" y="1.5" width="3" height="9.5" rx="1" fill="currentColor"/><rect x="10" y="0" width="3" height="11" rx="1" fill="currentColor" opacity=".4"/><rect x="15" y="0" width="3" height="11" rx="1" fill="currentColor" opacity=".4"/></svg>
            <svg width="16" height="11" viewBox="0 0 16 11" aria-hidden="true"><path d="M8 2.5C10.2 2.5 12.2 3.4 13.6 4.8L15 3.4C13.2 1.6 10.7 .5 8 .5S2.8 1.6 1 3.4l1.4 1.4C3.8 3.4 5.8 2.5 8 2.5z" fill="currentColor"/><path d="M8 6c1.1 0 2.1.5 2.8 1.2L8 10 5.2 7.2C5.9 6.5 6.9 6 8 6z" fill="currentColor"/></svg>
            <svg width="25" height="12" viewBox="0 0 25 12" aria-hidden="true"><rect x="1" y="1" width="20" height="10" rx="3" fill="none" stroke="currentColor" strokeOpacity=".5"/><rect x="2.5" y="2.5" width="15" height="7" rx="1.5" fill="currentColor"/><rect x="22.5" y="4" width="1.5" height="4" rx=".75" fill="currentColor" opacity=".5"/></svg>
          </span>
        </div>
        <div className="phone-screen">{children}</div>
        <div className="phone-home" />
      </div>
    </div>
  );
}

/* ---------------- Animated hero device: 7-day calendar materializing ---------------- */
function HeroDevice() {
  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const formats = ["Carousel","Reel","Carousel","Story","Carousel","Reel","Carousel"];
  const hooks = [
    "Stop validating. Start selling.",
    "$0 \u2192 $4k MRR in 38 days",
    "5 hard truths about customer #1",
    "\u201340% churn from one email",
    "6 pages. The ugliest won.",
    "\u201CRaise money\u201D is bad advice",
    "Week 6: what worked"
  ];
  const [phase, setPhase] = useStateF(0); // 0 typing, 1 generating, 2 filled
  useEffectF(() => {
    const t1 = setTimeout(()=>setPhase(1), 900);
    const t2 = setTimeout(()=>setPhase(2), 2100);
    const loop = setInterval(()=>{ setPhase(0); setTimeout(()=>setPhase(1),900); setTimeout(()=>setPhase(2),2100); }, 9000);
    return ()=>{ clearTimeout(t1); clearTimeout(t2); clearInterval(loop); };
  }, []);
  return (
    <div className="hero-device-wrap">
      <PhoneFrame statusDark={false} className="hero-phone">
        <div className="hd-screen">
          <div className="hd-top">
            <div className="hd-bar">
              <Icon name="sparkle" size={15} className="text-accent" />
              <span className="hd-intent">{phase===0?<span className="hd-caret">Grow my founder audience</span>:"Grow my founder audience"}</span>
            </div>
            <div className={`hd-gen ${phase===1?'on':''}`}>{phase===1?'Generating your week\u2026':'7 days \u00b7 ready to post'}</div>
          </div>
          <div className="hd-grid">
            {days.map((d,i)=>(
              <div key={d} className={`hd-card ${phase===2?'in':''} ${phase===1?'load':''}`} style={{ transitionDelay:`${i*70}ms` }}>
                <div className="hd-card-head">
                  <span className="hd-day">{d}</span>
                  <span className={`hd-fmt hd-fmt-${formats[i].toLowerCase()}`}>{formats[i]}</span>
                </div>
                {phase===1 ? (
                  <><div className="hd-sk" style={{width:'86%'}} /><div className="hd-sk" style={{width:'60%'}} /></>
                ) : (
                  <div className="hd-hook">{hooks[i]}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </PhoneFrame>
      <div className="hero-glow" />
    </div>
  );
}

Object.assign(window, { GraphicCard, PhoneFrame, HeroDevice });
