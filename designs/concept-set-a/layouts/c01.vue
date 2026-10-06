<script setup lang="ts">
useFontStylesheet('https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=IBM+Plex+Sans+Thai:wght@400;500;600;700&display=swap')
useHead({
  title: 'GAMBOL — Concept 01 · Premium Street',
  meta: [{ name: 'theme-color', content: '#0d0d0d' }],
  bodyAttrs: { class: 'theme-c01' },
})
</script>

<template>
  <div class="theme-c01 tabbar-safe min-h-screen overflow-x-clip bg-bg text-ink" style="--icon-stroke:1.4">
    <a href="#main" class="skip-link">ข้ามไปยังเนื้อหาหลัก</a>
    <C01Announcement />
    <C01AppHeader />
    <main id="main"><slot /></main>
    <C01AppFooter />
    <MobileNavigation variant="bar" />
    <C01SearchOverlay />
    <CartDrawer />
    <ToastHost />
  </div>
</template>
