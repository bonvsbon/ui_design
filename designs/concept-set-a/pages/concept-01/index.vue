<script setup lang="ts">
import { homeC01 } from '~/data/home/c01'
definePageMeta({ layout: 'c01' })
const home = useHomeSections('c01', homeC01)
</script>

<template>
  <div>
    <C01SectionRenderer :sections="home.visible.value" />
    <CmsPanel :sections="home.sections.value" :toggle="home.toggle" :move="home.move" :reset="home.reset" />
    <PrototypeBar has-cms />
  </div>
</template>
