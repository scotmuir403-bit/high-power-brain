---
id: area-linkedin-content-2026
type: area
status: active
owner: self
created: 2026-06-01
updated: 2026-06-01
tags: [linkedin, content, digital-made-simple, social-media]
---

# LinkedIn Content System

## Compiled truth

**Standard I'm maintaining:** LinkedIn is a support channel — not the main effort. It reinforces Digital Made Simple's message to a professional/blue-collar crossover audience without eating into TikTok and YouTube energy. Maximum 5 posts per week. Every post sounds like Scott talking, not performing.

**Current state (2026-06-01):**
- Posting: 5x/week Mon–Fri, automated via Composio (LinkedIn account: `linkedin_pung-soco`)
- Trend research: automated every Sunday 9pm — pulls Twitter/X, LinkedIn, Reddit trends + AI topics
- Analytics: each week's post URNs logged to `C:\Users\scott\.claude\linkedin-posts\post-log.md`, reactions pulled via Composio on Sunday before writing new posts
- First post published manually: 2026-06-01 (Monday retirement confidence stat)

**The automation stack:**
- **Sunday 21:00** → `linkedin-weekly-trend-posts` scheduled task runs:
  1. Pulls LinkedIn post analytics from the past week (via Composio LINKEDIN_LIST_REACTIONS)
  2. Searches Reddit AI trends + blue-collar/side hustle trending topics
  3. Web-searches Twitter/X and LinkedIn trending topics
  4. Writes 5 posts in Scott's voice
  5. Saves posts to `C:\Users\scott\.claude\linkedin-posts\current-week.md`
  6. Updates the `linkedin-daily-post` task with new post content
- **Mon–Fri 08:00** → `linkedin-daily-post` scheduled task:
  1. Selects that day's post
  2. Posts to LinkedIn via Composio
  3. Logs the post URN + preview to `C:\Users\scott\.claude\linkedin-posts\post-log.md`

**Composio credentials:**
- LinkedIn account ID: `linkedin_pung-soco`
- LinkedIn author URN: `urn:li:person:92PK6wtBHu`
- Reddit account ID: `reddit_nete-toggle`
- GitHub account ID: `github_prink-sasin`

**Voice rules (non-negotiable):**
- Straight-talking. No fluff, no buzzwords.
- Sounds like Scott — still on the tools, still building
- BANNED: "financial freedom", "passive income", "unlock your potential", any hype language
- NEVER name previous course (OMG VIP)
- CTA always to free guide first: digital-madesimple.co.uk

**Metrics I watch:**
- Reactions per post (pulled every Sunday via Composio)
- Which angles (AI, retirement, body-failure, side hustle honesty) get most engagement
- Follower growth (periodic manual check)

**Standing decisions:**
- Max 5 posts/week — no exceptions, even if trending topics are strong
- AI topics: at least 1 post/week engaging with AI/automation — always through the lens of what it means for physical workers, not tech commentary
- Posts repurpose TikTok angles but are always rewritten for LinkedIn — never copy-paste
- Real beats polished. Flag anything that sounds "LinkedIn-brained" before it goes out.

**Linked projects:**
- [[9 - Operations/workflows/linkedin-weekly-posts]] — workflow detail
- [[6 - Areas/Digital Made Simple]] — parent business area (if exists)

---

## Timeline

- **2026-06-01** System built. LinkedIn connected via Composio. First post (Monday retirement confidence stat) published manually. Sunday 9pm trend-pull + 8am daily posting fully automated. Post log created at `C:\Users\scott\.claude\linkedin-posts\post-log.md`. This area dossier committed to vault + GitHub.
