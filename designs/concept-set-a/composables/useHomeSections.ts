import type { HomeSection } from '~/types'

/**
 * Homepage composition comes from the CMS as an ordered list of typed sections.
 * In the prototype the list is held in state so the in-page CMS preview panel can
 * enable/disable and reorder sections live — exactly what an admin would do.
 */
export function useHomeSections(key: string, defaults: HomeSection[]) {
  const sections = useState<HomeSection[]>(`home-${key}`, () => structuredClone(defaults))
  const visible = computed(() => sections.value.filter((s) => s.enabled))

  function toggle(id: string) {
    const s = sections.value.find((x) => x.id === id)
    if (s) s.enabled = !s.enabled
  }
  function move(id: string, dir: -1 | 1) {
    const i = sections.value.findIndex((x) => x.id === id)
    const j = i + dir
    if (i < 0 || j < 0 || j >= sections.value.length) return
    const copy = [...sections.value]
    ;[copy[i], copy[j]] = [copy[j]!, copy[i]!]
    sections.value = copy
  }
  function reset() {
    sections.value = structuredClone(defaults)
  }
  return { sections, visible, toggle, move, reset }
}
