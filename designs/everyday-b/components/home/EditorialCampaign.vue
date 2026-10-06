<script setup lang="ts">
import type { HomeSection } from '~/types'
defineProps<{ section: HomeSection }>()
</script>
<template>
  <section class="editorial-campaign">
    <div class="editorial-photo">
      <ResponsiveImage
        v-if="section.media"
        :media="section.media"
        :width="1024"
        :height="1536"
      /><span class="photo-caption">GAMBOL EVERYDAY PEOPLE</span>
    </div>
    <div class="editorial-copy">
      <span class="brand-tag">GO EASY. GO GAMBOL.</span>
      <h2>{{ section.title }}</h2>
      <p class="editorial-thai" lang="th">{{ section.subtitle }}</p>
      <p>{{ section.body }}</p>
      <NuxtLink v-if="section.cta" :to="section.cta.href" class="button white"
        >{{ section.cta.label }}<AppIcon name="arrow" :size="18" /></NuxtLink
      ><span class="editorial-signature">comfort goes with you.</span>
    </div>
  </section>
</template>
