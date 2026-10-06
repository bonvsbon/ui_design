<script setup lang="ts">
const props = defineProps<{ title: string; products: string[] }>()
const { bySlugs } = useCatalog()
const { link } = useConcept()
const list = computed(() => bySlugs(props.products))
</script>

<template>
  <section class="container-site py-section" aria-labelledby="c05-line-title">
    <div class="flex items-end justify-between gap-4">
      <div><p class="font-mono text-xs uppercase tracking-[0.2em] text-accent">Catalogue</p><h2 id="c05-line-title" class="mt-3 font-display text-5xl font-medium tracking-tight">{{ title }}</h2></div>
      <NuxtLink :to="link('/products')" class="font-mono text-xs uppercase hover:text-accent">Full catalogue →</NuxtLink>
    </div>
    <ul class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="(p, n) in list" :key="p.id"><C05ProductCard :product="p" :index="n" /></li>
    </ul>
  </section>
</template>
