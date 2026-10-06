<script setup lang="ts">
const props = defineProps<{
  campaigns: { id: string; media: string; eyebrow: string; title: string[]; subtitle: string; cta: { label: string; to: string }; secondary?: { label: string; to: string }; product?: string }[]
}>()
const { link, productLink } = useConcept()
const { getProduct } = useCatalog()
const i = ref(0)
const paused = ref(false)
const DURATION = 7000
let t: ReturnType<typeof setInterval> | undefined
const reduced = ref(false)
onMounted(() => {
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced.value) return
  t = setInterval(() => { if (!paused.value) i.value = (i.value + 1) % props.campaigns.length }, DURATION)
})
onBeforeUnmount(() => clearInterval(t))
const current = computed(() => props.campaigns[i.value]!)
const product = computed(() => (current.value.product ? getProduct(current.value.product) : undefined))
</script>

<template>
  <section class="relative h-[calc(100svh-var(--nav-h)-36px)] min-h-[560px] overflow-hidden bg-inverse text-inverse-ink" aria-roledescription="carousel" aria-label="แคมเปญหลัก" @mouseenter="paused = true" @mouseleave="paused = false" @focusin="paused = true" @focusout="paused = false">
    <TransitionGroup name="fade">
      <div v-for="(c, n) in campaigns" v-show="n === i" :key="c.id" class="absolute inset-0" role="group" aria-roledescription="slide" :aria-label="`${n + 1} จาก ${campaigns.length}`">
        <SmartImg :id="c.media" :eager="n === 0" sizes="100vw" img-class="grayscale contrast-125 scale-105 animate-[c01-drift_14s_ease-out_forwards]" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
      </div>
    </TransitionGroup>

    <div class="container-site relative flex h-full flex-col justify-end pb-8 pt-16 md:pb-10">
      <p class="font-display text-[11px] uppercase tracking-[0.24em] text-white/80">{{ current.eyebrow }}</p>
      <h1 class="mt-4 max-w-[16ch] font-display font-black uppercase leading-[0.86] tracking-[-0.02em]" style="font-size: clamp(44px, min(8.5vw, 14vh), 148px); font-stretch: 116%">
        <span v-for="line in current.title" :key="line" class="block">{{ line }}</span>
      </h1>
      <div class="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div class="max-w-md">
          <p class="text-base text-white/85 md:text-lg">{{ current.subtitle }}</p>
          <div class="mt-6 flex flex-wrap gap-3">
            <NuxtLink :to="link(current.cta.to)" class="inline-flex h-12 items-center gap-3 bg-accent px-6 font-display text-xs font-bold uppercase tracking-[0.16em] text-accent-ink transition-colors hover:bg-white">{{ current.cta.label }} <AppIcon name="arrow" :size="18" /></NuxtLink>
            <NuxtLink v-if="current.secondary" :to="link(current.secondary.to)" class="inline-flex h-12 items-center border border-white/60 px-6 font-display text-xs font-bold uppercase tracking-[0.16em] hover:bg-white hover:text-ink">{{ current.secondary.label }}</NuxtLink>
          </div>
        </div>
        <NuxtLink v-if="product" :to="productLink(product.slug)" class="group hidden w-72 shrink-0 bg-white p-4 text-ink md:block">
          <div class="aspect-[4/3]"><ProductImg :product="product" eager class="transition-transform duration-500 group-hover:scale-105" /></div>
          <div class="mt-3 flex items-end justify-between">
            <div><p class="font-display text-sm font-bold uppercase" style="font-stretch: 110%">{{ product.name }}</p><p class="text-xs text-muted">{{ product.subtitle }}</p></div>
            <p class="text-sm tabular-nums">{{ formatPrice(product.price) }}</p>
          </div>
        </NuxtLink>
      </div>

      <div class="mt-8 flex items-center gap-3">
        <button
          v-for="(c, n) in campaigns" :key="c.id" type="button" class="group relative h-8 flex-1 md:max-w-40" :aria-label="`แสดงแคมเปญ ${n + 1}`" :aria-current="n === i"
          @click="i = n"
        >
          <span class="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-white/30" />
          <span class="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-white" :class="n === i && !reduced ? 'animate-[c01-progress_7s_linear_forwards]' : ''" :style="{ width: n < i || (n === i && reduced) ? '100%' : n === i ? undefined : '0%', animationPlayState: paused ? 'paused' : 'running' }" />
        </button>
        <span class="ml-2 font-display text-xs tabular-nums text-white/70">{{ String(i + 1).padStart(2, '0') }} / {{ String(campaigns.length).padStart(2, '0') }}</span>
      </div>
    </div>
  </section>
</template>

<style>
@keyframes c01-progress { from { width: 0% } to { width: 100% } }
@keyframes c01-drift { from { transform: scale(1.12) } to { transform: scale(1.02) } }
</style>
