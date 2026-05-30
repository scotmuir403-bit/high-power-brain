# Scheduled Routines

Automated agents running in Anthropic cloud (CCR). View and manage at: https://claude.ai/code/routines

---

## Sunday Content Prep — TikTok Scripts & LinkedIn Posts
**ID:** trig_019M74JaXzV9TdmRkDpBa2c1
**Schedule:** Every Sunday at 6pm BST (17:00 UTC) — note: fires at 5pm in winter (GMT)
**Repo:** https://github.com/scotmuir403-bit/high-power-brain

**What it does:**
1. Scrapes TikTok analytics via Apify (actor GdWCkxBtKWOsKjdch) for @scott.aimade.simple
2. Analyses last 7 days — top performers, what hooks/angles worked
3. Searches trending AI topics (2-3 web searches via Firecrawl)
4. Writes 14 complete TikTok scripts (2/day Mon–Sun) using the dms-weekly-scripts skill
5. Writes 5 LinkedIn posts (Mon–Fri)
6. Saves TikTok scripts to `9 - Operations/runs/tiktok-scripts/YYYY-MM-DD-weekly-scripts.md`
7. Saves LinkedIn posts as individual dated files to `9 - Operations/runs/linkedin-queue/`
8. Commits all files

**Script system:** `dms-weekly-scripts/SKILL.md` + reference files in `dms-weekly-scripts/references/`
**Dependencies:** Apify (Composio), Firecrawl MCP

---

## Daily LinkedIn Post — 8am
**ID:** trig_015Mb73JSYVznfGEskVXa3gY
**Schedule:** Every day at 8am BST (07:00 UTC) — note: fires at 7am in winter (GMT)
**Repo:** https://github.com/scotmuir403-bit/high-power-brain

**What it does:**
1. Looks for today's LinkedIn post file in `9 - Operations/runs/linkedin-queue/YYYY-MM-DD-[dayname].md`
2. If no file: logs to `missed-posts.md` and exits
3. If already posted (`status: posted`): skips
4. If scheduled: posts to LinkedIn via Composio (LINKEDIN_CREATE_LINKED_IN_POST)
5. Updates file status to `posted`, commits

**Dependencies:** LinkedIn (Composio)
**Note:** Posts are generated Sunday evening by the Content Prep routine above

---

## Notes
- DST adjustment needed each October/March for both routines (times shift by 1 hour)
- To update a routine: open Claude Code, describe the change needed
- To disable: visit https://claude.ai/code/routines
