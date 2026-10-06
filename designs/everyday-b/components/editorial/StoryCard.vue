<script setup lang="ts">
import type { Story } from '~/types'
defineProps<{ story: Story }>()
</script>
<template>
  <article class="story-card">
    <NuxtLink :to="`/stories/${story.id}`"
      ><div class="story-image" :class="{ 'product-story-image': story.id === 'find-your-fit' }">
        <img :src="story.image" :alt="story.excerpt" width="800" height="650" loading="lazy" /><span
          class="story-arrow"
          ><AppIcon name="upRight" :size="24"
        /></span>
      </div>
      <div class="story-meta">
        <span>{{ story.category }}</span
        ><span>{{ story.readTime }}</span>
      </div>
      <h3>{{ story.title }}</h3>
      <p lang="th">{{ story.excerpt }}</p></NuxtLink
    >
  </article>
</template>
