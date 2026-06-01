# Gallery Section Specification

## Overview
- **Target file:** `src/components/Gallery.tsx`
- **Screenshot:** `docs/design-references/desktop-full-1440.png` (sixth section)
- **Interaction model:** auto-scroll (infinite CSS marquee — no user interaction required)

## DOM Structure
```
<section>
  <div> (section header — centered)
    <h2>"Rochelle de Maya Gallery"</h2>
    <p>subtext</p>
  </div>
  <div> (marquee viewport — overflow: hidden)
    <div class="marquee-track"> (CSS animated, contains images × 2 for infinite loop)
      <!-- First set of 8 images -->
      <div class="gallery-item"><img src="..." alt="..." /></div>
      <div class="gallery-item"><img src="..." alt="..." /></div>
      ... (× 8)
      <!-- Duplicate set for infinite loop -->
      <div class="gallery-item"><img src="..." alt="..." /></div>
      ... (× 8)
    </div>
  </div>
</section>
```

## Computed Styles

### Section container
- background-color: #FFFFFF
- padding-top: 80px
- padding-bottom: 80px

### Section header
- text-align: center
- padding: 0 24px
- margin-bottom: 48px

### Section heading (h2)
- font-size: 32px
- font-weight: 300
- color: #333333
- letter-spacing: 0.04em
- margin-bottom: 12px

### Section subtext
- font-size: 15px
- color: #888888
- line-height: 1.7

### Marquee viewport
- overflow: hidden
- width: 100%

### Marquee track (.marquee-track — defined in globals.css)
- display: flex
- width: max-content
- animation: marquee 35s linear infinite
- gap: 16px
- padding: 0 8px

### Gallery item
- flex-shrink: 0
- width: 280px (desktop)
- height: 280px
- overflow: hidden
- border-radius: 4px

### Gallery image
- width: 100%
- height: 100%
- object-fit: cover
- display: block

## States & Behaviors

### Auto-scroll marquee
- **Trigger:** Always on (component mount)
- **Direction:** left (negative translateX)
- **Speed:** 35s for full cycle (one complete pass of all 8 images)
- **Loop:** DOM contains images × 2; when first set scrolls off, second set seamlessly continues
- **Pause on hover:** Optional but not on original — do NOT pause
- **Implementation:** Use `.marquee-track` class from globals.css (`animation: marquee 35s linear infinite`)

## Assets
Gallery images (in order):
1. `/images/gallery/necklace.png` — alt: "Necklacee"
2. `/images/gallery/model.png` — alt: "Gemini_Generated_Image_s4d89us4d89us4d8"
3. `/images/gallery/bracelet-1.png` — alt: "Bracelet."
4. `/images/gallery/earrings.png` — alt: "Earingss"
5. `/images/gallery/ring-87120.png` — alt: "87120-0"
6. `/images/gallery/bracelet-87722.png` — alt: "87722-0."
7. `/images/gallery/bracelet-87312.png` — alt: "87312-0."
8. `/images/gallery/bracelet-87638.png` — alt: "87638-0."

The 8 images are duplicated in the DOM (16 total) to create the seamless loop.

## Text Content (verbatim)
- Section heading: "Rochelle de Maya Gallery"
- Section subtext: "A glimpse of our elegant creations crafted to shine in every moment."

## Responsive Behavior
- **Desktop (1440px):** Images 280×280px, full-width marquee
- **Tablet (768px):** Images 220×220px
- **Mobile (390px):** Images 160×160px
- Image size scales with viewport but marquee behavior stays the same

## Implementation Notes
- The `.marquee-track` CSS animation is already in `src/app/globals.css`
- This is a simple client component OR can be server component (animation is CSS-only)
- No JS needed for the animation — pure CSS
- Use GalleryImage type from `src/types/index.ts`
