import type { Product } from '~/types'

/** Shared PDP state: colour, size, validation and cart actions. Each concept renders its own UI. */
export function useProductPage(product: Ref<Product | undefined>) {
  const cart = useCart()
  const toast = useToast()
  const { link } = useConcept()
  const colorId = ref('')
  const size = ref<number | null>(null)
  const sizeError = ref(false)
  const { track } = useRecentlyViewed()

  watch(product, (p) => {
    if (!p) return
    colorId.value = p.colors[0]!.id
    size.value = null
    sizeError.value = false
    if (import.meta.client) track(p.slug)
  }, { immediate: true })

  const color = computed(() => product.value?.colors.find((c) => c.id === colorId.value) ?? product.value?.colors[0])
  const isSoldOut = (z: number) => !!product.value?.soldOutSizes?.includes(z)

  function selectSize(z: number) {
    if (isSoldOut(z)) return
    size.value = z
    sizeError.value = false
  }
  function addToCart() {
    if (!product.value) return false
    if (!size.value) {
      sizeError.value = true
      return false
    }
    cart.add(product.value, color.value!.id, size.value)
    toast.show(`เพิ่ม ${product.value.name} · ${color.value!.name} · ไซซ์ ${size.value} ลงตะกร้าแล้ว`)
    return true
  }
  function buyNow() {
    if (addToCart()) {
      cart.open.value = true
      toast.show('ต้นแบบ: ขั้นตอนชำระเงินจะเชื่อมต่อกับระบบร้านค้าจริงในเฟสถัดไป')
    }
  }
  return { colorId, color, size, sizeError, isSoldOut, selectSize, addToCart, buyNow, link }
}
