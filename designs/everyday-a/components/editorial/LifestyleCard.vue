<script setup lang="ts">
import type { LifestyleEntry } from '~/types'
defineProps<{ item: LifestyleEntry; index?: number }>()
</script>

<template>
  <NuxtLink :to="`/products?lifestyle=${item.slug}`" class="group relative block aspect-[3/4] overflow-hidden bg-ink">
    <AppImage :media="item.media" sizes="(min-width:1024px) 22vw, 68vw" :widths="[360, 560, 800]" img-class="zoom-media opacity-90" />
    <span class="scrim-b absolute inset-0" />
    <span v-if="index !== undefined" class="absolute left-5 top-5 text-xs font-semibold tracking-[0.14em] text-white/80">{{ String(index + 1).padStart(2, '0') }}</span>
    <span class="absolute inset-x-5 bottom-5 text-white">
      <span class="display-m block">{{ item.title }}</span>
      <span class="mt-2 block font-thai text-[0.95rem] text-white/90">{{ item.tagline }}</span>
      <span class="link-arrow mt-4 text-white">Shop {{ item.title }} <AppIcon name="arrow-right" :size="16" class="arrow" /></span>
    </span>
  </NuxtLink>
</template>
