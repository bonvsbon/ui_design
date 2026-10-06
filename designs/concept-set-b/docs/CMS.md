# Content model and CMS handoff

The frontend uses typed local data so a CMS adapter can replace the data source without rewriting the five visual layouts. No backend is connected.

## Homepage management available now

`/studio` supports a separate draft per concept:

- Change campaign title, description, CTA label, and approved image.
- Enable/disable and reorder homepage sections.
- Preview edits in the actual concept route.
- Reset a concept or export the complete configuration as JSON.
- Persist local edits in `gambol-content-v1` browser storage.

The hero remains first; enabled sections render in the saved order. The studio is explicitly a local editor, not a production admin panel.

## Suggested entities

| Entity | Fields | Editing responsibility |
| --- | --- | --- |
| Campaign | id, title, subtitle, image asset, mobile asset, alt text, CTA label/link, start/end date, locale | Merchandising |
| Homepage section | id, type, enabled, order, heading, content references, collection ID | Merchandising |
| Product | id, SKU, name, category IDs, gender, price, compare-at price, badge, collection IDs, benefits, descriptions | Catalog team |
| Product variant | product ID, colour name/swatch/image, EU size, stock, barcode | Catalog team |
| Category | id, name, slug, parent, image, alt text, sort order | Catalog team |
| Collection | id, title, description, product references, campaign references | Merchandising |
| Technology | id, name, benefit labels, descriptions, imagery, layer annotations, verified specifications | Brand team |
| Article | id, slug, title, image, alt text, body, locale, author, related products, publish date | Editorial |
| Promotion | id, title, amount/type, eligible products, dates, terms, banner text | Merchandising |
| Store | id, name, address, coordinates, hours, contact, stockist URL | Operations |
| Global settings | navigation, announcement, footer, delivery/returns policies, social links | Brand/operations |

## Existing frontend adapter points

- `data/products.ts`: mock products, variants, categories, collections, technology labels, benefits, and prices.
- `data/concepts.ts`: concept metadata, campaigns, and default section order.
- `composables/useContent.ts`: current campaign and section selection; replace local state with CMS queries.
- `types/index.ts`: shared product, section, campaign, cart, and panel interfaces.
- `composables/useShop.ts`: mock cart and preferences; replace with an authenticated commerce service when commissioned.

Articles, technology specifications, promotions, store records, and policy text require a full CMS integration for nontechnical administration. The demo does not claim to offer those admin capabilities already.

## Production migration

Use stable IDs instead of component source names in CMS records. Validate content at the adapter boundary, including allowed section types, required alt text, CTA destinations, image ratios, headline lengths, and valid variants. Keep editorial previews and published data distinct. Add role-based access, draft/review/publish workflow, asset renditions, locale support, scheduled campaigns, and audit history when connecting a CMS. A CMS choice is intentionally deferred.
