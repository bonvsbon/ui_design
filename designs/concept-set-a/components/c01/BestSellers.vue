<script setup lang="ts">
const props = defineProps<{ title: string; subtitle?: string; limit?: number }>()
const { bestSellers } = useCatalog()
const { link } = useConcept()
const list = computed(() => bestSellers.value.slice(0, props.limit ?? 5))
</script>

<template>
  <section class="container-site py-section" aria-labelledby="c01-best-title">
    <div class="mb-8 grid gap-4 md:grid-cols-2 md:items-end">
      <h2 id="c01-best-title" class="font-display text-4xl font-black uppercase leading-none md:text-6xl" style="font-stretch: 118%">{{ title }}</h2>
      <div class="flex items-end justify-between gap-4 md:justify-end md:gap-10">
        <p class="max-w-xs text-muted">{{ subtitle }}</p>
        <NuxtLink :to="link('/products?sort=best')" class="shrink-0 font-display text-xs font-semibold uppercase tracking-[0.18em] underline underline-offset-4">Shop all</NuxtLink>
      </div>
    </div>
    <ol class="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-5">
      <li v-for="(p, n) in list" :key="p.id" :class="n === 0 && 'col-span-2 md:row-span-2'" class="relative">
        <span class="pointer-events-none absolute -top-3 right-2 z-10 font-display text-5xl font-black tabular-nums text-ink md:text-7xl" style="font-stretch: 125%" aria-hidden="true">{{ n + 1 }}</span>
        <C01ProductCard :product="p" :large="n === 0" />
      </li>
    </ol>
  </section>
</template>
