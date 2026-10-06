<script setup lang="ts">
import type { Product } from '~/types'
const props = defineProps<{ eyebrow?: string; title: string; source?: 'new' | 'best'; slugs?: string[]; items?: Product[]; link?: string }>()
const { newArrivals, bestSellers, bySlugs } = useCatalog()
const { link: to } = useConcept()
const list = computed(() => props.items ?? (props.slugs ? bySlugs(props.slugs) : props.source === 'best' ? bestSellers.value : newArrivals.value).slice(0, 8))
const track = ref<HTMLElement>()
function scroll(dir: 1 | -1) {
  const el = track.value
  if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
}
const uid = useId()
</script>

<template>
  <section class="py-section" :aria-labelledby="uid">
    <div class="container-site mb-8 flex items-end justify-between gap-6">
      <div>
        <p v-if="eyebrow" class="font-display text-[11px] uppercase tracking-[0.24em] text-muted">{{ eyebrow }}</p>
        <h2 :id="uid" class="mt-2 font-display text-4xl font-black uppercase leading-none md:text-6xl" style="font-stretch: 118%">{{ title }}</h2>
      </div>
      <div class="flex items-center gap-2">
        <NuxtLink v-if="link" :to="to(link)" class="mr-4 hidden font-display text-xs font-semibold uppercase tracking-[0.18em] underline-offset-4 hover:underline sm:block">View all</NuxtLink>
        <button type="button" class="grid h-11 w-11 place-items-center border border-ink hover:bg-ink hover:text-bg" aria-label="เลื่อนไปทางซ้าย" @click="scroll(-1)"><AppIcon name="arrow-left" /></button>
        <button type="button" class="grid h-11 w-11 place-items-center border border-ink hover:bg-ink hover:text-bg" aria-label="เลื่อนไปทางขวา" @click="scroll(1)"><AppIcon name="arrow" /></button>
      </div>
    </div>
    <ul ref="track" class="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-[var(--gutter)] px-gutter md:gap-5">
      <li v-for="(p, n) in list" :key="p.id" class="w-[72vw] shrink-0 snap-start sm:w-[44vw] lg:w-[calc((100vw-2*var(--gutter)-3*20px)/4)] lg:max-w-[340px]">
        <C01ProductCard :product="p" :index="n" />
      </li>
    </ul>
  </section>
</template>
