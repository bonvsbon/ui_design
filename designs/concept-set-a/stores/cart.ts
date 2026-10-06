import type { Product } from '~/types'

export interface CartLine {
  key: string
  slug: string
  name: string
  image: string
  colorId: string
  colorName: string
  filter?: string
  size: number
  qty: number
  price: number
}

export const CART_KEY = 'gambol-cart'

/**
 * Cart store (useState-backed so it is SSR-safe and shared across components).
 * Persists per-browser; a real build would sync with the commerce backend.
 */
export function useCart() {
  const lines = useState<CartLine[]>('cart-lines', () => [])
  const open = useState('cart-open', () => false)
  function persist() {
    try { localStorage.setItem(CART_KEY, JSON.stringify(lines.value)) } catch {}
  }

  const count = computed(() => lines.value.reduce((n, l) => n + l.qty, 0))
  const subtotal = computed(() => lines.value.reduce((n, l) => n + l.qty * l.price, 0))

  function add(p: Product, colorId: string, size: number, qty = 1) {
    const c = p.colors.find((x) => x.id === colorId) ?? p.colors[0]!
    const key = `${p.slug}-${c.id}-${size}`
    const existing = lines.value.find((l) => l.key === key)
    if (existing) existing.qty += qty
    else lines.value.push({ key, slug: p.slug, name: p.name, image: p.image, colorId: c.id, colorName: c.name, filter: c.filter, size, qty, price: p.price })
    persist()
  }
  function setQty(key: string, qty: number) {
    const l = lines.value.find((x) => x.key === key)
    if (!l) return
    if (qty <= 0) lines.value = lines.value.filter((x) => x.key !== key)
    else l.qty = qty
    persist()
  }
  return { lines, open, count, subtotal, add, setQty }
}
