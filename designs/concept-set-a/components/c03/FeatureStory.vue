<script setup lang="ts">
const props = defineProps<{ kicker: string; title: string; byline: string; media: string; body: string; quote: string; products: string[] }>()
const { bySlugs } = useCatalog()
const { productLink } = useConcept()
const items = computed(() => bySlugs(props.products))
</script>

<template>
  <section id="stories" class="bg-surface py-section" aria-labelledby="c03-feat-title">
    <article class="container-site grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
      <figure class="relative">
        <div class="aspect-[4/5] overflow-hidden rounded-media"><SmartImg :id="media" sizes="(min-width:1024px) 50vw, 100vw" /></div>
        <figcaption class="mt-3 text-sm italic text-muted" style="font-family: var(--font-display)">ซอยเล็ก ๆ ย่านตลาดน้อย ก้าวที่ 3,210</figcaption>
      </figure>
      <div class="lg:pt-10">
        <p class="text-sm uppercase tracking-[0.2em] text-accent-text">{{ kicker }}</p>
        <h2 id="c03-feat-title" class="mt-4 font-display text-4xl leading-tight md:text-6xl" style="font-family: var(--font-display)">{{ title }}</h2>
        <p class="mt-4 text-sm text-muted">{{ byline }}</p>
        <p class="mt-8 text-lg leading-relaxed first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-accent-text">{{ body }}</p>
        <blockquote class="my-10 border-l-2 border-accent pl-6 font-display text-3xl italic leading-snug">{{ quote }}</blockquote>
        <p class="mb-3 text-sm uppercase tracking-[0.2em] text-muted">รองเท้าในเรื่องนี้</p>
        <ul class="grid gap-3 sm:grid-cols-2">
          <li v-for="p in items" :key="p.id">
            <NuxtLink :to="productLink(p.slug)" class="flex items-center gap-3 rounded-card border border-line bg-bg p-3 hover:border-ink">
              <span class="h-16 w-20 shrink-0"><ProductImg :product="p" alt="" /></span>
              <span><span class="block font-display text-lg font-semibold">{{ p.name }}</span><span class="text-sm text-muted">{{ formatPrice(p.price) }}</span></span>
            </NuxtLink>
          </li>
        </ul>
        <a href="#" class="mt-8 inline-flex items-center gap-2 font-semibold underline decoration-accent decoration-2 underline-offset-8">อ่านเรื่องเต็ม (6 นาที) <AppIcon name="arrow" :size="18" /></a>
      </div>
    </article>
  </section>
</template>
