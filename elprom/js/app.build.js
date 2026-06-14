const { useState: useStateA, useEffect: useEffectA } = React;
const ACCENTS = [
  { name: "indigo", hex: "#5E5CE6" },
  { name: "violet", hex: "#7C5CFF" },
  { name: "blue", hex: "#2A6FDB" },
  { name: "emerald", hex: "#11A668" }
];
const TWEAK_DEFAULTS = (
  /*EDITMODE-BEGIN*/
  {
    "accent": "indigo",
    "plan": "Free"
  }
);
function ELPROM() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [theme, setTheme] = useStateA(() => {
    try {
      return localStorage.getItem("el_theme") || "dark";
    } catch (e) {
      return "dark";
    }
  });
  const watermark = t.plan !== "Pro";
  const [screen, setScreen] = useStateA("landing");
  const [appView, setAppView] = useStateA("result");
  const [modal, setModal] = useStateA(null);
  const [intent, setIntent] = useStateA(window.ELPROM_INTENT);
  const toast = useToast();
  useEffectA(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("el_theme", theme);
    } catch (e) {
    }
  }, [theme]);
  useEffectA(() => {
    document.documentElement.setAttribute("data-accent", t.accent);
  }, [t.accent]);
  const toggleTheme = () => setTheme((p) => p === "dark" ? "light" : "dark");
  const goPro = () => {
    setTweak("plan", "Pro");
    toast("Welcome to Pro \xB7 watermark removed");
  };
  const generate = (text) => {
    setIntent(text);
    setScreen("app");
    setAppView("result");
    setModal(null);
    window.scrollTo(0, 0);
  };
  const goLanding = () => {
    setScreen("landing");
    setModal(null);
  };
  const accentHex = (ACCENTS.find((a) => a.name === t.accent) || ACCENTS[0]).hex;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, screen === "landing" && /* @__PURE__ */ React.createElement(
    Landing,
    {
      theme,
      onToggleTheme: toggleTheme,
      onGenerate: generate,
      onSignIn: () => {
        setScreen("app");
        setAppView("auth");
      }
    }
  ), screen === "app" && /* @__PURE__ */ React.createElement("div", { className: "app-stage" }, /* @__PURE__ */ React.createElement("button", { className: "app-exit", onClick: goLanding }, /* @__PURE__ */ React.createElement(Icon, { name: "chevronRight", size: 16, style: { transform: "rotate(180deg)" } }), /* @__PURE__ */ React.createElement("span", null, "Back to site")), /* @__PURE__ */ React.createElement(PhoneFrame, null, appView === "result" && /* @__PURE__ */ React.createElement(
    ResultScreen,
    {
      intent,
      setIntent,
      onHome: goLanding,
      onAccount: () => setModal({ type: "account" }),
      onOpenCarousel: (i) => setModal({ type: "carousel", index: i }),
      onUpgrade: goPro,
      watermark
    }
  ), appView === "auth" && /* @__PURE__ */ React.createElement(AuthScreen, { onBack: goLanding, onAuthed: () => {
    setAppView("dashboard");
    toast("Signed in");
  } }), appView === "dashboard" && /* @__PURE__ */ React.createElement(
    DashboardScreen,
    {
      onHome: goLanding,
      onAccount: () => setModal({ type: "account" }),
      onOpenCalendar: () => setAppView("result"),
      theme,
      onToggleTheme: toggleTheme
    }
  ))), modal?.type === "carousel" && /* @__PURE__ */ React.createElement(CarouselModal, { startIndex: modal.index, onClose: () => setModal(null), watermark }), modal?.type === "account" && /* @__PURE__ */ React.createElement(
    AccountSheet,
    {
      onClose: () => setModal(null),
      onDashboard: () => {
        setAppView("dashboard");
        setModal(null);
      },
      onUpgrade: () => {
        goPro();
        setModal(null);
      },
      onSignOut: () => {
        setModal(null);
        goLanding();
      }
    }
  ), /* @__PURE__ */ React.createElement(TweaksPanel, null, /* @__PURE__ */ React.createElement(TweakSection, { label: "Appearance" }), /* @__PURE__ */ React.createElement(TweakToggle, { label: "Dark mode", value: theme === "dark", onChange: (v) => setTheme(v ? "dark" : "light") }), /* @__PURE__ */ React.createElement(
    TweakColor,
    {
      label: "Accent",
      value: accentHex,
      options: ACCENTS.map((a) => a.hex),
      onChange: (hex) => {
        const a = ACCENTS.find((x) => x.hex === hex);
        if (a) setTweak("accent", a.name);
      }
    }
  ), /* @__PURE__ */ React.createElement(TweakSection, { label: "Plan" }), /* @__PURE__ */ React.createElement(TweakRadio, { label: "Tier", value: t.plan, options: ["Free", "Pro"], onChange: (v) => setTweak("plan", v) }), /* @__PURE__ */ React.createElement("div", { style: { padding: "2px 4px 0", fontSize: 12, color: "var(--text-3)", lineHeight: 1.5 } }, "Pro removes the \u201CMade with ELPROM\u201D watermark across graphics.")));
}
ReactDOM.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ React.createElement(ToastProvider, null, /* @__PURE__ */ React.createElement(ELPROM, null))
);
