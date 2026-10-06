// https://nuxt.com/docs/api/configuration/nuxt-config

/**
 * PORTABLE=1 → client-only, hash-routed build with a single JS + CSS file, which
 * scripts/build-portable.py inlines (with fonts and images) into one offline index.html.
 */
const portable = process.env.PORTABLE === '1'
const FONTS_URL = 'https://fonts.googleapis.com/css2?family=Anuphan:wght@300..700&family=Archivo:wdth,wght@62..125,400..900&display=swap'

export default defineNuxtConfig({
  ...(portable
    ? {
        ssr: false,
        router: { options: { hashMode: true } },
        experimental: { appManifest: false },
        vite: {
          build: {
            cssCodeSplit: false,
            assetsInlineLimit: 100_000_000,
            rollupOptions: { output: { inlineDynamicImports: true } },
          },
        },
      }
    : {}),
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  components: [
    // Folders organise components; names stay flat (<ProductCard>, <HeroCampaign>…)
    { path: '~/components', pathPrefix: false },
  ],
  imports: { dirs: ['stores'] },
  app: {
    head: {
      htmlAttrs: { lang: 'th' },
      titleTemplate: '%s · GAMBOL',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'description', content: 'GAMBOL รองเท้าแตะและรองเท้าลำลองสำหรับทุกวัน นุ่ม เบา ทน ด้วย GBOLD Technology™' },
        { name: 'theme-color', content: '#F7F4EE' },
      ],
      // Portable build embeds the fonts and images itself, so no external connections
      link: portable
        ? []
        : [
            { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
            { rel: 'preconnect', href: 'https://images.unsplash.com' },
            { rel: 'stylesheet', href: FONTS_URL },
          ],
    },
  },
  tailwindcss: { viewer: false, cssPath: '~/assets/css/main.css' },
  typescript: { strict: true },
})
