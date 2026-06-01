# Countdown Section Specification

## Overview
- **Target file:** `src/components/Countdown.tsx`
- **Screenshot:** `docs/design-references/desktop-full-1440.png` (third section)
- **Interaction model:** time-driven (live countdown timer updating every second)

## DOM Structure
```
<section> (full-width, distinct background color)
  <div> (centered content, max-width ~800px)
    <h2>"Next Drop In"</h2>
    <p>"Enjoy pieces from our collection at 20–40% off retail prices..."</p>
    <div> (countdown timer — 4 units)
      <div> (days unit)
        <span class="number">01</span>
        <span class="label">Days</span>
      </div>
      <div> (hours unit)
        <span class="number">10</span>
        <span class="label">Hours</span>
      </div>
      <div> (minutes unit)
        <span class="number">46</span>
        <span class="label">Minutes</span>
      </div>
      <div> (seconds unit)
        <span class="number">17</span>
        <span class="label">Seconds</span>
      </div>
    </div>
    <a href="/drops/">"Visit drop page"</a>
  </div>
</section>
```

## Computed Styles

### Section container
- background-color: #CEAC7E (warm gold — matches brand primary)
  OR a light cream: #F9F5F0 — check screenshot. Most likely the gold/warm tone.
- padding: 80px 24px
- text-align: center

### Inner wrapper
- max-width: 800px
- margin: 0 auto

### Heading (h2)
- font-family: Inter, sans-serif
- font-size: 36px
- font-weight: 300
- color: #333333 (or #FFFFFF if background is dark gold)
- margin-bottom: 16px
- letter-spacing: 0.04em

### Body text
- font-size: 16px
- color: #555555 (or #FFFFFF if dark bg)
- line-height: 1.7
- margin-bottom: 32px
- max-width: 600px
- margin-left: auto
- margin-right: auto

### Countdown timer row
- display: flex
- justify-content: center
- gap: 48px
- margin: 40px 0

### Each countdown unit (div)
- display: flex
- flex-direction: column
- align-items: center
- gap: 8px

### Number span
- font-family: Inter, sans-serif
- font-size: 56px
- font-weight: 300
- color: #333333
- line-height: 1

### Label span
- font-family: Inter, sans-serif
- font-size: 12px
- font-weight: 400
- color: #888888
- text-transform: uppercase
- letter-spacing: 0.1em

### CTA button/link ("Visit drop page")
- display: inline-block
- background-color: #333333
- color: #FFFFFF
- font-size: 14px
- font-weight: 500
- padding: 14px 32px
- border-radius: 2px
- text-decoration: none
- letter-spacing: 0.08em
- text-transform: uppercase
- margin-top: 24px
- transition: background-color 0.2s ease
- hover: background-color: #CEAC7E

## States & Behaviors

### Live countdown
- **Trigger:** Component mount
- **Implementation:** `"use client"` + useEffect with setInterval(1000)
- **Target date:** Set to 30 days from current date (placeholder)
- **Format:** Zero-padded 2 digits for each unit
- **When reached zero:** Show "Drop is live!" or stop at 00:00:00:00

## Assets
- No images in this section (text + timer only)

## Text Content (verbatim)
- Heading: "Next Drop In"
- Body: "Enjoy pieces from our collection at 20–40% off retail prices during our limited drop sales. Click the link below to join our VIP list"
- CTA: "Visit drop page"

## Responsive Behavior
- **Desktop (1440px):** 4 units in a row, large numbers
- **Tablet (768px):** 4 units still in a row, slightly smaller
- **Mobile (390px):** 4 units in a row (2×2 grid or single row with smaller numbers ~40px)
- **Breakpoint:** numbers scale down at ~480px

## Implementation Notes
- Must be `"use client"` component for countdown timer
- Import CountdownTime type from `src/types/index.ts`
- Use `suppressHydrationWarning` on the number elements to avoid SSR mismatch
