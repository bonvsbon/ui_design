---
name: Gambol Storefront Concepts
description: Six distinct visual directions for an interactive, product-led Gambol storefront.
colors:
  primary: "oklch(0.53 0.2 26)"
  primary-deep: "oklch(0.42 0.18 26)"
  ink: "oklch(0.15 0.01 25)"
  body: "oklch(0.3 0.014 25)"
  muted: "oklch(0.43 0.012 25)"
  white: "oklch(1 0 0)"
  canvas: "oklch(0.99 0.002 250)"
  soft: "oklch(0.96 0.008 250)"
  powder-blue: "oklch(0.94 0.03 220)"
  line: "oklch(0.88 0.009 25)"
  focus: "oklch(0.8 0.17 90)"
  colorclub-blue: "oklch(0.67 0.19 244)"
  club-yellow: "oklch(0.94 0.16 98)"
  night-lime: "oklch(0.88 0.2 118)"
typography:
  display:
    fontFamily: "K2D, Noto Sans Thai, Tahoma, sans-serif"
    fontSize: "clamp(3.2rem, 6.5vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.99
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "K2D, Noto Sans Thai, Tahoma, sans-serif"
    fontSize: "clamp(2.1rem, 3.8vw, 3.6rem)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.04em"
  title:
    fontFamily: "K2D, Noto Sans Thai, Tahoma, sans-serif"
    fontSize: "clamp(1.16rem, 1.8vw, 1.47rem)"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body:
    fontFamily: "K2D, Noto Sans Thai, Tahoma, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "K2D, Noto Sans Thai, Tahoma, sans-serif"
    fontSize: "0.74rem"
    fontWeight: 800
    lineHeight: 1.4
    letterSpacing: "0.075em"
rounded:
  control: "8px"
  card: "13px"
  dialog: "15px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "11px 21px"
    height: "48px"
    typography: "{typography.label}"
  button-light:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "11px 21px"
    height: "48px"
    typography: "{typography.label}"
  product-card:
    backgroundColor: "{colors.soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
  search-field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.body}"
    rounded: "{rounded.pill}"
    padding: "0 12px"
    height: "42px"
  filter-chip:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "8px 15px"
---

# Design System: Gambol Storefront Concepts

## 1. Overview

### Selected direction · Product Gallery

The user's supplied Apple-design-analysis is the current visual reference, adapted to Gambol. Open `gallery.html`. Preserve the reference's centered product photography, generous whitespace, rectangular full-width sections, alternating light/dark surfaces, compact navigation, and pill actions. Use Gambol red instead of the reference's blue.

- Action red: `#c8202f`; pressed/hover red: `#aa1825`; dark-surface links: `#ff939b`.
- Surfaces: white, `#f5f5f7`, charcoal `#242426`, and a subtle red tint `#faf0f1`.
- Typography: system UI with Noto Sans Thai fallback, 600-weight headings; Thai display line-height 1.3–1.4 to preserve vowels and tone marks.
- Hero: ICONIC product image, two actions, and a concise price/size caption.
- Secondary tiles: BOLD and COZY with direct product-detail actions.
- Shopping: shared catalog filters, search, sort, size selection, and demo bag.
- No decorative gradients or UI shadows. Product photos retain their original appearance.

The six earlier explorations remain available through `index.html`.


**Creative North Star: “Everyday, in motion.”**

Make a lively storefront for people choosing footwear between the ordinary moments of a Thai day: a walk, a quick errand, or plans that change along the way. Lead with real Gambol products, clear category choices, and useful details. The experience brings brand discovery and shopping together while sending checkout to Gambol's official store.

The prototype presents six visual directions over the same shopping experience: REDLINE leads with Gambol red, COLOR CLUB pairs cobalt blue with yellow, and NIGHT SHIFT uses near-black with lime. PRODUCT STUDIO uses a quiet, oversized product stage with model switching; PLAYGROUND creates a lavender and orange poster wall; DAY FINDER pairs a forest-green activity selector with a pale-blue recommendation panel. Each puts real footwear first and keeps the same product filters, details, and store links. Use short, responsive motion to make controls feel lively; keep all content available when reduced motion is requested. This system rejects an unrelated luxury or editorial brand style.

