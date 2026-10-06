export const WISHLIST_KEY = 'gambol-wishlist'

export function useWishlist() {
  const slugs = useState<string[]>('wishlist', () => [])
  const count = computed(() => slugs.value.length)
  const has = (slug: string) => slugs.value.includes(slug)
  function toggle(slug: string) {
    slugs.value = has(slug) ? slugs.value.filter((s) => s !== slug) : [...slugs.value, slug]
    try { localStorage.setItem(WISHLIST_KEY, JSON.stringify(slugs.value)) } catch {}
  }
  return { slugs, count, has, toggle }
}
