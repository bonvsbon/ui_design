<script setup lang="ts">
useFontStylesheet('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Sans+Thai:wght@400;500;600;700&display=swap')
useHead({
  title: 'GAMBOL — Concept 04 · Find Your Pair',
  meta: [{ name: 'theme-color', content: '#ffffff' }],
  bodyAttrs: { class: 'theme-c04' },
})
</script>

<template>
  <div class="theme-c04 tabbar-safe min-h-screen overflow-x-clip bg-bg text-ink" style="--icon-stroke:1.8">
    <a href="#main" class="skip-link">ข้ามไปยังเนื้อหาหลัก</a>
    <C04AppHeader />
    <main id="main"><slot /></main>
    <C04AppFooter />
    <MobileNavigation variant="tabs" />
    <CartDrawer />
    <ToastHost />
  </div>
</template>
