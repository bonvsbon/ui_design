<script setup lang="ts">
import type { NavItem } from '~/types'
/** Full-width mega menu panel: link columns + one editorial campaign tile. */
defineProps<{ item: NavItem }>()
const emit = defineEmits<{ navigate: [] }>()
</script>

<template>
  <div v-if="item.mega" class="border-t border-line bg-paper shadow-[0_24px_40px_-24px_rgb(0_0_0/0.25)]">
    <div class="wrap grid grid-cols-12 gap-8 py-10">
      <div v-for="col in item.mega.columns" :key="col.heading" class="col-span-2">
        <p class="eyebrow text-muted">{{ col.heading }}</p>
        <ul class="mt-4 space-y-2.5">
          <li v-for="l in col.links" :key="l.label">
            <NuxtLink :to="l.to" class="text-[0.98rem] font-medium hover:text-red" @click="emit('navigate')">{{ l.label }}</NuxtLink>
          </li>
        </ul>
      </div>
      <NuxtLink :to="item.mega.feature.to" class="group relative col-span-5 col-start-8 block aspect-[16/9] overflow-hidden bg-paper-2" @click="emit('navigate')">
        <AppImage :media="item.mega.feature.media" sizes="40vw" :widths="[480, 768, 1080]" img-class="zoom-media" />
        <span class="scrim-b absolute inset-0" />
        <span class="absolute inset-x-6 bottom-5 text-white">
          <span class="eyebrow block text-white/80">{{ item.mega.feature.eyebrow }}</span>
          <span class="display-s mt-1 block">{{ item.mega.feature.title }}</span>
          <span class="link-arrow mt-3 text-white">Shop Now <AppIcon name="arrow-right" :size="16" class="arrow" /></span>
        </span>
      </NuxtLink>
    </div>
  </div>
</template>
