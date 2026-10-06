export default defineNuxtPlugin({
  name: 'restore-local-preview',
  dependsOn: ['pinia'],
  setup() {
    const shop = useShopStore()
    const content = useContentStore()
    // Nuxt layouts hydrate asynchronously. Restore only after the full
    // suspense tree resolves, so the initial client render matches SSR.
    onNuxtReady(() => {
      shop.hydrate()
      content.load()
    })
  },
})
