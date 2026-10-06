<script setup lang="ts">
/** Homepage = whatever the CMS page-builder returns, in order. */
const { data: sections } = await useAsyncData('homepage', () => useApi().getHomepage())
useHead({ title: 'รองเท้าแตะและรองเท้าลำลองสำหรับทุกวัน', titleTemplate: 'GAMBOL — Everyday Feels Better · %s' })
</script>

<template>
  <HomeSectionRenderer v-if="sections" :sections="sections" />
</template>
