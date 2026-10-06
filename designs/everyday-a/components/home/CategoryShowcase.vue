<script setup lang="ts">
import type { Media } from '~/types'
/** "Find your pair": lifestyle-photo category cards. Staggered editorial grid on desktop, snap rail on mobile. */
defineProps<{ title: string; subtitle: string; items: { label: string; labelTh: string; to: string; media: Media }[] }>()
</script>

<template>
  <section class="py-section" aria-labelledby="cat-title">
    <div class="wrap">
      <SectionHeader id="cat-title" :title="title" :subtitle="subtitle" />
    </div>
    <ul class="rail mt-10 gap-3 lg:mx-auto lg:grid lg:max-w-site lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:px-gutter">
      <li v-for="(c, n) in items" :key="c.label" v-reveal="n * 80" class="w-[74vw] sm:w-[44vw] lg:w-auto" :class="n % 2 ? 'lg:mt-20' : ''">
        <NuxtLink :to="c.to" class="group relative block aspect-[3/4] overflow-hidden bg-paper-2">
          <AppImage :media="c.media" sizes="(min-width:1024px) 25vw, 74vw" :widths="[400, 640, 900]" img-class="zoom-media" />
          <span class="scrim-b absolute inset-0" />
          <span class="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3 text-white">
            <span>
              <span class="display-m block">{{ c.label }}</span>
              <span class="mt-1 block font-thai text-sm text-white/85">{{ c.labelTh }}</span>
            </span>
            <span class="link-arrow whitespace-nowrap pb-1 text-white">Shop Now <AppIcon name="arrow-right" :size="16" class="arrow" /></span>
          </span>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>
