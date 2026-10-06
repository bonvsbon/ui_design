# Homepage and API contract

`SiteContent` and `HomeSection` in `types/index.ts` are the integration boundary. Homepage rendering iterates `useContentStore().sections`; it never encodes campaign content in `pages/index.vue`.

```ts
interface SiteContent {
  announcement: { text: string; link: { label: string; href: string } }
  sections: HomeSection[]
}
```

Every section has an immutable unique `id`, a known `type`, boolean `enabled`, and `title`. Optional `subtitle`, `body`, `eyebrow`, `media`, `cta`, `secondaryCta`, `cards`, `productIds`, `collection`, `storyIds` and `reverse` configure the component. `media` accepts `src`, `mobileSrc`, descriptive `alt`, optional `video`, and CSS `position` for a focal point. Hero video is user-initiated and muted; it has a still poster.

The array determines order. Exactly one enabled hero is required to provide the homepage's H1. Moving the hero is supported, although the strategy recommends it first. Product sections resolve ordered product IDs or use collection matching when IDs are empty. Story IDs select editorial records. Card groups carry their own independent image, title, subtitle and link records.

## Local editing

Open `/studio`. Changes start as a draft. Save Preview validates and persists the draft in `gambol-reef-content`, then the homepage uses it on this browser. Export JSON downloads the current form document. Edit All JSON exposes all fields, including nested cards. Restore Defaults clears the local override. Local settings are loaded after hydration so server and initial client HTML match.

Required record fields and safe relative/HTTPS link schemes are validated. Production validation should additionally enforce your asset allowlist, product and story referential integrity, maximum copy lengths, locale completeness and media aspect ratios. The local editor is intentionally unauthenticated and never publishes remotely.

## Backend migration

- Replace `useCatalog` imports with an asynchronous repository using stable product IDs and server-returned catalog facets, filtered results, counts and sorting.
- Use canonical product variant IDs for color/size; validate price, stock and quantity again on the server.
- Fetch published homepage content server-side with `useAsyncData`. Keep editor draft reads on authenticated endpoints.
- Replace local shopping/account state with a session-backed commerce service when cross-device history is required.
- Attach stockists to a verified retailer feed and real inventory service. Current coordinates identify sample neighbourhoods and do not assert GAMBOL retail presence.
- Connect newsletter consent and account sign-in to their actual services before changing UI confirmation copy.

## Runtime behavior

Product detail routes throw a Nuxt 404 for unknown slugs; `/product/demo` aliases the first everyday slide. Search spans mock names, codes, categories and collections, with separate editorial matches. Filters are represented in URL query parameters. Empty collections/styles use the same clear-and-recover state as other empty results.
