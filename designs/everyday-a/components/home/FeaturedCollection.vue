<script setup lang="ts">
import type { Cta, Media, Product } from '~/types'
/** Seasonal editorial: full-bleed photo with oversized title; 3 products overlap the bottom edge on desktop. */
defineProps<{ eyebrow: string; title: string[]; subtitle: string; media: Media; cta: Cta; products: Product[] }>()
const uid = useId()
</script>

<template>
  <section class="pb-section pt-section" :aria-labelledby="uid">
    <div class="relative h-[78svh] max-h-[860px] min-h-[480px] overflow-hidden">
      <AppImage :media="media" sizes="100vw" :widths="[640, 1080, 1600, 2200]" />
      <div class="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/40" />
      <div class="wrap absolute inset-x-0 top-0 pt-10 text-white lg:pt-16">
        <p class="eyebrow">{{ eyebrow }}</p>
        <h2 :id="uid" class="mt-3 font-[800] uppercase leading-[0.82]" style="font-stretch: 62%; font-size: clamp(4.5rem, 17vw, 15rem)">
          <span v-for="l in title" :key="l" class="block">{{ l }}</span>
        </h2>
      </div>
      <div class="wrap absolute inset-x-0 bottom-8 flex flex-col items-start gap-4 text-white lg:bottom-auto lg:top-16 lg:items-end lg:text-right">
        <p class="thai-lead max-w-xs text-xl">“{{ subtitle }}”</p>
        <NuxtLink :to="cta.to" class="btn-light">{{ cta.label }}</NuxtLink>
      </div>
    </div>
    <ul class="rail relative mt-8 gap-4 lg:mx-auto lg:-mt-40 lg:grid lg:max-w-site lg:grid-cols-12 lg:gap-5 lg:overflow-visible lg:px-gutter">
      <li v-for="(p, n) in products" :key="p.id" v-reveal="n * 90" class="w-[62vw] sm:w-[40vw] lg:col-span-3 lg:w-auto" :class="['lg:col-start-4', '', ''][n]">
        <div class="lg:bg-paper lg:p-4"><ProductCard :product="p" /></div>
      </li>
    </ul>
  </section>
</template>
