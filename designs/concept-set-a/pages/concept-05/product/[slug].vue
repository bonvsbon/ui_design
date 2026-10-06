<script setup lang="ts">
import { badgeLabels, benefitLabels, categoryLabels, technologyLabels } from '~/data/catalog'
import { technology } from '~/data/content'
definePageMeta({ layout: 'c05' })

const route = useRoute()
const { getProduct, related, bySlugs } = useCatalog()
const product = computed(() => getProduct(String(route.params.slug)))
if (!product.value) throw createError({ statusCode: 404, message: 'ไม่พบสินค้า' })
const p = computed(() => product.value!)
const pdp = useProductPage(product)
const wish = useWishlist()
const { slugs: recent } = useRecentlyViewed()
const recentItems = computed(() => bySlugs(recent.value.filter((s) => s !== p.value.slug)).slice(0, 4))
const sizeGuide = ref(false)
const views = ['main', 'mirror', 'detail', 'sole'] as const
const view = ref<(typeof views)[number]>('main')

// Hotspots on the product stage → technology layers
const hotspots = [
  { id: 'top', x: 38, y: 40 }, { id: 'core', x: 60, y: 62 }, { id: 'arch', x: 46, y: 58 }, { id: 'grip', x: 70, y: 76 },
]
const spot = ref<string | null>('core')
const spotLayer = computed(() => technology.layers.find((l) => l.id === spot.value))

// Radar chart (4 axes) — product vs EVA baseline (3/5)
const axes = ['comfort', 'soft', 'light', 'durable'] as const
function pt(i: number, v: number, r = 80) {
  const a = -Math.PI / 2 + (i * Math.PI * 2) / axes.length
  return [100 + Math.cos(a) * (v / 5) * r, 100 + Math.sin(a) * (v / 5) * r]
}
const poly = (vals: number[]) => vals.map((v, i) => pt(i, v).join(',')).join(' ')
const productPoly = computed(() => poly(axes.map((k) => p.value.benefits[k])))
const evaPoly = poly([3, 3, 3, 3])
const stack = computed(() => technology.layers.reduce((a, l) => a + l.thicknessMm, 0))
useHead({ title: () => `${p.value.name} — GAMBOL/LAB` })
</script>

