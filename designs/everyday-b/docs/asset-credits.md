# Asset credits and generation record

## Research

- [REEF homepage](https://www.reef.com/): navigation by style/occasion/comfort, campaign-scale photography and alternating merchandising. No REEF image, logo, copy or component was used.
- [GAMBOL homepage](https://www.gambol.co.th/): brand identity, category structure, publicly available footwear photos and GBOLD positioning.
- [GAMBOL men's catalog](https://www.gambol.co.th/tax-category/men-th/): footwear styles and product-image references.
- [Official GAMBOL store locator](https://www.gambol.co.th/find-our-store/): real contact details and province-based discovery model.
- Captured desktop reference screenshots: `docs/references/reef-desktop.png`, `docs/references/gambol-desktop.png`.

## Product and existing campaign photography

Product reference exports were copied read-only from locally available GAMBOL assets, then optimized into this independent project's `public/images/`. The original files were left unchanged. All website references resolve within this project.

- `shoe-*.webp`, `variant-*.webp`, `slide-color-*.webp`: GAMBOL footwear reference photography. Exact initial source URLs are in `data/catalog-image-sources.json`; color mappings are in `data/product-colors.json`.
- `gambol-sneaker*.webp`: GAMBOL GB86174/GB86175 sneaker reference.
- `product-1.webp`, `product-2.webp`, `product-4.webp`: GAMBOL style/campaign photography, with original URLs in `data/image-sources.json`.
- `city.webp`, `beach.webp`, `outdoor.webp`, `weekend.webp`: previously URL-verified Unsplash reference photographs. Exact URLs and successful response records are in `data/stock-sources.json`. Only relevant assets are used by the default page.

Mock names and pricing do not claim an exact live catalog match. Generated campaign footwear is illustrative. A public commercial launch should use GAMBOL-approved master photography and verified SKU-to-image mappings.

## Original campaign assets

Created 6 October 2026 with the **built-in Imagegen tool**. No API-key/CLI fallback was used. All final images are saved in `public/images/`, with mobile-size renditions for the hero and larger campaign scenes. Conversion to WebP is an encoding/resizing step; scene creation was performed by Imagegen.

### Coastal hero

Saved: `public/images/coast.webp` and `coast-mobile.webp`.

Final prompt:

> Use case: photorealistic-natural. Asset type: full-bleed wide desktop hero campaign photo for a Thai GAMBOL casual footwear ecommerce design concept. Create a photographic fashion campaign, wide landscape 3:2 or wider. Scene: an unhurried weekend on the Thai coast, muted deep turquoise sea and hazy island at horizon, pale concrete sea wall and sunlit promenade in foreground, gentle midday natural sunlight, subtle film grain and authentic editorial photography. Two stylish young adult Thai friends, woman in loose ivory short-sleeve shirt and olive shorts sitting on the sea wall with legs hanging down, man in light blue shirt and dark shorts standing beside her, relaxed candid laughter. Both wear clearly visible understated casual GAMBOL-style black or off-white flip-flops/foam slide sandals, tiny GAMBOL wordmark on strap if visible. Show entire people including sandals, realistic anatomy and believable feet. Composition: people clustered in the RIGHT 50% of frame with lots of uncluttered open sea and sky in LEFT 45% for large white typography to be added in HTML; camera at level of subjects, not overhead. Refined film photography colors, pale blue sky, deep sea cyan, faded white concrete, soft organic shadows. Premium yet attainable Thai weekend lifestyle, inviting and fresh. No typography, no title, no UI, no frames, no watermarks, no REEF branding. This is a single photographic asset, not a website screenshot.

### City life

Saved: `public/images/city-life.webp` and `city-life-mobile.webp`.

Final prompt:

> Use case: photorealistic-natural. Asset type: vertical lifestyle fashion photograph for Thai footwear brand GAMBOL concept. A stylish young adult Thai man in a faded cream t-shirt, dark navy shorts and simple charcoal foam slide sandals with a small GAMBOL wordmark on the wide strap, walking out of a beautiful old blue-gray Bangkok shophouse cafe holding an iced coffee. Candid editorial street fashion photography, full body INCLUDING clearly visible sandals, clean natural realistic anatomy, sunlit textured concrete and terracotta pavement, a small tropical potted plant, relaxed Saturday mood. Camera slightly low with generous architectural negative space, entire person framed from head to sandals, faded blue wooden shutters, beautiful warm hard natural light and soft film grain. Premium but accessible, authentic Thai city life. No text overlays, no collage, no other logos, no borders, no UI.

### Little adventures

Saved: `public/images/little-adventures.webp` and `little-adventures-mobile.webp`.

Final prompt:

> Use case: photorealistic-natural. Asset type: landscape kids lifestyle campaign photograph for GAMBOL Thai casual footwear concept. A cheerful Thai boy about 8 and a Thai girl about 9 play on a low concrete step in a sunny tropical park, moving playfully, wearing casual colorful t-shirts, shorts, and durable blue and pink GAMBOL-style casual open-toe sandals, footwear clearly visible. Full body honest candid editorial fashion photography, green lawn, tropical plants softly out of focus, mustard-yellow concrete wall on one side. Natural warm sunlight, believable anatomical detail, wholesome joyful childhood. Composition leaves a little space for cropping, no text, no other brands, no cartoon graphics, no watermark, no UI.

### Sneakers in the city

Saved: `public/images/sneaker-life.webp`. Product reference: local `public/images/gambol-sneaker.webp`, inspected before generation.

Final prompt:

> Use case: photorealistic-natural. The input image is a product reference, not an edit target. Create a vertical editorial lifestyle photograph for a Thai casual footwear category card. Close crop from waist to ground of a young adult in light stone straight-leg trousers and the burgundy knit lightweight lace-up sneakers with white soles and curved white stripe details shown in the reference photo. Sitting casually on a pale concrete city stair, one foot resting on a lower stair and the other on the pavement. Make the shoes the focal point, preserve the reference product's recognizable burgundy upper and white outsole, authentic woven material and real anatomy. Bangkok everyday street style, outdoor natural late afternoon sun, pale blue-gray wall behind, small tropical leaf shadow, fashionable but approachable. Large shoes in foreground clearly worn on feet. Photographic rich detail, understated editorial campaign styling, no typography, no frame, no additional logos, no watermark, no UI.

## Fonts and icons

- [Barlow](https://fonts.google.com/specimen/Barlow), [Barlow Condensed](https://fonts.google.com/specimen/Barlow+Condensed), [Noto Sans Thai](https://fonts.google.com/noto/specimen/Noto+Sans+Thai). Font files are self-hosted; OFL license texts are in `public/fonts/`.
- Lucide Vue icons are imported individually in `AppIcon.vue`.
- The typographic GAMBOL wordmark is a concept rendering, not a claim to be the official master logo file.
