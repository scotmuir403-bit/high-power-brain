# Hero Section Specification

## Overview
- **Target file:** `src/components/Hero.tsx`
- **Screenshot:** `docs/design-references/desktop-full-1440.png` (top section below header)
- **Interaction model:** static

## DOM Structure
```
<section> (full-width, min-height ~80vh)
  <div> (2-column grid: text left, imagery right)
    <div> (left column — text content)
      <h1>"Timeless Elegance"</h1>
      <p>"Hand Crafted Luxury Jewellery collection. We don't compromise because you shouldn't have to"</p>
    </div>
    <div> (right column — product imagery)
      <img src="/images/hero-product.jpeg" /> (main product photo, tall portrait)
      <img src="/images/hero-decorative.png" /> (decorative/overlay element)
    </div>
  </div>
</section>
```

## Computed Styles

### Section container
- background-color: #FFFFFF
- padding-top: 80px (to clear fixed header)
- min-height: 80vh
- display: flex
- align-items: center
- overflow: hidden

### Inner wrapper
- max-width: 1200px
- margin: 0 auto
- padding: 60px 24px
- display: grid
- grid-template-columns: 1fr 1fr
- gap: 48px
- align-items: center

### Left column — text
- display: flex
- flex-direction: column
- gap: 24px
- padding-right: 24px

### Heading (h1)
- font-family: Inter, sans-serif
- font-size: 48px (desktop)
- font-weight: 300 (light/thin — luxury aesthetic)
- color: #333333
- line-height: 1.2
- letter-spacing: 0.03em
- text-transform: none

### Subtext (p)
- font-family: Inter, sans-serif
- font-size: 16px
- font-weight: 400
- color: #666666
- line-height: 1.7
- max-width: 420px

### Right column — imagery
- position: relative
- display: flex
- justify-content: center
- align-items: center

### Hero product image (main)
- height: 500px (desktop)
- width: auto
- object-fit: cover
- border-radius: 8px (subtle)

### Decorative element (image-11-1.png)
- position: absolute or alongside main image
- likely a text/badge overlay or decorative pattern
- smaller than main image
- z-index above main image if overlaid

## States & Behaviors

### Static — no animations
- Elements are visible on page load
- No scroll-triggered animations on this section

### Hover states
- N/A (no interactive elements in hero)

## Assets
- Main product photo: `/images/hero-product.jpeg` (687×1024px portrait)
- Decorative element: `/images/hero-decorative.png`

## Text Content (verbatim)
- Heading: "Timeless Elegance"
- Subtext: "Hand Crafted Luxury Jewellery collection. We don't compromise because you shouldn't have to"

## Responsive Behavior
- **Desktop (1440px):** 2-column grid, text left, image right
- **Tablet (768px):** 2-column maintained, reduced font sizes
- **Mobile (390px):** Single column, text above, image below (or image hidden). h1 ~32px
- **Breakpoint:** stacks at ~768px
