# Digital Made Simple — Storefront

Scott Muir's personal creator storefront. Single-page, mobile-first, Vercel-ready.

## Deploy to Vercel

1. Push this folder to a GitHub repo (or the whole brain repo)
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import the repo → set **Root Directory** to `5 - Projects/digital-made-simple-storefront`
4. Deploy — no build command needed (static HTML)

## Before going live — TODOs

Search `index.html` for `TODO` — each one needs filling in before launch:

| # | What | Where in the file |
|---|---|---|
| 1 | Profile photo | Replace `SM` initials avatar with `<img>` tag |
| 2 | Free guide opt-in URL | `href="#TODO-optin-page-url"` on the Get the Free Guide button |
| 3 | Free guide sub-copy | Update the paragraph under the guide title |
| 4 | Booking link | `href="#TODO-booking-link"` on the Book a Free Call button |
| 5 | Gumroad link — Hook Pack | `href="#TODO-gumroad-hook-pack"` |
| 6 | Gumroad link — Prompt Pack | `href="#TODO-gumroad-prompt-pack"` |
| 7 | LinkedIn URL | `href="#TODO-linkedin-url"` |
| 8 | YouTube URL | `href="#TODO-youtube-url"` |
| 9 | Business email | `href="mailto:..."` in social row |
| 10 | Domain in footer | Update `digital-madesimple.co.uk` line |

## Adding more products

Copy the product block between `<!-- Product N -->` and `<hr class="divider">` and paste it before the closing `</div>` of `.products-grid`. Update title, price, format, description, and Gumroad link.

## Design decisions

- Vanilla HTML/CSS — no build step, deploys anywhere
- Barlow Condensed + Barlow from Google Fonts
- Dark bg `#0a0a0a`, cards `#181818`, accent orange `#f97316`
- Max width 520px, optimised for 375px phone screens
- Staggered fade-up entrance animations — pure CSS, no JS
