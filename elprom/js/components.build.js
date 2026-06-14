const { useState, useRef, useEffect, useCallback, createContext, useContext } = React;
const P = (d, extra = {}) => React.createElement("path", { d, fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", ...extra });
const ICONS = {
  arrowRight: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("line", { x1: "4", y1: "12", x2: "19", y2: "12", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round" }), P("M13 6l6 6-6 6")),
  sparkle: P("M12 3l1.6 4.7L18 9l-4.4 1.3L12 15l-1.6-4.7L6 9l4.4-1.3z"),
  wand: /* @__PURE__ */ React.createElement(React.Fragment, null, P("M5 19l9-9"), P("M14 5l1 2 2 1-2 1-1 2-1-2-2-1 2-1z")),
  copy: /* @__PURE__ */ React.createElement(React.Fragment, null, P("M9 9h9v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9z"), P("M5 15H4a1 1 0 0 1-1-1V5a2 2 0 0 1 2-2h8a1 1 0 0 1 1 1v1")),
  download: /* @__PURE__ */ React.createElement(React.Fragment, null, P("M12 4v10"), P("M8 11l4 4 4-4"), P("M5 19h14")),
  refresh: /* @__PURE__ */ React.createElement(React.Fragment, null, P("M4 12a8 8 0 0 1 13.7-5.6L20 8"), P("M20 4v4h-4"), P("M20 12a8 8 0 0 1-13.7 5.6L4 16"), P("M4 20v-4h4")),
  share: /* @__PURE__ */ React.createElement(React.Fragment, null, P("M14 9l6-5v16l-6-5H6a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2z")),
  chevronDown: P("M6 9l6 6 6-6"),
  chevronRight: P("M9 6l6 6-6 6"),
  check: P("M5 12l5 5 9-11"),
  lock: /* @__PURE__ */ React.createElement(React.Fragment, null, P("M6 11h12v8H6z"), P("M9 11V8a3 3 0 0 1 6 0v3")),
  sun: /* @__PURE__ */ React.createElement(React.Fragment, null, P("M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"), P("M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19")),
  moon: P("M20 14.5A8 8 0 0 1 9.5 4a7 7 0 1 0 10.5 10.5z"),
  plus: P("M12 5v14M5 12h14"),
  x: P("M6 6l12 12M18 6L6 18"),
  calendar: /* @__PURE__ */ React.createElement(React.Fragment, null, P("M5 7h14v13H5z"), P("M5 11h14"), P("M9 4v3M15 4v3")),
  bolt: P("M13 3L5 13h5l-1 8 8-11h-5z"),
  heart: P("M12 20s-7-4.4-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.6-7 9-7 9z"),
  bookmark: P("M7 4h10v16l-5-4-5 4z"),
  settings: /* @__PURE__ */ React.createElement(React.Fragment, null, P("M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"), P("M19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.3 1a7 7 0 0 0-2-1.2l-.4-2.5H9.8l-.4 2.5a7 7 0 0 0-2 1.2l-2.3-1-2 3.4 2 1.6A7 7 0 0 0 5 12a7 7 0 0 0 .1 1.2l-2 1.6 2 3.4 2.3-1a7 7 0 0 0 2 1.2l.4 2.5h4.4l.4-2.5a7 7 0 0 0 2-1.2l2.3 1 2-3.4-2-1.6A7 7 0 0 0 19 12z")),
  grid: /* @__PURE__ */ React.createElement(React.Fragment, null, P("M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z")),
  trend: /* @__PURE__ */ React.createElement(React.Fragment, null, P("M4 16l5-5 4 4 7-8"), P("M16 7h5v5")),
  globe: /* @__PURE__ */ React.createElement(React.Fragment, null, P("M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"), P("M3 12h18"), P("M12 3c2.5 2.4 4 5.6 4 9s-1.5 6.6-4 9c-2.5-2.4-4-5.6-4-9s1.5-6.6 4-9z")),
  shield: /* @__PURE__ */ React.createElement(React.Fragment, null, P("M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z"), P("M9 12l2 2 4-4")),
  edit: /* @__PURE__ */ React.createElement(React.Fragment, null, P("M4 20h4l10-10-4-4L4 16z"), P("M14 6l4 4")),
  play: /* @__PURE__ */ React.createElement("polygon", { points: "8,5 19,12 8,19", fill: "currentColor" }),
  google: /* @__PURE__ */ React.createElement("g", null, /* @__PURE__ */ React.createElement("path", { fill: "#4285F4", d: "M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z" }), /* @__PURE__ */ React.createElement("path", { fill: "#34A853", d: "M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.7-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z" }), /* @__PURE__ */ React.createElement("path", { fill: "#FBBC05", d: "M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1A10 10 0 0 0 2 12c0 1.6.4 3.2 1.1 4.6z" }), /* @__PURE__ */ React.createElement("path", { fill: "#EA4335", d: "M12 5.9c1.5 0 2.8.5 3.8 1.5l2.8-2.8A10 10 0 0 0 3.1 7.4l3.3 2.6C7.2 7.6 9.4 5.9 12 5.9z" }))
};
function Icon({ name, size = 20, style, className }) {
  const c = ICONS[name];
  return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", style, className, "aria-hidden": true }, c);
}
function Button({ variant = "primary", size = "md", loading, children, onClick, className = "", icon, iconRight, style, disabled, title, "aria-label": ariaLabel }) {
  const ref = useRef(null);
  const handle = (e) => {
    if (disabled || loading) return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const r = document.createElement("span");
    r.className = "ripple";
    const sz = Math.max(rect.width, rect.height);
    r.style.width = r.style.height = sz + "px";
    r.style.left = e.clientX - rect.left + "px";
    r.style.top = e.clientY - rect.top + "px";
    el.appendChild(r);
    setTimeout(() => r.remove(), 600);
    onClick && onClick(e);
  };
  const sizeC = size === "lg" ? "btn-lg" : size === "sm" ? "btn-sm" : "";
  return /* @__PURE__ */ React.createElement("button", { ref, className: `btn btn-${variant} ${sizeC} ${className}`, onClick: handle, disabled, style, title, "aria-label": ariaLabel }, loading && /* @__PURE__ */ React.createElement("span", { className: "btn-spin" }), !loading && icon && /* @__PURE__ */ React.createElement(Icon, { name: icon, size: size === "sm" ? 15 : 16 }), children, !loading && iconRight && /* @__PURE__ */ React.createElement(Icon, { name: iconRight, size: size === "sm" ? 15 : 16 }));
}
function ThemeToggle({ theme, onToggle }) {
  return /* @__PURE__ */ React.createElement("button", { className: "theme-toggle", onClick: onToggle, "aria-label": "Toggle dark mode", role: "switch", "aria-checked": theme === "dark" }, /* @__PURE__ */ React.createElement("span", { className: "knob" }, /* @__PURE__ */ React.createElement(Icon, { name: theme === "dark" ? "moon" : "sun", size: 14 })));
}
function Chip({ active, children, onClick, icon, className = "" }) {
  return /* @__PURE__ */ React.createElement("button", { className: `chip ${active ? "chip-active" : ""} ${className}`, onClick }, icon && /* @__PURE__ */ React.createElement(Icon, { name: icon, size: 14 }), children);
}
function FormatChip({ type }) {
  const map = { Reel: "fc-reel", Carousel: "fc-carousel", Story: "fc-story" };
  const icon = { Reel: "play", Carousel: "grid", Story: "bolt" }[type];
  return /* @__PURE__ */ React.createElement("span", { className: `format-chip ${map[type]}` }, /* @__PURE__ */ React.createElement(Icon, { name: icon, size: 11 }), type);
}
function Dropdown({ trigger, children, align = "right" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return /* @__PURE__ */ React.createElement("div", { className: "dropdown", ref }, React.cloneElement(trigger, { onClick: (e) => {
    e.stopPropagation();
    setOpen((o) => !o);
  } }), open && /* @__PURE__ */ React.createElement("div", { className: "dropdown-menu", style: { top: "calc(100% + 8px)", [align]: 0 }, onClick: () => setOpen(false) }, children));
}
const ToastCtx = createContext(null);
function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const push = useCallback((msg) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2400);
  }, []);
  return /* @__PURE__ */ React.createElement(ToastCtx.Provider, { value: push }, children, /* @__PURE__ */ React.createElement("div", { className: "toast-wrap" }, toasts.map((t) => /* @__PURE__ */ React.createElement("div", { className: "toast", key: t.id }, /* @__PURE__ */ React.createElement("span", { className: "toast-dot" }), t.msg))));
}
const useToast = () => useContext(ToastCtx);
function Sk({ w, h, r = 8, style }) {
  return /* @__PURE__ */ React.createElement("div", { className: "sk", style: { width: w, height: h, borderRadius: r, ...style } });
}
function Meter({ value, max = 1 }) {
  return /* @__PURE__ */ React.createElement("div", { className: "meter" }, /* @__PURE__ */ React.createElement("div", { className: "meter-fill", style: { width: `${Math.min(100, value / max * 100)}%` } }));
}
function Modal({ onClose, children, style, className = "", sheetOnMobile }) {
  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);
  return /* @__PURE__ */ React.createElement("div", { className: "scrim", onClick: onClose }, /* @__PURE__ */ React.createElement("div", { className: `modal ${className}`, style, onClick: (e) => e.stopPropagation(), role: "dialog", "aria-modal": "true" }, children));
}
function useRise() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.unobserve(el);
        }
      });
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}
function Rise({ children, delay = 0, className = "", as = "div", style }) {
  const ref = useRise();
  return React.createElement(as, { ref, className: `rise ${className}`, style: { transitionDelay: `${delay}ms`, ...style } }, children);
}
Object.assign(window, {
  Icon,
  Button,
  ThemeToggle,
  Chip,
  FormatChip,
  Dropdown,
  ToastProvider,
  useToast,
  Sk,
  Meter,
  Modal,
  Rise,
  useRise
});
