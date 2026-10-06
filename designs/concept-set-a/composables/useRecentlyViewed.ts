const KEY = 'gambol-recent'

export function useRecentlyViewed() {
  const slugs = useState<string[]>('recently-viewed', () => [])
  onMounted(() => {
    if (slugs.value.length) return
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) slugs.value = JSON.parse(raw)
    } catch {}
  })
  function track(slug: string) {
    slugs.value = [slug, ...slugs.value.filter((s) => s !== slug)].slice(0, 8)
    try { localStorage.setItem(KEY, JSON.stringify(slugs.value)) } catch {}
  }
  return { slugs, track }
}
