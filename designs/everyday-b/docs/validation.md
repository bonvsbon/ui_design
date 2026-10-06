# Final validation

Validated 6 October 2026 on the production Nuxt build, served at `http://localhost:3100`.

## Completed checks

- `npm run typecheck`: passed.
- `npm run build`: passed; Node SSR output in `.output/`.
- `npm run test:ui`: **40 checks passed**.
- **17 automated WCAG 2 A / AA and WCAG 2.1 AA scans, zero violations**.
- Zero browser JavaScript errors or hydration mismatch reports during the final suite.
- No missing images or document-level horizontal overflow in the tested layouts.
- Invalid product, story and unknown routes each return HTTP 404.
- All runtime assets are local. Images total approximately 3 MB across the full project; fonts and license notices approximately 0.5 MB. Below-fold media loads lazily; the main hero is prioritized.

Machine-readable evidence: `docs/qa/verification.json`. Screenshot names include the route and viewport width. `preview-desktop.png`, `preview-mobile.png` and `home-overview.png` provide quick visual reviews.

## Browser coverage

Desktop 1440px and mobile 390px: homepage, catalog, product detail, technology, stories, stores, full article, about, support and studio. Additional responsive checks at 360, 768 and 1024px: homepage, catalog and product detail.

Interactive coverage: mega menu/Escape; predictive search and empty state; wishlist persistence; quick-view size validation; bag add, quantity, persistence, order preview and removal; catalog filter, sort and reset; PDP color/size preservation into bag; technology tab keyboard navigation; province/district lookup; studio content save/reload/restore; mobile filter dialog, mobile menu and accordion. Native dialogs were also scanned while open.

Visual review inspected the complete homepage composition, first desktop and mobile viewport, listing, detail purchase controls, and technology presentation. Corrected a mobile rotated-image overflow, a campaign overlay seam, competing hover/click menu behavior, accordion state coordination and local-state restoration before Nuxt hydration completed.

## Brief acceptance review

| Requirement | Result and evidence |
| --- | --- |
| Different from the current GAMBOL website | Yes: full-width coastal campaign, horizontal navigation, modular editorial shopping and bright commerce surfaces replace the fixed vertical catalog navigation. |
| Inspired by REEF without cloning | Yes: discovery and pacing principles only. Original campaign photos, GAMBOL red, typography, copy and composition; no REEF assets. |
| Offering understandable immediately | Yes: real people in sandals, flip-flop/slide copy, Men/Women CTAs, and category discovery directly below. |
| Product reached within 2–3 interactions | Yes: category → product or predictive search → product; homepage quick view opens directly. |
| GBOLD visible as a brand advantage | Yes: top navigation, promise strip, full interactive homepage section, dedicated route and product detail section. |
| Lifestyle brand rather than catalog | Yes: original Thai coastal/city/family campaign imagery, asymmetric story section, lifestyle discovery and editorial articles. |
| Intentional mobile design | Yes: dedicated header and bottom navigation, scrollable cards, two-column catalog, full-screen dialogs, mobile filters and technology accordion. |
| Future CMS/API manageable | Yes: typed ordered section schema, enable/disable, media/copy/CTA/product/collection configuration, local editor and repository boundary. |
| Reusable components | Yes: cards, carousel, purchase panel, technology, stories, locator and shared navigation reused across routes. |
| Separate project and previous concepts preserved | Yes: all created/modified project files are under `gambol-reef-concept/`; previous concepts were read only for reference assets. |

## Deliberate concept limits

Commerce, prices, sizes, stock, retailer records, account and newsletter behavior are illustrative and local. No payment, real order, authentication email or subscription request is sent. Location examples link to neighbourhood maps, with an official locator link for confirmed stores. A production integration needs verified data, licensed master assets, authentication and server-authoritative commerce. Automated accessibility checks do not constitute a formal audit, and field Core Web Vitals have not been measured.
