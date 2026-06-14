(function() {
  const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  function titleCase(s) {
    return String(s).replace(/\b\w/g, (c) => c.toUpperCase());
  }
  function cleanNiche(intent) {
    let s = String(intent || "").trim();
    if (!s) return "your niche";
    s = s.replace(/^(grow|promote|build|launch|sell|market|start|create|scale)\s+(my|a|an|the)?\s*/i, "");
    s = s.replace(/\b(audience|brand|business|account|page|channel)\b.*$/i, "").trim();
    return s || String(intent).trim();
  }
  function keywords(intent) {
    const stop = /* @__PURE__ */ new Set(["my", "the", "a", "an", "to", "for", "and", "in", "on", "of", "with", "while", "about", "your", "you", "i", "want", "grow", "build", "more", "as", "it"]);
    return String(intent || "").toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter((w) => w.length > 2 && !stop.has(w)).slice(0, 6);
  }
  function hashtags(intent, extra) {
    const base = keywords(intent).map((w) => "#" + w.replace(/\s/g, ""));
    const tail = (extra || []).map((t) => "#" + t);
    const all = base.concat(tail);
    const seen = /* @__PURE__ */ new Set();
    const out = [];
    for (const t of all) {
      if (!seen.has(t)) {
        seen.add(t);
        out.push(t);
      }
      if (out.length >= 5) break;
    }
    while (out.length < 4) out.push("#creator");
    return out;
  }
  function weekDates() {
    const now = /* @__PURE__ */ new Date();
    const monday = new Date(now);
    const dow = (now.getDay() + 6) % 7;
    monday.setDate(now.getDate() - dow);
    const mon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return DAY_NAMES.map((_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return mon[d.getMonth()] + " " + d.getDate();
    });
  }
  const FRAMEWORKS = [
    {
      name: "Contrarian Take",
      format: "Carousel",
      hook: (n) => `Stop overthinking ${n}. Start shipping it.`,
      caption: (n) => `Everyone in ${n} is waiting to feel "ready."

The ones who win just start \u2014 publicly, imperfectly, today.

Done beats perfect. Every single time.`,
      tags: ["contrarian", "mindset"],
      graphic: (n) => ({ kicker: "CONTRARIAN TAKE", title: `Stop overthinking.
Start shipping.`, footer: "Lesson 01" })
    },
    {
      name: "Build-in-Public Update",
      format: "Reel",
      hook: (n) => `What 30 days of consistent ${n} content actually did.`,
      caption: (n) => `No viral moment. No secret hack.

Just showing up daily, answering every comment, and doubling down on what worked in ${n}.

Consistency isn't a strategy. It's the whole game.`,
      tags: ["buildinpublic", "growth"],
      graphic: (n) => ({ kicker: "BUILD IN PUBLIC", title: `30 days of
${titleCase(n)}`, footer: "The unsexy truth" })
    },
    {
      name: "Listicle Teardown",
      format: "Carousel",
      hook: (n) => `5 ${n} mistakes that are quietly killing your reach.`,
      caption: (n) => `1. Posting without a hook.
2. Talking to everyone (so no one).
3. No clear call-to-action.
4. Copying trends late.
5. Quitting right before it compounds.

Save this before your next post.`,
      tags: ["tips", "reach"],
      graphic: (n) => ({ kicker: "TEARDOWN", title: `5 ${titleCase(n)}
mistakes`, footer: "Swipe \u2192" })
    },
    {
      name: "Behind-the-Metric",
      format: "Story",
      hook: (n) => `One small change doubled my engagement in ${n}. Here it is.`,
      caption: (n) => `It wasn't a new tool or a trend.

I just started ending every ${n} post with a real question \u2014 and actually replying to every answer.

Conversation beats broadcast.`,
      tags: ["engagement", "community"],
      graphic: (n) => ({ kicker: "BEHIND THE METRIC", title: `2\xD7 engagement
from one change`, footer: "The question trick" })
    },
    {
      name: "Founder Lesson",
      format: "Carousel",
      hook: (n) => `Things nobody tells you about growing in ${n}.`,
      caption: (n) => `The algorithm rewards consistency, not perfection.
Your first 100 followers are the hardest \u2014 and the most loyal.
The content you're embarrassed to post often performs best.

Keep going.`,
      tags: ["lessons", "creator"],
      graphic: (n) => ({ kicker: "HARD-WON LESSON", title: `Truths about
${titleCase(n)}`, footer: "Save this" })
    },
    {
      name: "Hot Take",
      format: "Reel",
      hook: (n) => `"Post more" is the worst advice in ${n}.`,
      caption: (n) => `Volume without a point is just noise.

One sharp, useful ${n} post beats seven forgettable ones.

Quality compounds. Spam decays.`,
      tags: ["hottake", "strategy"],
      graphic: (n) => ({ kicker: "HOT TAKE", title: `"Post more"
is bad advice.`, footer: "Quality > volume" })
    },
    {
      name: "Weekly Reflection",
      format: "Carousel",
      hook: (n) => `My ${n} week: what worked, what flopped, what's next.`,
      caption: (n) => `Worked: showing up daily and replying to every comment.
Flopped: a "clever" post nobody understood.
Next: turning my best replies into real content.

Consistency compounds. See you next week.`,
      tags: ["weeklyreview", "journey"],
      graphic: (n) => ({ kicker: "THE WEEK", title: `Worked.
Flopped.
What's next.`, footer: "Reflection" })
    }
  ];
  function buildElpromWeek(intent) {
    const niche = cleanNiche(intent);
    const dates = weekDates();
    const week = FRAMEWORKS.map((fw, i) => ({
      day: DAY_NAMES[i],
      date: dates[i],
      format: fw.format,
      framework: fw.name,
      hook: fw.hook(niche),
      caption: fw.caption(niche),
      hashtags: hashtags(intent, fw.tags),
      graphic: fw.graphic(niche)
    }));
    const carousel = [
      { kicker: "TEARDOWN", big: `5 ${titleCase(niche)}`, small: "mistakes to fix today", foot: "Swipe \u2192" },
      { num: "01", big: "Posting without", small: "a scroll-stopping hook." },
      { num: "02", big: "Talking to everyone", small: "so you reach no one." },
      { num: "03", big: "No clear", small: "call-to-action." },
      { num: "04", big: "Copying trends", small: "a week too late." },
      { num: "05", big: "Quitting right before", small: "it compounds." },
      { cta: true, big: "Fix one this week.", small: "Then post again.", foot: "Save \u2022 Share" }
    ];
    return { niche, week, carousel };
  }
  window.buildElpromWeek = buildElpromWeek;
})();
