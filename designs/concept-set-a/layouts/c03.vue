<script setup lang="ts">
useFontStylesheet('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..800;1,9..144,300..800&family=Noto+Serif+Thai:wght@400;600&family=Anuphan:wght@400;500;600;700&display=swap')
useHead({
  title: 'GAMBOL — Concept 03 · Every Step Has a Story',
  meta: [{ name: 'theme-color', content: '#f5eee3' }],
  bodyAttrs: { class: 'theme-c03' },
})
</script>

<template>
  <div class="theme-c03 tabbar-safe min-h-screen overflow-x-clip bg-bg text-ink" style="--icon-stroke:1.5">
    <a href="#main" class="skip-link">ข้ามไปยังเนื้อหาหลัก</a>
    <C03AppHeader />
    <main id="main"><slot /></main>
    <C03AppFooter />
    <MobileNavigation variant="paper" />
    <CartDrawer />
    <ToastHost />
  </div>
</template>
