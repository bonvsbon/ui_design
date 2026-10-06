import { defineStore } from 'pinia'

const KEY = 'gambol-reef:wishlist'

export const useWishlistStore = defineStore('wishlist', () => {
  const ids = ref<string[]>([])
  const has = (id: string) => ids.value.includes(id)
  function toggle(id: string) {
    ids.value = has(id) ? ids.value.filter((x) => x !== id) : [...ids.value, id]
    return has(id)
  }
  if (import.meta.client) {
    try { ids.value = JSON.parse(localStorage.getItem(KEY) || '[]') } catch { /* ignore */ }
    watch(ids, (v) => { try { localStorage.setItem(KEY, JSON.stringify(v)) } catch { /* ignore */ } })
  }
  return { ids, has, toggle }
})
