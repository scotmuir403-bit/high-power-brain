# Product Grid Section Specification

## Overview
- **Target file:** `src/components/ProductGrid.tsx`
- **Screenshot:** `docs/design-references/desktop-full-1440.png` (fourth section)
- **Interaction model:** static (with hover states on cards; add-to-cart is mock/visual only)

## DOM Structure
```
<section>
  <div> (section header — centered)
    <h2>"Our Products"</h2>
    <p>subtext</p>
  </div>
  <ul> (product grid — 4 columns)
    <li> (product card) × 4
      <div> (image wrapper with hover overlay)
        <img src="..." />
        <div> (hover overlay with "Quick View" button)
      </div>
      <div> (card body)
        <span> (category label e.g. "Rings")
        <a> (product name)
        <span> (price "£39.00")
        <button> "Add to cart"
      </div>
    </li>
  </ul>
  <div> (centered CTA)
    <a href="/shop/">"View All Products"</a>
  </div>
</section>
```

## Computed Styles

### Section container
- background-color: #FFFFFF
- padding: 80px 24px

### Section header
- text-align: center
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
- max-width: 500px
- margin: 0 auto

### Product grid (ul)
- display: grid
- grid-template-columns: repeat(4, 1fr)
- gap: 24px
- max-width: 1200px
- margin: 0 auto
- list-style: none
- padding: 0

### Product card (li)
- background-color: #FFFFFF
- border: 1px solid #EEEEEE
- border-radius: 4px
- overflow: hidden
- transition: box-shadow 0.2s ease
- hover: box-shadow: 0 4px 20px rgba(0,0,0,0.1)

### Image wrapper
- position: relative
- aspect-ratio: 1 / 1
- overflow: hidden
- background-color: #F9F5F0

### Product image
- width: 100%
- height: 100%
- object-fit: cover
- transition: transform 0.3s ease
- hover: transform: scale(1.05)

### Quick View overlay
- position: absolute
- bottom: 0
- left: 0
- right: 0
- background: rgba(255,255,255,0.9)
- padding: 12px
- text-align: center
- opacity: 0
- transition: opacity 0.2s ease
- card hover → opacity: 1

### Quick View link
- font-size: 12px
- font-weight: 500
- color: #333333
- text-decoration: none
- text-transform: uppercase
- letter-spacing: 0.08em

### Card body
- padding: 16px

### Category label
- font-size: 11px
- color: #CEAC7E
- text-transform: uppercase
- letter-spacing: 0.1em
- display: block
- margin-bottom: 6px

### Product name (link)
- font-size: 14px
- font-weight: 500
- color: #333333
- text-decoration: none
- display: block
- margin-bottom: 8px
- hover: color: #CEAC7E

### Price
- font-size: 15px
- font-weight: 600
- color: #333333
- display: block
- margin-bottom: 12px

### Add to cart button
- width: 100%
- background-color: #333333
- color: #FFFFFF
- font-size: 12px
- font-weight: 500
- padding: 10px 16px
- border: none
- border-radius: 2px
- cursor: pointer
- text-transform: uppercase
- letter-spacing: 0.08em
- transition: background-color 0.2s ease
- hover: background-color: #CEAC7E

### CTA wrapper
- text-align: center
- margin-top: 48px

### "View All Products" link
- display: inline-block
- border: 1px solid #333333
- color: #333333
- font-size: 13px
- font-weight: 500
- padding: 14px 40px
- text-decoration: none
- text-transform: uppercase
- letter-spacing: 0.1em
- transition: all 0.2s ease
- hover: background-color: #333333, color: #FFFFFF

## Assets
- `/images/products/ring-87120.png` → Ring
- `/images/products/necklace-90680.jpg` → Necklace
- `/images/products/bracelet-87722.png` → Bracelet
- `/images/products/bracelet-87638.png` → Bracelet

## Text Content (verbatim)
Section heading: "Our Products"
Section subtext: "Timeless designs crafted for everyday elegance. Discover pieces that shine with every look."

Products:
1. Category: Rings | Name: "87116-0 18K Triple Layer Gold Ring" | Price: £39.00 | Image: ring-87120.png
2. Category: Necklaces | Name: "90680-0 18K Triple Layer Gold Necklace" | Price: £39.00 | Image: necklace-90680.jpg
3. Category: Bracelets | Name: "87722-0 18K Triple Layer Gold Bracelet" | Price: £49.00 | Image: bracelet-87722.png
4. Category: Bracelets | Name: "87638-0 18K Triple Layer Gold Bracelet" | Price: £59.00 | Image: bracelet-87638.png

CTA: "View All Products" → links to "#" (no real shop page)

## Responsive Behavior
- **Desktop (1440px):** 4-column grid
- **Tablet (768px):** 2-column grid
- **Mobile (390px):** 2-column grid (or 1-column for very narrow)
- **Breakpoint:** 4→2 columns at ~900px, 2→1 at ~480px

## Implementation Notes
- Add to cart button: onClick does nothing (visual mock — could show a brief "Added!" state)
- Use Product type from `src/types/index.ts`
- Quick View overlay: CSS hover state (no modal needed for mock)
