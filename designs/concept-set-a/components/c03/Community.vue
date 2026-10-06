<script setup lang="ts">
import { testimonials } from '~/data/content'
defineProps<{ title: string }>()
const { getProduct } = useCatalog()
const { productLink } = useConcept()
const tilt = ['-rotate-2', 'rotate-1', '-rotate-1']
</script>

<template>
  <section id="community" class="bg-accent-2 py-section text-accent-2-ink" aria-labelledby="c03-com-title">
    <div class="container-site">
      <h2 id="c03-com-title" class="text-center font-display text-4xl italic md:text-6xl">{{ title }}</h2>
      <ul class="mt-12 grid gap-8 md:grid-cols-3">
        <li v-for="(t, n) in testimonials" :key="t.name" class="rounded-[6px] bg-surface p-7 text-ink shadow-pop" :class="tilt[n]">
          <p class="text-accent-text" aria-label="5 ดาว">★★★★★</p>
          <blockquote class="mt-3 font-display text-2xl leading-snug">“{{ t.quote }}”</blockquote>
          <p class="mt-5 text-sm"><span class="font-semibold">{{ t.name }}</span> · {{ t.city }}</p>
          <NuxtLink v-if="getProduct(t.product)" :to="productLink(t.product)" class="mt-4 flex items-center gap-3 border-t border-line pt-4 text-sm">
            <span class="h-10 w-12"><ProductImg :product="getProduct(t.product)!" alt="" /></span>ใส่ {{ getProduct(t.product)!.name }} →
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>
