<script setup lang="ts">
import type { Cta, Media } from '~/types'
/** 60/40 asymmetric editorial: photography left, typography right, with an inset detail shot. */
defineProps<{ eyebrow: string; title: string[]; body: string; cta: Cta; media: Media; secondaryMedia?: Media; stats: { value: string; label: string }[] }>()
</script>

<template>
  <section class="bg-paper-2 py-section" aria-labelledby="brand-title">
    <div class="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
      <div class="relative lg:col-span-7">
        <div class="aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5] xl:aspect-[5/5.2]">
          <AppImage :media="media" sizes="(min-width:1024px) 58vw, 100vw" :widths="[640, 960, 1280, 1600]" />
        </div>
        <div v-if="secondaryMedia" class="absolute -bottom-8 right-4 w-[38%] max-w-[260px] border-[6px] border-paper-2 sm:right-8 lg:-right-10">
          <div class="aspect-[4/5] overflow-hidden"><AppImage :media="secondaryMedia" sizes="260px" :widths="[260, 400]" /></div>
        </div>
      </div>
      <div v-reveal class="pt-6 lg:col-span-5 lg:pl-12 lg:pt-0">
        <p class="eyebrow text-red">{{ eyebrow }}</p>
        <h2 id="brand-title" class="display-l mt-4">
          <span v-for="l in title" :key="l" class="block">{{ l }}</span>
        </h2>
        <p class="mt-6 max-w-md font-thai text-[1.05rem] leading-relaxed text-ink-2">{{ body }}</p>
        <dl class="mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-ink/15 pt-6">
          <div v-for="s in stats" :key="s.label">
            <dt class="sr-only">{{ s.label }}</dt>
            <dd class="display-s">{{ s.value }}</dd>
            <dd class="mt-1 font-thai text-xs text-muted">{{ s.label }}</dd>
          </div>
        </dl>
        <NuxtLink :to="cta.to" class="btn-primary mt-10">{{ cta.label }}</NuxtLink>
      </div>
    </div>
  </section>
</template>
