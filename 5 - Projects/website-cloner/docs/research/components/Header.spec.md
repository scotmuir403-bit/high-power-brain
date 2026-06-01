# Header / Nav Specification

## Overview
- **Target file:** `src/components/Header.tsx`
- **Screenshot:** `docs/design-references/desktop-full-1440.png` (top ~80px)
- **Interaction model:** scroll-triggered (gains white background + shadow after scrolling ~50px)

## DOM Structure
```
<header> (fixed, full-width, z-index high)
  <nav> (max-width ~1200px, centered, flex, space-between)
    <a href="/"> (logo)
      <img src="/images/logo.png" height ~50px />
    </a>
    <ul> (flex row, gap ~32px)
      <li><a>Home</a></li>
      <li><a>About</a></li>
      <li><a>Shop</a></li>
      <li><a>Drops</a></li>
      <li><a>PVD</a></li>
    </ul>
    <div> (cart icon + count)
      cart icon + badge showing "0"
    </div>
  </nav>
</header>
```

## Computed Styles

### Header container
- position: fixed
- top: 0
- left: 0
- right: 0
- z-index: 999
- background-color: transparent (at top) → #ffffff (scrolled)
- transition: background-color 0.3s ease, box-shadow 0.3s ease
- padding: 12px 0

### Nav inner wrapper
- max-width: 1200px
- margin: 0 auto
- padding: 0 24px
- display: flex
- align-items: center
- justify-content: space-between

### Logo
- height: 50px
- width: auto

### Nav links
- font-family: Inter, sans-serif
- font-size: 14px
- font-weight: 500
- color: #333333
- text-decoration: none
- letter-spacing: 0.02em
- transition: color 0.2s ease
- hover color: #CEAC7E

### Nav list
- display: flex
- list-style: none
- gap: 32px
- margin: 0
- padding: 0

### Cart icon area
- display: flex
- align-items: center
- gap: 8px
- font-size: 14px
- cursor: pointer
- color: #333333

## States & Behaviors

### Scroll-triggered background
- **Trigger:** window.scrollY > 50
- **State A (top):** background: transparent, box-shadow: none
- **State B (scrolled):** background: rgba(255,255,255,0.97), box-shadow: 0 2px 12px rgba(0,0,0,0.08)
- **Transition:** transition: all 0.3s ease
- **Implementation:** useEffect + scroll event listener, toggle CSS class `header-scrolled`

### Nav link hover
- **color:** #333333 → #CEAC7E
- **Transition:** color 0.2s ease

## Assets
- Logo: `/images/logo.png`

## Text Content
- Nav: Home | About | Shop | Drops | PVD
- Cart count: 0

## Responsive Behavior
- **Desktop (1440px):** Full nav visible, logo left, links center/right, cart right
- **Tablet (768px):** Same layout, slightly reduced padding
- **Mobile (390px):** Logo left, hamburger menu icon right (hide nav links), cart icon
- **Breakpoint:** nav links hide at ~768px, show hamburger

## Implementation Notes
- Use `"use client"` directive for scroll listener
- Cart icon: use a simple shopping bag SVG (can be inline)
- Mobile hamburger: toggle a mobile nav drawer (full-width dropdown)
- Page body needs `padding-top: ~74px` to offset fixed header
