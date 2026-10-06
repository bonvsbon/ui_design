<script setup lang="ts">
const ui = useUiStore()
</script>
<template>
  <div class="site-shell">
    <a class="skip-link" href="#main-content">Skip to content</a><AnnouncementBar /><MainHeader />
    <main id="main-content" tabindex="-1"><slot /></main>
    <SiteFooter /><MobileBottomNav /><CommerceDialog />
    <div v-if="ui.toast" class="toast" role="status">
      <AppIcon name="check" :size="18" />{{ ui.toast }}
    </div>
  </div>
</template>
