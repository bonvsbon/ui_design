<script setup lang="ts">
import { homeC04 } from '~/data/home/c04'
definePageMeta({ layout: 'c04' })
const home = useHomeSections('c04', homeC04)
</script>

<template>
  <div>
    <C04SectionRenderer :sections="home.visible.value" />
    <CmsPanel :sections="home.sections.value" :toggle="home.toggle" :move="home.move" :reset="home.reset" />
    <PrototypeBar has-cms />
  </div>
</template>
