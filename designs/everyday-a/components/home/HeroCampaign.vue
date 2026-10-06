<script setup lang="ts">
import type { HeroSlide } from '~/types'
/**
 * Edge-to-edge campaign hero (sits under the transparent header).
 * Supports image or video per slide, mobile art direction, autoplay with pause (WCAG 2.2.2),
 * and a light parallax on desktop.
 */
const props = defineProps<{ slides: HeroSlide[]; autoplayMs: number }>()
const i = ref(0)
const playing = ref(true)
const media = ref<HTMLElement | null>(null)
let timer: ReturnType<typeof setInterval> | undefined
let raf = 0

const go = (n: number) => { i.value = (n + props.slides.length) % props.slides.length; restart() }
function restart() {
  clearInterval(timer)
  if (playing.value && props.slides.length > 1) timer = setInterval(() => { i.value = (i.value + 1) % props.slides.length }, props.autoplayMs)
}
function toggle() { playing.value = !playing.value; restart() }

function onScroll() {
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(() => {
    if (media.value) media.value.style.transform = `translate3d(0, ${Math.min(window.scrollY, 900) * 0.08}px, 0)`
  })
}
onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) playing.value = false
  restart()
  if (!reduce && window.matchMedia('(min-width: 1024px)').matches) window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => { clearInterval(timer); window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) })
const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <section class="relative -mt-header h-[88svh] min-h-[560px] overflow-hidden bg-ink text-white lg:h-[min(100svh,940px)]" aria-roledescription="carousel" aria-label="แคมเปญหลัก">
    <div ref="media" class="absolute inset-0 will-change-transform">
      <div
        v-for="(s, n) in slides" :key="s.id"
        class="absolute inset-0 transition-opacity duration-[1200ms] ease-out" :class="n === i ? 'opacity-100' : 'opacity-0'"
        :aria-hidden="n !== i"
      >
        <video v-if="s.video" class="h-full w-full object-cover" :poster="imageUrl(s.media.src, 1920)" autoplay muted loop playsinline>
          <source :src="s.video" type="video/mp4">
        </video>
        <AppImage v-else :media="s.media" :priority="n === 0" sizes="100vw" :widths="[640, 960, 1440, 1920, 2400]" :img-class="n === i ? 'scale-100 transition-transform duration-[7000ms] ease-out' : 'scale-[1.06]'" />
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
      <div class="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-black/55 to-transparent" />
    </div>

    <div class="wrap relative flex h-full flex-col justify-end pb-24 pt-header lg:pb-20">
      <div v-for="(s, n) in slides" v-show="n === i" :key="s.id" role="group" aria-roledescription="slide" :aria-label="`${n + 1} จาก ${slides.length}`" class="max-w-4xl">
        <p class="eyebrow text-white/85">{{ s.eyebrow }}</p>
        <h1 class="display-xl mt-4">
          <span v-for="line in s.title" :key="line" class="block">{{ line }}</span>
        </h1>
        <p class="thai-lead mt-5 max-w-md text-lg text-white/90 lg:text-xl">{{ s.subtitle }}</p>
        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <NuxtLink v-for="(c, k) in s.ctas" :key="c.to" :to="c.to" :class="k === 0 ? 'btn-light' : 'btn-ghost-light'">{{ c.label }}</NuxtLink>
        </div>
      </div>
    </div>

    <!-- Indicator -->
    <div v-if="slides.length > 1" class="absolute bottom-6 right-[var(--gutter)] flex items-center gap-4 lg:bottom-10">
      <p class="font-semibold tabular-nums tracking-[0.12em]" aria-hidden="true">{{ pad(i + 1) }} <span class="text-white/50">/ {{ pad(slides.length) }}</span></p>
      <div class="hidden gap-1.5 sm:flex">
        <button v-for="(s, n) in slides" :key="s.id" type="button" class="relative h-11 w-10" :aria-label="`ไปยังสไลด์ ${n + 1}`" :aria-current="n === i" @click="go(n)">
          <span class="absolute inset-x-0 top-1/2 h-[2px] bg-white/35"><span class="block h-full bg-white" :class="n === i ? 'w-full' : 'w-0'" /></span>
        </button>
      </div>
      <button type="button" class="grid h-11 w-11 place-items-center rounded-full border border-white/40 hover:bg-white/10" :aria-label="playing ? 'หยุดเลื่อนอัตโนมัติ' : 'เล่นอัตโนมัติ'" @click="toggle">
        <AppIcon :name="playing ? 'pause' : 'play'" :size="16" />
      </button>
    </div>
  </section>
</template>
