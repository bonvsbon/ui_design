# Validation and handoff

## Portable edition — 6 October 2026

- Six self-contained HTML files delivered in `portable/GAMBOL-Portable-All-5.zip`: five concept entry points and a comparison overview. Each file contains all five concepts, product routes, images, fonts, and interaction code.
- The full 14-view desktop/mobile Axe and layout suite passed using `file://` with the browser offline, followed by all shopping, finder, content editing, persistence, and route checks. Zero runtime errors, automated accessibility violations, or HTTP requests were reported.
- The ZIP was extracted to a separate directory and all six entry points passed image/font loading checks. A single HTML file copied in isolation to a filename containing Thai characters and spaces passed anchor navigation, query-filter refresh, and browser Back checks.
- ZIP integrity check passed. Portable test evidence is in `.playwright/portable/`; `npm run test:portable` repeats the package-specific checks.

## Passed checks

- TypeScript / Vue type checking: `npm run typecheck`.
- Nuxt production build: `npm run build`.
- Desktop (1440 px) and mobile (390 px) checks for all five homepages and Concept 01's listing/detail pages: no horizontal overflow, broken images, or browser runtime errors.
- Automated Axe WCAG A/AA scans: no reported violations across those 14 views, plus desktop/mobile overview and studio pages. Automated checks do not establish full accessibility conformance.
- Additional homepage layout checks at 320, 768, and 1024 px: no horizontal overflow.
- Shopping interactions: predictive search, keyboard shortcut, category and price filters, sorting, empty-state reset, size validation, colour selection, cart quantities/totals, simulated checkout, wishlist, and browser persistence.
- Guided pair finder, keyboard-operated material tabs, campaign editing/reset, section visibility, mobile navigation, and commerce routes for all five concepts.
- Query-driven listing pages render the requested category through server-side rendering.

Visual/accessibility checks and the final interaction checks were run separately. Evidence is saved locally in `.playwright/report.json`, `.playwright/additional-report.json`, and `.playwright/flows-report.json`; screenshots are in the same directory. Run `npm run test:ui` against a running preview to repeat the combined suite, or `node scripts/verify.mjs --flows-only` for the interaction suite.

## Review boundaries

The prototype uses mock catalog data, browser-local content/shopping state, and a simulated checkout. No remote subscription, payment, order, account, or CMS service is connected. Studio demonstrates campaign and homepage-section controls; the broader CMS handoff is described in `CMS.md`.

Images are optimized and lazy-loaded where appropriate; reduced-motion preferences are supported. Field Core Web Vitals and production traffic performance have not been measured.

The installed Nuxt 3 / Tailwind dependency tree reports 14 high-severity transitive advisories in its tooling dependencies. A non-breaking `npm audit fix` did not resolve them. Forced framework changes were not applied; review compatible upstream updates before a production release.
