---
id: workflow-linkedin-weekly-posts-2026
type: workflow
status: active
schedule: "Sunday 21:00 (trend pull) + Mon–Fri 08:00 (auto-post)"
created: 2026-06-01
updated: 2026-06-01
tags: [linkedin, automation, content, composio]
---

# Workflow: LinkedIn Weekly Posts

## What this does

Every Sunday at 9pm, Claude pulls trending topics from Reddit, Twitter/X, and LinkedIn — including AI/automation trends — plus last week's LinkedIn engagement analytics. It uses this to write 5 posts in Scott's voice for the coming week, then automatically loads them into the daily posting task. Each weekday at 8am, the post goes live on LinkedIn via Composio with no manual input required.

## Scheduled tasks

| Task ID | Schedule | What it does |
|---|---|---|
| `linkedin-weekly-trend-posts` | Sunday 21:00 | Pulls trends + analytics, writes 5 posts, updates daily task |
| `linkedin-daily-post` | Mon–Fri 08:00 | Posts that day's content to LinkedIn, logs URN |

Both tasks are managed at: `C:\Users\scott\.claude\Scheduled\`

## Data flows

```
Sunday 21:00
  └─ Reddit (REDDIT_GET_R_TOP + REDDIT_SEARCH_ACROSS_SUBREDDITS)
  └─ Web search (Twitter/X + LinkedIn AI trends + blue-collar trends)
  └─ LinkedIn post log → LINKEDIN_LIST_REACTIONS (what worked last week?)
  └─ 5 posts written in Scott's voice
  └─ Saved to C:\Users\scott\.claude\linkedin-posts\current-week.md
  └─ linkedin-daily-post task prompt updated with new posts

Mon–Fri 08:00
  └─ linkedin-daily-post reads day's post from its prompt
  └─ LINKEDIN_CREATE_LINKED_IN_POST (via Composio, account: linkedin_pung-soco)
  └─ URN + preview logged to C:\Users\scott\.claude\linkedin-posts\post-log.md
```

## Content rules (enforced in task prompts)

- Max 5 posts/week
- 100–200 words per post, short paragraphs, no hashtag walls
- At least 1 AI/automation post per week — always through lens of physical workers, not tech commentary
- Voice check: would a skeptical 52-year-old bloke on the tools trust this? If no — rewrite
- Never copy-paste from TikTok — always rewrite for LinkedIn tone
- CTA to free guide: digital-madesimple.co.uk

## Composio connections used

| Service | Account ID | Tool slugs |
|---|---|---|
| LinkedIn | `linkedin_pung-soco` | `LINKEDIN_CREATE_LINKED_IN_POST`, `LINKEDIN_LIST_REACTIONS` |
| Reddit | `reddit_nete-toggle` | `REDDIT_GET_R_TOP`, `REDDIT_SEARCH_ACROSS_SUBREDDITS` |

## How to update posts manually

If you want to override a post before it goes out:
1. Open the `linkedin-daily-post` task in the Scheduled section
2. Edit the relevant day's content in the prompt
3. Save — it'll use the updated version on its next run

## How to pause the system

Set `enabled: false` on both scheduled tasks via the Scheduled section in the sidebar.

## Evolution notes

This system is designed to get smarter over time. Each week:
- Analytics from the prior week inform what angles to push
- AI/trend research is always fresh (not cached)
- The voice rules stay constant — Scott's voice doesn't drift

Areas to evolve:
- Add image generation (e.g. a simple branded card for high-performing posts)
- Add YouTube/TikTok performance cross-reference (what hooks worked on video → test on LinkedIn)
- Add comment monitoring and reply drafts
