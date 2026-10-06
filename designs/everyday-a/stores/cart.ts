import { defineStore } from 'pinia'
import type { CartLine } from '~/types'

const KEY = 'gambol-reef:cart'

export const useCartStore = defineStore('cart', () => {
  const lines = ref<CartLine[]>([])
  const count = computed(() => lines.value.reduce((n, l) => n + l.qty, 0))

  function add(line: Omit<CartLine, 'qty'>, qty = 1) {
    const hit = lines.value.find((l) => l.productId === line.productId && l.colorId === line.colorId && l.size === line.size)
    if (hit) hit.qty += qty
    else lines.value.push({ ...line, qty })
  }
  function setQty(i: number, qty: number) {
    if (qty <= 0) lines.value.splice(i, 1)
    else lines.value[i].qty = Math.min(qty, 9)
  }
  function remove(i: number) { lines.value.splice(i, 1) }

  // Persist per browser (prototype only — a real cart lives server-side)
  if (import.meta.client) {
    try { lines.value = JSON.parse(localStorage.getItem(KEY) || '[]') } catch { /* ignore */ }
    watch(lines, (v) => { try { localStorage.setItem(KEY, JSON.stringify(v)) } catch { /* ignore */ } }, { deep: true })
  }
  return { lines, count, add, setQty, remove }
})