**Key Characteristics:**
- Product imagery is the main visual material.
- Red carries the brand moment; neutral surfaces keep product choices easy to compare.
- Alternate cobalt and lime directions retain Gambol red in the product actions and brand mark.
- Playful details support useful shopping tasks.
- Thai-first copy stays concrete, readable, and friendly.

## 2. Colors

The palette follows Gambol's vivid, approachable identity. REDLINE commits to red; COLOR CLUB uses blue and yellow; NIGHT SHIFT sets lime against near-black. OKLCH values in the frontmatter are canonical and match the CSS tokens.

### Primary
- **Gambol Red** (`primary`): The large hero surface, key actions, and active details. Use it confidently where the brand should lead.
- **Deep Gambol Red** (`primary-deep`): Darker hover and text states for red actions.

### Secondary
- **Powder Blue** (`powder-blue`): A cool, quiet product surface in the shared storefront.
- **COLOR CLUB Blue** (`colorclub-blue`): The alternate hero and footer surface for a graphic, color-blocked direction.
- **Club Yellow** (`club-yellow`): The COLOR CLUB header, product stage, and category surface.
- **NIGHT SHIFT Lime** (`night-lime`): The NIGHT SHIFT hero product stage and category bar, balanced by near-black.
- **Sunlit Focus Yellow** (`focus`): A visible keyboard focus ring. Keep it functional and unmistakable.

### Neutral
- **Near Black** (`ink`): Main text, navigation contrast, dark section backgrounds, and selected filters.
- **Readable Charcoal** (`body`): Supporting descriptions and body copy.
- **Muted Charcoal** (`muted`): Secondary metadata and helper copy.
- **White** (`white`): Product areas, buttons on red, and dialog surfaces.
- **Cool Canvas** (`canvas`): Page background with a nearly neutral cool cast.
- **Soft Product Surface** (`soft`): Product image beds and subtle tonal separation.
- **Quiet Divider** (`line`): One-pixel borders between adjacent surfaces and controls.

**The Brand Mark Rule.** Keep Gambol red in primary actions and brand details across all six concepts. Let each direction's hero surface create its own distinct mood.

## 3. Typography

**Display Font:** K2D, with Noto Sans Thai and Tahoma fallbacks  
**Body Font:** K2D, with Noto Sans Thai and Tahoma fallbacks  
**Label Font:** The same K2D family; no separate mono or display face.

**Character:** Rounded, energetic Thai and Latin letterforms make the brand feel direct and easy to approach. One family keeps model names, product descriptions, and interface labels cohesive; weight and size create the hierarchy.

### Hierarchy
- **Display** (800, fluid 3.2–6rem, tight 0.99 line height): Hero statement and short brand moments.
- **Headline** (800, fluid 2.1–3.6rem, 1.15 line height): Main section headings.
- **Title** (700, fluid 1.16–1.47rem, 1.3 line height): Product names and smaller feature headings.
- **Body** (400, 16px, 1.6 line height): Thai product descriptions and explanatory copy. Keep long copy near 65–75 characters per line where the layout allows.
- **Label** (800, 0.74rem, 1.4 line height, tracked): Compact product categories and short section identifiers. Use uppercase only for brief English labels.

**The One-Family Rule.** Keep the K2D family across Thai and English. Build contrast with scale and weight rather than adding a decorative second typeface.

## 4. Elevation

The interface is flat by default and has no box-shadow vocabulary. Separate content through white and soft-gray surfaces, precise borders, image cropping, and the strong red hero. Native dialogs use a darkened, lightly blurred backdrop to keep the active task in focus.

**The Flat-By-Default Rule.** Do not add ambient shadows to cards or controls. Use tonal separation and a clear border; reserve depth for the native dialog backdrop.

## 5. Components

### Buttons
- **Shape:** Full capsule for primary actions and bag controls; see `rounded.pill` in the frontmatter.
- **Primary:** Gambol red with white text. Use a clear action label, a comfortable 48px minimum height, and generous horizontal padding.
- **Light:** White with ink text, especially for the hero on red.
- **Outline:** White with a quiet border for secondary shopping actions.
- **Hover / Focus:** Deepen the red on hover, give buttons a slight upward response, and use the shared visible yellow focus outline for keyboard navigation.

### Chips
- **Style:** Capsule filters with a light unselected state and an ink-filled selected state.
- **State:** Category buttons expose their selection with `aria-pressed`; the selected state uses white type on ink.

