<script setup lang="ts">
import { homeC05 } from '~/data/home/c05'
definePageMeta({ layout: 'c05' })
const home = useHomeSections('c05', homeC05)
</script>

<template>
  <div>
    <C05SectionRenderer :sections="home.visible.value" />
    <CmsPanel :sections="home.sections.value" :toggle="home.toggle" :move="home.move" :reset="home.reset" />
    <PrototypeBar has-cms />
  </div>
</template>
