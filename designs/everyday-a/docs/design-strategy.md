# GAMBOL × Everyday — Design Strategy

Concept name: **"Everyday Feels Better"**
Isolated project: `designs/everyday-a` (shares no code with the other designs).

---

## 1. Design philosophy

1. **Life first, product second, spec third.** Every scroll pairs a moment of Thai daily life with the pair that makes it easier. Specs only appear when someone asks (PDP, technology page).
2. **Five-second clarity.** Above the fold the user sees: people wearing sandals/slides, the line *EVERYDAY FEELS BETTER — ความสบายที่ไปได้กับทุกวัน*, and two CTAs (Men / Women). Directly under it, four category cards. "What do they sell?" and "why?" are both answered before the first scroll ends.
3. **Two to three taps to a product.** Hero → product list → product, or Category card → product, or Search → product. Product cards are everywhere a decision might happen (carousels, collection blocks, mega menu featured items).
4. **GBOLD is the hero material.** GBOLD Technology™ appears in three places with the same visual language (hotspot sole explorer) so it becomes recognisable as *the* reason to choose GAMBOL.
5. **Editorial rhythm, not a grid.** Sections alternate: full-bleed → product row → asymmetric split → dark tech → editorial. No two consecutive sections share a layout.
6. **Friendly, not loud.** Pill buttons, warm neutrals, Thai micro-copy. Square-cropped media so photography stays the star. No glassmorphism, no gradients except image scrims.

---

## 2. Homepage information architecture

| # | Section (schema `type`) | Purpose | Desktop | Mobile |
|---|---|---|---|---|
| 01 | `announcement` (global) | Reduce purchase anxiety | Rotating single line | Same, 1 line |
| 02 | header + mega menu (global) | Navigation | Logo · 7 links · 5 utilities, mega menu with editorial image | Logo · menu · search · cart + bottom tab bar |
| 03 | `hero` | Brand promise + gender entry | Full-bleed, 3 slides, `01 / 03` indicator, image **or** video | Portrait art-direction image, stacked CTAs |
| 04 | `categories` | Find your pair | 4 lifestyle cards, asymmetric heights | Horizontal snap scroll |
| 05 | `productCarousel` (best sellers) | Social proof | Drag/arrow carousel, 4.3 cards visible | 1.6 cards visible |
| 06 | `brandStory` | Why GAMBOL | 60/40 photo/typography | Photo then copy |
| 07 | `lifestyle` | Discovery by use | 6 cards scroller | Snap scroller |
| 08 | `genderSpotlight` ×2 | New for Men / Women | Photo + 2×2 products, mirrored | Photo then product scroller |
| 09 | `technology` | Differentiation | Split screen, sole with 4 hotspots | Sole image + swipe cards |
| 10 | `featuredCollection` | Seasonal campaign | Large photo + 3 products, editorial headline | Stacked |
| 11 | `heroProduct` | A product with a story | Big product, 3 benefit callouts | Stacked |
| 12 | `kids` | Kids personality | Sun-yellow block, Boys/Girls tiles + products | Stacked + scroller |
| 13 | `stories` | Content / SEO | 3-column magazine (1 large + 2) | Horizontal cards |
| 14 | `storeLocator` | Retail bridge | 50/50 photo + province/district form | Stacked |
| 15 | `social` | Community | Mixed 6-tile grid | 2-col grid |
| 16 | footer (global) | Wayfinding + newsletter | 4 link columns + newsletter | Accordions |

The order above is the default `homepageSections` array in `data/homepage.ts`; the renderer (`components/home/HomeSectionRenderer.vue`) maps each `type` to a component, skips `enabled: false` and respects array order.

---

## 3. Design system

### 3.1 Colour

| Token | Value | Use |
|---|---|---|
| `--paper` | `#F7F4EE` | Page background (warm rice-paper, not clinical white) |
| `--paper-2` | `#EEE9E0` | Product tiles, inputs |
| `--white` | `#FFFFFF` | Cards on dark, header |
| `--ink` | `#17150F` | Text, primary buttons |
| `--ink-2` | `#3F3B33` | Secondary text |
| `--muted` | `#6B665C` | Meta text (≥ 4.8:1 on paper) |
| `--line` | `#DCD5C8` | Hairlines |
| `--red` | `#D42A1E` | GAMBOL red — accent CTA, badges, hotspots (4.9:1 on white) |
| `--red-deep` | `#A41E14` | Hover |
| `--lagoon` | `#0F3A39` | Technology & dark editorial sections |
| `--lagoon-2` | `#1E5653` | Dark surfaces |
| `--sun` | `#F3C443` | Kids section, highlights (from GAMBOL "JOIN THE WAY" graphics) |
| `--sky` | `#D6E6E3` | Soft lifestyle tint |

Rule: one accent per viewport. Red is reserved for "act now" (cart, badges, hotspots); lagoon carries the technology story; sun only for Kids/highlights.

### 3.2 Typography

