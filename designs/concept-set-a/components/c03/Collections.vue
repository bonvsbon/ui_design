<script setup lang="ts">
import { collections } from '~/data/catalog'
defineProps<{ title: string }>()
const { link } = useConcept()
</script>

<template>
  <section class="py-section" aria-labelledby="c03-col-title">
    <h2 id="c03-col-title" class="container-site font-display text-4xl md:text-5xl">{{ title }}</h2>
    <ul class="no-scrollbar mt-8 flex snap-x gap-5 overflow-x-auto px-gutter">
      <li v-for="(c, n) in collections" :key="c.slug" class="w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[30vw]">
        <NuxtLink :to="link(`/products?collection=${c.slug}`)" class="group block">
          <div class="relative aspect-[3/4] overflow-hidden rounded-media">
            <SmartImg :id="c.media" :ratio="1.33" sizes="(min-width:1024px) 30vw, 78vw" img-class="transition-transform duration-700 group-hover:scale-105" />
            <span class="absolute left-4 top-4 font-display text-6xl italic text-white/90">0{{ n + 1 }}</span>
          </div>
          <p class="mt-4 font-display text-2xl">{{ c.name }}</p>
          <p class="text-muted">{{ c.tagline }}</p>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>
