<script setup lang="ts">
const route = useRoute()
const { stories, selectProducts } = useCatalog()
const story = computed(() => stories.find((s) => s.id === route.params.slug))
if (!story.value) throw createError({ statusCode: 404, statusMessage: 'Story not found' })
useSeoMeta({ title: () => `${story.value?.title} | GAMBOL Stories` })
</script>
<template>
  <article v-if="story" class="article-page">
    <nav class="breadcrumbs container" aria-label="Breadcrumb">
      <NuxtLink to="/">Home</NuxtLink><AppIcon name="right" :size="12" /><NuxtLink to="/stories"
        >Stories</NuxtLink
      >
    </nav>
    <header class="article-heading">
      <p class="red-label">{{ story.category }} · {{ story.readTime }}</p>
      <h1>{{ story.title }}</h1>
      <p lang="th">{{ story.excerpt }}</p>
    </header>
    <img
      class="article-hero"
      :class="{ 'contain-image': story.id === 'find-your-fit' }"
      :src="story.image"
      :alt="story.excerpt"
      width="1400"
      height="850"
      fetchpriority="high"
    />
    <div class="article-body">
      <p v-for="(p, i) in story.paragraphs" :key="i" :lang="/[ก-๙]/.test(p) ? 'th' : 'en'">
        {{ p }}
      </p>
      <NuxtLink to="/stories" class="text-link"
        ><AppIcon name="left" :size="18" />MORE EVERYDAY STORIES</NuxtLink
      >
    </div>
    <div class="section container">
      <ProductCarousel
        title="MAKE IT YOUR EVERYDAY."
        :products="selectProducts(story.productIds)"
      />
    </div>
  </article>
</template>
