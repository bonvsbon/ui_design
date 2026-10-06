<script setup lang="ts">
const { concept } = useConcept()
const route = useRoute()
const { shop, panel, message } = useShop()
const { campaigns, sections } = useContent()
const ready = ref(false)
let toastTimer: ReturnType<typeof setTimeout>
watch(message, () => {
  clearTimeout(toastTimer)
  if (message.value) toastTimer = setTimeout(() => (message.value = ''), 3200)
})
watch(
  () => route.fullPath,
  () => {
    panel.value = null
  }
)
onMounted(() => {
  try {
    const saved = localStorage.getItem('gambol-shop-v1')
    if (saved) {
      const p = JSON.parse(saved)
      if (Array.isArray(p.cart) && Array.isArray(p.wishlist) && Array.isArray(p.recent))
        shop.value = p
    }
    const content = localStorage.getItem('gambol-content-v1')
    if (content) {
      const p = JSON.parse(content)
      if (p.campaigns && p.sections) {
        campaigns.value = p.campaigns
        sections.value = p.sections
      }
    }
  } catch {
    /* Invalid local preview data falls back to the mock catalog. */
  }
  ready.value = true
})
watch(
  shop,
  () => {
    if (ready.value)
      try {
        localStorage.setItem('gambol-shop-v1', JSON.stringify(shop.value))
      } catch {}
  },
  { deep: true }
)
watch(
  [campaigns, sections],
  () => {
    if (ready.value)
      try {
        localStorage.setItem(
          'gambol-content-v1',
          JSON.stringify({ campaigns: campaigns.value, sections: sections.value })
        )
      } catch {}
  },
  { deep: true }
)
onBeforeUnmount(() => clearTimeout(toastTimer))
</script>
<template>
  <div :class="['site', concept.id]">
    <a href="#main" class="skip-link">Skip to content</a>
    <ConceptSwitcher />
    <NuxtLayout><NuxtPage /></NuxtLayout>
    <ShopOverlay />
    <Transition name="toast"
      ><div v-if="message" class="toast-message" role="status">
        <AppIcon name="check" :size="18" />{{ message }}
      </div></Transition
    >
  </div>
</template>
