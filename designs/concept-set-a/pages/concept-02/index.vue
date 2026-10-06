<script setup lang="ts">
import { homeC02 } from '~/data/home/c02'
definePageMeta({ layout: 'c02' })
const home = useHomeSections('c02', homeC02)
</script>

<template>
  <div>
    <C02SectionRenderer :sections="home.visible.value" />
    <CmsPanel :sections="home.sections.value" :toggle="home.toggle" :move="home.move" :reset="home.reset" />
    <PrototypeBar has-cms />
  </div>
</template>
