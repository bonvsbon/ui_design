<script setup lang="ts">
import { categoryLabels } from '~/data/catalog'
defineProps<{ title: string; subtitle?: string }>()
const { bestSellers } = useCatalog()
const { link } = useConcept()
const filter = ref<'all' | string>('all')
const filters = ['all', 'flip-flops', 'slides', 'sandals', 'sneakers']
const list = computed(() => bestSellers.value.filter((p) => filter.value === 'all' || p.category === filter.value).slice(0, 7))
</script>

<template>
  <section class="container-site py-section" aria-labelledby="c02-trend-title">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 id="c02-trend-title" class="font-display text-7xl uppercase leading-[0.85] md:text-9xl">{{ title }}<span class="text-accent-2">.</span></h2>
        <p class="mt-2 text-lg font-semibold">{{ subtitle }}</p>
      </div>
      <div class="no-scrollbar flex gap-2 overflow-x-auto" role="group" aria-label="กรองตามประเภท">
        <button
          v-for="f in filters" :key="f" type="button" :aria-pressed="filter === f"
          class="h-11 shrink-0 rounded-full border-2 border-ink px-4 font-bold italic uppercase" :class="filter === f ? 'bg-ink text-bg' : 'hover:bg-accent'"
          @click="filter = f"
        >{{ f === 'all' ? 'ทั้งหมด' : categoryLabels[f] }}</button>
      </div>
    </div>
    <TransitionGroup tag="ul" name="fade" class="mt-8 grid auto-rows-auto grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      <li v-for="(p, n) in list" :key="p.id" :class="n === 0 && 'col-span-2 row-span-2'">
        <C02ProductCard :product="p" :big="n === 0" />
      </li>
    </TransitionGroup>
    <div class="mt-8 text-center">
      <NuxtLink :to="link('/products?sort=best')" class="inline-flex h-14 items-center gap-2 rounded-btn border-[3px] border-ink px-8 text-lg font-extrabold italic uppercase hover:bg-ink hover:text-bg">ดูทั้งหมด <AppIcon name="arrow" /></NuxtLink>
    </div>
  </section>
</template>
