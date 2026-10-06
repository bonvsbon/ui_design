<script setup lang="ts">
import { site } from '~/data/content'
const i = ref(0)
let t: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  t = setInterval(() => (i.value = (i.value + 1) % site.announcements.length), 4000)
})
onBeforeUnmount(() => clearInterval(t))
</script>

<template>
  <div class="bg-inverse text-inverse-ink" role="region" aria-label="ประกาศ">
    <div class="container-site relative flex h-9 items-center justify-center overflow-hidden font-display text-[11px] uppercase tracking-[0.2em]" style="font-stretch: 110%">
      <Transition name="fade" mode="out-in"><p :key="i" aria-live="off">{{ site.announcements[i] }}</p></Transition>
    </div>
  </div>
</template>
