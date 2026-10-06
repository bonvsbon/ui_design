import { defineStore } from 'pinia'
import type { CartItem } from '~/types'
import { products } from '~/mock/products'
export const useShopStore = defineStore('shop', () => {
  const items = ref<CartItem[]>([])
  const wishlist = ref<string[]>([])
  const hydrated = ref(false)
  const count = computed(() => items.value.reduce((n, p) => n + p.quantity, 0))
  const detailed = computed(() =>
    items.value
      .map((item) => ({ ...item, product: products.find((p) => p.id === item.productId)! }))
      .filter((i) => i.product)
  )
  const subtotal = computed(() =>
    detailed.value.reduce((n, i) => n + i.product.price * i.quantity, 0)
  )
  function save() {
    if (import.meta.client)
      try {
        localStorage.setItem(
          'gambol-reef-shop',
          JSON.stringify({ items: items.value, wishlist: wishlist.value })
        )
      } catch {}
  }
  function hydrate() {
    if (hydrated.value) return
    try {
      const data = JSON.parse(localStorage.getItem('gambol-reef-shop') || '{}')
      items.value = (Array.isArray(data.items) ? data.items : [])
        .filter((i: CartItem) => {
          const p = products.find((p) => p.id === i.productId)
          return (
            p &&
            p.sizes.includes(i.size) &&
            !p.unavailableSizes.includes(i.size) &&
            p.colors.some((c) => c.name === i.color) &&
            Number.isInteger(i.quantity) &&
            i.quantity > 0 &&
            i.quantity <= 10
          )
        })
        .map((i: CartItem) => ({ ...i, key: `${i.productId}-${i.color}-${i.size}` }))
      wishlist.value = (Array.isArray(data.wishlist) ? data.wishlist : []).filter((id: string) =>
        products.some((p) => p.id === id)
      )
    } catch {}
    hydrated.value = true
  }
  function add(productId: string, color: string, size: number) {
    const p = products.find((x) => x.id === productId)
    if (
      !p ||
      !p.sizes.includes(size) ||
      p.unavailableSizes.includes(size) ||
      !p.colors.some((c) => c.name === color)
    )
      return
    const key = `${productId}-${color}-${size}`
    const existing = items.value.find((i) => i.key === key)
    if (existing) existing.quantity = Math.min(10, existing.quantity + 1)
    else items.value.push({ key, productId, color, size, quantity: 1 })
    save()
  }
  function quantity(key: string, value: number) {
    const item = items.value.find((i) => i.key === key)
    if (item) item.quantity = Math.max(1, Math.min(10, value))
    save()
  }
  function remove(key: string) {
    items.value = items.value.filter((i) => i.key !== key)
    save()
  }
  function toggle(id: string) {
    wishlist.value = wishlist.value.includes(id)
      ? wishlist.value.filter((x) => x !== id)
      : [...wishlist.value, id]
    save()
  }
  return { items, wishlist, count, detailed, subtotal, hydrate, add, quantity, remove, toggle }
})
