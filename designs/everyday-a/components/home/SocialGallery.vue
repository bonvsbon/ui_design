<script setup lang="ts">
import type { Media, Product } from '~/types'
/** #GAMBOLSTYLE: a mixed, shoppable mosaic (not an Instagram embed). */
const props = defineProps<{ title: string; subtitle: string; handle: string; posts: { media: Media; product?: Product; caption: string }[] }>()
const uid = useId()
const tile = (n: number) => ['col-span-2 row-span-2', '', '', 'row-span-2', '', ''][n] ?? ''
</script>

<template>
  <section class="py-section" :aria-labelledby="uid">
    <div class="wrap">
      <div class="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 :id="uid" class="display-l">{{ title }}</h2>
          <p class="thai-lead mt-3 text-ink-2">{{ subtitle }}</p>
        </div>
        <a href="https://www.instagram.com/gambolthailand" target="_blank" rel="noopener" class="link-arrow"><AppIcon name="instagram" :size="18" /> {{ handle }}</a>
      </div>
      <ul class="mt-10 grid auto-rows-[44vw] grid-cols-2 gap-2 sm:auto-rows-[30vw] md:grid-cols-4 md:auto-rows-[19vw] 2xl:auto-rows-[270px]">
        <li v-for="(p, n) in posts" :key="n" :class="tile(n)">
          <component :is="p.product ? 'NuxtLink' : 'div'" :to="p.product ? `/product/${p.product.slug}` : undefined" class="group relative block h-full overflow-hidden bg-paper-2">
            <AppImage :media="p.media" :sizes="n === 0 ? '(min-width:768px) 50vw, 100vw' : '(min-width:768px) 25vw, 50vw'" :widths="[320, 640, 960]" img-class="zoom-media" />
            <span class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              <span class="eyebrow">View Style</span>
              <span v-if="p.product" class="mt-1 text-sm font-semibold">{{ p.product.name }} · {{ formatPrice(p.product.price) }}</span>
            </span>
            <span class="sr-only">{{ p.caption }}<template v-if="p.product"> — {{ p.product.name }}</template></span>
          </component>
        </li>
      </ul>
    </div>
  </section>
</template>
