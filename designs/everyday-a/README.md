# GAMBOL × "Everyday Feels Better" — REEF-inspired concept

A standalone redesign concept for **GAMBOL** (Thai lifestyle footwear). It uses
REEF.com only as a *UX-pattern* reference (lifestyle-led hero, gender entry
points, editorial rhythm, product rails). Brand, copy, colours, layouts and
components are original to GAMBOL.

> Isolated project. It shares no code with the other folders in `designs/`.

* Analysis (Step 1): [`docs/analysis.md`](docs/analysis.md)
* Design strategy and design system (Step 2): [`docs/design-strategy.md`](docs/design-strategy.md)

---

## Run it

Requires Node 20+.

```bash
cd everyday-a
npm install
npm run dev          # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server with HMR |
| `npm run build` | SSR production build → `.output/` |
| `npm run preview` | Serve the production build |
| `npm run generate` | Static pre-render (all routes are data-driven, SSG-friendly) |
| `npm run typecheck` | `vue-tsc` strict type check |

### Portable / offline version

```bash
npm run portable
```

This outputs `portable/GAMBOL-Everyday-Portable/` and a `.zip` of it. `index.html` is the whole site in one file (about 11 MB), with JS, CSS, fonts, product photos and lifestyle photos embedded. It needs no server and no internet; double-click to open. The `01-…06-` files are shortcuts to individual pages and must stay next to `index.html`.

How it works: `PORTABLE=1` switches Nuxt to a client-only, hash-routed, single-bundle build (`nuxt.config.ts`). `scripts/build-portable.py` then inlines the bundle and embeds every image into `window.__GAMBOL_ASSETS__`, which `composables/useImage.ts` reads. Downloads are cached in `scripts/.cache`.

Stack: **Nuxt 3 · Vue 3 · TypeScript (strict) · Tailwind CSS · Pinia**. There are no other runtime dependencies: no carousel, icon or animation libraries.

### Routes

| Route | Page |
|---|---|
| `/` | Homepage, built from the CMS section list |
| `/products` | Product list. All filters live in the query string, e.g. `/products?gender=men&type=slides&size=41&color=black&sort=price-asc` |
| `/product/[slug]` | Product detail. **`/product/demo`** is an alias for the flagship *GBOLD Classic Slide* |
| `/technology` | GBOLD Technology™ |
| `/stories`, `/stories/[slug]` | Editorial (replaces the old *Style* and *News & Activity* pages) |
| `/stores` | Store locator (province/district search + "use my location") |
| `/wishlist` | Saved products |

---

## Folder structure

```
everyday-a/
├── app.vue · error.vue
├── nuxt.config.ts · tailwind.config.ts      ← Tailwind palette mirrors the CSS tokens
├── assets/
│   ├── css/main.css      ← design tokens (:root), type scale, buttons, rails, motion
│   ├── icons/            ← (icons are inline SVG in components/common/AppIcon.vue)
│   ├── fonts/            ← (fonts load from Google Fonts: Archivo + Anuphan)
│   └── images/
├── components/
│   ├── navigation/   AnnouncementBar · MainHeader · MegaMenu · MobileMenu · MobileTabBar · SearchOverlay
│   ├── home/         HomeSectionRenderer + one component per homepage section
│   ├── product/      ProductCard · ProductCarousel · ProductGallery · ProductBuyBox · QuickView · BenefitIcons · ProductBadge
│   ├── commerce/     CartDrawer · FilterSidebar · ToastHost
│   ├── technology/   TechnologyExplorer · SoleIllustration
│   ├── editorial/    SectionHeader · LifestyleCard · StoryCard
│   └── common/       AppIcon · AppImage · GambolLogo · SiteFooter · StoreFinderForm
├── composables/      useApi · useCatalog · useProductFilters · useSearch · useImage · useDragScroll · useFormat
├── stores/           cart · wishlist · ui   (Pinia)
├── types/index.ts    ← the content model (one interface per CMS collection)
├── data/             ← MOCK CONTENT (see below)
├── mock/api.ts       ← ContentApi contract + mock implementation
├── mock/http-api.example.ts ← how a real backend plugs in
├── plugins/reveal.ts ← v-reveal scroll-in directive (IntersectionObserver)
├── pages/
├── public/images/    ← GAMBOL product pack-shots + campaign photography
└── docs/
```

Components are auto-imported by file name (`pathPrefix: false`), so folders are for organisation only: `<ProductCard>`, `<HeroCampaign>` and so on.

---

## Component architecture

```
pages/index.vue
  └─ useApi().getHomepage()  →  HomeSection[]
       └─ <HomeSectionRenderer>          maps section.type → component
            ├─ resolves product refs     { ids: [...] } or { query: {...}, limit }
            └─ <HeroCampaign> <CategoryShowcase> <BestSellers> <BrandStory> …
                    └─ shared primitives: <ProductCard> <ProductCarousel> <AppImage> <SectionHeader> …