### Cards / Containers
- **Corner Style:** Product image panels use a lightly curved 13px corner; dialogs use a 15px corner.
- **Background:** Soft neutral image bed behind cropped real product photography; catalog copy remains on the page canvas.
- **Shadow Strategy:** Flat surfaces without shadows. Product imagery and spacing establish the hierarchy.
- **Internal Padding:** Use an 8px rhythm and expand gaps between major sections. Keep product details compact and scannable.

### Inputs / Fields
- **Style:** White, capsule-shaped search and sort controls with a quiet border. Size selection uses a simple rectangular field with an 8px radius.
- **Focus:** A clear 3px yellow outline with offset, visible for keyboard users.
- **Behavior:** Search works with the type filters; sort options reorder by price.

### Navigation
- **Style:** White sticky header, dark text, generous link spacing, and a bordered bag capsule.
- **Hover / Focus:** Links shift to Gambol red; all links keep a visible keyboard focus indicator.
- **Mobile:** Collapse the links behind a labeled menu button; keep bag access visible.

### Product Quick View and Demo Bag
- Use a native dialog for product details, size choice, and adding a product to the local demo bag.
- Preserve official product links in the details and bag views. The demo bag does not represent checkout or inventory.
- Explain that prices and sizes can change; use the official store for current buying information.

## 6. Do's and Don'ts

### Do:
- **Do** lead with actual Gambol product photography and keep the shoe visible in its image crop.
- **Do** organize the catalog around flip-flops, slides, and sneakers so visitors can browse by product type.
- **Do** keep the red hero, cool neutral product surfaces, and concise Thai copy.
- **Do** show keyboard focus, use semantic controls, adapt layouts to narrow screens, and respect reduced-motion preferences.
- **Do** link each product to its official Gambol store page and label prototype-only bag behavior clearly.
- **Do** keep shadows absent from resting product cards; use surface changes and borders instead.

### Don't:
- **Don't** import an unrelated luxury or editorial brand style.
- **Don't** let decoration obscure product imagery, category choices, price, or size information.
- **Don't** present prototype bag contents as an order or imply that payment is available.
- **Don't** use low-contrast helper text, hide focus indicators, or require motion to reveal content.
- **Don't** rely on color alone to communicate which category is selected.

## Additional concept interactions

- **04 · PRODUCT STUDIO** — `storefront.html?design=studio`: select ICONIC, BOLD, or COZY to change the central product, price, and detail action.
- **05 · PLAYGROUND** — `storefront.html?design=playground`: select any of the three product posters to open its product details.
- **06 · DAY FINDER** — `storefront.html?design=dayfinder`: select a daily style to change the suggested product and explanation. Recommendations are curated prototype mappings.

All six directions share the catalog, filters, size selection, demo bag, and official-store links. Layouts adapt for mobile and honor reduced-motion preferences. Prices remain a research snapshot; checkout happens at the official store.

## Concepts 08–10 · Additional red, white and charcoal directions

These concepts extend the user's chosen restrained, product-first direction while retaining Gambol red. They use the existing researched products and do not add inventory or material claims beyond the catalog.

| Concept | Entry | Composition | Main interaction |
|---|---|---|---|
| 08 · Detail Lab | `storefront.html?design=detaillab` | Oversized BOLD product workbench with a red information panel | Three keyboard-accessible product hotspots update the explanation |
| 09 · Side by Side | `storefront.html?design=sidebyside` | Charcoal introduction, two pale product panels, comparison table | Independently select two of four models; images, prices, sizes and features update |
| 10 · The Lineup | `storefront.html?design=lineup` | Red brand introduction followed by large expandable product rows | Expand ICONIC, BOLD or COZY to see its image, size range and product action |

All three reuse native detail dialogs, size selection and the demo bag. The new styles include narrow-screen layouts, visible focus and reduced-motion handling. See `explorations.js` and `explorations.css`. The selector in `index.html` now includes all ten concepts.

### Portable delivery

Run `python3 scripts/build_portable.py` to rebuild the ten standalone HTML pages and index, including embedded fonts and assets. The first build fetches Google Fonts; subsequent builds reuse the local font cache. ZIP output is under `exports/`. Official-store links need an internet connection; browsing and demo interactions work from local HTML files.
