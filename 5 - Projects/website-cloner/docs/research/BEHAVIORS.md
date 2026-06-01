# Behaviors — rochelledemaya.co.uk

## Scroll Behaviors

### Header scroll trigger
- **Trigger:** Scroll past ~50–100px
- **State A (top):** Header background likely transparent or white, no shadow
- **State B (scrolled):** Background white/opaque, box-shadow added
- **Transition:** ~0.3s ease
- **Implementation:** scroll event listener or IntersectionObserver on hero section

### Section entrance animations
- Elementor typically adds fade-up or fade-in animations to sections
- Likely: opacity 0 → 1, transform translateY(20px) → 0 on scroll into view
- Uses IntersectionObserver

## Time-driven Behaviors

### Countdown Timer (Next Drop section)
- Live countdown to a future date/time
- Displays: Days, Hours, Minutes, Seconds
- Updates every second
- **Implementation:** `useEffect` with `setInterval(1000)`, `"use client"` component
- Target date: unknown (needs to be set in code — use a placeholder date ~30 days out)

## Auto-scroll Behaviors

### Gallery Carousel
- 8 images auto-scrolling left in an infinite loop
- DOM shows images duplicated (standard CSS marquee technique)
- **Implementation:** CSS `@keyframes marquee` with `animation: marquee linear infinite`
- No user interaction (no pause on hover in standard Elementor carousel)
- Speed: moderate (estimated 30–40s for full cycle)

## Click/Interaction Behaviors

### Add to Cart buttons
- WooCommerce AJAX add-to-cart
- Implementation: static mock (button click → no action, or update cart count visually)

### "Join Us" / "Subscribe for VIP" 
- Triggers Elementor popup with email form
- Implementation: click → open modal overlay with email input

### Cart icon
- Click → opens cart drawer/sidebar
- Implementation: click → toggle cart sidebar state

### Quick View
- Hover over product card → "Quick View" link appears
- Click → modal with product details

## Hover States

### Nav links
- Likely: color change to primary gold (#CEAC7E)
- Transition: ~0.2s

### Product cards
- Image: slight scale or shadow on hover
- "Add to cart" button: visible normally or appears on hover
- "Quick View": appears as overlay or below on hover

### CTA buttons
- Background lightens or border appears
- Transition: ~0.2s

## Responsive Behavior

### Header
- Mobile: hamburger menu replaces nav links
- Logo stays left

### Hero
- Desktop: 2-column (text left, image right)
- Mobile: stacks to single column (text above, image below or hidden)

### Products Grid
- Desktop: 4 columns
- Tablet: 2 columns
- Mobile: 1–2 columns

### Countdown
- Desktop: horizontal layout (numbers side by side)
- Mobile: wraps or stays horizontal at smaller size

### Gallery
- Full width at all breakpoints, scroll speed stays same

### Footer
- Desktop: multi-column
- Mobile: stacks to single column

## Smooth Scroll
- No Lenis or Locomotive Scroll detected (standard WordPress/Elementor setup)
- Default browser scroll behavior
