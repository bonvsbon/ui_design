<script setup lang="ts">
const cms = useContentStore()
useSeoMeta({
  title: 'GAMBOL | Everyday feels better',
  description:
    'Flip flops, slides, sandals and sneakers. Find a little more comfort for your everyday with GAMBOL.',
})
</script>
<template>
  <div class="home-page">
    <HomeSectionRenderer v-for="section in cms.sections" :key="section.id" :section="section" />
  </div>
</template>
