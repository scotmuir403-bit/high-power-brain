# Digital Made Simple

> AI content systems for small businesses. Scott's main business.

## What it is

"I build AI content systems for small businesses — set up once, posts written for you every week."

Target client: small business owners who need consistent content but have no system, no time, and no idea where to start with AI.

## Status (June 2026)

Strategic pivot confirmed May 2026:
- **Away from:** Promoting digital marketing courses (SMGB affiliate)
- **Toward:** AI content and automation services — Done-With-You client work

First Done-With-You client in closing stage ([[People/Scott Brodie]] — SafeSite Companion).

## Service model

- **Done-With-You (DWY):** build the client's AI content system together in one session. Documented so they run it themselves from there.
- **Done-For-You (DFY):** future tier, once DWY is proven and repeatable.

## Proof statement (use only this)

"I'm building this from scratch around night shifts. First client deal in progress. You're watching it happen in real time."

## Hard rules

- Never fake income claims, screenshots, urgency, or scarcity
- Never use pressure tactics or countdown timers
- Never pretend to be further ahead than Scott actually is
- Never position Scott as a guru, expert, or coach — he's a fellow bloke figuring it out

## Active leads

| Person | Business | Status | Next action |
|---|---|---|---|
| Scott Brodie | SafeSite Companion | Gone quiet | Send one short message — ball in his court |
| Tony Murphy | Rochelle de Maya jewellery | Gone quiet | Not reading messages. Leave until he surfaces |

---

## Platforms

| Platform | Handle | Purpose | Frequency |
|---|---|---|---|
| LinkedIn | — | B2B lead gen — business owners, discovery calls | 3x/week |
| TikTok | @scott.aimade.simple | Audience building — small business owners + AI | 14 videos/week |
| YouTube | The Bloke's Guide to AI | Long-form, searchable, slow burn | — |

## TikTok niche sentence

"I show small business owners how to use AI for their content — told by a bloke who's building it around night shifts, no fluff, no guru, just what actually works."

## TikTok content pillars (3 only)

1. **The build** — AI content systems I'm building for real clients. Show the work, not the theory.
2. **The tools** — One AI tool, one use case, one time-save. For small business owners specifically.
3. **The story** — Building this around night shifts. Real progress, real setbacks, no filter.

---

## Platform bios (live as of June 2026)

### TikTok bio (@scott.aimade.simple)
```
I show working people
How to use AI without the overwhelm
Still on nightshift
— building this on the side
Take the 2-min quiz ⬇️
```

### LinkedIn headline
```
49. Highway maintenance worker. Built an AI marketing team that installs itself in one prompt. No code. No developer. £18/month to run. | DM me TEAM for the free starter kit.
```
> "Free starter kit" = the AI Business Brief Google Doc (see below). DM response flow must be set up in LinkedIn before this goes live.

---

## AI Business Brief (free lead magnet)

A one-page Google Doc that small business owners fill in about their business. Drop it into any AI tool and it writes content that sounds like them — not like a chatbot.

- **Google Doc ID:** `1Mp7_cmYYC8V4zKyRSvgTtPzwT2VRTT1k2oNrWajeDo8`
- **Trigger:** LinkedIn DM "TEAM" / quiz completion
- Needs to be set to "Anyone with the link can view" before sharing

---

## AI Readiness Quiz

**Live at:** `ainightshift.co.uk`
**Code:** `quiz-live` branch in high-power-brain repo
**Built:** 2026-05-31 | **Overhauled:** 2026-06-04

### Quiz flow (current — overhauled 2026-06-04)
Landing → 5 questions → email capture screen → results displayed inline → Netlify function fires

Email capture is now **inline** (not a redirect to Systeme.io). The Netlify function handles:
1. Contact creation in Systeme.io
2. Correct stage tag applied based on score
3. Notification email to scott@digital-madesimple.co.uk via Resend (includes all 5 Q&As)

### 5 quiz questions
1. Where are you at with AI right now?
2. What's your biggest frustration with content?
3. What kind of business do you run?
4. How much time do you spend on content per week?
5. Would you pay for a done-with-you AI content system?

### Result tiers (MAX_SCORE = 125)
| Stage | Score | Label | Tag ID |
|---|---|---|---|
| Stage 1 | <40% (<50 pts) | Just Starting Out | 2018859 |
| Stage 2 | 40–69% (50–86 pts) | Making Progress | 2036624 |
| Stage 3 | 70%+ (87+ pts) | Ready to Scale | 2036625 |
| All | — | quiz-lead | 2038166 |

### Netlify environment variables required
- `SYSTEME_API_KEY` — Systeme.io API key
- `RESEND_API_KEY` — Resend API key (for notification emails to Scott)

### Outstanding quiz tasks
- [ ] Add `RESEND_API_KEY` to Netlify environment variables for quiz-live site
- [ ] Build 3 Systeme.io automations: Stage 1/2/3 tag → send welcome email with Business Brief link
- [ ] Build LinkedIn infographic (Canva) to promote quiz
- [ ] Post LinkedIn quiz promotion post

---

## Email sequences (built 2026-06-04)

**Google Doc:** `1YnY8ZEGtPutA2GcWAX9fQ5X_tLd0MwBUBMGKIca0jl4`
"AI Nightshift — Email Sequences (Brief + Stage 1, 2, 3)"

| Sequence | Trigger | Emails | Goal |
|---|---|---|---|
| Brief email | LinkedIn DM "TEAM" / Business Brief sign-up | 1 | Deliver the doc, warm welcome |
| Stage 1 | Stage 1 tag fires | 3 over 7 days | First step, build trust, warm toward DWY |
| Stage 2 | Stage 2 tag fires | 4 over 10 days | Name the gap, move toward DWY |
| Stage 3 | Stage 3 tag fires | 3 over 7 days | Fast-track to discovery call |

### Before activating
- [ ] Replace all `[ZCAL LINK]` with booking link
- [ ] Replace `[BUSINESS BRIEF LINK]` with shared Google Doc link
- [ ] Set Business Brief doc to "Anyone with link can view"
- [ ] Test quiz → confirm correct tag fires in Systeme.io
- [ ] Send test email from each sequence

**Sender:** Scott — AI Nightshift
**From:** scott@ainightshift.co.uk
**Reply-to:** scott@digital-madesimple.co.uk

---

## Domain & hosting

- **Domain:** `ainightshift.co.uk` — purchased 2026-05-31 via GoDaddy
- **Hosting:** Netlify (frolicking-sunburst-d3ce08 project)
- **Deploy branch:** `quiz-live` in high-power-brain repo
