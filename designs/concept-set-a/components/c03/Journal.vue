<script setup lang="ts">
import { articles } from '~/data/content'
defineProps<{ title: string }>()
const [lead, ...rest] = articles
</script>

<template>
  <section class="container-site py-section" aria-labelledby="c03-jr-title">
    <div class="flex items-end justify-between border-b border-ink pb-4">
      <h2 id="c03-jr-title" class="font-display text-4xl md:text-6xl">{{ title }}</h2>
      <a href="#" class="font-semibold underline decoration-accent decoration-2 underline-offset-8">อ่านทั้งหมด</a>
    </div>
    <div class="mt-8 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
      <a href="#" class="group block">
        <div class="aspect-[16/10] overflow-hidden rounded-media"><SmartImg :id="lead!.media" sizes="(min-width:1024px) 55vw, 100vw" img-class="transition-transform duration-700 group-hover:scale-105" /></div>
        <p class="mt-4 text-sm uppercase tracking-[0.2em] text-accent-text">{{ lead!.category }} · {{ lead!.readMinutes }} นาที</p>
        <h3 class="mt-2 font-display text-3xl leading-snug group-hover:underline md:text-4xl">{{ lead!.title }}</h3>
        <p class="mt-2 text-muted">{{ lead!.excerpt }}</p>
      </a>
      <ul class="divide-y divide-line">
        <li v-for="a in rest.slice(0, 4)" :key="a.slug">
          <a href="#" class="group grid grid-cols-[1fr_96px] gap-4 py-5">
            <span>
              <span class="text-xs uppercase tracking-[0.2em] text-muted">{{ a.category }} · {{ thaiDate(a.date) }}</span>
              <span class="mt-1 block font-display text-xl leading-snug group-hover:underline">{{ a.title }}</span>
            </span>
            <span class="aspect-square overflow-hidden rounded-media"><SmartImg :id="a.media" :ratio="1" sizes="96px" alt="" /></span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
