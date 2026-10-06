<script setup lang="ts">
const props = defineProps<{
  issue: string; title: string; titleTh: string; intro: string
  cta: { label: string; to: string }; secondary?: { label: string; to: string }
  collage: { media: string; caption: string }[]; sticker?: string
}>()
const { link, productLink } = useConcept()
const { getProduct } = useCatalog()
const sticker = computed(() => (props.sticker ? getProduct(props.sticker) : undefined))
const rot = ['-rotate-3', 'rotate-2', '-rotate-1']
</script>

<template>
  <section class="container-site grid gap-10 pb-section pt-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:pt-16" aria-labelledby="c03-cover-title">
    <div>
      <p class="flex items-center gap-3 text-sm text-muted"><span class="h-px w-10 bg-ink" />{{ issue }}</p>
      <h1 id="c03-cover-title" class="mt-6 font-display font-light leading-[0.95] tracking-[-0.02em]" style="font-size: clamp(52px, 7.4vw, 116px); font-variation-settings: 'opsz' 144">
        <span class="block">{{ title.split(' ').slice(0, 2).join(' ') }}</span>
        <em class="block font-normal text-accent-text">{{ title.split(' ').slice(2).join(' ') }}</em>
      </h1>
      <p class="mt-4 text-2xl md:text-3xl" style="font-family: 'Noto Serif Thai', serif">{{ titleTh }}</p>
      <p class="mt-6 max-w-md text-lg text-ink-2">{{ intro }}</p>
      <div class="mt-8 flex flex-wrap gap-3">
        <a :href="cta.to" class="inline-flex h-12 items-center gap-2 rounded-btn bg-accent px-6 font-semibold text-accent-ink hover:brightness-110">{{ cta.label }} <AppIcon name="arrow" :size="18" /></a>
        <a v-if="secondary" :href="secondary.to" class="inline-flex h-12 items-center rounded-btn border border-ink px-6 font-semibold hover:bg-ink hover:text-bg">{{ secondary.label }}</a>
      </div>
    </div>

    <div class="relative h-[460px] md:h-[600px]">
      <figure v-for="(c, n) in collage" :key="c.media" class="absolute overflow-hidden rounded-media bg-surface p-2 pb-9 shadow-pop transition-transform duration-500 hover:z-20 hover:rotate-0 hover:scale-105" :class="[rot[n], n === 0 ? 'left-0 top-4 z-10 w-[56%]' : n === 1 ? 'right-0 top-0 w-[48%]' : 'bottom-0 right-[12%] z-[11] w-[52%]']">
        <div class="aspect-[4/5] overflow-hidden rounded-[2px]"><SmartImg :id="c.media" :eager="n === 0" :ratio="1.25" sizes="(min-width:1024px) 28vw, 55vw" /></div>
        <figcaption class="absolute bottom-2 left-3 text-sm italic" style="font-family: var(--font-display)">{{ c.caption }}</figcaption>
      </figure>
      <NuxtLink v-if="sticker" :to="productLink(sticker.slug)" class="absolute bottom-6 left-0 z-20 grid h-36 w-36 rotate-6 place-items-center rounded-full bg-accent-2 p-4 text-center text-accent-2-ink shadow-pop transition-transform hover:rotate-0 md:h-44 md:w-44">
        <span>
          <span class="block text-xs uppercase tracking-[0.2em]">คู่ประจำฉบับ</span>
          <span class="block font-display text-2xl italic">{{ sticker.name }}</span>
          <span class="block text-sm">{{ formatPrice(sticker.price) }}</span>
        </span>
      </NuxtLink>
    </div>
  </section>
</template>
