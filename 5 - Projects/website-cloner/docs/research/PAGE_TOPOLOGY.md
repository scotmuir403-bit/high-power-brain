# Page Topology — rochelledemaya.co.uk

## Overall Layout
- Single-page scroll site built on WordPress + Elementor
- Full-width sections stacked vertically
- Fixed/sticky header nav overlays content
- White background (#FFFFFF) globally
- Max content width appears ~1200px centered

## Sections (top to bottom)

| # | Name | Type | Interaction Model |
|---|------|------|-------------------|
| 0 | Header / Nav | Fixed overlay | Static + scroll-triggered (background/shadow on scroll) |
| 1 | Hero | Full-width | Static (2-column: text left, product photo right) |
| 2 | Countdown / Next Drop | Full-width | Time-driven (live countdown timer) |
| 3 | Products Grid | Full-width | Click-driven (WooCommerce add-to-cart, quick view) |
| 4 | VIP Banner | Full-width | Click-driven (popup trigger) |
| 5 | Gallery Carousel | Full-width | Auto-scroll (infinite loop marquee/CSS scroll) |
| 6 | Footer | Full-width | Static |

## Z-Index Layers
- Header: fixed, highest z-index
- Cart drawer (×): modal overlay
- Everything else: normal flow

## Section Details

### 0. Header / Nav
- Logo left (Mask-group-1.png)
- Nav links center/right: Home, About, Shop, Drops, PVD
- Cart icon with count badge (0)
- Likely transparent on hero, gains background on scroll

### 1. Hero
- Heading: "Timeless Elegance"
- Subtext: "Hand Crafted Luxury Jewellery collection. We don't compromise because you shouldn't have to"
- Left: text content
- Right: product photo (IMG_4389-687x1024.jpeg) + decorative element (image-11-1.png)
- Background: white or very light

### 2. Countdown — "Next Drop In"
- Heading: "Next Drop In"
- Body: "Enjoy pieces from our collection at 20–40% off retail prices during our limited drop sales. Click the link below to join our VIP list"
- Countdown: Days / Hours / Minutes / Seconds (live JS timer)
- CTA: "Visit drop page" → /drops/
- Likely darker background (gold or cream tone)

### 3. Products Grid — "Our Products"
- Heading: "Our Products"
- Subtext: "Timeless designs crafted for everyday elegance. Discover pieces that shine with every look."
- Product cards (4 shown):
  - 87116-0 18K Triple Layer Gold Ring — £39.00
  - 90680-0 18K Triple Layer Gold Necklace — £39.00
  - 87722-0 18K Triple Layer Gold Bracelet — £49.00
  - 87638-0 18K Triple Layer Gold Bracelet — £59.00
- Each card: image, category label, name, price, Add to cart + Quick View
- CTA: "View All Products" → /shop/

### 4. VIP Banner
- Background: image-2.png (full-width background)
- Heading: "Join Our VIP List"
- Body: "Add your name and email to be added to our exclusive list and get notified of future drops and special offers."
- CTA: "Join Us" → triggers Elementor popup

### 5. Gallery Carousel — "Rochelle de Maya Gallery"
- Heading: "Rochelle de Maya Gallery"
- Subtext: "A glimpse of our elegant creations crafted to shine in every moment."
- 8 images in infinite marquee (images duplicated in DOM for looping)
- Auto-scrolling left, no user interaction required
- Gallery images: Necklace, AI-generated model, Bracelet, Earrings, Ring, Bracelet (87312, 87638)

### 6. Footer
- Logo
- "Your paragraph text" image (likely decorative/tagline graphic)
- Quick Links: Shipping & Returns, T&C, Privacy Policy, Wholesale Enquiry, Terms of Service
- Contact: email, address (Cotton Court Business Centre, Church St, Preston, Lancashire PR1 3BY), Tel: 01772 281985
- Subscribe for VIP (popup)
- Social: Facebook, Instagram, LinkedIn
- Copyright: © 2026 Rochelle de Maya. All right reserved.
- Email SVG icon (floating?)

## Dependencies
- Header must be built before any section (z-index stacking)
- Gallery carousel CSS animation must be in globals.css
- Countdown timer needs client-side JS (use `"use client"`)
- VIP popup = static modal (no real backend needed)
