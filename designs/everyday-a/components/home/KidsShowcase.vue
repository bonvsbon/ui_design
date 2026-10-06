<script setup lang="ts">
import type { Media, Product } from '~/types'
/** Kids: own personality (sun-yellow, rounded media, playful tilt) while keeping the brand's type and grid. */
defineProps<{ title: string[]; subtitle: string; media: Media; groups: { label: string; labelTh: string; to: string; media: Media }[]; products: Product[] }>()
const uid = useId()
</script>

<template>
  <section class="overflow-x-clip bg-sun py-section" :aria-labelledby="uid">
    <div class="wrap grid gap-10 lg:grid-cols-12 lg:items-center">
      <div class="relative lg:col-span-6">
        <div class="aspect-[5/4] overflow-hidden rounded-[28px] lg:aspect-[4/4.2]">
          <AppImage :media="media" sizes="(min-width:1024px) 50vw, 100vw" :widths="[640, 960, 1280]" />
        </div>
        <span class="absolute right-2 -top-4 grid h-24 w-24 rotate-12 place-items-center rounded-full bg-red text-center text-[0.7rem] font-bold uppercase leading-tight tracking-[0.1em] text-white shadow-lg lg:-right-6 lg:h-28 lg:w-28">
          Size<br>26–34<br><span class="font-thai normal-case tracking-normal">ใส่ถอดเองได้</span>
        </span>
      </div>
      <div class="lg:col-span-5 lg:col-start-8">
        <h2 :id="uid" class="display-l"><span v-for="l in title" :key="l" class="block">{{ l }}</span></h2>
        <p class="thai-lead mt-4 text-ink-2">{{ subtitle }}</p>
        <ul class="mt-8 grid grid-cols-2 gap-3">
          <li v-for="g in groups" :key="g.label">
            <NuxtLink :to="g.to" class="group relative block aspect-square overflow-hidden rounded-[20px] bg-ink">
              <AppImage :media="g.media" sizes="(min-width:1024px) 20vw, 45vw" :widths="[320, 480, 640]" img-class="zoom-media opacity-90" />
              <span class="scrim-b absolute inset-0" />
              <span class="absolute bottom-4 left-4 text-white">
                <span class="display-s block">{{ g.label }}</span>
                <span class="font-thai text-sm text-white/85">{{ g.labelTh }}</span>
              </span>
              <span class="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white text-ink transition-transform group-hover:rotate-[-45deg]"><AppIcon name="arrow-right" :size="16" /></span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <ul class="rail mt-14 gap-4 lg:mx-auto lg:grid lg:max-w-site lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:px-gutter">
      <li v-for="p in products" :key="p.id" class="w-[58vw] sm:w-[36vw] lg:w-auto">
        <div class="rounded-[20px] bg-paper p-3"><ProductCard :product="p" /></div>
      </li>
    </ul>
  </section>
</template>
