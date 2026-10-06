export default defineNuxtConfig({
  compatibilityDate: '2025-09-01',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'GAMBOL — Go your own way',
      meta: [
        {
          name: 'description',
          content:
            'Five original GAMBOL footwear concepts. Discover everyday comfort, fresh silhouettes, and a softer way to move.',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=Bodoni+Moda:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@400;500;600;700;800&family=Noto+Sans+Thai:wght@400;500;600;700&display=swap',
        },
      ],
    },
  },
  typescript: { strict: true },
  nitro: {
    prerender: { crawlLinks: true, ignore: [(route: string) => route.includes('/products')] },
  },
})
