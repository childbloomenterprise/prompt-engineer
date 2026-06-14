const { useState: useStateF, useEffect: useEffectF, useRef: useRefF } = React;
function GraphicCard({ data, watermark = true, size = 1, slide = false }) {
  const s = (v) => v * size;
  return /* @__PURE__ */ React.createElement("div", { className: "gfx", style: { fontSize: s(16) } }, /* @__PURE__ */ React.createElement("div", { className: "gfx-mesh" }), /* @__PURE__ */ React.createElement("div", { className: "gfx-inner" }, data.num && /* @__PURE__ */ React.createElement("div", { className: "gfx-num" }, data.num), data.kicker && /* @__PURE__ */ React.createElement("div", { className: "gfx-kicker" }, data.kicker), /* @__PURE__ */ React.createElement("div", { className: `gfx-title ${data.cta ? "gfx-cta" : ""}` }, (data.title || data.big || "").split("\n").map((l, i) => /* @__PURE__ */ React.createElement("span", { key: i }, l))), data.small && /* @__PURE__ */ React.createElement("div", { className: "gfx-small" }, data.small), (data.footer || data.foot) && /* @__PURE__ */ React.createElement("div", { className: "gfx-foot" }, data.footer || data.foot)), watermark && /* @__PURE__ */ React.createElement("div", { className: "gfx-wm" }, /* @__PURE__ */ React.createElement("span", { className: "gfx-wm-dot" }), "Made with ELPROM"));
}
function PhoneFrame({ children, statusDark = false, className = "", scale }) {
  return /* @__PURE__ */ React.createElement("div", { className: `phone ${className}`, style: scale ? { transform: `scale(${scale})` } : void 0 }, /* @__PURE__ */ React.createElement("div", { className: "phone-bezel" }, /* @__PURE__ */ React.createElement("div", { className: "phone-island" }), /* @__PURE__ */ React.createElement("div", { className: `phone-status ${statusDark ? "dark" : ""}` }, /* @__PURE__ */ React.createElement("span", { className: "ps-time" }, "9:41"), /* @__PURE__ */ React.createElement("span", { className: "ps-right" }, /* @__PURE__ */ React.createElement("svg", { width: "18", height: "11", viewBox: "0 0 18 11", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("rect", { x: "0", y: "3", width: "3", height: "8", rx: "1", fill: "currentColor" }), /* @__PURE__ */ React.createElement("rect", { x: "5", y: "1.5", width: "3", height: "9.5", rx: "1", fill: "currentColor" }), /* @__PURE__ */ React.createElement("rect", { x: "10", y: "0", width: "3", height: "11", rx: "1", fill: "currentColor", opacity: ".4" }), /* @__PURE__ */ React.createElement("rect", { x: "15", y: "0", width: "3", height: "11", rx: "1", fill: "currentColor", opacity: ".4" })), /* @__PURE__ */ React.createElement("svg", { width: "16", height: "11", viewBox: "0 0 16 11", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("path", { d: "M8 2.5C10.2 2.5 12.2 3.4 13.6 4.8L15 3.4C13.2 1.6 10.7 .5 8 .5S2.8 1.6 1 3.4l1.4 1.4C3.8 3.4 5.8 2.5 8 2.5z", fill: "currentColor" }), /* @__PURE__ */ React.createElement("path", { d: "M8 6c1.1 0 2.1.5 2.8 1.2L8 10 5.2 7.2C5.9 6.5 6.9 6 8 6z", fill: "currentColor" })), /* @__PURE__ */ React.createElement("svg", { width: "25", height: "12", viewBox: "0 0 25 12", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("rect", { x: "1", y: "1", width: "20", height: "10", rx: "3", fill: "none", stroke: "currentColor", strokeOpacity: ".5" }), /* @__PURE__ */ React.createElement("rect", { x: "2.5", y: "2.5", width: "15", height: "7", rx: "1.5", fill: "currentColor" }), /* @__PURE__ */ React.createElement("rect", { x: "22.5", y: "4", width: "1.5", height: "4", rx: ".75", fill: "currentColor", opacity: ".5" })))), /* @__PURE__ */ React.createElement("div", { className: "phone-screen" }, children), /* @__PURE__ */ React.createElement("div", { className: "phone-home" })));
}
function HeroDevice() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const formats = ["Carousel", "Reel", "Carousel", "Story", "Carousel", "Reel", "Carousel"];
  const hooks = [
    "Stop validating. Start selling.",
    "$0 \u2192 $4k MRR in 38 days",
    "5 hard truths about customer #1",
    "\u201340% churn from one email",
    "6 pages. The ugliest won.",
    "\u201CRaise money\u201D is bad advice",
    "Week 6: what worked"
  ];
  const [phase, setPhase] = useStateF(0);
  useEffectF(() => {
    const t1 = setTimeout(() => setPhase(1), 900);
    const t2 = setTimeout(() => setPhase(2), 2100);
    const loop = setInterval(() => {
      setPhase(0);
      setTimeout(() => setPhase(1), 900);
      setTimeout(() => setPhase(2), 2100);
    }, 9e3);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearInterval(loop);
    };
  }, []);
  return /* @__PURE__ */ React.createElement("div", { className: "hero-device-wrap" }, /* @__PURE__ */ React.createElement(PhoneFrame, { statusDark: false, className: "hero-phone" }, /* @__PURE__ */ React.createElement("div", { className: "hd-screen" }, /* @__PURE__ */ React.createElement("div", { className: "hd-top" }, /* @__PURE__ */ React.createElement("div", { className: "hd-bar" }, /* @__PURE__ */ React.createElement(Icon, { name: "sparkle", size: 15, className: "text-accent" }), /* @__PURE__ */ React.createElement("span", { className: "hd-intent" }, phase === 0 ? /* @__PURE__ */ React.createElement("span", { className: "hd-caret" }, "Grow my founder audience") : "Grow my founder audience")), /* @__PURE__ */ React.createElement("div", { className: `hd-gen ${phase === 1 ? "on" : ""}` }, phase === 1 ? "Generating your week\u2026" : "7 days \xB7 ready to post")), /* @__PURE__ */ React.createElement("div", { className: "hd-grid" }, days.map((d, i) => /* @__PURE__ */ React.createElement("div", { key: d, className: `hd-card ${phase === 2 ? "in" : ""} ${phase === 1 ? "load" : ""}`, style: { transitionDelay: `${i * 70}ms` } }, /* @__PURE__ */ React.createElement("div", { className: "hd-card-head" }, /* @__PURE__ */ React.createElement("span", { className: "hd-day" }, d), /* @__PURE__ */ React.createElement("span", { className: `hd-fmt hd-fmt-${formats[i].toLowerCase()}` }, formats[i])), phase === 1 ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "hd-sk", style: { width: "86%" } }), /* @__PURE__ */ React.createElement("div", { className: "hd-sk", style: { width: "60%" } })) : /* @__PURE__ */ React.createElement("div", { className: "hd-hook" }, hooks[i])))))), /* @__PURE__ */ React.createElement("div", { className: "hero-glow" }));
}
Object.assign(window, { GraphicCard, PhoneFrame, HeroDevice });
