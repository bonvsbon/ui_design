<script setup lang="ts">
const props = defineProps<{
  kicker: string; title: string[]; subtitle: string; marquee: string
  cta: { label: string; to: string }
  slides: { product: string; color: string; stat: string; statLabel: string }[]
}>()
const { link, productLink } = useConcept()
const { getProduct } = useCatalog()
const i = ref(0)
const slide = computed(() => props.slides[i.value]!)
const product = computed(() => getProduct(slide.value.product)!)
const scrollY = ref(0)
const pointer = ref({ x: 0, y: 0 })
let raf = 0
let reduce = false
function onScroll() {
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(() => (scrollY.value = Math.min(window.scrollY, 900)))
}
function onPointer(e: PointerEvent) {
  if (reduce || e.pointerType !== 'mouse') return
  pointer.value = { x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 }
}
onMounted(() => {
  reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reduce) window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <section class="relative isolate overflow-hidden bg-inverse text-inverse-ink" aria-labelledby="c02-hero-title" @pointermove="onPointer">
    <!-- Kinetic background type -->
    <div class="pointer-events-none absolute inset-0 -z-10 flex flex-col justify-center gap-2 opacity-[0.12]" aria-hidden="true">
      <p v-for="row in 3" :key="row" class="flex w-max whitespace-nowrap font-display text-[22vw] uppercase leading-[0.85] md:text-[14vw]" :class="row % 2 ? 'animate-[c02-marquee_40s_linear_infinite]' : 'animate-[c02-marquee_40s_linear_infinite_reverse]'">
        <span>{{ marquee.repeat(3) }}</span><span>{{ marquee.repeat(3) }}</span>
      </p>
    </div>
    <!-- Diagonal slash -->
    <div class="absolute -right-1/4 top-[52%] -z-10 h-full w-3/4 origin-top -skew-x-[18deg] lg:top-0 transition-colors duration-700" :style="{ background: slide.color }" aria-hidden="true" />

    <div class="container-site grid min-h-[calc(100svh-var(--nav-h)-30px)] items-center gap-6 py-10 lg:grid-cols-[1fr_1.1fr]">
      <div class="relative z-10" :style="{ transform: `translateY(${scrollY * -0.08}px)` }">
        <p class="inline-flex -skew-x-6 bg-accent-2 px-3 py-1 text-sm font-extrabold italic uppercase text-accent-2-ink">{{ kicker }}</p>
        <h1 id="c02-hero-title" class="mt-4 font-display uppercase leading-[0.82]" style="font-size: clamp(88px, 17vw, 240px)">
          <span v-for="(t, n) in title" :key="t" class="block"><span :class="n === 1 && 'inline-block bg-inverse pr-3 text-accent'">{{ t }}</span></span>
        </h1>
        <p class="mt-6 max-w-md text-lg text-white/85">{{ subtitle }}</p>
        <div class="mt-8 flex flex-wrap items-center gap-3">
          <NuxtLink :to="link(cta.to)" class="inline-flex h-14 items-center gap-3 rounded-btn bg-accent px-8 text-lg font-extrabold italic uppercase text-accent-ink transition-transform hover:-translate-y-0.5 hover:shadow-[0_6px_0_#fff]">{{ cta.label }} <AppIcon name="arrow" /></NuxtLink>
          <NuxtLink :to="productLink(product.slug)" class="inline-flex h-14 items-center rounded-btn border-2 border-white px-6 font-bold hover:bg-white hover:text-ink">ดู {{ product.name }}</NuxtLink>
        </div>
      </div>

      <div class="relative grid place-items-center">
        <div class="relative aspect-square w-full max-w-[620px]" :style="{ transform: `translate(${pointer.x * 24}px, ${scrollY * 0.12 + pointer.y * 18}px) rotate(${pointer.x * 6}deg)` }">
          <div class="absolute inset-[8%] rounded-full bg-white/95 transition-colors" aria-hidden="true" />
          <Transition name="fade" mode="out-in">
            <div :key="product.slug" class="absolute inset-[10%] grid animate-[c02-float_5s_ease-in-out_infinite] place-items-center">
              <ProductImg :product="product" eager class="-rotate-12 scale-110" />
            </div>
          </Transition>
          <!-- Floating stat chips -->
          <div class="absolute left-0 top-[12%] -rotate-6 rounded-card bg-accent-2 px-4 py-3 text-accent-2-ink shadow-pop">
            <p class="font-display text-4xl leading-none">{{ slide.stat }}</p><p class="text-xs font-bold uppercase">{{ slide.statLabel }}</p>
          </div>
          <div class="absolute bottom-[10%] right-0 rotate-3 rounded-card bg-accent px-4 py-3 text-accent-ink shadow-pop">
            <p class="text-xs font-bold uppercase">{{ product.name }}</p><p class="font-display text-3xl leading-none">{{ formatPrice(product.price) }}</p>
          </div>
        </div>
        <div class="mt-4 flex gap-2" role="tablist" aria-label="เลือกสินค้าในแบนเนอร์">
          <button
            v-for="(s, n) in slides" :key="s.product" type="button" role="tab" :aria-selected="i === n" :aria-label="getProduct(s.product)?.name"
            class="h-14 w-20 overflow-hidden rounded-full border-[3px] bg-white p-1 transition-transform hover:-translate-y-1" :class="i === n ? 'border-accent' : 'border-transparent opacity-70'" @click="i = n"
          ><ProductImg :product="getProduct(s.product)!" alt="" /></button>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
@keyframes c02-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-14px) } }
</style>
