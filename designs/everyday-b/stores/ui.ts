import { defineStore } from 'pinia'
export const useUiStore = defineStore('ui', () => {
  const modal = ref<'search' | 'cart' | 'wishlist' | 'quick' | 'account' | 'menu' | null>(null)
  const productId = ref('')
  const toast = ref('')
  let timer: ReturnType<typeof setTimeout> | undefined
  function open(type: typeof modal.value, id?: string) {
    if (id) productId.value = id
    modal.value = type
  }
  function notify(message: string) {
    toast.value = message
    clearTimeout(timer)
    timer = setTimeout(() => (toast.value = ''), 4000)
  }
  return { modal, productId, toast, open, notify }
})
