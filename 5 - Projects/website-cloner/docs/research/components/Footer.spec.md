# Footer Specification

## Overview
- **Target file:** `src/components/Footer.tsx`
- **Screenshot:** `docs/design-references/desktop-full-1440.png` (bottom of page)
- **Interaction model:** static (social links + quick links are standard anchors)

## DOM Structure
```
<footer>
  <div> (top section — 3 columns)
    <div> (column 1 — brand)
      <a href="/"><img src="/images/logo.png" /></a>
      <img src="/images/footer-tagline.png" /> (decorative tagline graphic)
    </div>
    <div> (column 2 — Quick Links)
      <h4>"Quick Links"</h4>
      <ul>
        <li><a href="/shipping-and-returns/">Shipping And Returns</a></li>
        <li><a href="/terms-conditions/">Terms & Conditions</a></li>
        <li><a href="/privacy-policy/">Privacy Policy</a></li>
        <li><a href="/wholesale-enquiry/">Wholesale Enquiry</a></li>
        <li><a href="/terms-of-service/">Terms Of Service</a></li>
      </ul>
    </div>
    <div> (column 3 — Contact)
      <h4>"Contact"</h4>
      <a href="mailto:...">hello@rochelledemaya.co.uk</a>
      <address>Cotton Court Business Centre, Church St, Preston, Lancashire PR1 3BY</address>
      <p><strong>Tel</strong>: 01772 281985</p>
      <button>"Subscribe for VIP"</button>
    </div>
  </div>
  <div> (social row)
    <a href="...">Facebook</a>
    <a href="...">Instagram</a>
    <a href="...">Linkedin</a>
  </div>
  <div> (bottom bar)
    <p>"© 2026 Rochelle de Maya. All right reserved."</p>
  </div>
  <!-- Floating email icon -->
  <a href="mailto:hello@rochelledemaya.co.uk"> (fixed/floating bottom-right)
    <img src="/images/icons/email.svg" />
  </a>
</footer>
```

## Computed Styles

### Footer container
- background-color: #1A1A1A (dark near-black — common for jewellery brand footers)
- color: #FFFFFF
- padding: 60px 24px 24px

### Inner wrapper
- max-width: 1200px
- margin: 0 auto

### Top 3-column grid
- display: grid
- grid-template-columns: 1.5fr 1fr 1fr
- gap: 48px
- padding-bottom: 48px
- border-bottom: 1px solid rgba(255,255,255,0.15)

### Column 1 — Logo area
- display: flex
- flex-direction: column
- gap: 20px

### Logo image
- height: 40px
- width: auto
- filter: brightness(0) invert(1) (to make logo white on dark bg — if logo has dark elements)

### Footer tagline image
- max-width: 200px
- width: 100%
- opacity: 0.9

### Column headings (h4)
- font-size: 13px
- font-weight: 600
- color: #FFFFFF
- text-transform: uppercase
- letter-spacing: 0.1em
- margin-bottom: 20px

### Quick Links list
- list-style: none
- padding: 0
- margin: 0
- display: flex
- flex-direction: column
- gap: 10px

### Footer links (a)
- font-size: 13px
- color: rgba(255,255,255,0.65)
- text-decoration: none
- transition: color 0.2s ease
- hover: color: #CEAC7E

### Contact text
- font-size: 13px
- color: rgba(255,255,255,0.65)
- line-height: 1.8

### Subscribe for VIP button
- background-color: transparent
- border: 1px solid rgba(255,255,255,0.5)
- color: #FFFFFF
- font-size: 12px
- padding: 10px 20px
- margin-top: 16px
- cursor: pointer
- transition: all 0.2s ease
- hover: border-color: #CEAC7E, color: #CEAC7E

### Social row
- display: flex
- gap: 20px
- padding: 32px 0
- border-bottom: 1px solid rgba(255,255,255,0.15)

### Social links (a)
- font-size: 13px
- color: rgba(255,255,255,0.65)
- text-decoration: none
- text-transform: uppercase
- letter-spacing: 0.05em
- hover: color: #CEAC7E
- transition: color 0.2s ease

### Bottom bar
- padding-top: 24px
- text-align: center
- font-size: 12px
- color: rgba(255,255,255,0.4)

### Floating email icon
- position: fixed
- bottom: 24px
- right: 24px
- width: 48px
- height: 48px
- background-color: #CEAC7E
- border-radius: 50%
- display: flex
- align-items: center
- justify-content: center
- box-shadow: 0 4px 12px rgba(0,0,0,0.2)
- z-index: 50
- transition: background-color 0.2s ease
- hover: background-color: #b8975f

### Email icon image
- width: 20px
- height: 20px
- filter: brightness(0) invert(1) (make white)

## States & Behaviors

### Hover on links
- color: rgba(255,255,255,0.65) → #CEAC7E
- transition: 0.2s ease

### Floating email icon hover
- scale slightly or darken
- transition: 0.2s

## Assets
- Logo: `/images/logo.png`
- Footer tagline graphic: `/images/footer-tagline.png`
- Email SVG: `/images/icons/email.svg`

## Text Content (verbatim)
Quick Links: Shipping And Returns | Terms & Conditions | Privacy Policy | Wholesale Enquiry | Terms Of Service

Contact:
- Email: hello@rochelledemaya.co.uk
- Address: Cotton Court Business Centre, Church St, Preston, Lancashire PR1 3BY
- Tel: 01772 281985

Social: Facebook | Instagram | Linkedin

Copyright: © 2026 Rochelle de Maya. All right reserved.

## Responsive Behavior
- **Desktop (1440px):** 3-column layout
- **Tablet (768px):** 2-column grid (logo+quick links) or stacked
- **Mobile (390px):** Single column, all stacked
- **Breakpoint:** 3→1 column at ~768px

## Implementation Notes
- Floating email icon is `position: fixed` — place it inside footer but style as fixed
- "Subscribe for VIP" triggers same modal as VIPBanner — consider a shared modal state or simple alert
- Social links: use real URLs from site
  - Facebook: https://www.facebook.com/share/1HUGTQ482y/?mibextid=wwXIfr
  - Instagram: https://www.instagram.com/rochelle.de.maya?igsh=MWg1bnEyczg0N29ubQ%3D%3D&utm_source=qr
  - LinkedIn: https://www.linkedin.com/company/rochelle-de-maya/