<template>
  <div>
    <nav aria-label="breadcrumb" class="container-site py-4 font-mono text-xs uppercase text-muted">
      <NuxtLink :to="pdp.link('/')" class="hover:text-accent">Lab</NuxtLink> /
      <NuxtLink :to="pdp.link(`/products?category=${p.category}`)" class="hover:text-accent">{{ categoryLabels[p.category] }}</NuxtLink> /
      <span aria-current="page" class="text-ink">{{ p.name }}</span>
    </nav>

    <div class="container-site grid gap-8 lg:grid-cols-[1.3fr_1fr]">
      <div>
        <div class="relative aspect-[4/3] overflow-hidden rounded-card bg-[#ecebe6]">
          <div class="absolute inset-[8%]"><ProductImg :product="p" :color-id="pdp.colorId.value" :view="view" eager class="drop-shadow-[0_30px_25px_rgba(0,0,0,.25)]" /></div>
          <template v-if="view === 'main'">
            <button
              v-for="h in hotspots" :key="h.id" type="button" class="absolute grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-[#121315] font-mono text-[10px] font-medium text-[#121315] transition-colors"
              :class="spot === h.id ? 'bg-accent' : 'bg-[#ecebe6]'" :style="{ left: h.x + '%', top: h.y + '%' }" :aria-pressed="spot === h.id"
              :aria-label="technology.layers.find((l) => l.id === h.id)?.nameTh" @click="spot = h.id"
            >{{ technology.layers.findIndex((l) => l.id === h.id) + 1 }}</button>
          </template>
          <div v-if="spotLayer && view === 'main'" class="absolute bottom-3 left-3 right-3 rounded-card bg-[#121315] p-3 text-[#ecebe6] md:right-auto md:max-w-xs" aria-live="polite">
            <p class="font-mono text-[11px] uppercase text-accent">{{ spotLayer.name }} · {{ spotLayer.thicknessMm }} mm</p>
            <p class="mt-1 text-sm">{{ spotLayer.nameTh }} — {{ spotLayer.caption }}</p>
          </div>
          <p class="absolute right-3 top-3 font-mono text-[10px] uppercase text-[#55565a]">VIEW / {{ view }}</p>
        </div>
        <div class="mt-2 grid grid-cols-4 gap-2" role="group" aria-label="มุมมอง">
          <button v-for="v in views" :key="v" type="button" class="aspect-[4/3] border bg-[#ecebe6] p-2" :class="view === v ? 'border-accent' : 'border-transparent'" :aria-pressed="view === v" :aria-label="`มุมมอง ${v}`" @click="view = v"><ProductImg :product="p" :color-id="pdp.colorId.value" :view="v" alt="" /></button>
        </div>
      </div>

      <div class="lg:sticky lg:top-[calc(var(--nav-h)+16px)] lg:self-start">
        <p class="font-mono text-xs uppercase text-accent">{{ p.badges.map((b) => badgeLabels[b]).join(' / ') }}</p>
        <h1 class="mt-2 font-display text-5xl font-medium tracking-tight">{{ p.name }}</h1>
        <p class="mt-1 text-ink-2">{{ p.subtitle }}</p>
        <div class="mt-4 flex items-baseline gap-3 font-mono">
          <span class="text-2xl tabular-nums" :class="p.compareAt ? 'text-sale' : ''">{{ formatPrice(p.price) }}</span>
          <s v-if="p.compareAt" class="text-sm text-muted">{{ formatPrice(p.compareAt) }}</s>
          <span class="ml-auto text-xs text-muted">★ {{ p.rating }} / {{ p.reviewCount.toLocaleString() }} reviews</span>
        </div>

        <fieldset class="mt-6 border-t border-line pt-4">
          <legend class="sr-only">สี</legend>
          <p class="font-mono text-[11px] uppercase text-muted" aria-hidden="true">Colourway — <span class="text-ink">{{ pdp.color.value?.name }}</span></p>
          <div class="mt-2 flex gap-2">
            <label v-for="c in p.colors" :key="c.id">
              <input v-model="pdp.colorId.value" type="radio" name="color" :value="c.id" class="peer sr-only">
              <span class="block h-9 w-9 cursor-pointer rounded-[2px] ring-1 ring-transparent ring-offset-2 ring-offset-bg peer-checked:ring-accent peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--focus)]" :style="{ background: c.hex }" :title="c.name" />
            </label>
          </div>
        </fieldset>

        <fieldset class="mt-5">
          <div class="flex items-center justify-between"><legend class="font-mono text-[11px] uppercase text-muted">Size — EU</legend><button type="button" class="font-mono text-[11px] uppercase underline" @click="sizeGuide = true">Size chart</button></div>
          <div class="mt-2 grid grid-cols-6 gap-1 font-mono">
            <label v-for="z in p.sizes" :key="z">
              <input type="radio" name="size" class="peer sr-only" :checked="pdp.size.value === z" :disabled="pdp.isSoldOut(z)" @change="pdp.selectSize(z)">
              <span class="grid h-11 cursor-pointer place-items-center rounded-btn border text-sm tabular-nums peer-checked:border-accent peer-checked:bg-accent peer-checked:text-accent-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--focus)] peer-disabled:cursor-not-allowed peer-disabled:text-muted peer-disabled:line-through" :class="pdp.sizeError.value ? 'border-sale' : 'border-line hover:border-ink-2'">{{ z }}</span>
            </label>
          </div>
          <p v-if="pdp.sizeError.value" class="mt-2 font-mono text-xs text-sale" role="alert">ERROR · กรุณาเลือกไซซ์</p>
        </fieldset>

        <div class="mt-5 grid grid-cols-[1fr_1fr_auto] gap-2 font-mono text-sm uppercase">
          <button type="button" class="h-12 rounded-btn bg-accent font-medium text-accent-ink" @click="pdp.addToCart()">Add to cart</button>
          <button type="button" class="h-12 rounded-btn border border-ink-2 hover:bg-ink hover:text-bg" @click="pdp.buyNow()">Buy now</button>
          <button type="button" class="grid h-12 w-12 place-items-center rounded-btn border border-line" :aria-pressed="wish.has(p.slug)" aria-label="รายการโปรด" @click="wish.toggle(p.slug)"><AppIcon name="heart" :class="wish.has(p.slug) && 'fill-accent text-accent'" /></button>
        </div>

        <!-- Performance profile -->
        <div class="mt-6 grid grid-cols-[180px_1fr] items-center gap-4 border-t border-line pt-5">
          <svg viewBox="0 0 200 200" class="w-full" role="img" :aria-label="`โปรไฟล์ประสิทธิภาพ: ${axes.map((k) => `${benefitLabels[k]!.th} ${p.benefits[k]}/5`).join(', ')}`">
            <g stroke="var(--line)" fill="none">
              <polygon v-for="r in [1, 2, 3, 4, 5]" :key="r" :points="poly([r, r, r, r])" />
              <line v-for="(k, i) in axes" :key="k" x1="100" y1="100" :x2="pt(i, 5)[0]" :y2="pt(i, 5)[1]" />
            </g>
            <polygon :points="evaPoly" fill="none" stroke="var(--muted)" stroke-dasharray="3 3" />
            <polygon :points="productPoly" fill="rgba(255,181,71,.25)" stroke="var(--accent)" stroke-width="2" />
            <text v-for="(k, i) in axes" :key="k" :x="pt(i, 6.1)[0]" :y="pt(i, 6.1)[1] + 3" text-anchor="middle" font-size="10" font-family="IBM Plex Mono, monospace" fill="var(--ink-2)">{{ benefitLabels[k]!.en.slice(0, 5).toUpperCase() }}</text>
          </svg>
          <dl class="space-y-1.5 font-mono text-xs">
            <div class="flex justify-between border-b border-line pb-1.5"><dt class="text-muted">Weight</dt><dd>{{ p.weightGrams }} g / side</dd></div>
            <div class="flex justify-between border-b border-line pb-1.5"><dt class="text-muted">Stack</dt><dd>{{ stack }} mm</dd></div>
            <div class="flex justify-between border-b border-line pb-1.5"><dt class="text-muted">Tech</dt><dd>{{ p.technologies.map((t) => technologyLabels[t]).join(' + ') }}</dd></div>
            <div class="flex justify-between"><dt class="text-muted">Legend</dt><dd><span class="text-accent">━ {{ p.name }}</span> <span class="text-muted">┅ EVA</span></dd></div>
          </dl>
        </div>

        <div class="mt-6 border-t border-line font-mono text-sm">
          <details class="border-b border-line py-3" open><summary class="cursor-pointer uppercase">Description</summary><p class="mt-2 font-[var(--font-body)] text-ink-2">{{ p.description }}</p></details>
          <details class="border-b border-line py-3"><summary class="cursor-pointer uppercase">Materials</summary><ul class="mt-2 text-ink-2"><li v-for="m in p.materials" :key="m">— {{ m }}</li></ul></details>
          <details class="border-b border-line py-3"><summary class="cursor-pointer uppercase">Care</summary><ul class="mt-2 text-ink-2"><li v-for="m in p.care" :key="m">— {{ m }}</li></ul></details>
          <details class="border-b border-line py-3"><summary class="cursor-pointer uppercase">Delivery / Returns</summary><p class="mt-2 text-ink-2">BKK +1 day · Upcountry +2–3 days · Free over ฿499 · 30-day returns · Store pickup in 2h</p></details>
        </div>
      </div>
    </div>

    <section class="container-site py-section" aria-labelledby="c05-rel">
      <h2 id="c05-rel" class="font-display text-4xl font-medium">Related specimens</h2>
      <ul class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><li v-for="(r, n) in related(p, 4)" :key="r.id"><C05ProductCard :product="r" :index="n" /></li></ul>
      <template v-if="recentItems.length">
        <h2 class="mt-14 font-mono text-sm uppercase text-muted">Recently viewed</h2>
        <ul class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><li v-for="r in recentItems" :key="r.id"><C05ProductCard :product="r" /></li></ul>
      </template>
    </section>
    <SizeGuide v-model="sizeGuide" />
    <PrototypeBar />
  </div>
</template>
