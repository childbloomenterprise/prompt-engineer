const { useState: useStateR, useEffect: useEffectR, useRef: useRefR } = React;
function AppBar({ intent, setIntent, onHome, onAccount, onRegenAll, generating }) {
  return /* @__PURE__ */ React.createElement("div", { className: `appbar ${generating ? "appbar-dim" : ""}` }, /* @__PURE__ */ React.createElement("div", { className: "appbar-top" }, /* @__PURE__ */ React.createElement("button", { className: "appbar-logo", onClick: onHome, "aria-label": "ELPROM home" }, /* @__PURE__ */ React.createElement("span", { className: "brand-mark", style: { width: 26, height: 26, borderRadius: 8 } }, /* @__PURE__ */ React.createElement(Icon, { name: "bolt", size: 13 }))), /* @__PURE__ */ React.createElement("div", { className: "appbar-title" }, /* @__PURE__ */ React.createElement("span", { className: "t-label text-3" }, "Your week")), /* @__PURE__ */ React.createElement("button", { className: "avatar", onClick: onAccount, "aria-label": "Account" }, "A")), /* @__PURE__ */ React.createElement("div", { className: "appbar-input" }, /* @__PURE__ */ React.createElement(Icon, { name: "sparkle", size: 16, className: "text-accent", style: { flex: "none" } }), /* @__PURE__ */ React.createElement("input", { value: intent, onChange: (e) => setIntent(e.target.value), "aria-label": "Edit your intent" }), /* @__PURE__ */ React.createElement("button", { className: "appbar-regen", onClick: onRegenAll, disabled: generating, "aria-label": "Regenerate week" }, /* @__PURE__ */ React.createElement(Icon, { name: "refresh", size: 16 }))));
}
function OpenInAI({ onPick }) {
  const ais = [
    { k: "ChatGPT", c: "#10A37F", l: "GPT" },
    { k: "Claude", c: "#D97757", l: "C" },
    { k: "Gemini", c: "#4285F4", l: "G" }
  ];
  return /* @__PURE__ */ React.createElement(Dropdown, { align: "right", trigger: /* @__PURE__ */ React.createElement("button", { className: "day-action" }, /* @__PURE__ */ React.createElement(Icon, { name: "share", size: 15 }), "Open in AI", /* @__PURE__ */ React.createElement(Icon, { name: "chevronDown", size: 13 })) }, ais.map((a) => /* @__PURE__ */ React.createElement("button", { key: a.k, className: "dropdown-item", onClick: () => onPick(a.k) }, /* @__PURE__ */ React.createElement("span", { className: "dropdown-ai-icon", style: { background: a.c } }, a.l), a.k)));
}
function DayCard({ d, index, revealed, onOpenCarousel, watermark = true }) {
  const [expanded, setExpanded] = useStateR(false);
  const [regen, setRegen] = useStateR(false);
  const toast = useToast();
  const copy = () => {
    navigator.clipboard && navigator.clipboard.writeText(`${d.hook}

${d.caption}

${d.hashtags.join(" ")}`);
    toast("Caption copied");
  };
  const doRegen = () => {
    setRegen(true);
    setTimeout(() => {
      setRegen(false);
      toast("Regenerated");
    }, 1100);
  };
  if (!revealed) {
    return /* @__PURE__ */ React.createElement("div", { className: "day-card sk-card" }, /* @__PURE__ */ React.createElement("div", { className: "dc-head" }, /* @__PURE__ */ React.createElement(Sk, { w: 64, h: 22, r: 999 }), /* @__PURE__ */ React.createElement(Sk, { w: 40, h: 12 })), /* @__PURE__ */ React.createElement(Sk, { w: "92%", h: 18, style: { marginTop: 14 } }), /* @__PURE__ */ React.createElement(Sk, { w: "70%", h: 18, style: { marginTop: 8 } }), /* @__PURE__ */ React.createElement("div", { className: "dc-skgfx" }, /* @__PURE__ */ React.createElement(Sk, { w: "100%", h: "100%", r: 14 })));
  }
  return /* @__PURE__ */ React.createElement("div", { className: `day-card ${regen ? "regenning" : ""}`, "data-screen-label": d.day }, /* @__PURE__ */ React.createElement("div", { className: "dc-head" }, /* @__PURE__ */ React.createElement("div", { className: "dc-daywrap" }, /* @__PURE__ */ React.createElement("span", { className: "dc-day" }, d.day), /* @__PURE__ */ React.createElement("span", { className: "dc-date" }, d.date)), /* @__PURE__ */ React.createElement(FormatChip, { type: d.format })), /* @__PURE__ */ React.createElement("div", { className: "dc-framework" }, /* @__PURE__ */ React.createElement(Icon, { name: "bookmark", size: 12 }), d.framework), /* @__PURE__ */ React.createElement("h3", { className: "dc-hook t-h3" }, d.hook), /* @__PURE__ */ React.createElement("div", { className: `dc-caption ${expanded ? "open" : ""}` }, d.caption.split("\n").map((l, i) => l.trim() ? /* @__PURE__ */ React.createElement("p", { key: i }, l) : /* @__PURE__ */ React.createElement("div", { key: i, className: "dc-gap" }))), /* @__PURE__ */ React.createElement("button", { className: "dc-more", onClick: () => setExpanded((e) => !e) }, expanded ? "Show less" : "Show caption", " ", /* @__PURE__ */ React.createElement(Icon, { name: expanded ? "chevronDown" : "chevronRight", size: 13, style: { transform: expanded ? "rotate(180deg)" : "none" } })), /* @__PURE__ */ React.createElement("div", { className: "dc-tags" }, d.hashtags.map((h) => /* @__PURE__ */ React.createElement("span", { key: h, className: "dc-tag" }, h))), /* @__PURE__ */ React.createElement("button", { className: "dc-gfx", onClick: () => onOpenCarousel(index), "aria-label": `Preview ${d.day} graphic` }, /* @__PURE__ */ React.createElement(GraphicCard, { data: d.graphic, watermark }), /* @__PURE__ */ React.createElement("span", { className: "dc-gfx-hint" }, /* @__PURE__ */ React.createElement(Icon, { name: "grid", size: 13 }), "Preview")), /* @__PURE__ */ React.createElement("div", { className: "dc-actions" }, /* @__PURE__ */ React.createElement("button", { className: "day-action", onClick: copy }, /* @__PURE__ */ React.createElement(Icon, { name: "copy", size: 15 }), "Copy"), /* @__PURE__ */ React.createElement("button", { className: "day-action", onClick: () => toast("Graphic downloaded") }, /* @__PURE__ */ React.createElement(Icon, { name: "download", size: 15 }), "Download"), /* @__PURE__ */ React.createElement(OpenInAI, { onPick: (k) => toast(`Sent to ${k}`) }), /* @__PURE__ */ React.createElement("button", { className: "day-action icon-only", onClick: doRegen, "aria-label": "Regenerate" }, /* @__PURE__ */ React.createElement(Icon, { name: "refresh", size: 15 }))));
}
function ResultScreen({ intent, setIntent, onHome, onAccount, onOpenCarousel, onUpgrade, watermark = true }) {
  const build = () => {
    try {
      if (window.buildElpromWeek) {
        const r = window.buildElpromWeek(intent || window.ELPROM_INTENT);
        window.ELPROM_CAROUSEL = r.carousel;
        return r.week;
      }
    } catch (e) {
    }
    return window.ELPROM_WEEK;
  };
  const [week, setWeek] = useStateR(build);
  const [count, setCount] = useStateR(0);
  const [generating, setGenerating] = useStateR(true);
  const [upsellGone, setUpsellGone] = useStateR(false);
  const run = () => {
    const fresh = build();
    setWeek(fresh);
    setCount(0);
    setGenerating(true);
    let i = 0;
    const tick = () => {
      i++;
      setCount(i);
      if (i >= fresh.length) {
        setGenerating(false);
        return;
      }
      setTimeout(tick, 240);
    };
    setTimeout(tick, 500);
  };
  useEffectR(() => {
    run();
  }, []);
  return /* @__PURE__ */ React.createElement("div", { className: "result-screen" }, /* @__PURE__ */ React.createElement(AppBar, { intent, setIntent, onHome, onAccount, onRegenAll: run, generating }), /* @__PURE__ */ React.createElement("div", { className: "result-scroll" }, /* @__PURE__ */ React.createElement("div", { className: "result-meta" }, /* @__PURE__ */ React.createElement("span", { className: "t-small text-2" }, generating ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", { className: "gen-pulse" }), "Building from proven frameworks\u2026") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Icon, { name: "check", size: 14, className: "text-accent", style: { verticalAlign: "-2px" } }), " 7 days \xB7 ready to post")), /* @__PURE__ */ React.createElement("span", { className: "result-week t-small text-3" }, "Jun 15\u201321")), /* @__PURE__ */ React.createElement("div", { className: `result-list ${generating ? "is-generating" : ""}` }, week.map((d, i) => /* @__PURE__ */ React.createElement(DayCard, { key: d.day, d, index: i, revealed: i < count, onOpenCarousel, watermark }))), !generating && watermark && !upsellGone && /* @__PURE__ */ React.createElement("div", { className: "upsell" }, /* @__PURE__ */ React.createElement("button", { className: "upsell-x", onClick: () => setUpsellGone(true), "aria-label": "Dismiss" }, /* @__PURE__ */ React.createElement(Icon, { name: "x", size: 15 })), /* @__PURE__ */ React.createElement("div", { className: "upsell-body" }, /* @__PURE__ */ React.createElement("div", { className: "t-h3" }, "Posting more than once a week?"), /* @__PURE__ */ React.createElement("p", { className: "t-small text-2" }, "Go Pro for unlimited calendars, no watermark, your brand voice, and AI images.")), /* @__PURE__ */ React.createElement(Button, { size: "sm", onClick: onUpgrade, iconRight: "arrowRight" }, "Upgrade to Pro \u2014 $25/mo")), /* @__PURE__ */ React.createElement("div", { className: "result-foot" }, /* @__PURE__ */ React.createElement("div", { className: "attr-badge" }, /* @__PURE__ */ React.createElement(Icon, { name: "bolt", size: 13 }), "Made with ELPROM"), !watermark && /* @__PURE__ */ React.createElement("p", { className: "t-small text-3" }, /* @__PURE__ */ React.createElement("span", { className: "pro-badge" }, /* @__PURE__ */ React.createElement(Icon, { name: "bolt", size: 11 }), "Pro"), " Unlimited \xB7 watermark removed."))));
}
function CarouselModal({ startIndex = 0, onClose, watermark = true }) {
  const slides = window.ELPROM_CAROUSEL;
  const [i, setI] = useStateR(0);
  const [wm, setWm] = useStateR(watermark);
  const toast = useToast();
  const go = (n) => setI(Math.max(0, Math.min(slides.length - 1, n)));
  const startX = useRefR(0);
  return /* @__PURE__ */ React.createElement(Modal, { onClose, className: "carousel-modal" }, /* @__PURE__ */ React.createElement("div", { className: "cm-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "t-h3" }, "Carousel preview"), /* @__PURE__ */ React.createElement("div", { className: "t-small text-3" }, i + 1, " of ", slides.length, " slides")), /* @__PURE__ */ React.createElement("button", { className: "icon-btn", onClick: onClose, "aria-label": "Close" }, /* @__PURE__ */ React.createElement(Icon, { name: "x", size: 18 }))), /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "cm-stage",
      onTouchStart: (e) => startX.current = e.touches[0].clientX,
      onTouchEnd: (e) => {
        const dx = e.changedTouches[0].clientX - startX.current;
        if (dx < -40) go(i + 1);
        if (dx > 40) go(i - 1);
      }
    },
    /* @__PURE__ */ React.createElement("button", { className: "cm-nav left", onClick: () => go(i - 1), disabled: i === 0, "aria-label": "Previous" }, /* @__PURE__ */ React.createElement(Icon, { name: "chevronRight", size: 20, style: { transform: "rotate(180deg)" } })),
    /* @__PURE__ */ React.createElement("div", { className: "cm-slide-wrap" }, /* @__PURE__ */ React.createElement("div", { className: "cm-track", style: { transform: `translateX(${-i * 100}%)` } }, slides.map((s, idx) => /* @__PURE__ */ React.createElement("div", { className: "cm-slide", key: idx }, /* @__PURE__ */ React.createElement(GraphicCard, { data: s, watermark: wm, size: 1.15 }))))),
    /* @__PURE__ */ React.createElement("button", { className: "cm-nav right", onClick: () => go(i + 1), disabled: i === slides.length - 1, "aria-label": "Next" }, /* @__PURE__ */ React.createElement(Icon, { name: "chevronRight", size: 20 }))
  ), /* @__PURE__ */ React.createElement("div", { className: "cm-dots" }, slides.map((_, idx) => /* @__PURE__ */ React.createElement("button", { key: idx, className: `cm-dot ${idx === i ? "on" : ""}`, onClick: () => go(idx), "aria-label": `Slide ${idx + 1}` }))), /* @__PURE__ */ React.createElement("div", { className: "cm-foot" }, /* @__PURE__ */ React.createElement("button", { className: `cm-wm-toggle ${wm ? "" : "off"}`, onClick: () => {
    if (!watermark) {
      setWm((w) => !w);
    } else {
      toast("Removing the watermark is a Pro feature");
    }
  } }, /* @__PURE__ */ React.createElement(Icon, { name: wm ? "lock" : "check", size: 14 }), wm ? "Watermark on \xB7 Upgrade to remove" : "Watermark removed"), /* @__PURE__ */ React.createElement("div", { className: "cm-foot-actions" }, /* @__PURE__ */ React.createElement(Button, { variant: "ghost", size: "sm", icon: "share", onClick: () => toast("Share link copied") }, "Share"), /* @__PURE__ */ React.createElement(Button, { size: "sm", icon: "download", onClick: () => toast("Carousel downloaded") }, "Download"))));
}
Object.assign(window, { ResultScreen, CarouselModal });
