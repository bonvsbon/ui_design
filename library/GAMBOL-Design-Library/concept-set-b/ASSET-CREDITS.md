# Asset provenance

## Official GAMBOL imagery and positioning

Business/category and technology reference: https://www.gambol.co.th/

The site was used for its product categories, GBOLD comfort/softness/lightweight/durability positioning, public footwear photos, and the published head-office contact information. No page layout, typography, colours, components, or interactions were copied.

- `product-1.png`, `product-2.png`, `product-4.png`: public GAMBOL lifestyle campaign photos. Exact original URLs: `data/image-sources.json`.
- `shoe-*.png`, `slide-color-*.png`: GAMBOL product photos. Exact initial catalog URLs: `data/catalog-image-sources.json`. Product detail pages supplied larger versions; transparent export padding was removed for consistent product display.
- `gambol-sneaker.png`, `gambol-sneaker-alt.png`: GAMBOL GB86174/GB86175 sneaker reference images, obtained from the public sneakers catalog.

Official images are temporary reference assets for this prototype. A production site should use brand-approved, licensed master assets and validated product-image mappings.

## Original generated campaign

Built-in image generation tool, generated 5 October 2026. The final campaign is `public/images/hero-campaign.jpg`; the mobile rendition is `public/images/hero-campaign-small.jpg`. The original generated PNG is preserved in `docs/assets/hero-campaign-original.png`.

Final prompt:

> Use case: product-mockup. Create a premium footwear campaign photograph for an original GAMBOL Thai lifestyle footwear website prototype. Wide landscape 1536x1024 composition. Two sculptural contemporary one-piece foam slide sandals suspended in air, one vivid citron yellow-green at the upper right angled diagonally toe toward lower left, and one off-white chalk slide lower right angled opposite. Thick soft rounded soles, clean wide minimalist straps, realistic subtly pebbled EVA material, impeccable hyperreal high-end product photography, not athletic sneakers. Tiny debossed GAMBOL wordmark on strap if possible, otherwise no lettering. Seamless light silver-gray studio background, directional natural studio light from upper left, elegant deep cast shadows directly below the products. Products fill rightmost 65 percent of composition, leave leftmost 35 percent empty light gray negative space for a website heading added later. Pale gray throughout, no color gradients, no frames, no UI, no added titles, no graphic elements, no watermark. Beautiful editorial still life, photographic, exceptional product materials.

The campaign footwear is conceptual, not an existing SKU. No API/CLI fallback was used.

## Temporary lifestyle stock

Locally stored, URL-verified Unsplash imagery. Source URLs are recorded in `data/stock-sources.json`:

- `kids.jpg`: child lifestyle/category photograph.
- `beach.jpg`: open coast and beach editorial.
- `city.jpg`: Bangkok city context.
- `outdoor.jpg`: outdoor/mountain occasion reference.
- `weekend.jpg`: family occasion reference.

Some initially explored stock files are not used. Confirm photographer credits and usage requirements before production publication.

## Fonts and icons

Google Fonts: Manrope, Barlow Condensed, Bodoni Moda, Noto Sans Thai. Lucide SVG icons via `lucide-vue-next`. The prototype wordmark is live typography rather than a copied brand-logo asset.
