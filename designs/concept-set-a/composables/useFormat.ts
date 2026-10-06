export function formatPrice(value: number) {
  return '฿' + value.toLocaleString('th-TH')
}

export function discountPercent(price: number, compareAt?: number) {
  if (!compareAt || compareAt <= price) return 0
  return Math.round((1 - price / compareAt) * 100)
}

export function thaiDate(iso: string) {
  return new Date(iso).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })
}

/** Serialises a CMS filter object (e.g. a category's `query`) into a query string. */
export function toQuery(q: Record<string, string | undefined>) {
  return Object.entries(q).filter(([, v]) => v).map(([k, v]) => `${k}=${encodeURIComponent(v!)}`).join('&')
}
