<script setup lang="ts">
import { badgeLabels, benefitLabels, categoryLabels, technologyLabels } from '~/data/catalog'
import { technology } from '~/data/content'
definePageMeta({ layout: 'c01' })

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
const slide = ref(0)
function onScroll(e: Event) {
  const el = e.target as HTMLElement
  slide.value = Math.round(el.scrollLeft / el.clientWidth)
}
const off = computed(() => discountPercent(p.value.price, p.value.compareAt))
const accordions = computed(() => [
  { id: 'desc', title: 'Description', body: [p.value.description, `น้ำหนัก ${p.value.weightGrams} กรัม/ข้าง`] },
  { id: 'mat', title: 'Materials', list: p.value.materials },
  { id: 'care', title: 'Care', list: p.value.care },
  { id: 'ship', title: 'Delivery & returns', body: ['จัดส่งด่วนในกรุงเทพฯ ภายในวันถัดไป ต่างจังหวัด 2–3 วันทำการ ชำระเงินปลายทางได้ เปลี่ยนไซซ์ฟรีครั้งแรก'] },
])
useHead({ title: () => `${p.value.name} — ${p.value.subtitle} | GAMBOL` })
</script>

<template>
  <div>
    <div class="container-site py-4">
      <nav aria-label="breadcrumb" class="font-display text-[11px] uppercase tracking-[0.2em] text-muted">
        <NuxtLink :to="pdp.link('/')" class="hover:text-ink">Home</NuxtLink> /
        <NuxtLink :to="pdp.link(`/products?category=${p.category}`)" class="hover:text-ink">{{ categoryLabels[p.category] }}</NuxtLink> /
        <span aria-current="page" class="text-ink">{{ p.name }}</span>
      </nav>
    </div>

    <div class="lg:container-site lg:grid lg:grid-cols-[1.5fr_1fr] lg:gap-12">
      <!-- Gallery: swipe on mobile, editorial mosaic on desktop -->
      <div>
        <div class="no-scrollbar flex snap-x snap-mandatory overflow-x-auto lg:grid lg:grid-cols-2 lg:gap-2 lg:overflow-visible" aria-label="รูปสินค้า" @scroll.passive="onScroll">
          <figure v-for="(v, n) in views" :key="v" class="aspect-[4/5] w-full shrink-0 snap-center overflow-hidden bg-surface lg:w-auto" :class="n === 0 && 'lg:col-span-2 lg:aspect-[16/11]'">
            <div class="grid h-full place-items-center p-[10%]"><ProductImg :product="p" :color-id="pdp.colorId.value" :view="v" :eager="n === 0" :alt="n ? '' : undefined" /></div>
          </figure>
        </div>
        <p class="py-2 text-center font-display text-xs tabular-nums lg:hidden" aria-hidden="true">{{ slide + 1 }} / {{ views.length }}</p>
      </div>

      <!-- Buy box -->
      <div class="container-site lg:px-0">
        <div class="lg:sticky lg:top-[calc(var(--nav-h)+24px)]">
          <ul class="flex flex-wrap gap-1">
            <li v-for="b in p.badges" :key="b" class="bg-ink px-1.5 py-0.5 font-display text-[10px] font-bold uppercase tracking-[0.14em] text-bg">{{ b === 'sale' ? `-${off}%` : badgeLabels[b] }}</li>
          </ul>
          <h1 class="mt-3 font-display text-5xl font-black uppercase leading-[0.9] md:text-6xl" style="font-stretch: 118%">{{ p.name }}</h1>
          <p class="mt-2 text-lg">{{ p.subtitle }}</p>
          <div class="mt-4 flex items-baseline gap-3">
            <p class="text-2xl tabular-nums" :class="p.compareAt ? 'text-sale' : ''">{{ formatPrice(p.price) }}</p>
            <s v-if="p.compareAt" class="tabular-nums text-muted">{{ formatPrice(p.compareAt) }}</s>
            <span class="ml-auto inline-flex items-center gap-1 text-sm"><AppIcon name="star" :size="14" class="fill-ink" /> {{ p.rating }} <span class="text-muted">({{ p.reviewCount.toLocaleString() }})</span></span>
          </div>

          <fieldset class="mt-8">
            <legend class="font-display text-[11px] uppercase tracking-[0.2em]">Color — <span class="text-muted">{{ pdp.color.value?.name }}</span></legend>
            <div class="mt-3 flex gap-2">
              <label v-for="c in p.colors" :key="c.id" class="cursor-pointer">
                <input v-model="pdp.colorId.value" type="radio" name="color" :value="c.id" class="peer sr-only">
                <span class="block h-16 w-16 bg-surface p-1.5 ring-ink peer-checked:ring-2 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--focus)]">
                  <ProductImg :product="p" :color-id="c.id" :alt="c.name" />
                </span>
              </label>
            </div>
          </fieldset>

          <fieldset class="mt-6" :aria-describedby="pdp.sizeError.value ? 'c01-size-err' : undefined">
            <div class="flex items-center justify-between">
              <legend class="font-display text-[11px] uppercase tracking-[0.2em]">Size — EU</legend>
              <button type="button" class="inline-flex items-center gap-1 text-sm underline underline-offset-4" @click="sizeGuide = true"><AppIcon name="ruler" :size="16" /> ตารางไซซ์</button>
            </div>
            <div class="mt-3 grid grid-cols-5 gap-1.5">
              <label v-for="z in p.sizes" :key="z">
                <input type="radio" name="size" class="peer sr-only" :value="z" :checked="pdp.size.value === z" :disabled="pdp.isSoldOut(z)" @change="pdp.selectSize(z)">
                <span class="grid h-12 cursor-pointer place-items-center border text-sm tabular-nums peer-checked:border-ink peer-checked:bg-ink peer-checked:text-bg peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--focus)] peer-disabled:cursor-not-allowed peer-disabled:text-muted peer-disabled:line-through" :class="pdp.sizeError.value ? 'border-sale' : 'border-line hover:border-ink'">{{ z }}</span>
              </label>
            </div>
            <p v-if="pdp.sizeError.value" id="c01-size-err" class="mt-2 text-sm text-sale" role="alert">กรุณาเลือกไซซ์ก่อนเพิ่มลงตะกร้า</p>
            <p v-else-if="p.stock < 15" class="mt-2 text-sm text-accent-text">เหลือเพียง {{ p.stock }} คู่</p>
          </fieldset>

          <div class="mt-6 grid grid-cols-[1fr_auto] gap-2">
            <button type="button" class="h-14 bg-ink font-display text-sm font-bold uppercase tracking-[0.16em] text-bg transition-colors hover:bg-accent hover:text-accent-ink" @click="pdp.addToCart()">Add to cart</button>
            <button type="button" class="grid h-14 w-14 place-items-center border border-ink" :aria-pressed="wish.has(p.slug)" :aria-label="wish.has(p.slug) ? 'นำออกจากรายการโปรด' : 'เพิ่มในรายการโปรด'" @click="wish.toggle(p.slug)"><AppIcon name="heart" :class="wish.has(p.slug) && 'fill-ink'" /></button>
            <button type="button" class="col-span-2 h-14 border border-ink font-display text-sm font-bold uppercase tracking-[0.16em] hover:bg-ink hover:text-bg" @click="pdp.buyNow()">Buy now</button>
          </div>

          <!-- Benefits as segmented meters -->
          <dl class="mt-10 grid grid-cols-2 gap-x-6 gap-y-5">
            <div v-for="(score, key) in p.benefits" :key="key">
              <dt class="flex justify-between font-display text-[11px] uppercase tracking-[0.18em]"><span>{{ benefitLabels[key]!.en }}</span><span class="text-muted">{{ benefitLabels[key]!.th }}</span></dt>
              <dd class="mt-2 flex gap-1" :aria-label="`${score} จาก 5`">
                <span v-for="n in 5" :key="n" class="h-1.5 flex-1" :class="n <= score ? 'bg-ink' : 'bg-line'" />
              </dd>
            </div>
          </dl>

          <ul class="mt-8 space-y-2 border-t border-line pt-6 text-sm">
            <li class="flex gap-3"><AppIcon name="truck" :size="18" /> ส่งฟรีเมื่อช้อปครบ ฿499 · ได้รับใน 1–3 วันทำการ</li>
            <li class="flex gap-3"><AppIcon name="store" :size="18" /> รับที่สาขาภายใน 2 ชั่วโมง (7 สาขาทั่วประเทศ)</li>
            <li class="flex gap-3"><AppIcon name="return" :size="18" /> เปลี่ยนไซซ์หรือคืนได้ใน 30 วัน</li>
          </ul>

          <div class="mt-8 divide-y divide-line border-y border-line">
            <details class="group py-4" open>
              <summary class="flex cursor-pointer list-none items-center justify-between font-display text-xs font-bold uppercase tracking-[0.18em] [&::-webkit-details-marker]:hidden">Technology <AppIcon name="plus" :size="16" class="transition-transform group-open:rotate-45" /></summary>
              <div class="mt-4 text-sm">
                <p class="mb-3">{{ p.technologies.map((t) => technologyLabels[t]).join(' + ') }} — {{ technology.summary }}</p>
                <ol class="space-y-1">
                  <li v-for="(l, n) in technology.layers" :key="l.id" class="flex items-center gap-3"><span class="h-3 w-8" :style="{ background: l.color }" /><span class="font-display text-[11px] tabular-nums text-muted">0{{ n + 1 }}</span>{{ l.nameTh }} <span class="ml-auto tabular-nums text-muted">{{ l.thicknessMm }} มม.</span></li>
                </ol>
              </div>
            </details>
            <details v-for="a in accordions" :key="a.id" class="group py-4">
              <summary class="flex cursor-pointer list-none items-center justify-between font-display text-xs font-bold uppercase tracking-[0.18em] [&::-webkit-details-marker]:hidden">{{ a.title }} <AppIcon name="plus" :size="16" class="transition-transform group-open:rotate-45" /></summary>
              <p v-for="b in a.body" :key="b" class="mt-3 text-sm">{{ b }}</p>
              <ul v-if="a.list" class="mt-3 list-inside list-disc text-sm"><li v-for="m in a.list" :key="m">{{ m }}</li></ul>
            </details>
          </div>
        </div>
      </div>
    </div>

    <C01ProductRail eyebrow="Complete the look" title="You may also like" :items="related(p, 6)" />
    <C01ProductRail v-if="recentItems.length" eyebrow="History" title="Recently viewed" :items="recentItems" />
    <SizeGuide v-model="sizeGuide" />
    <PrototypeBar />
  </div>
</template>
