const { useState, useEffect, useMemo, useRef, useDeferredValue } = React;
function fmtBig(n) {
  if (n >= 1e5) return (n / 1e5).toFixed(1).replace(/\.0$/, "") + "L";
  if (n >= 1e3) return Math.round(n / 1e3) + "K";
  return String(n);
}
function Reveal({ children, delay = 0, className = "", tag = "div" }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSeen(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top < (window.innerHeight || 800) && r.bottom > 0) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    io.observe(el);
    const fallback = setTimeout(() => setSeen(true), 2e3);
    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);
  const Tag = tag;
  return /* @__PURE__ */ React.createElement(Tag, { ref, className: "reveal " + (seen ? "in " : "") + className, style: { transitionDelay: delay + "ms" } }, children);
}
function CountUp({ end, suffix = "", dur = 1200 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(end);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let started = false;
    const run = () => {
      if (started) return;
      started = true;
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        const e2 = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(end * e2));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const r = el.getBoundingClientRect();
    if (r.top < (window.innerHeight || 800) && r.bottom > 0) {
      run();
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          run();
          io.disconnect();
        }
      });
    }, { threshold: 0.5 });
    io.observe(el);
    const fallback = setTimeout(run, 2200);
    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, [end]);
  return /* @__PURE__ */ React.createElement("span", { ref }, val, suffix);
}
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const onClick = (e) => {
    e.stopPropagation();
    navigator.clipboard && navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  return /* @__PURE__ */ React.createElement("button", { className: "pa-btn pa-btn-ghost" + (copied ? " is-copied" : ""), onClick }, /* @__PURE__ */ React.createElement(Icon, { name: copied ? "check" : "copy", size: 15 }), copied ? "Copied" : "Copy");
}
function PromptCard({ prompt, category, index, onOpen }) {
  const blanks = prompt.prompt.match(/\[([A-Z0-9_ ]+)\]/g) || [];
  const count = new Set(blanks.map((b) => b.replace(/[\[\]]/g, "").trim())).size;
  return /* @__PURE__ */ React.createElement(Reveal, { delay: index % 9 * 55 }, /* @__PURE__ */ React.createElement("article", { className: "pa-card", onClick: () => onOpen(prompt) }, /* @__PURE__ */ React.createElement("div", { className: "pa-card-top" }, /* @__PURE__ */ React.createElement("span", { className: "pa-cat-chip" }, /* @__PURE__ */ React.createElement("span", { className: "pa-cat-chip-icon" }, /* @__PURE__ */ React.createElement(Icon, { name: category.id, size: 15 })), category.name), /* @__PURE__ */ React.createElement("span", { className: "pa-blanks-tag" }, /* @__PURE__ */ React.createElement(Icon, { name: "brackets", size: 12 }), " ", count)), /* @__PURE__ */ React.createElement("h3", { className: "pa-card-title" }, prompt.title), /* @__PURE__ */ React.createElement("p", { className: "pa-card-desc" }, prompt.desc), /* @__PURE__ */ React.createElement("div", { className: "pa-card-preview" }, /* @__PURE__ */ React.createElement("span", { className: "pa-card-preview-label" }, "PROMPT"), prompt.prompt), /* @__PURE__ */ React.createElement("div", { className: "pa-card-tags" }, prompt.tags.slice(0, 3).map((t) => /* @__PURE__ */ React.createElement("span", { key: t, className: "pa-tag" }, "#", t))), /* @__PURE__ */ React.createElement("div", { className: "pa-card-actions" }, /* @__PURE__ */ React.createElement("button", { className: "pa-btn pa-btn-primary", onClick: (e) => {
    e.stopPropagation();
    onOpen(prompt);
  } }, /* @__PURE__ */ React.createElement(Icon, { name: "wand", size: 15 }), " Customize"), /* @__PURE__ */ React.createElement(CopyButton, { text: prompt.prompt }))));
}
function CategoryBar({ categories, counts, active, onSelect }) {
  return /* @__PURE__ */ React.createElement("div", { className: "pa-catbar" }, /* @__PURE__ */ React.createElement("div", { className: "pa-catbar-inner" }, categories.map((c) => /* @__PURE__ */ React.createElement("button", { key: c.id, className: "pa-pill" + (active === c.id ? " is-active" : ""), onClick: () => onSelect(c.id) }, /* @__PURE__ */ React.createElement(Icon, { name: c.id, size: 15, className: "pa-pill-icon" }), /* @__PURE__ */ React.createElement("span", null, c.name), /* @__PURE__ */ React.createElement("span", { className: "pa-pill-count" }, fmtBig(counts[c.id] || 0))))));
}
function Hero({ query, setQuery, totalLabel }) {
  const chips = ["Free forever", "No login", "Hinglish-friendly", "\u20B90"];
  return /* @__PURE__ */ React.createElement("header", { className: "pa-hero" }, /* @__PURE__ */ React.createElement("div", { className: "pa-aurora" }, /* @__PURE__ */ React.createElement("span", { className: "pa-aurora-a" }), /* @__PURE__ */ React.createElement("span", { className: "pa-aurora-b" }), /* @__PURE__ */ React.createElement("span", { className: "pa-aurora-c" })), /* @__PURE__ */ React.createElement("div", { className: "pa-hero-inner" }, /* @__PURE__ */ React.createElement("div", { className: "pa-hero-copy" }, /* @__PURE__ */ React.createElement("span", { className: "pa-eyebrow" }, /* @__PURE__ */ React.createElement(Icon, { name: "spark", size: 13 }), " ", /* @__PURE__ */ React.createElement("strong", { style: { fontWeight: 700 } }, totalLabel, "+"), "\xA0free prompts \xB7 no sign-up"), /* @__PURE__ */ React.createElement("h1", { className: "pa-hero-title" }, "Stop fighting with AI.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { className: "pa-hero-title-2" }, "Just copy a prompt that works.")), /* @__PURE__ */ React.createElement("p", { className: "pa-hero-sub" }, "A free library of fill-in-the-blank AI prompts for India's creators and small businesses. Pick one, add your details, copy, paste into ChatGPT, Claude or Gemini. That's the whole thing."), /* @__PURE__ */ React.createElement("div", { className: "pa-search" }, /* @__PURE__ */ React.createElement("span", { className: "pa-search-icon" }, /* @__PURE__ */ React.createElement(Icon, { name: "search", size: 20 })), /* @__PURE__ */ React.createElement(
    "input",
    {
      className: "pa-search-input",
      value: query,
      onChange: (e) => setQuery(e.target.value),
      placeholder: 'Search "Reel hook", "Diwali sale", "caption"...'
    }
  ), query ? /* @__PURE__ */ React.createElement("button", { className: "pa-search-clear", onClick: () => setQuery(""), "aria-label": "Clear" }, /* @__PURE__ */ React.createElement(Icon, { name: "close", size: 13 })) : /* @__PURE__ */ React.createElement("kbd", { className: "pa-search-kbd" }, totalLabel, "+")), /* @__PURE__ */ React.createElement("div", { className: "pa-trust" }, chips.map((c, i) => /* @__PURE__ */ React.createElement("span", { key: c, className: "pa-trust-chip" }, /* @__PURE__ */ React.createElement(Icon, { name: TRUST_ICON[i], size: 14 }), c)))), /* @__PURE__ */ React.createElement("div", { className: "pa-hero-demo" }, /* @__PURE__ */ React.createElement(HeroDemo, null))));
}
function Stats() {
  const items = [
    { n: window.PA.VIRTUAL_TOTAL, s: "+", label: "ready-to-use prompts" },
    { n: 16, s: "", label: "creator categories" },
    { n: 0, s: "", label: "logins or sign-ups" },
    { n: 0, s: "", label: "rupees, forever", prefix: "\u20B9" }
  ];
  return /* @__PURE__ */ React.createElement(Reveal, null, /* @__PURE__ */ React.createElement("div", { className: "pa-stats" }, items.map((it, i) => /* @__PURE__ */ React.createElement("div", { className: "pa-stat", key: i }, /* @__PURE__ */ React.createElement("span", { className: "pa-stat-n" }, it.prefix || "", /* @__PURE__ */ React.createElement(CountUp, { end: it.n, suffix: it.s })), /* @__PURE__ */ React.createElement("span", { className: "pa-stat-l" }, it.label)))));
}
function HowItWorks({ steps }) {
  return /* @__PURE__ */ React.createElement("section", { className: "pa-section pa-section-tint", id: "how" }, /* @__PURE__ */ React.createElement(Reveal, null, /* @__PURE__ */ React.createElement("div", { className: "pa-section-head" }, /* @__PURE__ */ React.createElement("span", { className: "pa-kicker" }, "The flow"), /* @__PURE__ */ React.createElement("h2", { className: "pa-section-title" }, "From blank page to posted in four steps"), /* @__PURE__ */ React.createElement("p", { className: "pa-section-sub" }, "No prompt-engineering degree required."))), /* @__PURE__ */ React.createElement("div", { className: "pa-steps" }, steps.map((s, i) => /* @__PURE__ */ React.createElement(Reveal, { key: i, delay: i * 80 }, /* @__PURE__ */ React.createElement("div", { className: "pa-step" }, /* @__PURE__ */ React.createElement("div", { className: "pa-step-num" }, "0", i + 1), /* @__PURE__ */ React.createElement("div", { className: "pa-step-icon" }, /* @__PURE__ */ React.createElement(Icon, { name: STEP_ICON[i], size: 22 })), /* @__PURE__ */ React.createElement("h3", { className: "pa-step-title" }, s.title), /* @__PURE__ */ React.createElement("p", { className: "pa-step-text" }, s.text))))));
}
function Tools({ tools }) {
  return /* @__PURE__ */ React.createElement("section", { className: "pa-section", id: "tools" }, /* @__PURE__ */ React.createElement(Reveal, null, /* @__PURE__ */ React.createElement("div", { className: "pa-section-head" }, /* @__PURE__ */ React.createElement("span", { className: "pa-kicker" }, "The kit"), /* @__PURE__ */ React.createElement("h2", { className: "pa-section-title" }, "Tools we'd actually recommend"), /* @__PURE__ */ React.createElement("p", { className: "pa-section-sub" }, "Everything you need to make, sell, and grow."))), /* @__PURE__ */ React.createElement("div", { className: "pa-tools" }, tools.map((t, i) => /* @__PURE__ */ React.createElement(Reveal, { key: t.name, delay: i % 3 * 70 }, /* @__PURE__ */ React.createElement("a", { className: "pa-tool", href: t.url, target: "_blank", rel: "noopener noreferrer" }, /* @__PURE__ */ React.createElement("div", { className: "pa-tool-icon" }, /* @__PURE__ */ React.createElement(Icon, { name: TOOL_ICON[t.name] || "spark", size: 22 })), /* @__PURE__ */ React.createElement("div", { className: "pa-tool-main" }, /* @__PURE__ */ React.createElement("div", { className: "pa-tool-top" }, /* @__PURE__ */ React.createElement("span", { className: "pa-tool-name" }, t.name), /* @__PURE__ */ React.createElement("span", { className: "pa-tool-badge" }, t.badge)), /* @__PURE__ */ React.createElement("p", { className: "pa-tool-blurb" }, t.blurb)), /* @__PURE__ */ React.createElement("span", { className: "pa-tool-arrow" }, /* @__PURE__ */ React.createElement(Icon, { name: "arrowUpRight", size: 16 })))))), /* @__PURE__ */ React.createElement("p", { className: "pa-tools-note" }, "Some links are affiliate links \u2014 they keep PromptUndo free forever, at no cost to you."));
}
function Footer() {
  return /* @__PURE__ */ React.createElement("footer", { className: "pa-footer" }, /* @__PURE__ */ React.createElement("div", { className: "pa-footer-inner" }, /* @__PURE__ */ React.createElement("div", { className: "pa-footer-brand" }, /* @__PURE__ */ React.createElement("div", { className: "pa-logo" }, /* @__PURE__ */ React.createElement("span", { className: "pa-logo-mark" }, /* @__PURE__ */ React.createElement(Icon, { name: "spark", size: 16 })), " PromptUndo"), /* @__PURE__ */ React.createElement("p", { className: "pa-footer-mission" }, "A free, forever-open library of AI prompts for India's creators and small businesses.")), /* @__PURE__ */ React.createElement("div", { className: "pa-footer-col" }, /* @__PURE__ */ React.createElement("span", { className: "pa-footer-h" }, "Explore"), /* @__PURE__ */ React.createElement("a", { href: "#top" }, "All prompts"), /* @__PURE__ */ React.createElement("a", { href: "#how" }, "How it works"), /* @__PURE__ */ React.createElement("a", { href: "#tools" }, "Tools")), /* @__PURE__ */ React.createElement("div", { className: "pa-footer-col" }, /* @__PURE__ */ React.createElement("span", { className: "pa-footer-h" }, "The promise"), /* @__PURE__ */ React.createElement("span", { className: "pa-footer-promise" }, /* @__PURE__ */ React.createElement(Icon, { name: "infinity", size: 15 }), " Free forever"), /* @__PURE__ */ React.createElement("span", { className: "pa-footer-promise" }, /* @__PURE__ */ React.createElement(Icon, { name: "shield", size: 15 }), " No sign-up, no email wall"), /* @__PURE__ */ React.createElement("span", { className: "pa-footer-promise" }, /* @__PURE__ */ React.createElement(TriFlag, { w: 17 }), " Made in India"))), /* @__PURE__ */ React.createElement("div", { className: "pa-footer-bar" }, "\xA9 2026 PromptUndo \xB7 Copy, fill, paste, done."));
}
function App() {
  const pa = window.PA || {};
  const CATEGORIES = pa.CATEGORIES || [];
  const PROMPTS = pa.PROMPTS || [];
  const BLUEPRINTS = pa.BLUEPRINTS || [];
  const NICHES = pa.NICHES || [];
  const HINTS = pa.HINTS || {};
  const TOOLS = pa.TOOLS || [];
  const STEPS = pa.STEPS || [];
  const VIRTUAL_TOTAL = pa.VIRTUAL_TOTAL || PROMPTS.length;
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const [openPrompt, setOpenPrompt] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const PAGE = 60;
  const [limit, setLimit] = useState(PAGE);
  const TIP_UPI = "vaibhavvarunmr@okicici";
  const TIP_PHONE = "9745340983";
  const TIP_PRESETS = [10, 20, 30];
  const [tipPhase, setTipPhase] = useState("idle");
  const [tipSel, setTipSel] = useState(20);
  const [tipCustom, setTipCustom] = useState("");
  const [tipCoins, setTipCoins] = useState([]);
  const [tipCopied, setTipCopied] = useState("");
  const tipAmount = tipCustom ? parseInt(tipCustom, 10) || 0 : tipSel;
  function makeTipCoins() {
    return Array.from({ length: 34 }, (_, i) => ({
      id: i,
      x: 2 + Math.random() * 94,
      size: 36 + Math.random() * 28,
      dur: 1.5 + Math.random() * 1.8,
      delay: Math.random() * 2.4,
      r: (Math.random() > 0.5 ? 1 : -1) * (280 + Math.random() * 440),
      drift: (Math.random() - 0.5) * 130,
      type: Math.random() > 0.72 ? "star" : "coin"
    }));
  }
  function tipPay() {
    if (tipAmount < 1) return;
    try {
      localStorage.setItem("pa_tip", JSON.stringify({ amt: tipAmount, ts: Date.now() }));
    } catch (e) {
    }
    window.location.href = "upi://pay?pa=" + TIP_UPI + "&pn=PromptUndo&am=" + tipAmount + "&cu=INR&tn=Tip%20for%20PromptUndo";
  }
  function tipCopyText(text, key) {
    if (navigator.clipboard) navigator.clipboard.writeText(text);
    setTipCopied(key);
    setTimeout(() => setTipCopied(""), 1800);
  }
  const totalLabel = fmtBig(VIRTUAL_TOTAL);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    function checkReturn() {
      if (document.visibilityState !== "visible") return;
      let raw;
      try {
        raw = localStorage.getItem("pa_tip");
      } catch (e) {
        return;
      }
      if (!raw) return;
      try {
        const { amt, ts } = JSON.parse(raw);
        localStorage.removeItem("pa_tip");
        if (Date.now() - ts < 6e5) {
          setTipSel(amt);
          setTipCoins(makeTipCoins());
          setTipPhase("celebrate");
        }
      } catch (e) {
        try {
          localStorage.removeItem("pa_tip");
        } catch (e2) {
        }
      }
    }
    checkReturn();
    document.addEventListener("visibilitychange", checkReturn);
    return () => document.removeEventListener("visibilitychange", checkReturn);
  }, []);
  const catMap = useMemo(() => {
    const m = {};
    CATEGORIES.forEach((c) => m[c.id] = c);
    return m;
  }, []);
  const counts = useMemo(() => {
    const bpPerCat = {};
    BLUEPRINTS.forEach((bp) => {
      bpPerCat[bp.cat] = (bpPerCat[bp.cat] || 0) + 1;
    });
    const c = { all: VIRTUAL_TOTAL };
    PROMPTS.forEach((p) => {
      c[p.cat] = (c[p.cat] || 0) + 1;
    });
    CATEGORIES.forEach((cat) => {
      if (cat.id === "all") return;
      c[cat.id] = (c[cat.id] || 0) + (bpPerCat[cat.id] || 0) * NICHES.length;
    });
    return c;
  }, []);
  const authoredIndex = useMemo(() => {
    const hints = HINTS || {};
    const re = /\[([A-Z0-9_ ]+)\]/g;
    return PROMPTS.map((p) => {
      const title = p.title.toLowerCase();
      const tags = p.tags.join(" ").toLowerCase();
      let hintText = "";
      const seen = /* @__PURE__ */ new Set();
      let m;
      re.lastIndex = 0;
      while ((m = re.exec(p.prompt)) !== null) {
        const tok = m[1];
        if (seen.has(tok)) continue;
        seen.add(tok);
        const h = hints[tok];
        if (h && h.hint) hintText += " " + h.hint;
      }
      const hay = title + " " + p.desc.toLowerCase() + " " + tags + " " + p.prompt.toLowerCase() + " " + hintText.toLowerCase();
      return { p, title, tags, hay };
    });
  }, []);
  const bpIndex = useMemo(() => BLUEPRINTS.map((bp) => ({
    bp,
    hay: (bp.title + " " + bp.desc + " " + bp.body + " " + bp.tags.join(" ")).toLowerCase(),
    title: bp.title.toLowerCase(),
    tags: bp.tags.join(" ").toLowerCase()
  })), []);
  const deferredQuery = useDeferredValue(query);
  const { authoredFiltered, matchedBPs, effectiveNiches } = useMemo(() => {
    const words = deferredQuery.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const af = [];
    for (const it of authoredIndex) {
      if (activeCat !== "all" && it.p.cat !== activeCat) continue;
      if (!words.length) {
        af.push({ p: it.p, s: 0 });
        continue;
      }
      let ok = true;
      for (const w of words) {
        if (!it.hay.includes(w)) {
          ok = false;
          break;
        }
      }
      if (!ok) continue;
      let s = 0;
      for (const w of words) {
        if (it.title.includes(w)) s += 3;
        if (it.tags.includes(w)) s += 2;
      }
      af.push({ p: it.p, s });
    }
    if (words.length) af.sort((a, b) => b.s - a.s);
    const bps = [];
    for (const it of bpIndex) {
      if (activeCat !== "all" && it.bp.cat !== activeCat) continue;
      if (!words.length) {
        bps.push(it.bp);
        continue;
      }
      let ok = true;
      for (const w of words) {
        if (!it.hay.includes(w)) {
          ok = false;
          break;
        }
      }
      if (ok) bps.push(it.bp);
    }
    let effectiveNiches2;
    if (!words.length) {
      effectiveNiches2 = NICHES;
    } else {
      const hits = NICHES.filter((n) => words.some(
        (w) => n[1].toLowerCase().includes(w) || n[2].toLowerCase().includes(w)
      ));
      effectiveNiches2 = hits.length > 0 ? hits : NICHES;
    }
    return { authoredFiltered: af, matchedBPs: bps, effectiveNiches: effectiveNiches2 };
  }, [deferredQuery, activeCat, authoredIndex, bpIndex]);
  useEffect(() => {
    setLimit(PAGE);
  }, [deferredQuery, activeCat]);
  const totalFiltered = authoredFiltered.length + matchedBPs.length * effectiveNiches.length;
  const stale = query !== deferredQuery;
  const visible = useMemo(() => {
    const result = [];
    for (const { p } of authoredFiltered) {
      if (result.length >= limit) break;
      result.push(p);
    }
    let remaining = limit - result.length;
    let done = false;
    for (let bi = 0; bi < matchedBPs.length && !done; bi++) {
      const bp = matchedBPs[bi];
      for (let ni = 0; ni < effectiveNiches.length && !done; ni++) {
        const n = effectiveNiches[ni];
        if (remaining <= 0) {
          done = true;
          break;
        }
        result.push({
          id: "vbp-" + bp.id + "-" + n[0],
          cat: bp.cat,
          title: bp.title + " \u2014 " + n[1],
          desc: bp.desc.replace(/\{NAME\}/g, n[1]).replace(/\{LABEL\}/g, n[2]).replace(/\{AUD\}/g, n[3]),
          prompt: bp.body.replace(/\{NAME\}/g, n[1]).replace(/\{LABEL\}/g, n[2]).replace(/\{AUD\}/g, n[3]),
          tags: bp.tags.concat([n[0]])
        });
        remaining--;
      }
    }
    return result;
  }, [authoredFiltered, matchedBPs, effectiveNiches, limit]);
  return /* @__PURE__ */ React.createElement("div", { id: "top" }, /* @__PURE__ */ React.createElement("nav", { className: "pa-nav" + (scrolled ? " is-scrolled" : "") }, /* @__PURE__ */ React.createElement("div", { className: "pa-nav-inner" }, /* @__PURE__ */ React.createElement("div", { className: "pa-logo" }, /* @__PURE__ */ React.createElement("span", { className: "pa-logo-mark" }, /* @__PURE__ */ React.createElement(Icon, { name: "spark", size: 16 })), " PromptUndo"), /* @__PURE__ */ React.createElement("div", { className: "pa-nav-links" }, /* @__PURE__ */ React.createElement("a", { href: "#how" }, "How it works"), /* @__PURE__ */ React.createElement("a", { href: "#tools" }, "Tools"), /* @__PURE__ */ React.createElement("button", { className: "tip-nav-btn", onClick: () => setTipPhase("open") }, "\u2764\uFE0F Donate"), /* @__PURE__ */ React.createElement("span", { className: "pa-nav-free" }, /* @__PURE__ */ React.createElement(Icon, { name: "infinity", size: 13 }), " Free forever")))), /* @__PURE__ */ React.createElement(Hero, { query, setQuery, totalLabel }), /* @__PURE__ */ React.createElement(Stats, null), /* @__PURE__ */ React.createElement(CategoryBar, { categories: CATEGORIES, counts, active: activeCat, onSelect: setActiveCat }), /* @__PURE__ */ React.createElement("main", { className: "pa-main" }, /* @__PURE__ */ React.createElement("div", { className: "pa-results-bar" }, /* @__PURE__ */ React.createElement("span", { className: "pa-results-count" }, /* @__PURE__ */ React.createElement("strong", null, totalFiltered > 9999 ? fmtBig(totalFiltered) + "+" : totalFiltered), " ", totalFiltered === 1 ? "prompt" : "prompts", activeCat !== "all" && /* @__PURE__ */ React.createElement("span", { className: "pa-results-cat" }, " in ", catMap[activeCat].name), query && /* @__PURE__ */ React.createElement("span", { className: "pa-results-cat" }, ' for "', query, '"'))), totalFiltered === 0 ? /* @__PURE__ */ React.createElement("div", { className: "pa-empty" }, /* @__PURE__ */ React.createElement("div", { className: "pa-empty-icon" }, /* @__PURE__ */ React.createElement(Icon, { name: "search", size: 26 })), /* @__PURE__ */ React.createElement("h3", { className: "pa-empty-title" }, "No prompts match that yet"), /* @__PURE__ */ React.createElement("p", { className: "pa-empty-text" }, "Try a broader keyword \u2014 or browse all 16 categories."), /* @__PURE__ */ React.createElement("button", { className: "pa-btn pa-btn-primary", onClick: () => {
    setQuery("");
    setActiveCat("all");
  } }, /* @__PURE__ */ React.createElement(Icon, { name: "all", size: 15 }), " Show all prompts")) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "pa-grid", style: { opacity: stale ? 0.55 : 1, transition: "opacity .15s ease" } }, visible.map((p, i) => /* @__PURE__ */ React.createElement(PromptCard, { key: p.id, prompt: p, category: catMap[p.cat], index: i, onOpen: setOpenPrompt }))), totalFiltered > limit && /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginTop: 28 } }, /* @__PURE__ */ React.createElement(
    "button",
    {
      className: "pa-btn pa-btn-ghost",
      style: { display: "inline-flex", flex: "none", padding: "0 22px" },
      onClick: () => setLimit((l) => l + PAGE)
    },
    /* @__PURE__ */ React.createElement(Icon, { name: "layers", size: 15 }),
    " Show more"
  )))), /* @__PURE__ */ React.createElement(HowItWorks, { steps: STEPS }), /* @__PURE__ */ React.createElement(Tools, { tools: TOOLS }), /* @__PURE__ */ React.createElement(Footer, null), openPrompt && /* @__PURE__ */ React.createElement(CustomizeModal, { prompt: openPrompt, category: catMap[openPrompt.cat], onClose: () => setOpenPrompt(null) }), tipPhase === "open" && /* @__PURE__ */ React.createElement("div", { className: "tip-backdrop", onClick: () => setTipPhase("idle") }, /* @__PURE__ */ React.createElement("div", { className: "tip-card", onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("button", { className: "tip-close", onClick: () => setTipPhase("idle") }, "\u2715"), /* @__PURE__ */ React.createElement("div", { className: "tip-header" }, /* @__PURE__ */ React.createElement("span", { className: "tip-emoji" }, "\u2615"), /* @__PURE__ */ React.createElement("h2", null, "Buy me a chai"), /* @__PURE__ */ React.createElement("p", null, "PromptUndo is free forever. If it saved you time, a small tip keeps it alive!")), /* @__PURE__ */ React.createElement("p", { className: "tip-pick-label" }, "Pick an amount"), /* @__PURE__ */ React.createElement("div", { className: "tip-amounts" }, TIP_PRESETS.map((p) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: p,
      className: "tip-amount-btn" + (tipSel === p && !tipCustom ? " is-active" : ""),
      onClick: () => {
        setTipSel(p);
        setTipCustom("");
      }
    },
    "\u20B9",
    p
  ))), /* @__PURE__ */ React.createElement("div", { className: "tip-custom" }, /* @__PURE__ */ React.createElement("span", { className: "tip-rupee" }, "\u20B9"), /* @__PURE__ */ React.createElement(
    "input",
    {
      className: "tip-custom-input",
      type: "number",
      min: "1",
      step: "1",
      placeholder: "Custom amount",
      value: tipCustom,
      onChange: (e) => setTipCustom(e.target.value.replace(/\D/g, ""))
    }
  )), /* @__PURE__ */ React.createElement("button", { className: "tip-pay-btn", onClick: tipPay, disabled: tipAmount < 1 }, "\u{1F389} Buy Happiness \u2014 \u20B9", tipAmount || "\u2014"), /* @__PURE__ */ React.createElement("div", { className: "tip-upi-row" }, /* @__PURE__ */ React.createElement("div", { className: "tip-upi-box" }, /* @__PURE__ */ React.createElement("span", { className: "tip-upi-label" }, "UPI ID"), /* @__PURE__ */ React.createElement("span", { className: "tip-upi-value" }, TIP_UPI), /* @__PURE__ */ React.createElement("button", { className: "tip-copy-btn", onClick: () => tipCopyText(TIP_UPI, "upi") }, tipCopied === "upi" ? "\u2713 Copied" : "Copy")), /* @__PURE__ */ React.createElement("div", { className: "tip-upi-box" }, /* @__PURE__ */ React.createElement("span", { className: "tip-upi-label" }, "GPay / PhonePe"), /* @__PURE__ */ React.createElement("span", { className: "tip-upi-value" }, TIP_PHONE), /* @__PURE__ */ React.createElement("button", { className: "tip-copy-btn", onClick: () => tipCopyText(TIP_PHONE, "phone") }, tipCopied === "phone" ? "\u2713 Copied" : "Copy"))), /* @__PURE__ */ React.createElement("p", { className: "tip-fine" }, "Tap the button \u2192 UPI opens \u2192 pay \u2192 come back here for a surprise \u{1F38A}"))), tipPhase === "celebrate" && /* @__PURE__ */ React.createElement("div", { className: "tip-celebration", onClick: () => setTipPhase("idle") }, tipCoins.map((c) => /* @__PURE__ */ React.createElement(
    "span",
    {
      key: c.id,
      className: "tip-particle" + (c.type === "star" ? " is-star" : ""),
      style: {
        left: c.x + "%",
        "--size": c.size + "px",
        "--dur": c.dur + "s",
        "--delay": c.delay + "s",
        "--r": c.r + "deg",
        "--drift": c.drift + "px"
      }
    },
    c.type === "star" ? "\u2726" : "\u20B9"
  )), /* @__PURE__ */ React.createElement("div", { className: "tip-thankyou" }, /* @__PURE__ */ React.createElement("span", { className: "tip-big-heart" }, "\u2764\uFE0F"), /* @__PURE__ */ React.createElement("h2", null, "You're incredible!"), /* @__PURE__ */ React.createElement("p", { className: "tip-sent" }, "\u20B9", tipAmount, " received \xB7 Thank you \u{1F64F}"), /* @__PURE__ */ React.createElement("p", { className: "tip-sub-msg" }, "This keeps PromptUndo free for everyone in India"), /* @__PURE__ */ React.createElement("button", { className: "tip-dismiss", onClick: (e) => {
    e.stopPropagation();
    setTipPhase("idle");
  } }, "Keep exploring prompts \u2192"))));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));
