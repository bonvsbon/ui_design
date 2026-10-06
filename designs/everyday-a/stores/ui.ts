import { defineStore } from 'pinia'

/** Overlay state: only one overlay is open at a time. */
export const useUiStore = defineStore('ui', () => {
  const overlay = ref<null | 'search' | 'menu' | 'cart' | 'filters' | 'quickview'>(null)
  const quickViewId = ref<string | null>(null)
  const toast = ref<{ id: number; text: string } | null>(null)

  const open = (o: NonNullable<typeof overlay.value>) => { overlay.value = o }
  const close = () => { overlay.value = null; quickViewId.value = null }
  const quickView = (id: string) => { quickViewId.value = id; overlay.value = 'quickview' }

  let t: ReturnType<typeof setTimeout> | undefined
  function notify(text: string) {
    toast.value = { id: Date.now(), text }
    clearTimeout(t)
    t = setTimeout(() => { toast.value = null }, 2600)
  }
  return { overlay, quickViewId, toast, open, close, quickView, notify }
})
