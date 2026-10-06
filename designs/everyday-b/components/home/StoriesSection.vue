<script setup lang="ts">
import type { HomeSection } from '~/types'
const props = defineProps<{ section: HomeSection }>()
const { stories } = useCatalog()
const selected = computed(() =>
  stories.filter((s) => !props.section.storyIds || props.section.storyIds.includes(s.id))
)
</script>
<template>
  <section class="section container">
    <SectionHeading :title="section.title" :subtitle="section.subtitle" :cta="section.cta" />
    <div class="stories-grid"><StoryCard v-for="s in selected" :key="s.id" :story="s" /></div>
  </section>
</template>
