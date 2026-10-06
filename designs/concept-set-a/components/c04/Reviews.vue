<script setup lang="ts">
import { testimonials } from '~/data/content'
defineProps<{ title: string }>()
const dist = [78, 15, 4, 2, 1]
</script>

<template>
  <section class="bg-surface py-12" aria-labelledby="c04-rev-title">
    <div class="container-site grid gap-8 lg:grid-cols-[320px_1fr]">
      <div>
        <h2 id="c04-rev-title" class="text-2xl font-extrabold md:text-3xl">{{ title }}</h2>
        <p class="mt-4 flex items-end gap-2"><span class="text-6xl font-extrabold">4.8</span><span class="pb-2 text-muted">/ 5 จาก 9,840 รีวิว</span></p>
        <ul class="mt-4 space-y-1.5">
          <li v-for="(d, n) in dist" :key="n" class="flex items-center gap-2 text-sm"><span class="w-6 tabular-nums">{{ 5 - n }}★</span><span class="h-2 flex-1 overflow-hidden rounded-full bg-surface-2"><span class="block h-full bg-[#f59e0b]" :style="{ width: d + '%' }" /></span><span class="w-10 text-right tabular-nums text-muted">{{ d }}%</span></li>
        </ul>
      </div>
      <ul class="grid gap-3 md:grid-cols-3">
        <li v-for="t in testimonials" :key="t.name" class="rounded-card bg-bg p-5 shadow-card">
          <p class="text-[#f59e0b]" aria-label="5 ดาว">★★★★★</p>
          <p class="mt-2">{{ t.quote }}</p>
          <p class="mt-3 text-sm text-muted">{{ t.name }} · {{ t.city }} · <span class="text-[#15803d]">✓ ซื้อจริง</span></p>
        </li>
      </ul>
    </div>
  </section>
</template>
