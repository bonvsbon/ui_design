# GAMBOL — 5 website concepts (Nuxt 3 prototype)

Five original homepage + listing + product-detail prototypes for a Thai footwear brand.
All five share one content model and mock CMS, but each has its own layout system,
navigation, typography, imagery, interaction style and component set.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build (SSR)
npx vue-tsc --noEmit -p tsconfig.json   # typecheck
```

## Routes

| Route | What |
|---|---|
| `/` | Design concept overview + comparison table |
| `/concept-0N` | Homepage (N = 1–5) |
| `/concept-0N/products` | Product listing (filters/sort/search via query string, e.g. `?gender=women&activity=work`) |
| `/concept-0N/product/demo` | Product detail (`demo` → hero product; any slug works, e.g. `/product/twist`) |

## Architecture

```
types/          Content model (Product, Category, Collection, Technology, Article, Store, HomeSection…)
data/           Mock CMS: catalog.ts, content.ts (site settings, nav, tech, articles, stores, promos), media.ts
data/home/      Homepage composition per concept — ordered, toggleable CMS sections
composables/    Shared logic: useCatalog, useProductFilters (URL-synced), useSearch (predictive),
                useHomeSections (CMS state), useFinder (Find Your Pair scoring), useProductPage, useConcept…
stores/         cart.ts, wishlist.ts (useState-based, SSR-safe, persisted per browser)
components/shared/   Concept-agnostic: SmartImg, ProductImg, SearchResults, FilterControls,
                     MobileNavigation, CartDrawer, SizeGuide, CmsPanel, PrototypeBar
components/c01…c05/  Concept-specific UI, auto-prefixed (<C01Hero>, <C04Finder>, <C05Exploded>…)
layouts/c01…c05.vue  Header/footer/fonts/theme per concept
assets/css/main.css  Design tokens (CSS variables) for all five themes
tailwind.config.ts   Tailwind vocabulary mapped to tokens (bg-bg, text-ink, rounded-card, font-display…)
```

### CMS principle
- Homepages render `data/home/cN.ts` through each concept's `SectionRenderer` (type → component map).
  Admins enable/disable, reorder and edit props; no campaign copy lives in components.
- Click **CMS** (bottom-left toolbar) on any homepage to toggle/reorder sections live.
- Links are stored concept-agnostic (`/products?gender=men`) and resolved by `useConcept().link()`.

### Placeholders to replace
- Product photos: 6 studio shots in `public/images/products/`; colourways are previewed with CSS filters
  and alternate angles are simulated (mirror/zoom crops) until real photography exists.
- Lifestyle photos: hotlinked from Unsplash (`data/media.ts`).
- Technology metrics, test results, reviews, stores and phone numbers are illustrative mock data.
- Checkout is not connected (Buy Now/Checkout show a prototype notice).