```

* **Section components are presentational.** They receive plain content objects as props and never import data or call the API. Any of them can be reused on a landing page.
* **One source of URLs for images.** `AppImage` and `composables/useImage.ts` handle responsive `srcset`, lazy loading, focal points and mobile art direction. To move to Cloudinary, imgix or Nuxt Image, change that one file.
* **Global overlays** (search, menu, cart, quick view, filter sheet) are coordinated by `stores/ui.ts`, so only one is open at a time.
* **The product list is URL-driven** (`useProductFilters`). Filtered views are shareable, work with the back button and render on the server.

### Design system in code

* Tokens: `assets/css/main.css` (`:root`) and `tailwind.config.ts` (same values in hex, so opacity modifiers like `bg-paper/95` work).
* Type: `.display-xl / -l / -m / -s`, `.eyebrow`, `.thai-lead`.
* Buttons: `.btn-primary`, `.btn-accent`, `.btn-outline`, `.btn-light`, `.btn-ghost-light`, `.link-arrow`.
* Layout: `.wrap` (1440 container), `.rail` (snap scroller aligned to the container edge).
* Motion: `v-reveal`, `.zoom-media`, `.hotspot-ring`. All of them respect `prefers-reduced-motion`.

---

## Where the mock data lives

| File | CMS / API equivalent |
|---|---|
| `data/homepage.ts` | **Page builder → Home**: ordered `homepageSections`. Each has `enabled`, content, media, CTA, and product refs |
| `data/products.ts` | Products, collections, style lines (EZY / ZAH / ZAPP / ZEEK) |
| `data/site.ts` | Global settings: announcement bar, mega-menu, footer, social links, free-shipping threshold |
| `data/lifestyles.ts` | "Shop by lifestyle" entries |
| `data/technology.ts` | GBOLD hotspots, layers, stats |
| `data/stories.ts` | Editorial articles |
| `data/stores.ts` | Retail locations |
| `data/media.ts` | Media library (focal points, alt text) |

Edit `data/homepage.ts` to reorder sections, set `enabled: false`, swap a campaign image, or change a product block from `{ ids: [...] }` (hand-picked) to `{ query: { badge: 'new', gender: 'women' }, limit: 8 }` (auto-merchandised). No component changes are needed.

### Replacing mock data with a real backend

Everything goes through one interface (`mock/api.ts`):

```ts
export interface ContentApi {
  getSite(); getHomepage(); getProducts(); getProduct(slug)
  getStories(); getStory(slug); getStores()
}
```

1. Implement it against your CMS or commerce API. `mock/http-api.example.ts` shows a `$fetch` version.
2. Return that implementation from `composables/useApi.ts`.
3. Map responses onto `types/index.ts`. Pages already use `useAsyncData`, so SSR, payload hydration and caching carry over.

Suggested split: **headless CMS** (Strapi, Contentful, Sanity, Payload) for `site`, `homepage`, `stories`, `lifestyles` and `technology`; **commerce/PIM** for `products` and stock; **ERP / store DB** for `stores`. Cart and wishlist are Pinia stores persisted to `localStorage` for the prototype. Point their actions at the cart API when one exists.

---

## Assets and credits

* **Product pack-shots** (`public/images/products/`) are GAMBOL's own product photos (style codes GM43111, GM43110, GW42174, GM11399, GM11398, GM11397, GM11395, GM11392 and others), converted to compressed JPG/WebP.
* **Campaign crops** (`public/images/campaign/`) are GAMBOL campaign photography. They are only 400 px wide, so they are used in small slots only (category cards, social mosaic, inset).
* **Lifestyle photography** is Unsplash placeholder imagery (`u:<id>` in `data/media.ts`). Replace it with a GAMBOL lifestyle shoot of people wearing the product before any public use.
* Technology stats on `/technology` are marked as sample figures. Swap in real R&D numbers.

---

## Final quality check

| # | Question | Answer |
|---|---|---|
| 1 | Visually different from the current GAMBOL site? | **Yes.** The current site is a catalogue on white. This concept is lifestyle-led, with editorial type, a warm paper palette, a lagoon technology chapter and a sun-yellow Kids chapter. |
| 2 | Inspired by REEF without being a clone? | **Yes.** It borrows patterns (gender-split hero CTAs, product rails, alternating "New for…" blocks, full-bleed campaigns). It does not copy REEF's layout, palette, type, copy or components. The GBOLD explorer, lifestyle discovery, Kids chapter and store finder have no REEF equivalent. |
| 3 | Product offering clear in 5 s? | **Yes.** Above the fold: people in sandals, *EVERYDAY FEELS BETTER / ความสบายที่ไปได้กับทุกวัน*, Shop Men / Shop Women. Directly below: Men, Women, Kids, Sneakers. |
| 4 | Product in 2–3 interactions? | **Yes.** Hero CTA → list → product (2). Category card → product (2). Best Sellers card on the homepage → product (1). Search → product result (2). Quick View allows add-to-cart without leaving the page. |
| 5 | GBOLD clearly visible? | **Yes.** It has a main-nav item (highlighted), an interactive homepage chapter, a PDP benefits row and construction section, a filter facet, and its own page. |
| 6 | Lifestyle brand rather than catalogue? | **Yes.** Shop-by-lifestyle, brand story, product story, editorial stories, #GAMBOLSTYLE, and an editorial card inside the product grid. |
| 7 | Mobile intentionally designed? | **Yes.** Bottom tab bar, portrait hero image, snap rails everywhere, swipe cards for GBOLD, bottom-sheet filters, a swipe gallery and a sticky "Select Size" bar on the PDP, and an image-tile mobile menu. Checked at 375 px with no horizontal overflow. |
| 8 | Homepage manageable via CMS/API? | **Yes.** 14 typed sections in `data/homepage.ts`, rendered by type, with enable/reorder/content/media/CTA/product selection. |
| 9 | Reusable components? | **Yes.** Presentational sections plus shared primitives (`ProductCard`, `ProductCarousel`, `AppImage`, `SectionHeader`, `TechnologyExplorer`, which is reused on the homepage and `/technology`, and `StoreFinderForm`, which is reused on the homepage and `/stores`). |
| 10 | Isolated in `/gambol-reef-concept`? | **Yes.** No previous concept folder was modified. Assets were *copied* in. The only shared file touched is the workspace `.claude/launch.json`, which gained a `gambol-reef-concept` dev-server entry on port 3500. |

Verified: `nuxi typecheck` passes; `nuxi build` succeeds; homepage, `/products`, `/product/demo`, `/technology`, `/stories` and `/stores` render in the browser at 1440 px and 375 px. The following were exercised and work: filters, sort, quick filters, mega menu, predictive search, size validation, add-to-cart / cart drawer, mobile menu and sticky PDP bar.

### Accessibility notes

Skip link, semantic landmarks, one `h1` per page, labelled icon buttons, visible `:focus-visible` ring (red), `aria-expanded`/`aria-pressed`/`aria-current` states, a hero autoplay pause control (WCAG 2.2.2), a keyboard-operable GBOLD tablist (arrow keys), native `<dialog>` for Quick View, `aria-live` for result counts and toasts, 44 px minimum touch targets, Thai `lang`, and reduced-motion support.

### Known limitations (concept scope)

Checkout, accounts and reviews are stubs. Store data is a mock sample. There is no real map embed (directions open Google Maps). Hero video is supported by the schema (`slide.video`), but no video asset is bundled.
