<script setup lang="ts">
useFontStylesheet('https://fonts.googleapis.com/css2?family=Anton&family=Kanit:ital,wght@0,400;0,500;0,600;0,700;0,800;1,700;1,800&display=swap')
useHead({
  title: 'GAMBOL — Concept 02 · Bold Sport',
  meta: [{ name: 'theme-color', content: '#0a0a0a' }],
  bodyAttrs: { class: 'theme-c02' },
})
</script>

<template>
  <div class="theme-c02 tabbar-safe min-h-screen overflow-x-clip bg-bg text-ink" style="--icon-stroke:2.2">
    <a href="#main" class="skip-link">ข้ามไปยังเนื้อหาหลัก</a>
    <C02AppHeader />
    <main id="main"><slot /></main>
    <C02AppFooter />
    <MobileNavigation variant="float" />
    <CartDrawer />
    <ToastHost />
  </div>
</template>
