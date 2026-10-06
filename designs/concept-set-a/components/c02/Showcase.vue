<script setup lang="ts">
import { benefitLabels, categoryLabels } from '~/data/catalog'
const props = defineProps<{ title: string; products: string[] }>()
const { bySlugs } = useCatalog()
const { productLink } = useConcept()
const list = computed(() => bySlugs(props.products))
const i = ref(0)
const p = computed(() => list.value[i.value]!)
const colorId = ref('')
watch(p, (v) => (colorId.value = v.colors[0]!.id), { immediate: true })
const spin = ref(0)
function go(d: 1 | -1) {
  i.value = (i.value + d + list.value.length) % list.value.length
  spin.value += d * 360
}
const hex = computed(() => p.value.colors.find((c) => c.id === colorId.value)?.hex ?? '#ccc')
</script>

<template>
  <section class="py-section" aria-labelledby="c02-show-title">
    <div class="container-site">
      <h2 id="c02-show-title" class="font-display text-6xl uppercase leading-[0.85] md:text-8xl">{{ title }}</h2>
      <div class="mt-8 grid gap-6 rounded-card border-[3px] border-ink bg-surface p-4 md:p-8 lg:grid-cols-[220px_1fr_300px]">
        <ol class="no-scrollbar flex gap-2 overflow-x-auto lg:flex-col" aria-label="เลือกสินค้า">
          <li v-for="(x, n) in list" :key="x.id" class="shrink-0">
            <button type="button" class="flex w-full items-center gap-3 rounded-full px-3 py-2 text-left font-display text-2xl uppercase" :class="i === n ? 'bg-ink text-bg' : 'hover:bg-surface-2'" :aria-current="i === n" @click="i = n">
              <span class="text-sm tabular-nums text-accent-2" :class="i === n && '!text-accent'">0{{ n + 1 }}</span>{{ x.name }}
            </button>
          </li>
        </ol>

        <div class="relative grid min-h-[340px] place-items-center overflow-hidden rounded-media" :style="{ background: `radial-gradient(circle at 50% 55%, ${hex}66, transparent 65%)` }">
          <p class="pointer-events-none absolute inset-x-0 top-4 text-center font-display text-[18vw] uppercase leading-none text-ink opacity-[0.06] lg:text-[10vw]" aria-hidden="true">{{ p.name }}</p>
          <div class="w-[78%] transition-transform duration-700 ease-out" :style="{ transform: `rotateY(${spin}deg)` }">
            <ProductImg :product="p" :color-id="colorId" />
          </div>
          <div class="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
            <button type="button" class="grid h-12 w-12 place-items-center rounded-full bg-ink text-bg" aria-label="สินค้าก่อนหน้า" @click="go(-1)"><AppIcon name="arrow-left" /></button>
            <button type="button" class="grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-ink" aria-label="สินค้าถัดไป" @click="go(1)"><AppIcon name="arrow" /></button>
          </div>
        </div>

        <div aria-live="polite">
          <p class="text-sm font-bold uppercase text-muted">{{ categoryLabels[p.category] }}</p>
          <p class="font-display text-5xl uppercase leading-none">{{ p.name }}</p>
          <p class="mt-2">{{ p.shortDescription }}</p>
          <div class="mt-4 flex gap-2">
            <button v-for="c in p.colors" :key="c.id" type="button" class="h-9 w-9 rounded-full border-[3px]" :class="colorId === c.id ? 'border-ink' : 'border-white'" :style="{ background: c.hex }" :aria-label="c.name" :aria-pressed="colorId === c.id" @click="colorId = c.id" />
          </div>
          <dl class="mt-5 space-y-2">
            <div v-for="(v, k) in p.benefits" :key="k" class="grid grid-cols-[80px_1fr] items-center gap-3">
              <dt class="text-sm font-bold uppercase">{{ benefitLabels[k]!.th }}</dt>
              <dd class="flex gap-1" :aria-label="`${v} จาก 5`"><span v-for="n in 5" :key="n" class="h-3 flex-1 -skew-x-12" :class="n <= v ? 'bg-ink' : 'bg-surface-2'" /></dd>
            </div>
          </dl>
          <NuxtLink :to="productLink(p.slug)" class="mt-6 flex h-14 items-center justify-between rounded-btn bg-accent px-6 text-lg font-extrabold italic uppercase text-accent-ink">
            {{ formatPrice(p.price) }} <span class="flex items-center gap-2">ดูสินค้า <AppIcon name="arrow" /></span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
