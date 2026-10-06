<script setup lang="ts">
import type { Lifestyle } from '~/types'
import { lifestyles } from '~/data/lifestyles'
/** Discovery by lifestyle — horizontally scrollable on every breakpoint (drag on desktop). */
const props = defineProps<{ title: string; subtitle: string; items: Lifestyle[] }>()
const list = computed(() => props.items.map((s) => lifestyles.find((l) => l.slug === s)).filter((l) => !!l))
const rail = ref<HTMLElement | null>(null)
const { scrollByPage } = useDragScroll(rail)
</script>

<template>
  <section class="py-section" aria-labelledby="life-title">
    <div class="wrap flex items-end justify-between gap-6">
      <SectionHeader id="life-title" :title="title" :subtitle="subtitle" />
      <div class="hidden shrink-0 gap-2 lg:flex">
        <button type="button" class="grid h-11 w-11 place-items-center rounded-full border border-ink/25 hover:border-ink" aria-label="เลื่อนไปก่อนหน้า" @click="scrollByPage(-1)"><AppIcon name="arrow-left" :size="18" /></button>
        <button type="button" class="grid h-11 w-11 place-items-center rounded-full border border-ink/25 hover:border-ink" aria-label="เลื่อนไปถัดไป" @click="scrollByPage(1)"><AppIcon name="arrow-right" :size="18" /></button>
      </div>
    </div>
    <ul ref="rail" class="rail mt-10 gap-3 lg:gap-4" aria-label="เลือกตามไลฟ์สไตล์">
      <li v-for="(l, n) in list" :key="l!.slug" class="w-[68vw] sm:w-[40vw] lg:w-[calc((min(100vw,1440px)-2*var(--gutter)-3*1rem)/4.4)]">
        <LifestyleCard :item="l!" :index="n" />
      </li>
    </ul>
  </section>
</template>
