<script setup lang="ts">
const props = defineProps<{ media: string; eyebrow: string; title: string; body: string; cta: { label: string; to: string }; products?: string[] }>()
const { link, productLink } = useConcept()
const { bySlugs } = useCatalog()
const items = computed(() => bySlugs(props.products ?? []))
</script>

<template>
  <section id="stories" class="relative" aria-labelledby="c01-camp-title">
    <div class="grid lg:grid-cols-[1.35fr_1fr]">
      <div class="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[86vh]">
        <SmartImg :id="media" sizes="(min-width: 1024px) 58vw, 100vw" />
      </div>
      <div class="flex flex-col justify-between gap-10 bg-surface-2 px-gutter py-12 lg:px-14 lg:py-16">
        <div>
          <p class="font-display text-[11px] uppercase tracking-[0.24em] text-muted">{{ eyebrow }}</p>
          <h2 id="c01-camp-title" class="mt-4 font-display text-5xl font-black uppercase leading-[0.9] md:text-7xl" style="font-stretch: 112%">{{ title }}</h2>
          <p class="mt-6 max-w-md text-lg">{{ body }}</p>
          <NuxtLink :to="link(cta.to)" class="mt-8 inline-flex h-12 items-center gap-3 bg-ink px-6 font-display text-xs font-bold uppercase tracking-[0.16em] text-bg hover:bg-accent hover:text-accent-ink">{{ cta.label }} <AppIcon name="arrow" :size="18" /></NuxtLink>
        </div>
        <div v-if="items.length">
          <p class="mb-3 font-display text-[11px] uppercase tracking-[0.24em] text-muted">Worn in this story</p>
          <ul class="grid grid-cols-2 gap-3">
            <li v-for="p in items" :key="p.id">
              <NuxtLink :to="productLink(p.slug)" class="group block bg-surface p-3">
                <div class="aspect-[4/3]"><ProductImg :product="p" class="transition-transform duration-500 group-hover:scale-105" /></div>
                <p class="mt-2 font-display text-xs font-bold uppercase" style="font-stretch: 110%">{{ p.name }}</p>
                <p class="text-xs tabular-nums text-muted">{{ formatPrice(p.price) }}</p>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
