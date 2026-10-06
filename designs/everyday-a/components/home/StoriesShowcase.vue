<script setup lang="ts">
import type { Cta, Story } from '~/types'
/** Magazine layout on desktop (lead story + list), horizontal cards on mobile. */
defineProps<{ title: string; subtitle: string; stories: Story[]; cta: Cta }>()
const uid = useId()
</script>

<template>
  <section class="py-section" :aria-labelledby="uid">
    <div class="wrap">
      <SectionHeader :id="uid" :title="title" :subtitle="subtitle" :cta="cta" />
    </div>
    <!-- Desktop magazine -->
    <div class="wrap mt-12 hidden gap-12 lg:grid lg:grid-cols-12">
      <div class="col-span-6"><StoryCard v-if="stories[0]" :story="stories[0]" variant="feature" /></div>
      <div class="col-span-6 flex flex-col divide-y divide-line">
        <div v-for="s in stories.slice(1)" :key="s.slug" class="py-6 first:pt-0"><StoryCard :story="s" variant="row" /></div>
      </div>
    </div>
    <!-- Mobile cards -->
    <ul class="rail mt-10 gap-4 lg:hidden">
      <li v-for="s in stories" :key="s.slug" class="w-[76vw] sm:w-[44vw]"><StoryCard :story="s" /></li>
    </ul>
  </section>
</template>
