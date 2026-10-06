<script setup lang="ts">
import type { Cta, Media, Product } from '~/types'
/** "New for Men / Women": campaign photo + 4 products. `align` mirrors the layout for rhythm. */
const props = defineProps<{ title: string; subtitle: string; align: 'image-left' | 'image-right'; media: Media; cta: Cta; products: Product[] }>()
const uid = useId()
const flip = computed(() => props.align === 'image-right')
</script>

<template>
  <section class="py-12 lg:py-16" :aria-labelledby="uid">
    <div class="lg:wrap lg:grid lg:grid-cols-12 lg:items-stretch lg:gap-10">
      <!-- Photo -->
      <NuxtLink :to="cta.to" class="group relative block aspect-[4/5] overflow-hidden bg-paper-2 sm:aspect-[16/10] lg:col-span-6 lg:aspect-auto lg:min-h-[640px]" :class="flip ? 'lg:order-2' : ''" tabindex="-1" aria-hidden="true">
        <AppImage :media="media" sizes="(min-width:1024px) 50vw, 100vw" :widths="[640, 960, 1280]" img-class="zoom-media" />
        <span class="scrim-b absolute inset-0 lg:hidden" />
        <span class="display-l absolute bottom-6 left-[var(--gutter)] text-white lg:hidden">{{ title }}</span>
      </NuxtLink>

      <!-- Products -->
      <div class="flex flex-col pt-8 lg:col-span-6 lg:pt-0" :class="flip ? 'lg:order-1' : ''">
        <div class="wrap lg:px-0">
          <h2 :id="uid" class="display-l hidden lg:block">{{ title }}</h2>
          <h2 class="sr-only lg:hidden">{{ title }}</h2>
          <div class="flex items-end justify-between gap-4 lg:mt-3">
            <p class="thai-lead text-ink-2">{{ subtitle }}</p>
            <NuxtLink :to="cta.to" class="link-arrow shrink-0">{{ cta.label }} <AppIcon name="arrow-right" :size="16" class="arrow" /></NuxtLink>
          </div>
        </div>
        <!-- mobile: rail, desktop: 2×2 grid -->
        <ul class="rail mt-6 gap-4 lg:mt-8 lg:grid lg:grid-cols-2 lg:gap-x-5 lg:gap-y-8 lg:overflow-visible lg:px-0">
          <li v-for="p in products" :key="p.id" class="w-[62vw] sm:w-[38vw] lg:w-auto"><ProductCard :product="p" /></li>
        </ul>
      </div>
    </div>
  </section>
</template>
