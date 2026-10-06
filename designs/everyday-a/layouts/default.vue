<script setup lang="ts">
const ui = useUiStore()
const route = useRoute()
// Focus main without touching location.hash (the portable build uses hash routing)
function skipToMain() {
  const m = document.getElementById('main')
  m?.setAttribute('tabindex', '-1')
  m?.focus()
}
// Lock page scroll behind full-screen overlays (quick view uses native <dialog>)
watch(() => ui.overlay, (o) => {
  if (import.meta.client) document.documentElement.style.overflow = o && o !== 'quickview' ? 'hidden' : ''
})
// Close drawers on page change (query-only changes, e.g. filters, keep them open)
watch(() => route.path, () => { if (ui.overlay === 'cart' || ui.overlay === 'quickview' || ui.overlay === 'filters') ui.close() })
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <a href="#main" @click.prevent="skipToMain" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-toast focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper">ข้ามไปยังเนื้อหาหลัก</a>
    <AnnouncementBar />
    <MainHeader />
    <main id="main" class="flex-1">
      <slot />
    </main>
    <SiteFooter class="mb-tabbar" />
    <MobileTabBar />
    <MobileMenu />
    <SearchOverlay />
    <CartDrawer />
    <QuickView />
    <ToastHost />
  </div>
</template>
