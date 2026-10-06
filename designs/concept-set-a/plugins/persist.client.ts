/** Restores per-browser state after hydration so server and client markup match. */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    const read = (k: string) => {
      try { const raw = localStorage.getItem(k); return raw ? JSON.parse(raw) : null } catch { return null }
    }
    const cart = read(CART_KEY)
    if (Array.isArray(cart)) useCart().lines.value = cart
    const wish = read(WISHLIST_KEY)
    if (Array.isArray(wish)) useWishlist().slugs.value = wish
  })
})
