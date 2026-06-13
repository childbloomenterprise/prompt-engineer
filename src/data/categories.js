// Category metadata: id, label, emoji, accent color (Tailwind class fragments)
export const CATEGORIES = [
  { id: 'all', label: 'All Prompts', emoji: '✨' },
  { id: 'instagram', label: 'Instagram', emoji: '📸' },
  { id: 'youtube', label: 'YouTube', emoji: '▶️' },
  { id: 'reels', label: 'Reels & Shorts', emoji: '🎬' },
  { id: 'business', label: 'Selling & Business', emoji: '🛍️' },
  { id: 'branding', label: 'Personal Brand', emoji: '🪪' },
  { id: 'blog', label: 'Blog & SEO', emoji: '✍️' },
  { id: 'money', label: 'Brand Deals & Money', emoji: '💸' },
  { id: 'email', label: 'Email & WhatsApp', emoji: '💬' },
]

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
)
