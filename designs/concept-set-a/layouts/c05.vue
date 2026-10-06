<script setup lang="ts">
useFontStylesheet('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans+Thai:wght@400;500;600&display=swap')
useHead({
  title: 'GAMBOL — Concept 05 · G-BOLD Lab',
  meta: [{ name: 'theme-color', content: '#121315' }],
  bodyAttrs: { class: 'theme-c05' },
})
</script>

<template>
  <div class="theme-c05 tabbar-safe min-h-screen overflow-x-clip bg-bg text-ink" style="--icon-stroke:1.5">
    <a href="#main" class="skip-link">ข้ามไปยังเนื้อหาหลัก</a>
    <C05AppHeader />
    <main id="main"><slot /></main>
    <C05AppFooter />
    <MobileNavigation variant="lab" />
    <CartDrawer />
    <ToastHost />
  </div>
</template>
