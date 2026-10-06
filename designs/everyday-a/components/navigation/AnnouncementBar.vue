<script setup lang="ts">
/** CMS-driven promo strip. Rotates messages every 5s; pauses on hover/focus and under reduced motion. */
const site = useSite()
const items = computed(() => site.value?.announcements ?? [])
const i = ref(0)
const paused = ref(false)
let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = setInterval(() => { if (!paused.value && items.value.length) i.value = (i.value + 1) % items.value.length }, 5000)
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <div class="relative z-[41] bg-ink text-paper" role="region" aria-label="ประกาศ" @mouseenter="paused = true" @mouseleave="paused = false" @focusin="paused = true" @focusout="paused = false">
    <div class="wrap flex h-9 items-center justify-center overflow-hidden text-center font-thai text-[0.8rem]">
      <Transition name="fade" mode="out-in">
        <NuxtLink v-if="items[i]" :key="i" :to="items[i].to || '/'" class="truncate underline-offset-4 hover:underline">{{ items[i].text }}</NuxtLink>
      </Transition>
    </div>
  </div>
</template>
