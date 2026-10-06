<script setup lang="ts">
import { site, stores } from '~/data/content'
const { link } = useConcept()
</script>

<template>
  <footer id="stores" class="mt-section border-t border-line">
    <div class="container-site grid gap-10 py-14 md:grid-cols-[1.2fr_2fr]">
      <div>
        <p class="flex items-center gap-2 font-display text-2xl font-bold tracking-[0.18em]"><span class="h-3 w-3 bg-accent" />{{ site.brand }}</p>
        <p class="mt-3 max-w-xs text-sm text-muted">ออกแบบและผลิตพื้น G-BOLD ในประเทศไทย · {{ site.tagline }}</p>
        <NuxtLink :to="link('/products')" class="mt-6 inline-flex h-10 items-center gap-2 rounded-btn border border-line px-4 font-mono text-xs uppercase hover:border-accent hover:text-accent">Full catalogue →</NuxtLink>
      </div>
      <div>
        <p class="font-mono text-xs uppercase tracking-wider text-muted">Store index — {{ stores.length }} locations</p>
        <ul class="mt-3 grid gap-x-8 font-mono text-sm sm:grid-cols-2">
          <li v-for="(s, n) in stores" :key="s.id" class="flex justify-between gap-3 border-b border-line py-2"><span><span class="text-muted">{{ String(n + 1).padStart(2, '0') }}</span> {{ s.mall }}</span><span class="shrink-0 text-muted">{{ s.hours }}</span></li>
        </ul>
      </div>
    </div>
    <p class="container-site border-t border-line py-5 font-mono text-xs text-muted">© 2026 {{ site.brand }} · Prototype — Concept 05 · Future Footwear</p>
  </footer>
</template>
