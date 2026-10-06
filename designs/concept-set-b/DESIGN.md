# GAMBOL visual system

## Scene and intent
Thai shoppers browse on a phone in daylight or on a laptop in the evening, moving between inspiration and finding a comfortable, affordable pair. Concepts 01–04 use light shopping surfaces; Concept 05 uses a dark product-lab stage to focus on material and form. Product imagery and the commerce controls stay legible in either setting.

## Five independent art directions

| Concept | Composition | Typography | Colour mechanics | Discovery and motion |
| --- | --- | --- | --- | --- |
| 01 | Full-width campaign still life; restrained editorial rows | Manrope, tightly composed weight contrast | White and silver, citron as a small accent | Categories, product grids, two campaign states, gentle image swaps |
| 02 | Three-part diagonal hero; ranked category index; slanted showcase | Barlow Condensed display, Manrope body | Orange campaign stage and ink surfaces | Quick category index, floating product, ticker, controllable rotation |
| 03 | Centered masthead; magazine opener; occasion-led two-part editorials | Bodoni Moda display, Manrope body | Pure white, oxblood editorial sections | Six day/occasion tabs, shoppable stories, restrained movement |
| 04 | Search-led navigation; finder and recommendation workspace | Manrope, sentence case and compact scale | White with harbour-blue interactions and pale blue utility surfaces | Three-step finder, quick categories, recommendations |
| 05 | Technical product stage, annotations, material tabs, comparison | Manrope, light display weights with precise labels | Near-black, white, frost-cyan accents | Product hotspots, tabbed material details, comparison, subtle suspension |

Noto Sans Thai provides Thai script support. No page requires more than three font families. Fonts were selected using Google Fonts specimen pages for Manrope, Barlow Condensed, and Bodoni Moda.

## Tokens

`assets/css/main.css` defines reusable colour roles (`--ink`, `--muted`, `--line`, `--surface`, `--bg`, `--brand`, `--accent`, `--accent-ink`), typography roles, spacing, radius, container sizes, shadow, and semantic z-index layers. All application colours use OKLCH. The primary harbour-blue seed anchors Concept 04 and focus states; independent brand concepts deliberately use different colour strategies as requested.

- Container: 1360px maximum, 56px desktop side spacing; mobile 20px.
- Spacing scale: 8, 16, 24, 40, 80px; mobile section spacing 48px.
- Hero type: maximum 96px; body copy maximum 75 characters per line where applicable.
- Radius: square editorial surfaces, 5–12px utility controls, circular swatches.
- Breakpoints: 380, 767, 1024, 1200, 1700px.
- Layers: sticky 20, dropdown 30, native dialog top layer, toast 60.

## Accessibility and performance

Semantic main/header/nav/footer landmarks, one H1 per page, meaningful labels, native dialogs for focus containment and Escape closing, visible focus, keyboard-operable material tabs, selected and pressed states, form validation, status messages, and reduced-motion overrides. Image dimensions reserve layout space; below-fold photography is lazy-loaded. The main campaign uses a compressed JPEG with a mobile source candidate and high fetch priority. Catalog images are local and normalized from brand image exports. No animation library or 3D runtime is needed.

## Content architecture

Campaigns and ordered section records are separate from Vue layouts. The content composable exposes the currently selected campaign and enabled sections. Shared product sections, category cards, technology content, store lookup, and shopping dialogs remain reusable. The prototype studio changes local copies and exports JSON, without pretending to publish remotely.
