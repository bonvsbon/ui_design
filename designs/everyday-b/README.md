# GAMBOL · Everyday feels better

An original, standalone Thai lifestyle-footwear ecommerce design concept. REEF informs discovery and editorial pacing; the interface, campaign artwork, copy, colors and composition are GAMBOL-specific.

This entire application lives inside `everyday-b/`. All runtime images, fonts, mock content and dependencies belong to this folder; it can be moved and installed independently.

## Run locally

Use Node.js 22.12+ or 24 LTS and npm. Tested with Node 24.16.0.

```sh
cd everyday-b
npm ci
npm run dev
```

Open **http://localhost:3100**. The port is separate from the previous concepts.

Production build and preview (stop this project's dev server first):

```sh
npm run typecheck
npm run build
npm run preview
```

For a production Node server, run `PORT=3100 node .output/server/index.mjs` after building. No environment variables, remote fonts, payment keys or external services are needed for the concept.

## Explore

| Route                  | Experience                                                                 |
| ---------------------- | -------------------------------------------------------------------------- |
| `/`                    | Complete campaign-led homepage, all requested sections                     |
| `/products`            | Men's footwear by default; four-column desktop / two-column mobile catalog |
| `/products?gender=All` | Complete illustrative catalog                                              |
| `/product/demo`        | EZY Everyday Slide example detail page                                     |
| `/product/[slug]`      | Detail page for every mock product                                         |
| `/technology`          | GBOLD hotspots, keyboard tabs and mobile accordion                         |
| `/stories`             | Filterable editorial index                                                 |
| `/stories/[slug]`      | Complete story and related products                                        |
| `/stores`              | Province/district lookup and optional location-based sorting               |
| `/about`               | Brand introduction                                                         |
| `/support`             | Contact, sizing, shipping/returns explanation, FAQs and privacy            |
| `/studio`              | Local homepage content editor with JSON export                             |

## Implemented interactions

- Illustrated mega navigation, keyboard/Escape support, dedicated mobile navigation.
- Full-screen predictive product / collection / category / story search, with helpful empty results.
- Scroll-snap product carousels, hover alternate imagery, actual color-image selection, wishlist and quick view.
- URL-backed gender, style, size, color, price, technology, collection, lifestyle, new/best-seller and kids filters. Sorting and reset. Mobile filter dialog.
- Product galleries, color/size selection, unavailable sizes, size guide, add-to-bag and buy-now entry.
- Bag quantity updates, removal, totals and local order preview. Bag and wishlist persist on the current device.
- Clickable GBOLD hotspots and keyboard arrow/Home/End navigation. Mobile uses an accordion.
- Location search with optional browser geolocation, errors and sample stockists clearly labeled. Official locator link for confirmed shops.
- Newsletter/account email save a local preview preference; no sign-in or marketing email is sent.
- CMS-style section visibility, ordering, copy, media, CTAs, product selection and JSON editing/export.

## Stack and folder structure

Nuxt **3**, Vue **3**, TypeScript, Tailwind CSS and Pinia. Local Google Fonts and tree-shaken Lucide icons. Server-rendered pages and optimized local WebP images.

```text
components/
  common/       Icons, logo, responsive images, headings, locator
  navigation/   Announcement, header, mega menu, mobile nav, footer
  home/         Typed homepage sections and their renderer
  product/      Cards, carousel, purchase panel, catalog filters
  commerce/     Accessible native dialogs and commerce experiences
  technology/   GBOLD explorer
  editorial/    Story cards
layouts/        Shared page shell
pages/          File-based application routes
composables/    Mock repository adapter and currency formatting
stores/         Shopping, UI and content Pinia stores
plugins/        Client hydration of stored preferences
mock/           Illustrative catalog, editorial and store records
data/           Site configuration, homepage composition, asset provenance
types/          Shared TypeScript contracts
assets/css/     Design tokens, component styles, responsive rules, font faces
assets/icons/   Reserved for brand-approved icon assets; Lucide is imported in AppIcon
assets/fonts/   Font authoring notes; browser assets are in public/fonts
public/images/  Self-contained optimized imagery
public/fonts/   Local WOFF2 files and OFL notices
scripts/        Browser verification and optional asset optimization
docs/           Design strategy, content contract, asset credits, QA artifacts
```

Component folders are auto-imported without path prefixes. Complex style and layout rules use named CSS classes backed by design tokens; Tailwind supplies utilities. All Pinia state is scoped to this app and uses a `gambol-reef-` localStorage namespace.

## Content and future API integration

`mock/products.ts` owns product records; `mock/editorial.ts` owns stories and sample stockists. `data/homepage.ts` owns the complete ordered section list and announcement. `data/site.ts` owns navigation, footer and technology benefit records.

`composables/useCatalog.ts` is the repository boundary. Replace local imports with Nuxt `useAsyncData` / `$fetch` calls returning the same typed models. Product pages and section components can keep their existing contracts. Add server-side filter/sort pagination for a larger catalog.

`stores/content.ts` provides default content, a validation boundary, and local preview persistence. Array order controls rendering; disabled sections are skipped. Product IDs take priority over a collection. Clear selected IDs to render a collection. The studio includes form controls for frequent edits and complete JSON editing for cards, story selections, announcement links and media focal points.

A production CMS should return `SiteContent`, validate IDs and asset/CTA URLs, authenticate editors, distinguish drafts from published content, and provide locale/schedule/revision controls. Replace local browser persistence with that CMS and a server-loaded published document. Keep preview state separate from public cache state.

Real commerce requires authoritative variant IDs, price/stock checks, shipping/tax policy, authenticated accounts and a payment/order service on the server. The concept never accepts payment or claims to place an order.

See [CMS contract](docs/cms-contract.md) and [design strategy](docs/design-strategy.md).

## Design and asset notes

Square editorial surfaces, GAMBOL red, charcoal, clean white and sea-tinted technology panels. Barlow Condensed headlines, Barlow commerce UI and Noto Sans Thai. Native dialogs provide focus containment; visible focus states, semantic landmarks, reduced motion and labeled inputs are included.

The mock names, prices, availability, sizes, collections and retailer records are illustrative. Product photos come from GAMBOL references; generated lifestyle footwear is campaign art direction and is not a certified representation of a specific SKU. No REEF media or branding is used. Sources and generation prompts are recorded in [asset credits](docs/asset-credits.md).

## Verification

```sh
npm run typecheck
npm run build
# With dev or production preview running on port 3100:
npm run test:ui
```

Browser tests use installed Google Chrome by default. To use a bundled Chromium browser, run `npx playwright install chromium` and set `PLAYWRIGHT_CHANNEL=chromium`. Override the origin with `TEST_URL`. `FLOWS_ONLY=1 npm run test:ui` runs just the interaction suite.

Tests cover the requested routes at 1440px and 390px, supplementary layouts at 360/768/1024px, broken images, horizontal overflow, headings, keyboard navigation, search, bag/wishlist persistence, product variants, filters, local content editing, store search, and WCAG A/AA automated checks. Captures and the machine-readable report are saved in `docs/qa/`. These automated checks supplement visual review; they are not a formal accessibility certification or field Core Web Vitals measurement.
