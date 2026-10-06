<script setup lang="ts">
import { technology } from '~/data/content'
const props = defineProps<{ kicker: string; title: string[]; titleTh: string; product: string; cta: { label: string; to: string } }>()
const { getProduct } = useCatalog()
const { link, productLink } = useConcept()
const p = computed(() => getProduct(props.product)!)
</script>

<template>
  <section class="relative overflow-hidden border-b border-line" aria-labelledby="c05-hero-title">
    <div class="pointer-events-none absolute inset-0 opacity-40" style="background-image: linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px); background-size: 80px 80px; mask-image: radial-gradient(ellipse at 65% 50%, #000 30%, transparent 75%)" aria-hidden="true" />
    <div class="container-site relative grid min-h-[calc(100svh-var(--nav-h))] items-center gap-10 py-12 lg:grid-cols-[1fr_1.3fr]">
      <div>
        <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent">{{ kicker }}</p>
        <h1 id="c05-hero-title" class="mt-5 font-display font-medium leading-[0.95] tracking-[-0.03em]" style="font-size: clamp(52px, 7vw, 112px)">
          <span v-for="t in title" :key="t" class="block">{{ t }}</span>
        </h1>
        <p class="mt-4 text-xl text-ink-2">{{ titleTh }}</p>
        <dl class="mt-10 grid max-w-md grid-cols-2 border-l border-t border-line font-mono">
          <div v-for="b in technology.benefits" :key="b.id" class="border-b border-r border-line p-4">
            <dt class="text-[11px] uppercase tracking-wider text-muted">{{ b.label }} · {{ b.labelTh }}</dt>
            <dd class="mt-1 font-display text-3xl">{{ b.metric }}<span class="ml-1 font-mono text-xs text-muted">{{ b.unit }}</span></dd>
          </div>
        </dl>
        <div class="mt-8 flex flex-wrap gap-3">
          <NuxtLink :to="link(cta.to)" class="inline-flex h-12 items-center gap-2 rounded-btn bg-accent px-6 font-mono text-sm font-medium uppercase text-accent-ink">{{ cta.label }} <AppIcon name="arrow" :size="16" /></NuxtLink>
          <a href="#exploded" class="inline-flex h-12 items-center rounded-btn border border-line px-6 font-mono text-sm uppercase hover:border-ink-2">See inside ↓</a>
        </div>
      </div>

      <!-- Product stage with dimension annotations -->
      <div class="relative">
        <div class="relative mx-auto aspect-[4/3] max-w-[720px] rounded-card bg-[#ecebe6]">
          <div class="absolute inset-[10%]"><ProductImg :product="p" eager class="drop-shadow-[0_40px_30px_rgba(0,0,0,.25)]" /></div>
          <svg class="absolute inset-0 h-full w-full text-[#121315]" viewBox="0 0 400 300" fill="none" aria-hidden="true">
            <g stroke="currentColor" stroke-width=".6" font-family="IBM Plex Mono, monospace" font-size="7" fill="none">
              <path d="M40 262 H360" stroke-dasharray="2 2" /><path d="M40 258 v8 M360 258 v8" />
              <text x="200" y="276" text-anchor="middle" stroke="none" fill="currentColor">L 268 mm · EU 41</text>
              <path d="M372 150 V230" stroke-dasharray="2 2" /><path d="M368 150 h8 M368 230 h8" />
              <text x="368" y="144" text-anchor="end" stroke="none" fill="currentColor">STACK 28 mm</text>
              <circle cx="150" cy="200" r="3" fill="#ffb547" stroke="none" /><path d="M150 200 L110 120 H60" />
              <text x="60" y="114" stroke="none" fill="currentColor">G-BOLD CORE · 16 mm</text>
              <circle cx="260" cy="150" r="3" fill="#ffb547" stroke="none" /><path d="M260 150 L300 80 H350" />
              <text x="350" y="74" text-anchor="end" stroke="none" fill="currentColor">148 g / SIDE</text>
            </g>
          </svg>
        </div>
        <NuxtLink :to="productLink(p.slug)" class="mx-auto mt-4 flex max-w-[720px] items-center justify-between border-y border-line py-3 font-mono text-sm hover:text-accent">
          <span>{{ p.name }} — {{ p.subtitle }}</span><span class="tabular-nums">{{ formatPrice(p.price) }} →</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
