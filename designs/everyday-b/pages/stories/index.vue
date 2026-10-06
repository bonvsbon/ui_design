<script setup lang="ts">
const { stories } = useCatalog()
const route = useRoute()
const category = ref(String(route.query.category || 'All'))
const selected = computed(() =>
  stories.filter((s) => category.value === 'All' || s.category === category.value)
)
useSeoMeta({ title: 'GAMBOL Stories | A little GAMBOL in your day' })
</script>
<template>
  <div class="stories-page container">
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <NuxtLink to="/">Home</NuxtLink><AppIcon name="right" :size="12" /><span>Stories</span>
    </nav>
    <div class="page-heading">
      <span class="red-label">GAMBOL STORIES</span>
      <h1>A LITTLE GAMBOL<br />IN YOUR DAY.</h1>
      <p>Style, good places, and inspiration for wherever your day takes you.</p>
    </div>
    <div class="quick-filters" aria-label="Story categories">
      <button
        v-for="c in ['All', ...new Set(stories.map((s) => s.category))]"
        :key="c"
        :class="{ active: category === c }"
        :aria-pressed="category === c"
        @click="category = c"
      >
        {{ c === 'All' ? 'All stories' : c }}
      </button>
    </div>
    <div class="stories-grid page-stories">
      <StoryCard v-for="s in selected" :key="s.id" :story="s" />
    </div>
    <p v-if="!selected.length" class="empty-state">No stories in this category yet.</p>
  </div>
</template>
