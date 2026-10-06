export default defineNuxtConfig({
  compatibilityDate: '2025-09-01',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  css: [],
  tailwindcss: { cssPath: '~/assets/css/main.css' },
  components: [{ path: '~/components', pathPrefix: false }],
  app: {
    head: {
      title: 'GAMBOL | Everyday feels better',
      htmlAttrs: { lang: 'en' },
      meta: [
        {
          name: 'description',
          content:
            'Find your everyday comfort. Discover GAMBOL flip flops, slides, sandals and sneakers for men, women and kids.',
        },
        { name: 'theme-color', content: '#bd1830' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        {
          rel: 'preload',
          href: '/fonts/font-23.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: '',
        },
      ],
    },
  },
  typescript: { strict: true },
  nitro: { compressPublicAssets: true },
  vite: { server: { fs: { strict: true } } },
})
