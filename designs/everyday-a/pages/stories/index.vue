<script setup lang="ts">
useHead({ title: 'GAMBOL Stories' })
const { data: stories } = await useAsyncData('stories', () => useApi().getStories(), { default: () => [] })
const cats = ['All', 'Style', 'How-to', 'Technology', 'Activity'] as const
const cat = ref<(typeof cats)[number]>('All')
const list = computed(() => (cat.value === 'All' ? stories.value : stories.value.filter((s) => s.category === cat.value)))
</script>

<template>
  <div class="pb-section">
    <header class="wrap pb-10 pt-12 lg:pt-16">
      <p class="eyebrow text-red">Style · News · Activity</p>
      <h1 class="display-xl mt-3">GAMBOL<br>Stories</h1>
      <p class="thai-lead mt-5 max-w-xl text-ink-2">ไอเดียแต่งตัว เคล็ดลับเลือกรองเท้า และเรื่องเล่าจากทุกก้าวของคนไทย</p>
      <ul class="mt-8 flex flex-wrap gap-2" aria-label="หมวดหมู่">
        <li v-for="c in cats" :key="c"><button type="button" class="chip" :aria-pressed="cat === c" @click="cat = c">{{ c }}</button></li>
      </ul>
    </header>
    <div class="wrap">
      <div v-if="list[0]" class="grid gap-10 border-b border-line pb-12 lg:grid-cols-12">
        <div class="lg:col-span-8"><StoryCard :story="list[0]" variant="feature" /></div>
        <ul class="flex flex-col gap-8 lg:col-span-4">
          <li v-for="s in list.slice(1, 3)" :key="s.slug"><StoryCard :story="s" /></li>
        </ul>
      </div>
      <ul class="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="s in list.slice(3)" :key="s.slug"><StoryCard :story="s" /></li>
      </ul>
    </div>
  </div>
</template>
