# AGENTS.md — Architek vintage sneaker storefront

## What this is
A showcase site for a vintage sneaker shop. **There is no on-site checkout.** Every "buy" CTA links to the shop's Depop listing (`depopUrl`) or the shop page (`DEPOP_SHOP_URL`). The template's Stripe checkout was removed on purpose; don't add it back unless asked.

## Architecture
- `src/data/products.ts`: the single source of catalog data (the `Product` type, `DEPOP_SHOP_URL`). Pages read straight from it. Listings are currently samples for the owner to replace with real Depop items.
- `src/routes/__root.tsx`: HTML shell, site metadata, Google Fonts (Anton / Archivo / JetBrains Mono), header and footer.
- `src/routes/index.tsx`: home page with hero, tickers, The Archive (client-side era/size/sort filters), grading guide, and drop alerts.
- `src/routes/products/$productId.tsx`: product detail, keyed by the string `id` slug. Missing ids throw `notFound()`.
- `src/components/`: `SiteHeader`, `SiteFooter`, `ProductCard`, `ConditionMeter`, `DropAlertForm`.
- `src/lib/img.ts`: `cdn()` / `srcSet()` helpers. Always send images through the Netlify Image CDN, never the raw `/img/*.png`.
- `public/img/`: generated product photos (`s1`–`s8`) and `hero.png`.

## Netlify Forms
`DropAlertForm` posts to `/drop-alerts-form.html`. `public/drop-alerts-form.html` is the static registration copy that Netlify detects at deploy time. **Field names must match in both files** (`email`, `size`, `eras`, `grail`, `bot-field` honeypot). Forms detection is turned on with the netlify-forms enable script.

## Design conventions
- Palette tokens in `src/styles.css` `@theme`: `paper`, `paper-deep`, `ink`, `signal` (orange), `volt` (yellow-green), `sole`.
- Look: an archive/museum tag style. 2px ink borders, hard offset shadows (`shadow-[6px_6px_0_var(--color-ink)]`), `font-display` (Anton, uppercase) for headlines, `font-mono` for small labels, and catalog numbers like `ARC-001` taken from the product's array index.
- A film-grain overlay sits on `body::after`. Animations respect `prefers-reduced-motion`.
- Generated imagery must not show real brand logos (swooshes, stripes). Product names are descriptive, not trademarked model names.
