# Web Made Simple — Claude Code Instructions

## What This Project Is
You are helping Scott Muir build local business websites for small trades
businesses and service providers in East Glasgow, Scotland.

Two types of clients:
- FREE — free website in exchange for a testimonial and case study
- PAID — £497 one-off fee, no monthly costs, delivered in 7 days

## About Scott
- Name: Scott Muir
- Business: Web Made Simple (part of Digital Made Simple)
- Location: East Glasgow, G33, Scotland
- Target clients: Trades, sole traders, local service businesses
- Tech stack: Vanilla HTML, CSS, JavaScript only — no frameworks unless asked
- Deploy to: Vercel

## How to Start a New Client Website

When Scott says "new client" or "build a site for [name]":

1. READ their brief.md in their client folder first
2. READ the relevant skills listed below
3. CREATE the folder: clients/[STATUS]-[ClientName]/
4. WRITE copy.md first — all written content before building
5. BUILD index.html using all rules below
6. RUN through launch checklist before declaring done

Never start building without: business name, trade, location, phone number.
If brief is incomplete, list exactly what is missing — max 5 questions.

## Required Sections — Every Site (in this order)
1. Header — business name + phone, sticky
2. Hero — strong headline, subheadline, CTA (call or WhatsApp)
3. Services — what they do, clear and scannable
4. About / Why Us — trust signals, years experience, local area
5. Testimonials — real ones or [TESTIMONIAL NEEDED] markers
6. Service Area — postcodes and areas covered
7. Contact — phone, WhatsApp, simple form, map if address given
8. Footer — name, phone, address, copyright

## CTA Rules
- Primary CTA always: Call or WhatsApp — trades do not use forms
- Phone number in header + hero + footer minimum
- WhatsApp: https://wa.me/44[number without leading 0]
- Click-to-call: <a href="tel:+44XXXXXXXXXX">
- Every section needs a CTA

## Copy Rules
- Headline: outcome-focused not feature-focused
  WRONG: "Plumbing Services in Glasgow"
  RIGHT: "No More Leaks. No More Waiting. Glasgow's Trusted Plumber."
- Write for the customer's problem
- Use local references naturally
- Short paragraphs — 2-3 lines max
- No AI-sounding copy — apply humanizer rules
- Social proof near the top

## Design Rules
- Mobile-first — over 70% of local search is mobile
- Bold, strong design — not generic corporate white
- High contrast — customers are often 45-65
- NOT Inter, Roboto, or Arial — use characterful fonts
- No Lorem Ipsum — use [PLACEHOLDER: description] instead
- No stock photo text — use [PHOTO NEEDED: description]
- Follow frontend-design skill rules

## Local SEO — Every Site
- Title tag: [Business Name] | [Trade] in [Area], Glasgow
- Meta description: under 155 chars, includes location + trade
- H1: includes trade + location naturally
- Alt text on all images
- Address or area in footer
- LocalBusiness schema in head:

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "[Business Name]",
  "description": "[What they do]",
  "telephone": "[Phone]",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Glasgow",
    "addressRegion": "Scotland",
    "addressCountry": "GB"
  },
  "areaServed": "[Areas covered]"
}
</script>

## Technical Standards
- Single HTML file — CSS and JS embedded
- Google Fonts allowed — one pairing max, loaded async
- Responsive at 375px, 768px, 1200px
- No heavy images — compress above 200kb
- No console errors

## Quality Checklist — Run Before Every Handover
- [ ] Phone in header, hero, and footer
- [ ] WhatsApp link correct format
- [ ] Click-to-call works
- [ ] No Lorem Ipsum
- [ ] All placeholders clearly marked
- [ ] Mobile checked at 375px
- [ ] Title tag written
- [ ] Meta description under 155 chars
- [ ] LocalBusiness schema present
- [ ] H1 includes trade + location
- [ ] Testimonials section present
- [ ] Service area section present
- [ ] No console errors

## File Structure Per Client
clients/[STATUS]-[ClientName]/
├── brief.md       — client info and intake answers
├── copy.md        — all written content
├── index.html     — the website
├── assets/        — photos, logo
└── case-study.md  — completed after launch

STATUS = FREE or PAID
ClientName = PascalCase no spaces eg DyltonsGlazing

## Skills to Use
- UI and design: /mnt/skills/public/frontend-design/SKILL.md
- Page copy: /mnt/skills/user/copywriting/SKILL.md
- Human copy: /mnt/skills/user/humanizer/SKILL.md
- Images: /mnt/skills/user/image/SKILL.md
- Client pain points: /mnt/skills/user/customer-research/SKILL.md
- Trust and persuasion: /mnt/skills/user/marketing-psychology/SKILL.md
- Pre-launch: /mnt/skills/user/launch/SKILL.md
- Outreach: /mnt/skills/user/local-business-outreach/SKILL.md

## New Client Prompt Template
Scott pastes this when a client agrees:

New client — [FREE/PAID]
Business name: [NAME]
Trade: [WHAT THEY DO]
Location: [AREA]
Phone: [NUMBER]
Email: [IF PROVIDED]
WhatsApp: [IF DIFFERENT]
Address: [IF PROVIDED]
About them: [reviews, years trading, USPs]
Photos: [YES/NO]
Logo: [YES/NO]
Areas covered: [POSTCODES OR AREAS]
Notes: [ANYTHING ELSE]

## First Three Free Clients — Priority Order
1. Dylton's Glazing & Joinery — 4.9 stars, 113 reviews, +44 7379 726166, 42 McCallum Ave Glasgow
2. Touch Of Decoration LTD — 5.0 stars, 46 reviews, +44 7757 337945, 13 Loanhead St Glasgow
3. Trusty Pipes Limited — 4.5 stars, 41 reviews, +44 7880 000831, Glasgow

Build Dylton's first — best case study potential.

## Deploying
vercel --prod from inside the client folder
Target: [businessname].vercel.app until they have a domain
