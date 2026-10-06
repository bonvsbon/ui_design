<script setup lang="ts">
import { articles } from '~/data/content'
defineProps<{ title: string }>()
</script>

<template>
  <section id="stories" class="container-site py-section" aria-labelledby="c05-notes-title">
    <h2 id="c05-notes-title" class="font-display text-5xl font-medium tracking-tight">{{ title }}</h2>
    <ul class="mt-8 border-t border-line">
      <li v-for="(a, n) in articles" :key="a.slug">
        <a href="#" class="group grid items-center gap-4 border-b border-line py-5 md:grid-cols-[80px_120px_1fr_auto]">
          <span class="font-mono text-xs text-muted">N°{{ String(n + 1).padStart(2, '0') }}</span>
          <span class="font-mono text-xs uppercase text-accent">{{ a.category }}</span>
          <span class="font-display text-xl group-hover:text-accent md:text-2xl">{{ a.title }}</span>
          <span class="font-mono text-xs text-muted">{{ a.readMinutes }} MIN · {{ thaiDate(a.date) }}</span>
        </a>
      </li>
    </ul>
  </section>
</template>
