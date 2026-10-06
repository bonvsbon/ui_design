<script setup lang="ts">
import { badgeLabels, benefitLabels, categoryLabels } from '~/data/catalog'
import { technology } from '~/data/content'
definePageMeta({ layout: 'c02' })

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
const view = ref<'main' | 'mirror' | 'detail' | 'sole'>('main')
const tab = ref('tech')
const tabs = [
  { id: 'tech', label: 'G-BOLD' }, { id: 'desc', label: 'รายละเอียด' }, { id: 'mat', label: 'วัสดุ' }, { id: 'care', label: 'การดูแล' }, { id: 'ship', label: 'จัดส่ง & คืน' },
]
const off = computed(() => discountPercent(p.value.price, p.value.compareAt))
useHead({ title: () => `${p.value.name} — GAMBOL` })
</script>

<template>
  <div>
    <section class="relative overflow-hidden transition-colors duration-700" :style="{ background: `color-mix(in srgb, ${pdp.color.value?.hex} 28%, #f1f1ea)` }">
      <p class="pointer-events-none absolute inset-x-0 top-6 select-none text-center font-display uppercase leading-none text-ink opacity-[0.07]" style="font-size: clamp(120px, 26vw, 420px)" aria-hidden="true">{{ p.name.split(' ')[0] }}</p>
      <div class="container-site relative grid gap-6 py-8 lg:grid-cols-[1.3fr_1fr] lg:py-12">
        <div>
          <nav aria-label="breadcrumb" class="text-sm font-bold">
            <NuxtLink :to="pdp.link('/products')" class="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5"><AppIcon name="arrow-left" :size="16" /> {{ categoryLabels[p.category] }}</NuxtLink>
          </nav>
          <div class="relative grid min-h-[340px] place-items-center md:min-h-[520px]">
            <div class="w-[92%] animate-[c02-float_5s_ease-in-out_infinite]"><ProductImg :product="p" :color-id="pdp.colorId.value" :view="view" eager class="-rotate-6 drop-shadow-[0_30px_30px_rgba(0,0,0,.18)]" /></div>
          </div>
          <div class="flex justify-center gap-2" role="group" aria-label="มุมมองสินค้า">
            <button v-for="v in (['main', 'mirror', 'detail', 'sole'] as const)" :key="v" type="button" class="h-16 w-20 overflow-hidden rounded-full border-[3px] bg-white p-1" :class="view === v ? 'border-ink' : 'border-transparent'" :aria-pressed="view === v" :aria-label="`มุมมอง ${v}`" @click="view = v">
              <ProductImg :product="p" :color-id="pdp.colorId.value" :view="v" alt="" />
            </button>
          </div>
        </div>

        <div class="self-start rounded-card border-[3px] border-ink bg-bg p-5 shadow-pop md:p-7 lg:sticky lg:top-[calc(var(--nav-h)+48px)]">
          <ul class="flex flex-wrap gap-1">
            <li v-for="b in p.badges" :key="b" class="rounded-full px-2.5 py-1 text-[11px] font-extrabold italic uppercase" :class="b === 'sale' ? 'bg-sale text-white' : 'bg-accent text-accent-ink'">{{ b === 'sale' ? `-${off}%` : badgeLabels[b] }}</li>
          </ul>
          <h1 class="mt-3 font-display text-6xl uppercase leading-[0.85] md:text-7xl">{{ p.name }}</h1>
          <p class="mt-2 font-semibold">{{ p.subtitle }}</p>
          <div class="mt-3 flex items-center gap-3">
            <span class="rounded-full px-4 py-1.5 text-2xl font-extrabold tabular-nums" :class="p.compareAt ? 'bg-sale text-white' : 'bg-accent text-accent-ink'">{{ formatPrice(p.price) }}</span>
            <s v-if="p.compareAt" class="text-muted">{{ formatPrice(p.compareAt) }}</s>
            <span class="ml-auto text-sm font-bold">★ {{ p.rating }} · {{ p.reviewCount.toLocaleString() }} รีวิว</span>
          </div>

          <fieldset class="mt-6">
            <legend class="text-sm font-extrabold uppercase">สี: {{ pdp.color.value?.name }}</legend>
            <div class="mt-2 flex gap-2">
              <label v-for="c in p.colors" :key="c.id">
                <input v-model="pdp.colorId.value" type="radio" name="color" :value="c.id" class="peer sr-only">
                <span class="block h-11 w-11 cursor-pointer rounded-full border-4 border-white ring-[3px] ring-transparent peer-checked:ring-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--focus)]" :style="{ background: c.hex }" :title="c.name" />
              </label>
            </div>
          </fieldset>

          <fieldset class="mt-5">
            <div class="flex items-center justify-between">
              <legend class="text-sm font-extrabold uppercase">ไซซ์ (EU)</legend>
              <button type="button" class="text-sm font-bold underline" @click="sizeGuide = true">ตารางไซซ์</button>
            </div>
            <div class="mt-2 flex flex-wrap gap-2">
              <label v-for="z in p.sizes" :key="z">
                <input type="radio" name="size" class="peer sr-only" :checked="pdp.size.value === z" :disabled="pdp.isSoldOut(z)" @change="pdp.selectSize(z)">
                <span class="grid h-12 w-14 cursor-pointer place-items-center rounded-full border-[3px] font-extrabold tabular-nums peer-checked:border-ink peer-checked:bg-ink peer-checked:text-accent peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--focus)] peer-disabled:cursor-not-allowed peer-disabled:border-dashed peer-disabled:text-muted peer-disabled:line-through" :class="pdp.sizeError.value ? 'border-sale' : 'border-line hover:border-ink'">{{ z }}</span>
              </label>
            </div>
            <p v-if="pdp.sizeError.value" class="mt-2 font-bold text-sale" role="alert">⚠ เลือกไซซ์ก่อนนะ</p>
          </fieldset>

          <div class="mt-6 grid gap-2">
            <button type="button" class="h-16 rounded-btn bg-accent text-xl font-extrabold italic uppercase text-accent-ink transition-transform hover:-translate-y-0.5 hover:shadow-[0_6px_0_var(--ink)]" @click="pdp.addToCart()">ADD TO CART</button>
            <div class="grid grid-cols-[1fr_auto] gap-2">
              <button type="button" class="h-14 rounded-btn bg-accent-2 text-lg font-extrabold italic uppercase text-accent-2-ink" @click="pdp.buyNow()">BUY NOW</button>
              <button type="button" class="grid h-14 w-14 place-items-center rounded-full border-[3px] border-ink" :aria-pressed="wish.has(p.slug)" aria-label="รายการโปรด" @click="wish.toggle(p.slug)"><AppIcon name="heart" :class="wish.has(p.slug) && 'fill-sale text-sale'" /></button>
            </div>
          </div>
          <p class="mt-4 flex items-center gap-2 text-sm font-semibold"><AppIcon name="truck" :size="18" /> ส่งฟรีครบ ฿499 · ถึงใน 1–3 วัน · คืนได้ 30 วัน</p>
        </div>
      </div>
    </section>

    <!-- Benefit bars -->
    <section class="container-site py-12" aria-labelledby="c02-ben-title">
      <h2 id="c02-ben-title" class="font-display text-5xl uppercase md:text-7xl">POWER STATS</h2>
      <dl class="mt-6 grid gap-3 md:grid-cols-4">
        <div v-for="(v, k, n) in p.benefits" :key="k" class="rounded-card p-5" :class="n % 2 ? 'bg-accent-2 text-accent-2-ink' : 'bg-accent text-accent-ink'">
          <dt class="font-display text-3xl uppercase">{{ benefitLabels[k]!.en }}</dt>
          <dd><span class="font-display text-7xl leading-none">{{ v * 20 }}</span><span class="font-bold">/100</span><span class="block text-sm font-semibold">{{ benefitLabels[k]!.th }}</span></dd>
        </div>
      </dl>
    </section>

    <section class="container-site" aria-label="ข้อมูลสินค้า">
      <div role="tablist" class="no-scrollbar flex gap-2 overflow-x-auto">
        <button v-for="t in tabs" :id="`c02-t-${t.id}`" :key="t.id" type="button" role="tab" :aria-selected="tab === t.id" aria-controls="c02-tabpanel" class="h-12 shrink-0 rounded-full border-[3px] border-ink px-5 font-extrabold italic uppercase" :class="tab === t.id ? 'bg-ink text-bg' : ''" @click="tab = t.id">{{ t.label }}</button>
      </div>
      <div id="c02-tabpanel" role="tabpanel" :aria-labelledby="`c02-t-${tab}`" class="mt-4 rounded-card border-[3px] border-ink bg-surface p-6 text-lg">
        <div v-if="tab === 'tech'" class="grid gap-4 md:grid-cols-4">
          <div v-for="l in technology.layers" :key="l.id" class="rounded-media p-4" :style="{ background: l.color, color: l.id === 'grip' ? '#fff' : '#0a0a0a' }">
            <p class="font-display text-2xl uppercase">{{ l.name }}</p><p class="text-sm font-semibold">{{ l.nameTh }} · {{ l.thicknessMm }} มม.</p><p class="mt-2 text-sm">{{ l.caption }}</p>
          </div>
        </div>
        <p v-else-if="tab === 'desc'">{{ p.description }} <span class="block text-base text-muted">น้ำหนัก {{ p.weightGrams }} กรัม/ข้าง</span></p>
        <ul v-else-if="tab === 'mat'" class="list-inside list-disc"><li v-for="m in p.materials" :key="m">{{ m }}</li></ul>
        <ul v-else-if="tab === 'care'" class="list-inside list-disc"><li v-for="m in p.care" :key="m">{{ m }}</li></ul>
        <p v-else>กรุงเทพฯ ได้รับวันถัดไป · ต่างจังหวัด 2–3 วันทำการ · เก็บเงินปลายทางได้ · เปลี่ยนไซซ์ฟรีครั้งแรก · คืนได้ภายใน 30 วัน</p>
      </div>
    </section>

    <section class="container-site py-section" aria-labelledby="c02-rel-title">
      <h2 id="c02-rel-title" class="font-display text-5xl uppercase md:text-7xl">YOU’LL ALSO LIKE</h2>
      <ul class="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4"><li v-for="r in related(p, 4)" :key="r.id"><C02ProductCard :product="r" /></li></ul>
      <template v-if="recentItems.length">
        <h2 class="mt-16 font-display text-4xl uppercase">ดูล่าสุด</h2>
        <ul class="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4"><li v-for="r in recentItems" :key="r.id"><C02ProductCard :product="r" /></li></ul>
      </template>
    </section>
    <SizeGuide v-model="sizeGuide" />
    <PrototypeBar />
  </div>
</template>
