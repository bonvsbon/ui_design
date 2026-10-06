<script setup lang="ts">
import type { Media } from '~/types'
defineProps<{ title: string[]; body: string; media: Media }>()
const uid = useId()
</script>

<template>
  <section class="grid bg-ink text-white lg:grid-cols-2" :aria-labelledby="uid">
    <div class="relative aspect-[16/10] lg:aspect-auto lg:min-h-[620px]">
      <AppImage :media="media" sizes="(min-width:1024px) 50vw, 100vw" :widths="[640, 960, 1280]" />
    </div>
    <div class="flex flex-col justify-center px-gutter py-14 lg:px-16 xl:px-24">
      <p class="eyebrow flex items-center gap-2 text-sun"><AppIcon name="pin" :size="16" /> Store Locator</p>
      <h2 :id="uid" class="display-l mt-4"><span v-for="l in title" :key="l" class="block">{{ l }}</span></h2>
      <p class="mt-5 max-w-md font-thai text-white/75">{{ body }}</p>
      <div class="mt-8 max-w-lg"><StoreFinderForm dark /></div>
    </div>
  </section>
</template>
