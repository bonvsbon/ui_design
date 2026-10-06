<script setup lang="ts">
const props = defineProps<{
  title: string; subtitle?: string
  moments: { key: string; en: string; th: string; media: string; story: string; pins: { product: string; x: number; y: number }[] }[]
}>()
const { getProduct, byActivity } = useCatalog()
const { link, productLink } = useConcept()
const active = ref(props.moments[0]!.key)
const m = computed(() => props.moments.find((x) => x.key === active.value)!)
const products = computed(() => byActivity(active.value, 4))
const openPin = ref<number | null>(null)
watch(active, () => (openPin.value = null))
</script>

<template>
  <section id="moments" class="py-section" aria-labelledby="c03-mom-title">
    <div class="container-site text-center">
      <h2 id="c03-mom-title" class="font-display text-5xl italic md:text-7xl">{{ title }}</h2>
      <p class="mt-3 text-lg text-muted">{{ subtitle }}</p>
      <div class="no-scrollbar mt-8 flex gap-3 overflow-x-auto pb-2 md:justify-center" role="tablist" aria-label="โมเมนต์">
        <button
          v-for="x in moments" :key="x.key" type="button" role="tab" :aria-selected="active === x.key" aria-controls="c03-mom-panel"
          class="flex shrink-0 items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-5 transition-colors" :class="active === x.key ? 'border-ink bg-ink text-bg' : 'border-line bg-surface hover:border-ink'"
          @click="active = x.key"
        >
          <span class="h-10 w-10 overflow-hidden rounded-full"><SmartImg :id="x.media" :ratio="1" sizes="40px" alt="" /></span>
          <span class="text-left leading-tight"><span class="block font-semibold">{{ x.th }}</span><span class="block text-xs italic opacity-70" style="font-family: var(--font-display)">{{ x.en }}</span></span>
        </button>
      </div>
    </div>

    <div id="c03-mom-panel" role="tabpanel" class="container-site mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <div class="relative aspect-[4/5] overflow-hidden rounded-media sm:aspect-[4/3]">
        <Transition name="fade" mode="out-in"><SmartImg :id="m.media" :key="m.key" sizes="(min-width:1024px) 58vw, 100vw" /></Transition>
        <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 p-6 text-white md:p-8">
          <p class="text-sm uppercase tracking-[0.2em]">{{ m.en }}</p>
          <p class="mt-2 max-w-lg font-display text-2xl italic md:text-3xl">“{{ m.story }}”</p>
        </div>
        <!-- Shoppable hotspots -->
        <div v-for="(pin, n) in m.pins" :key="pin.product + n" class="absolute" :style="{ left: pin.x + '%', top: pin.y + '%' }">
          <button type="button" class="relative grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-surface text-ink shadow-pop" :aria-expanded="openPin === n" :aria-label="`ดูสินค้า ${getProduct(pin.product)?.name}`" @click="openPin = openPin === n ? null : n">
            <span class="absolute inset-0 animate-ping rounded-full bg-surface opacity-60" aria-hidden="true" /><AppIcon name="plus" :size="16" class="relative" />
          </button>
          <Transition name="fade">
            <NuxtLink v-if="openPin === n && getProduct(pin.product)" :to="productLink(pin.product)" class="absolute bottom-7 left-1/2 z-10 flex w-56 -translate-x-1/2 items-center gap-3 rounded-card bg-surface p-2 text-ink shadow-pop">
              <span class="h-14 w-16 shrink-0 rounded-media bg-surface-2 p-1"><ProductImg :product="getProduct(pin.product)!" alt="" /></span>
              <span class="text-sm"><span class="block font-display text-base font-semibold">{{ getProduct(pin.product)!.name }}</span>{{ formatPrice(getProduct(pin.product)!.price) }} →</span>
            </NuxtLink>
          </Transition>
        </div>
      </div>
      <div>
        <p class="font-display text-3xl">คู่ที่เหมาะกับ<em class="text-accent-text">{{ m.th }}</em></p>
        <ul class="mt-6 grid grid-cols-2 gap-x-4 gap-y-8">
          <li v-for="(p, n) in products" :key="p.id"><C03ProductCard :product="p" :tint="n" /></li>
        </ul>
        <NuxtLink :to="link(`/products?activity=${m.key}`)" class="mt-8 inline-flex items-center gap-2 font-semibold underline decoration-accent decoration-2 underline-offset-8">ดูทั้งหมดสำหรับ{{ m.th }} <AppIcon name="arrow" :size="18" /></NuxtLink>
      </div>
    </div>
  </section>
</template>
