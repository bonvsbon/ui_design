<script setup lang="ts">
const route = useRoute()
const slug = computed(() => String(route.params.slug))
const { data: story } = await useAsyncData(() => `story-${slug.value}`, () => useApi().getStory(slug.value), { watch: [slug] })
if (!story.value) throw createError({ statusCode: 404, statusMessage: 'ไม่พบบทความ', fatal: true })
const { data: all } = await useAsyncData('stories', () => useApi().getStories(), { default: () => [] })
const more = computed(() => all.value.filter((s) => s.slug !== slug.value).slice(0, 3))
const products = useProducts()
const picks = computed(() => sortProducts(products.value, 'best').slice(0, 8))
useHead(() => ({ title: story.value?.title }))
</script>

<template>
  <article v-if="story" class="pb-section">
    <header class="wrap-narrow pt-12 text-center lg:pt-16">
      <p class="eyebrow text-red">{{ story.category }} · {{ story.readMinutes }} min read · {{ formatDate(story.date) }}</p>
      <h1 class="mx-auto mt-4 max-w-3xl font-thai text-4xl font-semibold leading-tight text-balance lg:text-6xl">{{ story.title }}</h1>
      <p class="thai-lead mx-auto mt-5 max-w-2xl text-ink-2">{{ story.excerpt }}</p>
    </header>
    <div class="wrap mt-12"><div class="aspect-[16/9] overflow-hidden bg-paper-2"><AppImage :media="story.media" priority sizes="100vw" :widths="[640, 1080, 1600]" /></div></div>
    <div class="wrap-narrow mt-12">
      <div class="mx-auto max-w-prose space-y-6 font-thai text-lg leading-relaxed text-ink-2">
        <p v-for="(para, n) in story.body" :key="n">{{ para }}</p>
      </div>
    </div>
    <section class="mt-section" aria-labelledby="story-shop">
      <div class="wrap"><SectionHeader id="story-shop" title="Shop the Story" subtitle="คู่ที่พูดถึงในบทความนี้" /></div>
      <ProductCarousel class="mt-8" :products="picks" label="สินค้าในบทความ" />
    </section>
    <section class="wrap mt-section" aria-labelledby="story-more">
      <h2 id="story-more" class="display-m">More Stories</h2>
      <ul class="mt-8 grid gap-8 sm:grid-cols-3">
        <li v-for="s in more" :key="s.slug"><StoryCard :story="s" /></li>
      </ul>
    </section>
  </article>
</template>
