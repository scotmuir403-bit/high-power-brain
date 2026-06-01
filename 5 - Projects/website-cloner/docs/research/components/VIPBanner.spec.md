# VIP Banner Section Specification

## Overview
- **Target file:** `src/components/VIPBanner.tsx`
- **Screenshot:** `docs/design-references/desktop-full-1440.png` (fifth section)
- **Interaction model:** click-driven (button opens email signup modal)

## DOM Structure
```
<section> (full-width, background image)
  <div> (dark overlay to ensure text readability)
    <div> (centered content)
      <h2>"Join Our VIP List"</h2>
      <p>body text</p>
      <button>"Join Us"</button>
    </div>
  </div>
  <!-- Modal (conditionally rendered) -->
  <div> (modal overlay — shown on button click)
    <div> (modal box)
      <button> (close X)
      <h3>"Join Us"</h3>
      <input type="text" placeholder="Your name" />
      <input type="email" placeholder="Your email" />
      <button>"Subscribe"</button>
    </div>
  </div>
</section>
```

## Computed Styles

### Section container
- position: relative
- background-image: url('/images/vip-background.png')
- background-size: cover
- background-position: center
- padding: 100px 24px
- text-align: center

### Dark overlay (optional — if image needs darkening)
- position: absolute
- inset: 0
- background: rgba(0,0,0,0.35)

### Inner content wrapper
- position: relative
- z-index: 1
- max-width: 700px
- margin: 0 auto
- display: flex
- flex-direction: column
- align-items: center
- gap: 20px

### Heading (h2)
- font-size: 36px
- font-weight: 300
- color: #FFFFFF
- letter-spacing: 0.04em

### Body text
- font-size: 16px
- color: rgba(255,255,255,0.85)
- line-height: 1.7
- max-width: 520px
- text-align: center

### "Join Us" button
- background-color: transparent
- border: 1px solid #FFFFFF
- color: #FFFFFF
- font-size: 13px
- font-weight: 500
- padding: 14px 40px
- text-transform: uppercase
- letter-spacing: 0.1em
- cursor: pointer
- transition: all 0.2s ease
- hover: background-color: #FFFFFF, color: #333333

### Modal overlay
- position: fixed
- inset: 0
- background: rgba(0,0,0,0.6)
- z-index: 1000
- display: flex
- align-items: center
- justify-content: center

### Modal box
- background: #FFFFFF
- padding: 48px 40px
- max-width: 440px
- width: 90%
- border-radius: 4px
- position: relative
- display: flex
- flex-direction: column
- gap: 16px

### Modal close button
- position: absolute
- top: 16px
- right: 16px
- background: none
- border: none
- font-size: 20px
- cursor: pointer
- color: #333333
- line-height: 1

### Modal heading
- font-size: 24px
- font-weight: 300
- color: #333333
- text-align: center

### Modal input
- width: 100%
- padding: 12px 16px
- border: 1px solid #DDDDDD
- border-radius: 2px
- font-size: 14px
- font-family: Inter, sans-serif
- outline: none
- focus: border-color: #CEAC7E

### Modal subscribe button
- width: 100%
- background-color: #CEAC7E
- color: #FFFFFF
- font-size: 13px
- font-weight: 500
- padding: 14px
- border: none
- border-radius: 2px
- text-transform: uppercase
- letter-spacing: 0.08em
- cursor: pointer
- transition: background-color 0.2s ease
- hover: background-color: #b8975f

## States & Behaviors

### Modal open/close
- **Trigger:** Click "Join Us" button
- **State A:** Modal not visible (display: none or opacity: 0)
- **State B:** Modal visible (display: flex, opacity: 1)
- **Transition:** opacity 0.2s ease
- **Close:** Click overlay or × button

## Assets
- Background: `/images/vip-background.png`

## Text Content (verbatim)
- Section heading: "Join Our VIP List"
- Section body: "Add your name and email to be added to our exclusive list and get notified of future drops and special offers."
- Button: "Join Us"
- Modal heading: "Join us"
- Input 1: placeholder "Your name"
- Input 2: placeholder "Your email"
- Modal button: "Subscribe" (or "Join Us")

## Responsive Behavior
- **Desktop:** Wide section, centered content
- **Mobile:** Full-width, stacked, modal is 90% width
- **Breakpoint:** Adjusts padding at ~768px

## Implementation Notes
- Use useState for modal open/close
- "use client" directive required
- Form submission: preventDefault, close modal, no real API call needed
