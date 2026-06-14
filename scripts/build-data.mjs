/* Build promptundo-data.js (the design's window.PA data layer) from the
 * editable prompt source in src/data/prompts/*.js.
 *
 * It maps my field names + category ids to what the UI expects, and normalizes
 * every [PLACEHOLDER] to the design's strict [TOKEN] format ([A-Z0-9_ ] only),
 * moving any "e.g. …" guidance into the HINTS dictionary.
 *
 * Run:  npm run data
 */
import { readdir, writeFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { BLUEPRINTS, NICHES, CITIES } from '../src/data/packs.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const PROMPTS_DIR = join(ROOT, 'src', 'data', 'prompts')

// ── Design contract (verbatim from the provided UI) ─────────────────────────
const CATEGORIES = [
  { id: 'all',        emoji: '✨', name: 'All' },
  { id: 'instagram',  emoji: '📸', name: 'Instagram' },
  { id: 'youtube',    emoji: '▶️', name: 'YouTube' },
  { id: 'reels',      emoji: '🎬', name: 'Reels & Shorts' },
  { id: 'twitter',    emoji: '𝕏',  name: 'X / Twitter' },
  { id: 'linkedin',   emoji: '💼', name: 'LinkedIn' },
  { id: 'personal',   emoji: '🌟', name: 'Personal Brand' },
  { id: 'blog',       emoji: '✍️', name: 'Blog & SEO' },
  { id: 'selling',    emoji: '🛍️', name: 'Selling & Business' },
  { id: 'ads',        emoji: '📣', name: 'Ads & Copy' },
  { id: 'deals',      emoji: '🤝', name: 'Brand Deals & Money' },
  { id: 'email',      emoji: '💬', name: 'Email & WhatsApp' },
  { id: 'local',      emoji: '📍', name: 'Local Business' },
  { id: 'coaching',   emoji: '🎓', name: 'Coaching & Courses' },
  { id: 'podcast',    emoji: '🎙️', name: 'Podcast & Audio' },
  { id: 'design',     emoji: '🎨', name: 'Design & Visuals' },
  { id: 'plan',       emoji: '🗓️', name: 'Plan & Productivity' },
]

const BASE_HINTS = {
  PRODUCT: { hint: 'e.g. handmade soy candles' },
  AUDIENCE: { hint: 'e.g. busy working moms in India' },
  NICHE: { hint: 'e.g. fitness, fashion, food' },
  TONE: { hint: 'e.g. friendly, bold, premium' },
  TOPIC: { hint: 'e.g. morning routine for focus' },
  GOAL: { hint: 'e.g. drive DMs / saves / sales' },
  BRAND: { hint: 'e.g. Mamaearth' },
  OFFER: { hint: 'e.g. 30% off + free shipping' },
  FESTIVAL: { hint: 'e.g. Diwali, Holi, Eid' },
  BUSINESS: { hint: 'e.g. home bakery' },
  FOLLOWERS: { hint: 'e.g. 12K' },
  DELIVERABLES: { hint: 'e.g. 2 Reels + 3 stories' },
  KEYWORD: { hint: 'e.g. best budget phone 2025' },
  CITY: { hint: 'e.g. Jaipur' },
  SERVICE: { hint: 'e.g. salon, tuition, catering' },
  COURSE: { hint: 'e.g. Excel for beginners' },
  PRICE: { hint: 'e.g. ₹4,999' },
  NAME: { hint: 'e.g. Aanya' },
  PLATFORM: { hint: 'e.g. Instagram' },
  DURATION: { hint: 'e.g. 30 days' },
  BENEFIT: { hint: 'e.g. saves 2 hours a day' },
  PROBLEM: { hint: 'e.g. captions take forever' },
  NUMBER: { hint: 'e.g. 5' },
  'PASTE TRANSCRIPT': { hint: 'Paste your full episode transcript here…', long: true },
  TRANSCRIPT: { hint: 'Paste your transcript here…', long: true },
  DETAILS: { hint: 'Add any extra details you want included…', long: true },
  NOTES: { hint: 'Drop your rough notes here…', long: true },
  SCRIPT: { hint: 'Paste your script or draft…', long: true },
}

const TOOLS = [
  { name: 'Canva',     emoji: '🎨', badge: 'Design',   blurb: 'Design posts, Reel covers & carousels — free.', url: 'https://www.canva.com' },
  { name: 'ChatGPT',   emoji: '🤖', badge: 'AI',       blurb: 'Where you paste your finished prompt.',          url: 'https://chat.openai.com' },
  { name: 'CapCut',    emoji: '✂️', badge: 'Editing',  blurb: 'Edit Reels & Shorts right on your phone.',       url: 'https://www.capcut.com' },
  { name: 'Razorpay',  emoji: '💳', badge: 'Payments', blurb: 'Accept payments & sell across India.',           url: 'https://razorpay.com' },
  { name: 'Hostinger', emoji: '🌐', badge: 'Hosting',  blurb: 'Fast, low-cost hosting for your site.',          url: 'https://www.hostinger.in' },
  { name: 'Notion',    emoji: '📝', badge: 'Planning', blurb: 'Plan content & track every idea.',               url: 'https://www.notion.so' },
]

const STEPS = [
  { emoji: '🔍', title: 'Find a prompt',  text: 'Search or browse 12,000+ prompts by category.' },
  { emoji: '✏️', title: 'Fill the blanks', text: 'Add your product, niche & audience.' },
  { emoji: '📋', title: 'Copy & paste',    text: 'One tap. Paste into ChatGPT, Claude or Gemini.' },
  { emoji: '🚀', title: 'Post & grow',     text: 'Ship content that actually works.' },
]

// My category id -> design category id
const CAT_MAP = {
  instagram: 'instagram', youtube: 'youtube', reels: 'reels', twitter: 'twitter',
  linkedin: 'linkedin', branding: 'personal', blog: 'blog', business: 'selling',
  ads: 'ads', money: 'deals', email: 'email', local: 'local', coaching: 'coaching',
  podcast: 'podcast', design: 'design', productivity: 'plan',
}
const CAT_ORDER = Object.fromEntries(CATEGORIES.map((c, i) => [c.id, i]))
const LONG_RE = /PASTE|TRANSCRIPT|NOTES|DRAFT|SCRIPT|DETAILS|STATS|QUESTIONS|STORY|PARAGRAPH|SUMMARY|REVIEW|COMMENT|SAMPLES/

// ── Placeholder normalization ───────────────────────────────────────────────
const generatedHints = {}

function cleanToken(inner) {
  let head = inner
  let example = ''
  const eg = inner.match(/,?\s*e\.g\.?\s*(.*)$/i)
  if (eg) {
    head = inner.slice(0, eg.index)
    example = eg[1]
  } else {
    const ci = inner.indexOf(',')
    if (ci !== -1) { head = inner.slice(0, ci); example = inner.slice(ci + 1) }
  }
  const token = head
    .replace(/[[\]]/g, ' ')
    .toUpperCase()
    .replace(/[/&→]/g, ' ')
    .replace(/[^A-Z0-9_ ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  example = example.replace(/[[\]]/g, '').replace(/\s+/g, ' ').trim()
  const hint = example ? 'e.g. ' + example.replace(/^e\.g\.?\s*/i, '') : ''
  return { token, hint }
}

// Depth-aware tokenizer that rewrites each [ ... ] to a clean [TOKEN].
function normalize(text) {
  let out = ''
  let i = 0
  while (i < text.length) {
    if (text[i] === '[') {
      let depth = 1
      let j = i + 1
      for (; j < text.length; j++) {
        if (text[j] === '[') depth++
        else if (text[j] === ']') { depth--; if (depth === 0) break }
      }
      if (j >= text.length) { out += text[i++]; continue } // unmatched
      const inner = text.slice(i + 1, j)
      const { token, hint } = cleanToken(inner)
      if (!token) { out += text.slice(i, j + 1); i = j + 1; continue }
      out += '[' + token + ']'
      if (!(token in generatedHints)) {
        generatedHints[token] = hint || ''
      } else if (!generatedHints[token] && hint) {
        generatedHints[token] = hint
      }
      i = j + 1
    } else {
      out += text[i++]
    }
  }
  return out
}

function prettify(token) {
  return token.toLowerCase().split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

// ── Load all prompt source files ────────────────────────────────────────────
const files = (await readdir(PROMPTS_DIR)).filter((f) => f.endsWith('.js')).sort()
const all = []
for (const f of files) {
  const mod = await import(pathToFileURL(join(PROMPTS_DIR, f)).href)
  const arr = mod.default || []
  for (const p of arr) {
    const cat = CAT_MAP[p.category]
    if (!cat) { console.warn('Unknown category:', p.category, 'in', f); continue }
    all.push({
      id: p.id,
      cat,
      title: p.title,
      desc: p.description,
      prompt: normalize(p.prompt),
      tags: p.tags || [],
    })
  }
}

// ── City-specific niche variants: 25 cities × 215 niches = 5,375 additional ─
const ALL_NICHES = [
  ...NICHES,
  ...CITIES.flatMap(([cSlug, cName]) =>
    NICHES.map(([slug, name, label, aud]) => [
      `${cSlug}-${slug}`,
      `${name} (${cName})`,
      `${label} in ${cName}`,
      `${aud} in ${cName}`,
    ])
  ),
]

// ── Normalize blueprint bodies at build time ──────────────────────────────────
const normalizedBPs = BLUEPRINTS.map(bp => ({
  id: bp.id, cat: bp.cat, title: bp.title, desc: bp.desc, tags: bp.tags,
  body: normalize(bp.body),
}))

const VIRTUAL_TOTAL = all.length + normalizedBPs.length * ALL_NICHES.length

// Stable sort authored prompts by design category order
all.sort((a, b) => (CAT_ORDER[a.cat] - CAT_ORDER[b.cat]))

// Duplicate id check
const ids = all.map((p) => p.id)
const dupes = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))]
if (dupes.length) console.warn('DUPLICATE IDS:', dupes)

// ── Merge HINTS: curated base wins; fill the long tail with generated ones ──
const HINTS = { ...BASE_HINTS }
for (const [token, hint] of Object.entries(generatedHints)) {
  if (HINTS[token]) continue // keep curated
  const long = LONG_RE.test(token)
  HINTS[token] = { hint: hint || (long ? `Paste your ${token.toLowerCase()} here…` : `Type the ${prettify(token).toLowerCase()}…`), ...(long ? { long: true } : {}) }
}

// ── Emit ────────────────────────────────────────────────────────────────────
const banner = `/* PromptUndo — data layer (AUTO-GENERATED — do not edit by hand).
   Source: src/data/prompts/*.js   ·   Regenerate: npm run data
   ${all.length} prompts across ${CATEGORIES.length - 1} categories. */`

// Authored prompts + blueprints + niches: one object per line (diff-friendly).
const promptsJson = '[\n' + all.map((p) => '    ' + JSON.stringify(p)).join(',\n') + '\n  ]'
const bpsJson = '[\n' + normalizedBPs.map((bp) => '    ' + JSON.stringify(bp)).join(',\n') + '\n  ]'
const nichesJson = '[\n' + ALL_NICHES.map((n) => '    ' + JSON.stringify(n)).join(',\n') + '\n  ]'

const body =
  `(function () {\n` +
  `  const CATEGORIES = ${JSON.stringify(CATEGORIES, null, 2)};\n\n` +
  `  const HINTS = ${JSON.stringify(HINTS, null, 2)};\n\n` +
  `  const PROMPTS = ${promptsJson};\n\n` +
  `  const BLUEPRINTS = ${bpsJson};\n\n` +
  `  const NICHES = ${nichesJson};\n\n` +
  `  const TOOLS = ${JSON.stringify(TOOLS, null, 2)};\n\n` +
  `  const STEPS = ${JSON.stringify(STEPS, null, 2)};\n\n` +
  `  const VIRTUAL_TOTAL = ${VIRTUAL_TOTAL};\n\n` +
  `  window.PA = { CATEGORIES, PROMPTS, BLUEPRINTS, NICHES, HINTS, TOOLS, STEPS, VIRTUAL_TOTAL };\n` +
  `})();\n`

await writeFile(join(ROOT, 'promptundo-data.js'), banner + '\n' + body, 'utf8')

console.log(`✓ Wrote promptundo-data.js — ${all.length} authored + ${normalizedBPs.length} blueprints × ${ALL_NICHES.length} niches = ${VIRTUAL_TOTAL.toLocaleString()} virtual prompts`)
console.log(`  niches: ${NICHES.length} generic + ${ALL_NICHES.length - NICHES.length} city-specific (${CITIES.length} cities × ${NICHES.length} niches)`)
console.log('  HINTS entries:', Object.keys(HINTS).length)
if (dupes.length) { console.error('✗ duplicate ids present'); process.exit(1) }
