<script setup lang="ts">
import type { Story } from '~/types'
/** Editorial card. `feature` = large magazine lead; `row` = compact list item; default = card. */
withDefaults(defineProps<{ story: Story; variant?: 'feature' | 'row' | 'card' }>(), { variant: 'card' })
</script>

<template>
  <NuxtLink v-if="variant === 'row'" :to="`/stories/${story.slug}`" class="group grid grid-cols-[120px_1fr] items-center gap-5 sm:grid-cols-[180px_1fr]">
    <div class="aspect-[4/3] overflow-hidden bg-paper-2"><AppImage :media="story.media" sizes="180px" :widths="[240, 400]" img-class="zoom-media" /></div>
    <div>
      <p class="eyebrow text-red">{{ story.category }}</p>
      <h3 class="mt-2 font-thai text-lg font-semibold leading-snug group-hover:underline underline-offset-4">{{ story.title }}</h3>
      <p class="mt-1 text-sm text-muted">{{ story.readMinutes }} นาที</p>
    </div>
  </NuxtLink>

  <NuxtLink v-else :to="`/stories/${story.slug}`" class="group block">
    <div class="overflow-hidden bg-paper-2" :class="variant === 'feature' ? 'aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/3.6]' : 'aspect-[4/5]'">
      <AppImage :media="story.media" :sizes="variant === 'feature' ? '(min-width:1024px) 50vw, 100vw' : '(min-width:1024px) 33vw, 75vw'" :widths="[480, 800, 1200]" img-class="zoom-media" />
    </div>
    <p class="eyebrow mt-5 text-red">{{ story.category }} · {{ story.readMinutes }} min read</p>
    <h3 class="mt-2 font-thai font-semibold leading-snug group-hover:underline underline-offset-4" :class="variant === 'feature' ? 'text-2xl lg:text-[2rem] lg:leading-tight' : 'text-xl'">{{ story.title }}</h3>
    <p class="mt-2 max-w-xl font-thai text-ink-2">{{ story.excerpt }}</p>
  </NuxtLink>
</template>
