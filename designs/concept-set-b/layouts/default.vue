<script setup lang="ts">
const route = useRoute()
const storefront = computed(() => !['/overview', '/library', '/studio'].includes(route.path))
</script>
<template>
  <div class="layout-shell">
    <AppHeader v-if="storefront" /><slot /><AppFooter v-if="storefront" /><MobileNavigation
      v-if="storefront"
    />
  </div>
</template>
