/** Global UI overlays shared between header, bottom nav and pages. */
export function useUi() {
  const searchOpen = useState('ui-search', () => false)
  const menuOpen = useState('ui-menu', () => false)
  const cmsOpen = useState('ui-cms', () => false)
  return { searchOpen, menuOpen, cmsOpen }
}

/** Locks body scroll and closes on Escape while an overlay is open. */
export function useOverlay(open: Ref<boolean>) {
  const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') open.value = false }
  watch(open, (v) => {
    if (!import.meta.client) return
    document.documentElement.style.overflow = v ? 'hidden' : ''
    if (v) window.addEventListener('keydown', onKey)
    else window.removeEventListener('keydown', onKey)
  })
  onBeforeUnmount(() => {
    if (!import.meta.client) return
    document.documentElement.style.overflow = ''
    window.removeEventListener('keydown', onKey)
  })
}
