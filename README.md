# Architek — Vintage Sneaker Archive

A storefront for Architek, a vintage sneaker shop selling hand-picked pairs from the 70s, 80s, 90s and Y2K. The site is a showcase: visitors browse the archive here, and every purchase happens on the shop's Depop page ([depop.com/architek](https://www.depop.com/architek/)), so Depop handles checkout and buyer protection.

## Features

- **Home page**: a bold editorial hero, scrolling tickers, and **The Archive**, a catalog you can filter by era (70s / 80s / 90s / Y2K) and US size and sort by price, year or condition.
- **Product pages**: hover-to-zoom photography, year/size/grade specs, a 10-point condition meter, wear notes, related pairs, and a "Cop it on Depop" button.
- **Honest grading guide**: explains the 1–10 condition scale.
- **Drop alerts**: a signup form (Netlify Forms) that collects email, size, favorite eras and an optional "grail" request.

## Tech

- [TanStack Start](https://tanstack.com/start) + React 19, file-based routes
- Tailwind CSS v4 (theme tokens in `src/styles.css`)
- Netlify Forms for drop-alert signups
- Netlify Image CDN for responsive WebP images
- Product photography generated for the site with Netlify AI Gateway

## Updating inventory

All listings live in **`src/data/products.ts`**. To add a pair, copy an entry, give it a unique `id`, put its photo in `public/img/`, and paste the item's Depop listing URL into `depopUrl`. Set `sold: true` to keep a sold pair on display with a "Sold" stamp.

The catalog currently holds sample pairs with studio shots. Swap them for your real Depop listings, photos and links before launch.

## Running locally

```bash
pnpm install
netlify dev   # or: pnpm dev
```

Drop-alert submissions only reach Netlify when the site is deployed (or run with `netlify dev`). Submissions show up in the Netlify dashboard under **Forms → drop-alerts**.

## Ideas for later

- Sync listings from Depop automatically instead of editing `products.ts` by hand
- Email notifications for drop-alert signups
- Multiple photos per pair
