// PromptAdda — the library.
// Every prompt uses [SQUARE_BRACKET] placeholders. The Customize panel auto-detects
// these and turns them into fill-in fields. Keep placeholders SHORT and human.

export const PROMPTS = [
  // ───────────────────────── INSTAGRAM ─────────────────────────
  {
    id: 'ig-caption-sell',
    title: 'Instagram Caption That Actually Sells',
    category: 'instagram',
    description: 'Turns a plain product photo into a caption that drives DMs and sales — not just likes.',
    tags: ['caption', 'sales', 'product'],
    prompt: `You are a top Indian Instagram copywriter. Write 3 caption options for a post selling [PRODUCT].

Audience: [AUDIENCE, e.g. women 22-35 in India who love affordable fashion]
Tone: [TONE, e.g. friendly, a little cheeky]
Price: [PRICE]

Each caption must:
- Open with a scroll-stopping hook (a question or bold statement)
- Use simple, emotional language (no corporate words)
- Have 3 short benefit lines with emojis
- End with a clear CTA: "DM '[KEYWORD]' to order"
- Include 5 relevant hashtags (mix of big + niche Indian tags)
- Stay under 150 words

Give me 3 distinct styles: one emotional, one funny, one urgency-based.`,
  },
  {
    id: 'ig-hook-30',
    title: '30 Scroll-Stopping Hooks for Any Niche',
    category: 'instagram',
    description: 'A month of opening lines so you never stare at a blank caption again.',
    tags: ['hooks', 'ideas', 'engagement'],
    prompt: `Act as a viral Instagram strategist. My niche is [NICHE] and my audience is [AUDIENCE].

Give me 30 scroll-stopping hooks (first lines) I can use to open Reels or posts.
Mix these styles: shocking stat, bold opinion, relatable pain, "nobody tells you", before/after, and curiosity gap.

Rules:
- Max 12 words each
- Written for [LANGUAGE, e.g. Hinglish] so it feels natural to Indian audiences
- Number them 1-30
- No generic lines like "Hey guys"`,
  },
  {
    id: 'ig-carousel',
    title: 'Carousel Post That Gets Saved',
    category: 'instagram',
    description: 'Saves and shares beat likes in the algorithm. This builds a 7-slide value carousel.',
    tags: ['carousel', 'value', 'saves'],
    prompt: `Create a 7-slide Instagram carousel for my niche [NICHE].
Topic: [TOPIC]
Audience: [AUDIENCE]

For each slide give me:
- Slide 1: a bold cover hook + subtext (make people swipe)
- Slides 2-6: one clear tip each, max 25 words, easy to read on a phone
- Slide 7: a recap + CTA ("Save this" and "Follow @[HANDLE] for more")

Keep language simple and punchy. Add a one-line caption with 5 hashtags to post with it.`,
  },
  {
    id: 'ig-hashtags',
    title: 'Smart Hashtag Set (Not the Same 30)',
    category: 'instagram',
    description: 'A balanced reach/niche/local hashtag mix instead of copy-pasting #love #instagood.',
    tags: ['hashtags', 'reach'],
    prompt: `Give me 3 hashtag sets (15 tags each) for an Instagram post about [TOPIC] in the [NICHE] niche, for an Indian audience.

Each set must balance:
- 3 large tags (1M+ posts)
- 7 medium tags (100k-1M)
- 5 small/niche or city tags (under 100k, e.g. #MumbaiFoodie)

Label each set: Set A (Reach), Set B (Niche), Set C (Local). No banned or spammy tags.`,
  },
  {
    id: 'ig-bio',
    title: 'Instagram Bio That Converts Visitors to Followers',
    category: 'instagram',
    description: 'Rewrites your bio so a stranger follows in 3 seconds.',
    tags: ['bio', 'profile'],
    prompt: `Rewrite my Instagram bio so a first-time visitor instantly understands what I do and follows.

What I do: [WHAT YOU DO]
Who I help: [AUDIENCE]
What makes me different: [DIFFERENTIATOR]
Link goal: [LINK GOAL, e.g. drive to YouTube]

Give me 4 bio options (max 4 lines each), each with:
- A clear value line
- A bit of personality
- A soft CTA pointing to my link
Use line breaks and 1-2 emojis max per option.`,
  },
  {
    id: 'ig-story-poll',
    title: 'Story Sequence That Boosts Engagement',
    category: 'instagram',
    description: 'A 5-story flow using polls and questions to wake up a dead audience.',
    tags: ['stories', 'engagement'],
    prompt: `Plan a 5-story Instagram sequence to re-engage my followers in the [NICHE] niche.
Goal: [GOAL, e.g. promote my new Reel / get replies / sell [PRODUCT]]

For each of the 5 stories give me:
- The exact text to put on screen
- An interactive sticker idea (poll / quiz / question / slider) with the options
- A one-line reason it works

Keep it casual and fun, the way Indian creators talk to their audience.`,
  },

  // ───────────────────────── YOUTUBE ─────────────────────────
  {
    id: 'yt-script-hook',
    title: 'YouTube Script That Hooks in 30 Seconds',
    category: 'youtube',
    description: 'Full script skeleton with a retention-first intro so viewers don\'t click away.',
    tags: ['script', 'retention', 'long-form'],
    prompt: `Write a full YouTube video script outline on the topic: [TOPIC].
Channel niche: [NICHE]
Target length: [LENGTH, e.g. 8 minutes]
Audience: [AUDIENCE]

Structure:
- HOOK (0-30s): an open loop that promises a payoff and creates curiosity
- INTRO (30-60s): why this matters + what they'll get (no long self-intro)
- BODY: [NUMBER, e.g. 5] key points, each with a talking-point bullet + a quick example
- RETENTION: add a "but wait, there's a catch" moment in the middle
- CTA: ask for one specific thing (subscribe / comment a word / watch next)

Write it in a spoken, natural tone — short sentences I can read out loud.`,
  },
  {
    id: 'yt-titles',
    title: '12 Click-Worthy YouTube Titles',
    category: 'youtube',
    description: 'High-CTR titles using curiosity, numbers and stakes — without clickbait lies.',
    tags: ['titles', 'ctr'],
    prompt: `Give me 12 high-CTR YouTube titles for a video about [TOPIC] in the [NICHE] niche.

Use a mix of: numbers, "how I/you", curiosity gap, mistake/warning, and result-driven angles.
Rules:
- Under 60 characters so it doesn't get cut
- No fake claims — the title must match this content: [WHAT THE VIDEO ACTUALLY DELIVERS]
- Add a 🔥 next to the 3 you think will perform best, with a one-line why.`,
  },
  {
    id: 'yt-thumbnail-text',
    title: 'Thumbnail Text That Stops the Scroll',
    category: 'youtube',
    description: 'Punchy 3-4 word thumbnail overlays that pair with your title for max clicks.',
    tags: ['thumbnail', 'ctr', 'design'],
    prompt: `Give me 6 thumbnail text options for a YouTube video titled "[TITLE]".

Rules:
- Maximum 4 words each
- High contrast emotion (curiosity, shock, payoff)
- Must NOT repeat the title — it should add to it
- Suggest one facial expression / visual idea to pair with each
Format as a table: Thumbnail Text | Visual Idea.`,
  },
  {
    id: 'yt-description',
    title: 'SEO YouTube Description + Tags',
    category: 'youtube',
    description: 'A description that ranks, plus timestamps and tags, in one shot.',
    tags: ['seo', 'description', 'tags'],
    prompt: `Write a YouTube description for a video titled "[TITLE]" about [TOPIC].
Main keyword: [KEYWORD]

Include:
- A 2-sentence summary using the keyword naturally in the first line
- 3-5 bullet points of what viewers will learn
- A placeholder for timestamps (chapters)
- A CTA to subscribe + 2 links: [LINK 1], [LINK 2]
- 15 relevant SEO tags at the end as a comma list
Keep it skimmable, not stuffed.`,
  },
  {
    id: 'yt-shorts-from-long',
    title: 'Turn 1 Long Video into 5 Shorts',
    category: 'youtube',
    description: 'Repurpose a single video into a week of Shorts/Reels scripts.',
    tags: ['repurpose', 'shorts'],
    prompt: `Here is the transcript/summary of my long video:
"""
[PASTE TRANSCRIPT OR SUMMARY]
"""

Pull out 5 short-form video ideas (Shorts/Reels) from it.
For each:
- A title/hook (max 8 words)
- The 3-4 line script for a 20-30 second clip
- The exact moment/point from the video it's based on
- An on-screen text caption
Make each one able to stand alone without the long video.`,
  },

  // ───────────────────────── REELS & SHORTS ─────────────────────────
  {
    id: 'reel-viral-script',
    title: 'Viral Reel Script (Hook → Value → CTA)',
    category: 'reels',
    description: 'A tight 30-second Reel script engineered for watch-time and shares.',
    tags: ['reel', 'script', 'viral'],
    prompt: `Write a 30-second Reel script for the [NICHE] niche.
Topic: [TOPIC]
Audience: [AUDIENCE]
Language: [LANGUAGE, e.g. Hinglish]

Format:
- HOOK (0-3s): a line that makes people stop scrolling
- VALUE (3-25s): 3 fast, punchy points with on-screen text for each
- CTA (25-30s): tell them to follow / save / comment a keyword
Also suggest: a trending audio type to use, and 3 on-screen text overlays.
Keep total spoken words under 80.`,
  },
  {
    id: 'reel-ideas-30',
    title: '30 Reel Ideas for the Next Month',
    category: 'reels',
    description: 'A full content calendar of Reel concepts so you never run dry.',
    tags: ['ideas', 'calendar', 'planning'],
    prompt: `Act as my content strategist. Give me 30 Reel ideas for my [NICHE] account targeting [AUDIENCE].

Spread them across these buckets:
- Educational (teach 1 thing)
- Relatable/funny
- Behind-the-scenes
- Myth-busting
- Trend/format-based
- Sales/promo for [PRODUCT OR SERVICE]

For each idea give: a title + a one-line hook. Number them 1-30 and label the bucket.`,
  },
  {
    id: 'reel-trend-adapt',
    title: 'Adapt a Trend to My Niche',
    category: 'reels',
    description: 'Take any trending format and make it fit your content without looking forced.',
    tags: ['trend', 'format'],
    prompt: `A trend is going viral: [DESCRIBE THE TREND / AUDIO / FORMAT].
My niche is [NICHE] and my audience is [AUDIENCE].

Give me 3 ways to adapt this trend to my niche so it feels natural, not forced.
For each: the concept, the on-screen text, and the caption. Keep it quick to shoot on a phone.`,
  },

  // ───────────────────────── SELLING & BUSINESS ─────────────────────────
  {
    id: 'biz-product-desc',
    title: 'Product Description That Converts',
    category: 'business',
    description: 'For Meesho/Amazon/own-store listings — benefits over boring specs.',
    tags: ['ecommerce', 'product', 'listing'],
    prompt: `Write a product description for [PRODUCT] sold to [AUDIENCE] in India.
Price: [PRICE]
Key features: [LIST 3-4 FEATURES]

Give me:
- A 1-line headline that sells the main benefit
- A short 3-4 sentence description focused on benefits, not just specs
- 5 bullet points (feature → "which means" benefit)
- A trust line (e.g. easy returns / COD available)
Tone: warm and trustworthy. Avoid over-hyped words.`,
  },
  {
    id: 'biz-whatsapp-broadcast',
    title: 'WhatsApp Broadcast That Gets Replies',
    category: 'business',
    description: 'For resellers & small businesses — a message that drives orders without spamming.',
    tags: ['whatsapp', 'reseller', 'sales'],
    prompt: `Write a WhatsApp broadcast message to sell [PRODUCT] to my customer list.
Offer: [OFFER, e.g. 20% off till Sunday]
Tone: friendly, like messaging a friend (not corporate)

Rules:
- Short — under 60 words
- One clear hook line first
- One benefit + the offer
- A simple CTA: "Reply YES to order" or a link: [LINK]
Give me 2 versions: one in English, one in Hinglish.`,
  },
  {
    id: 'biz-festival-sale',
    title: 'Festival Sale Campaign (Diwali/Rakhi/etc.)',
    category: 'business',
    description: 'A ready festive promo pack: post caption + WhatsApp + story line.',
    tags: ['festival', 'sale', 'campaign'],
    prompt: `Create a festive sale campaign for [FESTIVAL, e.g. Diwali] for my business selling [PRODUCT].
Offer: [OFFER]
Audience: [AUDIENCE]

Give me a mini campaign pack:
1. An Instagram caption (festive, warm, with CTA)
2. A WhatsApp broadcast message (under 60 words)
3. A one-line Story text with a sticker idea
4. 3 festive hashtags
Keep the festive emotion real, not cheesy.`,
  },
  {
    id: 'biz-cold-dm',
    title: 'Cold DM to Land Local Clients',
    category: 'business',
    description: 'For freelancers/agencies — a DM that gets replies, not "seen".',
    tags: ['outreach', 'dm', 'clients'],
    prompt: `Write a cold DM to pitch my service [SERVICE] to [TYPE OF BUSINESS, e.g. local cafes].
What I offer: [VALUE / RESULT YOU DELIVER]

Rules:
- First line must NOT be a generic compliment
- Lead with a specific observation or value, not "I provide services"
- Under 50 words
- End with a low-pressure question, not a hard sell
Give me 3 versions with different opening angles.`,
  },

  // ───────────────────────── PERSONAL BRAND ─────────────────────────
  {
    id: 'brand-linkedin-post',
    title: 'LinkedIn Post That Gets Reach',
    category: 'branding',
    description: 'A story-driven LinkedIn post structured for the feed (hook + whitespace + lesson).',
    tags: ['linkedin', 'story', 'reach'],
    prompt: `Write a LinkedIn post about [TOPIC / STORY].
My role: [YOUR ROLE]
Goal: [GOAL, e.g. show expertise / attract clients]

Structure:
- A 1-line hook that stops the scroll (no hashtags up top)
- Short 1-2 line paragraphs with whitespace
- A real, relatable middle (struggle → insight)
- A clear lesson/takeaway
- A closing question to spark comments
Tone: human and honest, not corporate. 150-200 words. Add 3 hashtags at the very end.`,
  },
  {
    id: 'brand-pillars',
    title: 'Find My 4 Content Pillars',
    category: 'branding',
    description: 'Stops random posting — defines what you talk about so your brand is clear.',
    tags: ['strategy', 'pillars', 'positioning'],
    prompt: `Help me define my personal brand content pillars.
Who I am: [ABOUT YOU]
What I want to be known for: [GOAL]
My audience: [AUDIENCE]

Give me:
- 4 clear content pillars (themes I should post about)
- For each pillar: 5 content ideas
- A one-line "brand promise" that ties them together
Make the pillars specific to me, not generic.`,
  },
  {
    id: 'brand-about-page',
    title: 'About / Bio Page Written For You',
    category: 'branding',
    description: 'A warm, credible "about me" for a website, media kit or link-in-bio page.',
    tags: ['about', 'bio', 'website'],
    prompt: `Write an "About Me" section for my [PLATFORM, e.g. website / media kit].
Name: [NAME]
What I do: [WHAT YOU DO]
Story/why: [SHORT BACKSTORY]
Audience: [AUDIENCE]
Tone: [TONE]

Give me:
- A short version (2-3 sentences for a bio)
- A longer version (1 paragraph, story-driven, credible)
Write in [FIRST or THIRD] person.`,
  },

  // ───────────────────────── BLOG & SEO ─────────────────────────
  {
    id: 'blog-outline-seo',
    title: 'Blog Post Outline That Ranks on Google',
    category: 'blog',
    description: 'An SEO-structured outline with H2s, FAQ and keyword placement.',
    tags: ['seo', 'outline', 'blog'],
    prompt: `Create an SEO blog outline for the topic "[TOPIC]".
Target keyword: [KEYWORD]
Word count goal: [WORD COUNT]
Audience: [AUDIENCE]

Include:
- An SEO title (under 60 chars) with the keyword
- A meta description (under 155 chars)
- H2 and H3 subheadings in a logical flow
- A "People Also Ask" style FAQ section with 5 questions
- Suggested places for internal links and one CTA
Keep the structure scannable.`,
  },
  {
    id: 'blog-intro',
    title: 'Blog Intro That Keeps Readers',
    category: 'blog',
    description: 'A hook intro using the PAS (problem-agitate-solve) framework.',
    tags: ['intro', 'copywriting'],
    prompt: `Write an engaging intro (under 120 words) for a blog post titled "[TITLE]".
Audience: [AUDIENCE]
Keyword to include early: [KEYWORD]

Use the Problem → Agitate → Solve structure:
- Name the reader's problem
- Make them feel it
- Promise the solution this post gives
Keep sentences short. Don't start with "In today's world".`,
  },
  {
    id: 'blog-repurpose-thread',
    title: 'Turn a Blog into an X/Twitter Thread',
    category: 'blog',
    description: 'Repurpose long content into a scroll-friendly thread.',
    tags: ['repurpose', 'thread', 'twitter'],
    prompt: `Turn this content into an engaging X (Twitter) thread:
"""
[PASTE BLOG / NOTES]
"""

Rules:
- Tweet 1 = a strong hook that promises value (no link)
- 6-9 tweets, each one idea, under 280 chars
- Use line breaks and the occasional emoji
- Last tweet = a recap + CTA to follow/share
Number each tweet.`,
  },

  // ───────────────────────── BRAND DEALS & MONEY ─────────────────────────
  {
    id: 'money-brand-pitch',
    title: 'Brand Collaboration Pitch Email',
    category: 'money',
    description: 'Reach out to brands for paid deals — confident, specific, not begging.',
    tags: ['brand deal', 'pitch', 'email'],
    prompt: `Write a brand collaboration pitch email/DM to [BRAND].
My niche: [NICHE]
My audience: [AUDIENCE SIZE + WHO THEY ARE]
My best stats: [ENGAGEMENT / VIEWS / ANY WIN]
What I'm proposing: [DELIVERABLE, e.g. 1 Reel + 2 stories]

Rules:
- Subject line that gets opened
- Lead with value to THEM (their audience overlap), not my needs
- Keep it under 130 words
- Confident but warm tone
- Clear next step (a call / rate card)
Give me a short version (DM) and a slightly longer version (email).`,
  },
  {
    id: 'money-rate-card',
    title: 'Build My Creator Rate Card',
    category: 'money',
    description: 'Helps you price your work and present it professionally to brands.',
    tags: ['pricing', 'rate card', 'negotiation'],
    prompt: `Help me create a creator rate card.
Platform(s): [PLATFORMS]
Follower count: [FOLLOWERS]
Average views/engagement: [STATS]
Niche: [NICHE]

Give me:
- Suggested price ranges (in INR) for: 1 Reel, 1 Story set, 1 YouTube integration, a 3-post package
- A short note on what affects pricing
- 2 lines of confident copy to present rates to a brand without under-charging
Note: these are starting benchmarks for an Indian creator — tell me to adjust by demand.`,
  },
  {
    id: 'money-negotiate',
    title: 'Negotiate a Higher Brand Deal',
    category: 'money',
    description: 'Polite, firm replies when a brand lowballs you or offers "exposure".',
    tags: ['negotiation', 'replies'],
    prompt: `A brand offered me [THEIR OFFER] for [DELIVERABLE]. I think it's low / I want more.
My value: [YOUR STATS / WHY YOU'RE WORTH MORE]

Write 3 reply options:
1. Counter with a higher number, justified by value
2. Hold my price politely but add a small bonus deliverable
3. Decline a "free product / exposure only" deal gracefully but leave the door open
Keep each professional, warm, and firm. No desperation.`,
  },

  // ───────────────────────── EMAIL & WHATSAPP ─────────────────────────
  {
    id: 'email-newsletter',
    title: 'Newsletter Email People Actually Open',
    category: 'email',
    description: 'A full newsletter draft with subject lines tested for opens.',
    tags: ['newsletter', 'email'],
    prompt: `Write a newsletter email for my audience in the [NICHE] niche.
This week's topic: [TOPIC]
Goal: [GOAL, e.g. drive to my new video / sell [PRODUCT]]

Include:
- 3 subject line options (under 45 chars, curiosity-driven)
- A warm 1-line opener
- The main content (2-3 short sections, scannable)
- One clear CTA button text + line
- A friendly sign-off
Tone: like a message from a friend, not a brand blast.`,
  },
  {
    id: 'email-welcome',
    title: 'Welcome Email for New Subscribers',
    category: 'email',
    description: 'The first email that turns a new subscriber into a fan.',
    tags: ['welcome', 'onboarding', 'email'],
    prompt: `Write a welcome email for someone who just joined my email list / community.
Who I am: [ABOUT YOU]
What they'll get: [WHAT YOU SEND + HOW OFTEN]
A quick win to give them now: [FREEBIE OR TIP]

Structure:
- A warm thank-you opener
- Set expectations (what + how often)
- Deliver one quick win immediately
- A soft CTA (reply, follow, or check this link: [LINK])
Keep it under 150 words and personal.`,
  },
  {
    id: 'email-launch-sequence',
    title: '3-Email Launch Sequence',
    category: 'email',
    description: 'Sell a product or course with a simple, non-pushy 3-email flow.',
    tags: ['launch', 'sequence', 'sales'],
    prompt: `Plan a 3-email launch sequence to sell [PRODUCT/COURSE].
Audience: [AUDIENCE]
Price: [PRICE]
Offer/deadline: [OFFER, e.g. early-bird price till Friday]

Give me all 3 emails:
1. Announce — tease the value + open cart
2. Value/proof — benefits, who it's for, a testimonial placeholder
3. Last call — urgency, recap, deadline
For each: a subject line + the body. Keep it honest and helpful, not hype.`,
  },

  // ───────────────────────── EXTRA HIGH-VALUE ─────────────────────────
  {
    id: 'x-content-week',
    title: 'Full 7-Day Content Plan',
    category: 'instagram',
    description: 'A done-for-you week of posts across formats so you can batch-create.',
    tags: ['calendar', 'planning', 'batch'],
    prompt: `Build me a 7-day content plan for my [NICHE] account, audience [AUDIENCE].
Goal this week: [GOAL]

For each day give:
- Format (Reel / carousel / story / static)
- The hook/title
- A one-line content brief
- The CTA
Balance value, relatability, and 1-2 promo posts for [PRODUCT/SERVICE]. Put it in a clean day-by-day list.`,
  },
  {
    id: 'x-repurpose-engine',
    title: 'One Idea → 5 Platforms',
    category: 'branding',
    description: 'Take a single idea and reshape it for Reels, YouTube, LinkedIn, X and a newsletter.',
    tags: ['repurpose', 'multi-platform'],
    prompt: `Take this one idea: "[YOUR IDEA / TOPIC]" (niche: [NICHE]).

Reshape it for 5 platforms, respecting each one's style:
- Instagram Reel: a 3-line script + hook
- YouTube: a title + 1-line angle
- LinkedIn: a 2-line hook for a story post
- X/Twitter: a single punchy tweet
- Newsletter: a subject line + 1-line teaser
Keep the core message consistent but native to each platform.`,
  },
  {
    id: 'x-comment-replies',
    title: 'Engaging Replies to Boost Your Posts',
    category: 'instagram',
    description: 'Reply templates that keep conversations going and lift your reach.',
    tags: ['engagement', 'replies', 'community'],
    prompt: `Give me 10 reply templates I can use to respond to comments on my posts in the [NICHE] niche.

Cover these comment types: a compliment, a question, a hater/negative, a "where to buy", an emoji-only comment, and a fellow creator.
Each reply should:
- Sound human and warm
- Encourage more conversation (ask back / add value)
- Sometimes include a soft CTA
Keep them short and copy-ready.`,
  },
  {
    id: 'x-video-title-ab',
    title: 'A/B Test My Hook (Pick the Winner)',
    category: 'reels',
    description: 'Paste your hook, get sharper rewrites plus a verdict on which to use.',
    tags: ['hooks', 'optimization', 'testing'],
    prompt: `Here is my current hook/opening line: "[YOUR HOOK]"
Niche: [NICHE], audience: [AUDIENCE], platform: [PLATFORM].

Do 3 things:
1. Tell me honestly what's weak about it
2. Rewrite it 5 different ways (stronger, more curiosity, more specific)
3. Pick the single best one and explain why in one line.`,
  },
  {
    id: 'x-faceless-channel',
    title: 'Faceless Content Ideas (No Camera Needed)',
    category: 'youtube',
    description: 'For creators who don\'t want to show their face — formats that still grow.',
    tags: ['faceless', 'ideas'],
    prompt: `I want to grow a faceless [PLATFORM] account in the [NICHE] niche without showing my face.
Audience: [AUDIENCE]

Give me:
- 5 faceless content formats that work for this niche (e.g. text-on-screen, voiceover + b-roll, screen recording)
- 10 specific video/post ideas using those formats
- A simple tool/asset suggestion for each format
Keep it doable for a beginner with just a phone.`,
  },
  {
    id: 'x-bio-link-page',
    title: 'Link-in-Bio Page Copy',
    category: 'branding',
    description: 'Headline + button labels for your Linktree/bio page that actually get clicks.',
    tags: ['link in bio', 'copy'],
    prompt: `Write the copy for my link-in-bio page (Linktree-style).
What I do: [WHAT YOU DO]
My links/offers: [LIST YOUR LINKS, e.g. YouTube, shop, free guide, contact]
Audience: [AUDIENCE]

Give me:
- A short headline (who I help + how)
- A 1-line sub-headline
- A click-worthy button label for each link (not just "YouTube" — make it benefit-driven)
Keep it tight and scannable.`,
  },
  {
    id: 'x-script-doctor',
    title: 'Fix My Boring Script',
    category: 'youtube',
    description: 'Paste a draft, get a punchier, higher-retention rewrite with notes.',
    tags: ['editing', 'rewrite', 'retention'],
    prompt: `Here is my draft script/caption:
"""
[PASTE YOUR DRAFT]
"""
Platform: [PLATFORM], niche: [NICHE], audience: [AUDIENCE].

Do this:
- Rewrite it to be punchier and more engaging (shorter sentences, stronger hook, clearer CTA)
- Cut anything boring or repetitive
- Keep my voice/personality
- At the end, list 3 specific things you changed and why.`,
  },
  {
    id: 'x-niche-down',
    title: 'Help Me Niche Down',
    category: 'branding',
    description: 'Too broad? This narrows your content to something that actually grows.',
    tags: ['strategy', 'niche', 'positioning'],
    prompt: `I post about [CURRENT BROAD TOPIC] but I'm not growing. Help me niche down.
About me: [ABOUT YOU]
What I enjoy making: [WHAT YOU LIKE]
Who I want to reach: [AUDIENCE]

Give me:
- 3 specific niche angles I could own (with a one-line positioning each)
- The pros/cons of each
- Your recommendation and why
- 5 starter content ideas for the recommended niche.`,
  },
  {
    id: 'x-hashtag-bio-keywords',
    title: 'SEO Keywords for My Profile & Captions',
    category: 'instagram',
    description: 'Instagram/YouTube now rank on keywords — this finds yours.',
    tags: ['seo', 'keywords', 'discovery'],
    prompt: `Find the search keywords my audience uses to discover content like mine.
Niche: [NICHE]
Audience: [AUDIENCE]
Platform: [PLATFORM]

Give me:
- 10 keywords/phrases people actually search for in this niche
- Where to place them (bio, caption first line, alt text, video title)
- 3 example caption first-lines that naturally include a keyword.`,
  },
  {
    id: 'x-30day-growth',
    title: '30-Day Growth Challenge Plan',
    category: 'branding',
    description: 'A structured month to grow from zero with daily, doable actions.',
    tags: ['growth', 'plan', 'beginner'],
    prompt: `Build me a 30-day growth plan for a new [PLATFORM] account in the [NICHE] niche.
Starting point: [WHERE YOU ARE, e.g. 0 followers]
Time I can give daily: [TIME, e.g. 1 hour]
Goal in 30 days: [GOAL]

Give me a week-by-week breakdown with:
- A weekly focus/theme
- Daily simple actions (post, engage, learn)
- One metric to track each week
Keep it realistic for one person with a phone.`,
  },
  {
    id: 'x-story-selling',
    title: 'Sell Without Being Salesy',
    category: 'business',
    description: 'Story-based soft-sell posts so you promote without annoying followers.',
    tags: ['storytelling', 'soft sell'],
    prompt: `Write a story-based post to sell [PRODUCT/SERVICE] without sounding salesy.
Audience: [AUDIENCE]
The transformation it gives: [BEFORE → AFTER]

Use this flow:
- Open with a relatable story or moment (no selling yet)
- Show the struggle/problem
- Naturally introduce the solution ([PRODUCT])
- End with a soft, honest CTA
Keep it warm and real. Give me one Reel-script version and one caption version.`,
  },
  {
    id: 'x-trend-hijack-news',
    title: 'Newsjack a Trend for My Niche',
    category: 'reels',
    description: 'Turn a trending topic/news into timely content before it dies.',
    tags: ['trend', 'timely', 'topical'],
    prompt: `A topic is trending: [TRENDING TOPIC / NEWS].
My niche: [NICHE], audience: [AUDIENCE].

Give me 3 timely content angles that connect this trend to my niche (tastefully).
For each: the hook, the format (Reel/post/story), and the caption.
Avoid anything tone-deaf or controversial — keep it smart and relevant.`,
  },
  {
    id: 'x-collab-pitch-creator',
    title: 'Pitch a Collab to Another Creator',
    category: 'money',
    description: 'A DM to propose a creator-to-creator collab that grows you both.',
    tags: ['collab', 'networking', 'dm'],
    prompt: `Write a DM to pitch a collaboration to another creator.
Them: [THEIR NICHE / WHY THEY FIT]
Me: [MY NICHE + SIZE]
Collab idea: [YOUR IDEA, e.g. a joint Reel / Live / shoutout swap]

Rules:
- Genuine compliment that proves I actually follow them (specific)
- A clear, mutual-benefit collab idea
- Low pressure, easy yes
- Under 70 words.`,
  },
  {
    id: 'x-content-from-question',
    title: 'Turn Audience Questions into Content',
    category: 'instagram',
    description: 'Mine your DMs/comments for an endless content supply.',
    tags: ['ideas', 'community', 'content'],
    prompt: `Here are questions my audience keeps asking:
"""
[PASTE 3-5 QUESTIONS OR COMMON DOUBTS]
"""
Niche: [NICHE].

For each question, give me:
- A content title/hook answering it
- The best format (Reel / carousel / story / post)
- A 2-line content brief
Turn each question into a post idea I can make this week.`,
  },
  {
    id: 'x-testimonial-request',
    title: 'Ask for Testimonials & Reviews',
    category: 'business',
    description: 'Polite messages that actually get customers to send reviews.',
    tags: ['reviews', 'social proof', 'whatsapp'],
    prompt: `Write a message asking a happy customer for a testimonial/review for [PRODUCT/SERVICE].
Tone: warm, easy, no pressure.

Give me:
- A WhatsApp version (short, with 2 simple questions to make it easy for them)
- A version that asks for a Google/Instagram review with a [LINK]
- A line offering a small thank-you (optional)
Make it feel like a friend asking, not a survey.`,
  },
  {
    id: 'x-repurpose-comments',
    title: 'Pinned Comment & Community Post',
    category: 'youtube',
    description: 'Boost watch-time and engagement with a smart pinned comment.',
    tags: ['engagement', 'community'],
    prompt: `Write a pinned comment and a community post for my latest video "[TITLE]".
Niche: [NICHE]
Goal: [GOAL, e.g. drive comments / push next video / get a poll vote]

Give me:
- A pinned comment that asks a specific question to spark replies
- A community tab post (poll or update) to keep my channel active between uploads
Keep both casual and engaging.`,
  },
  {
    id: 'x-ad-script',
    title: 'Short Ad/Promo Script (15-30s)',
    category: 'business',
    description: 'A paid-promo or boosted-Reel script that sells fast.',
    tags: ['ad', 'promo', 'script'],
    prompt: `Write a 15-30 second ad/promo script for [PRODUCT/SERVICE].
Audience: [AUDIENCE]
Main benefit: [BENEFIT]
Offer: [OFFER]

Structure:
- HOOK (0-3s): grab attention with the problem or a bold claim
- MIDDLE: show the product + 1-2 benefits fast
- CTA (last 3s): tell them exactly what to do + the offer
Add on-screen text suggestions for each part. Keep spoken words under 60.`,
  },
  {
    id: 'x-monthly-review',
    title: 'Analyze My Month & Plan Next',
    category: 'branding',
    description: 'Paste your stats, get a clear read on what worked and what to do next.',
    tags: ['analytics', 'review', 'strategy'],
    prompt: `Here's my content performance this month:
"""
[PASTE YOUR STATS — top posts, views, follows, what flopped]
"""
Niche: [NICHE], goal: [GOAL].

Give me:
- What worked and WHY (patterns in the winners)
- What to stop doing
- 3 concrete things to double down on next month
- A simple focus for next month in one sentence.`,
  },
]

// Quick stat for the hero
export const PROMPT_COUNT = PROMPTS.length
