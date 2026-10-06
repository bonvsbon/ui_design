# GAMBOL · Five ways forward

Five independently art-directed footwear storefront prototypes, built with **Nuxt 3, Vue 3, TypeScript, and Tailwind CSS**. Local mock data only; no backend, authentication service, or payment connection.

## Run

```sh
npm install
npm run dev
```

Open http://localhost:3000. The root opens Concept 01. Use the prototype toolbar to switch concepts, open the comparison, or edit campaigns.

For a production build, stop the development server first (the current Nuxt CLI enforces a single process per project):

```sh
npm run typecheck
npm run build
npm run preview
```

## Portable offline edition

Run `npm run build:portable` to produce `portable/GAMBOL-Portable-All-5.zip` and six standalone HTML files in `portable/GAMBOL-Portable/`: one overview and five concept entry points. Each HTML contains the entire prototype, images, and fonts and can be opened directly in a desktop browser without Node or a server. See `docs/PORTABLE-README.txt` for the recipient's instructions.

The exporter creates a separate client-only Nuxt build, uses hash-based navigation, embeds assets, and bundles JavaScript into a classic script that works with `file://`. It preserves the normal website build. The first export downloads the fonts and their licenses; subsequent exports reuse the local cache. Optional `cwebp` compresses PNGs; if unavailable, the original images are embedded.

To verify the portable files with the existing suite:

```sh
TEST_URL="file://$PWD/portable/GAMBOL-Portable/GAMBOL-All-5-Concepts.html#" npm run test:ui
npm run test:portable
```

This mode disables the browser's network connection and reports any attempted HTTP requests. Results and screenshots are written to `.playwright/portable/`.

## Routes

| Route | Experience |
| --- | --- |
| `/overview` | Concept overview, comparison table, and production recommendations |
| `/concept-01` | Modern Minimal / Premium Street |
| `/concept-02` | Bold Sport / Energy |
| `/concept-03` | Lifestyle Storytelling |
| `/concept-04` | Smart Commerce, with a working three-step pair finder |
| `/concept-05` | Future Footwear, with interactive material exploration |
| `/concept-01/products` | Product listing with search, seven filter dimensions, and sorting |
| `/concept-01/product/demo` | Complete product detail with gallery, colour, size, and shopping actions |
| `/concept-02` through `/concept-05` + `/products` or `/product/demo` | Equivalent shopping demos in each concept |
| `/concept-01/product/cloud-slide` | Example real mock-product URL; all catalog IDs work in all concepts |
| `/studio` | Browser-local campaign editor, section visibility, reordering, and JSON export |

## Implemented interactions

- Responsive navigation with a mobile shop menu and five-item bottom navigation.
- Predictive search across products, categories, collections, and articles. Open from Search or `⌘/Ctrl + K`.
- Product category, gender, EU size, colour, price, technology, and collection filters; occasion links; price and newest sorting; empty states and reset.
- Product galleries, colour selection, size guide, required size validation, add to bag, and buy now.
- Cart quantities, item removal, delivery threshold, totals, and an explicitly labelled simulated checkout.
- Wishlist, recently viewed products, and a local demo profile. Browser storage persists the prototype's shopping state.
- Guided recommendations scored against gender, occasion, and requested comfort benefit.
- Working material tabs, keyboard interaction, a product rotation control, campaign switching, and lifestyle occasion edits.
- Official head-office location and external stockist lookup. No invented store inventory or opening hours.
- Local newsletter signup confirmation. Nothing is sent or subscribed remotely.

## Project structure

```text
assets/css/       Design tokens, art direction, responsive styling, motion
components/      Shared commerce, navigation, dialogs, and content sections
components/concepts/ Five independent homepage layouts
composables/     Concept routing, mock content, and shopping state
stores/          Typed shopping-state model
pages/           Nuxt routes and product/overview/studio pages
layouts/         Shared storefront shell; global state and overlays in app.vue
data/            Mock catalog, campaign configuration, sections, asset provenance
types/           Product, campaign, cart, and section interfaces
docs/            Design decisions, CMS model, asset credits, and validation notes
scripts/         Browser verification and screenshots
```

The five homepages do **not** render one generic themed homepage. Their hero composition, typography, discovery controls, navigation arrangement, imagery, and section hierarchy are independent. Shared commerce preserves task consistency.

## Validation

```sh
npm run typecheck
npm run test:ui
npm run build
```

The browser check uses Playwright with local Google Chrome by default. Set `PLAYWRIGHT_CHANNEL=chromium` to use an installed Playwright Chromium browser. Set `TEST_URL` to test a different preview origin. It exercises desktop/mobile layouts, image loading, shopping, search, filters, local persistence, the finder, material tabs, content editing, and all concept commerce routes. Axe WCAG A/AA results and screenshots are written to `.playwright/`.

## Production boundary

This is a reviewable frontend prototype, not a live store. Names, prices, offers, sizing, technology variants, care details, and delivery/returns policies are illustrative. The GBOLD comfort/softness/lightweight/durability positioning is grounded in the official brand reference. Generated campaign footwear is an art-direction concept, not a representation of an existing SKU. See `docs/ASSETS.md` for source credits and the generation prompt.

The local content studio demonstrates homepage controls. Full catalog/article/promotion administration, authentication, inventory, orders, payments, and publishing require a future CMS/backend. See `docs/CMS.md`.

## Recommendation

- **Branding:** Concept 01, with Concept 02 useful for energetic launches.
- **Conversion:** Concept 04's guided discovery and clear shopping hierarchy.
- **Maintenance:** Concept 01's linear, reusable content-section architecture.
- **Production:** Concept 01's identity + Concept 04's finder + Concept 05's concise technology story. Use Concept 03's editorial approach for community content.