* **Display:** *Archivo* (variable width, used at 68 % width, weight 800, uppercase, tight leading .88). Campaign headlines only.
* **Thai:** *Anuphan* — modern, round, highly readable; used for all Thai copy and paired automatically through the font stack.
* **UI / body:** *Archivo* normal width 400/500/600 + *Anuphan*.

| Token | Size | Use |
|---|---|---|
| `display-xl` | clamp(3.5rem, 10vw, 9.5rem) | Hero |
| `display-l` | clamp(2.75rem, 6.4vw, 6rem) | Section campaigns |
| `display-m` | clamp(2rem, 4vw, 3.5rem) | Section titles |
| `h3` | 1.375rem | Card titles |
| `body` | 1rem / 1.6 | Copy |
| `small` | .875rem | Meta |
| `eyebrow` | .75rem, +0.16em tracking, uppercase | Labels |

### 3.3 Spacing & layout

* 4 px base. Section padding `--section-y: clamp(4rem, 8vw, 8rem)`. Gutter `--gutter: clamp(1rem, 3vw, 2.5rem)`.
* Containers: `site` 1440 px, `narrow` 1120 px, `prose` 62ch. Media frequently bleeds to the viewport edge.
* Grid: 12 columns desktop, 6 tablet, 4 mobile.

### 3.4 Shape

* Media: **0 radius** (editorial feel). Product tiles: 2 px. Inputs: 2 px.
* Buttons & chips: full pill (friendliness).
* No drop shadows on cards; elevation only for overlays (menu, drawer, quick view).

### 3.5 Buttons

| Variant | Look | Use |
|---|---|---|
| `primary` | Ink fill, paper text | Default CTA |
| `accent` | Red fill, white text | Add to cart, Buy now |
| `outline` | 1.5 px ink border | Secondary |
| `light` | White fill, ink text | On photography |
| `link` | Underlined uppercase + → | "SHOP NOW →" |

Height 48 px (44 px min touch target), 12 px label, 0.12em tracking.

### 3.6 Cards

* **Product card** – 4:5 tile on `--paper-2`, product shot multiplied onto the tile; hover swaps to alternate angle; badge top-left; wishlist top-right; Quick View slides up on hover (always visible as an icon on touch). Below: name, category, price, colour dots. Nothing else.
* **Lifestyle card** – 3:4 photo, bottom scrim, title + Thai tagline.
* **Story card** – photo, category eyebrow, Thai headline, read time.

### 3.7 Icons

Single inline SVG sprite component (`components/common/AppIcon.vue`), 1.5 px stroke, 24 px grid, `currentColor`. No icon font, no third-party icon library.

### 3.8 Motion

| Motion | Spec |
|---|---|
| UI (hover, toggles) | 180 ms, `cubic-bezier(.22,1,.36,1)` |
| Image hover zoom | scale 1.04, 900 ms |
| Text reveal | 16 px rise + fade, 700 ms, once, IntersectionObserver |
| Hero parallax | ≤ 8 % translate, rAF, disabled on mobile |
| Carousel | native scroll-snap + pointer drag |
| Hotspot | pulse ring 2 s loop (stops once one has been opened) |

`prefers-reduced-motion: reduce` turns off parallax, reveals, pulses and zooms. Navigation is never delayed by animation.

---

## 4. Component structure

```
components/
  navigation/  AnnouncementBar · MainHeader · MegaMenu · MobileMenu · MobileTabBar · SearchOverlay
  home/        HomeSectionRenderer · HeroCampaign · CategoryShowcase · BestSellers · BrandStory
               LifestyleShowcase · GenderSpotlight · FeaturedCollection · HeroProduct · KidsShowcase
               StoriesShowcase · StoreLocatorTeaser · SocialGallery
  product/     ProductCard · ProductCarousel · ProductGallery · ProductBuyBox · QuickView · BenefitIcons
  commerce/    CartDrawer · FilterSidebar · ToastHost
  technology/  TechnologyExplorer · SoleIllustration
  editorial/   SectionHeader · LifestyleCard · StoryCard · EditorialCampaign
  common/      AppIcon · AppImage · AppButton · GambolLogo · SiteFooter · StoreFinderForm
```

Components receive **content objects** (from the CMS schema) as props; they never import data directly — except the section renderer, which resolves product references.

---

## 5. Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| < 640 | Bottom tab bar (Home, Shop, Search, Wishlist, Cart). Header = logo · menu · search · cart. Every row of cards becomes a snap scroller with a peek of the next card. Hero uses portrait image. PDP: gallery swipe + sticky Add-to-cart bar. Filters in a bottom sheet. |
| 640–1023 | 2-column product grid, carousels show 2.5 cards, mega menu replaced by drawer. |
| ≥ 1024 | Mega menu on hover/focus, filter sidebar, 4-column grid, split-screen technology explorer, sticky PDP buy box. |
| ≥ 1440 | Content capped at 1440; photography keeps bleeding to the edge. |

Mobile is designed, not compressed: horizontal scrollers instead of stacked grids, thumb-zone CTAs, bottom sheets instead of sidebars, accordion technology on small screens.
