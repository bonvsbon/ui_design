// https://nuxt.com/docs/api/configuration/nuxt-config

/**
 * PORTABLE=1 builds a client-only, hash-routed app whose JS/CSS end up in one file,
 * so scripts/build-portable.py can inline everything into a single offline HTML.
 */
const portable = process.env.PORTABLE === '1'

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
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  components: [
    // Shared, concept-agnostic building blocks keep their plain names (e.g. <SmartImg>)
    { path: '~/components/shared', pathPrefix: false },
    // Concept-specific components are prefixed by folder: components/c01/Hero.vue → <C01Hero>
    '~/components',
  ],
  imports: {
    dirs: ['stores', 'data'],
  },
  app: {
    head: {
      htmlAttrs: { lang: 'th' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'description', content: 'GAMBOL 2026 — ห้าแนวคิดการออกแบบเว็บไซต์รองเท้า' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'preconnect', href: 'https://images.unsplash.com' },
      ],
    },
  },
  tailwindcss: { viewer: false },
  typescript: { strict: true },
})
