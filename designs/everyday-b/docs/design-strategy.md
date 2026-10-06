# GAMBOL · Everyday feels better

## Research and boundaries

Reviewed 6 October 2026: [REEF](https://www.reef.com/), [GAMBOL](https://www.gambol.co.th/), [GAMBOL men](https://www.gambol.co.th/tax-category/men-th/), and [store locator](https://www.gambol.co.th/find-our-store/). Desktop reference captures live in `docs/references/`.

REEF offers strong discovery through footwear, occasion, and comfort navigation; a photography-led campaign; category carousels; and new-for-women / new-for-men merchandising. Adapt the principles of scale, alternating inspiration and shopping, and short paths to a product. Its branding, current campaign words, exact layout, colors, assets, and proprietary comfort claims do not belong in this concept.

GAMBOL supplies the real Men, Women, Kids, Sneakers taxonomy; flip-flop and slide product references; Style / News & Activity; Thai contact context; and GBOLD's comfort, soft-touch, lightweight, durable positioning. Real reference images are used with clearly illustrative merchandising names, prices, inventory, offers, sizes, and collections. No medical claims, invented performance statistics, or live stock promises.

## Design philosophy

A Thai shopper scrolls on a phone in bright daylight, imagining an easy weekend and looking for an affordable comfortable pair. Clean white commerce surfaces support outdoor legibility; red carries the brand; teal seawater and natural sunlit campaign images bring the lifestyle.

Voice: sun-washed, easygoing, sure-footed. The visual reference is a Thai weekend campaign and a footwear hangtag, not a luxury magazine or software dashboard. An original full-width coastal opener, compact red announcement, left-aligned wordmark, wide shop navigation, red campaign stamps, and square-corner merchandising establish a distinct identity.

## Design system (defined before implementation)

- Color strategy: full palette with deliberate roles. GAMBOL red for calls to action and brand moments, charcoal ink, neutral white / pale gray shopping surfaces, natural sea colors in photography. Red identity is grounded in the official GAMBOL mark. CSS colors use OKLCH.
- Tokens: red `oklch(0.52 0.21 26)`; ink `oklch(0.19 0.005 260)`; white `oklch(1 0 0)`; mist `oklch(0.965 0.002 260)`; muted `oklch(0.43 0.008 260)`; line `oklch(0.86 0.004 260)`.
- Fonts: Barlow Condensed bold for campaign and section titles; Barlow for commerce; Noto Sans Thai for Thai. Chosen after reviewing their Google Fonts catalog specimens. Condensed type resembles a footwear label, while Barlow's open forms remain approachable. Local font files avoid render-time third-party requests.
- Campaign scale: fluid 56–96px, tight but legible tracking, upper case only for short headings. Section titles 32–52px. Body 15–17px with 1.6 line height.
- Spacing: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 88 / 112px. Containers max 1440px with 48px desktop and 20px mobile gutters.
- Surfaces: square photography and cards; 2px utility-control radius; circles only for swatches and icon buttons. No decorative shadows or glass panels.
- Buttons: minimum 44px hit area, red primary, white image-overlay secondary, understated text links with arrow. Icons use Lucide, 1.6px stroke.
- Motion: 220ms image hover transition, native scroll-snap carousels, deliberate hero entrance; reduced-motion disables animated transitions. No hidden content waiting for scroll observers.
- Layers: header 20, menu 30, native dialog top layer, toast 60. Keyboard focus always visible.

## Homepage information architecture

1. Configurable seasonal announcement.
2. Desktop navigation / illustrated mega menu, mobile header and bottom navigation.
3. Coastal hero with separate desktop/mobile media, optional video, copy and two shopping CTAs.
4. Find your pair: Men, Women, Kids, Sneakers lifestyle cards.
5. Best sellers: scrollable cards with real imagery, alternate view, swatches, wishlists, quick view.
6. Brand story: asymmetric photo and red text panel.
7. Made for your day: occasion discovery.
8. Alternating New for Men and New for Women photo/product groups.
9. GBOLD technology: product closeup, four interactive benefits, mobile accordion.
10. Summer Escape collection with three products.
11. One hero product and three visual benefits.
12. Kids campaign with boys/girls discovery and products.
13. Three GAMBOL Stories.
14. Province/district store discovery.
15. Shoppable community imagery.
16. Newsletter and support / discovery footer.

## Component and data architecture

Nuxt 3, Vue 3, TypeScript, Tailwind CSS, Pinia. `types/` defines products, section records, campaign media, stories and stores. `mock/` stores content fixtures. `data/` provides ordered homepage composition and site configuration. `composables/` exposes an API-replaceable repository, content selection and currency formatting. `stores/` owns persistent bag and wishlist state. Components are organized by navigation, home, product, commerce, technology, editorial and common concerns.

Each homepage section is a typed record with ID, type, enabled flag, copy, image, CTA, product IDs or a collection. Array order determines rendering order. `/studio` provides a local JSON content editor for previewing enable/disable, reorder, text, media, CTA and product selection; it is not an authenticated production CMS.

## Responsive behavior

- ≥1200px: full desktop nav, 4 category cards and 4 catalog columns with sidebar; PDP 60/40 sticky split.
- 768–1199px: compact header, two catalog columns, comfortable two-column editorials.
- <768px: dedicated bottom navigation, full-screen search, horizontally scrolling category/story/product cards; two-column catalog; native filter drawer; photography followed by products in alternating editorials; accordion technology; sticky purchase action within the purchase flow.
- Native dialogs provide focus containment, Escape dismissal, accessible labeling and trigger focus restoration. Visible labels, semantic headings, real link destinations, informative empty states, generous touch areas and reduced motion are required.

## Performance and acceptance

SSR routes, local optimized WebP media, intrinsic dimensions, high-priority hero, lazy below-fold images, local WOFF2 fonts, no animation/carousel libraries. Validate Nuxt typecheck and production build; browser-test all requested routes at desktop/mobile/tablet; test filter/search/wishlist/quick view/size validation/bag persistence/content editing; inspect screenshots; run automated accessibility scans and check image/layout errors. Mock checkout ends in a clearly labeled local order preview and never charges a customer.
