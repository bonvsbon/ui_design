<script setup lang="ts">
import { badgeLabels, benefitLabels, categoryLabels, technologyLabels } from '~/data/catalog'
import { technology, testimonials } from '~/data/content'
definePageMeta({ layout: 'c04' })

const route = useRoute()
const { getProduct, related, bySlugs } = useCatalog()
const product = computed(() => getProduct(String(route.params.slug)))
if (!product.value) throw createError({ statusCode: 404, message: 'ไม่พบสินค้า' })
const p = computed(() => product.value!)
const pdp = useProductPage(product)
const wish = useWishlist()
const cart = useCart()
const toast = useToast()
const { slugs: recent } = useRecentlyViewed()
const recentItems = computed(() => bySlugs(recent.value.filter((s) => s !== p.value.slug)).slice(0, 4))
const sizeGuide = ref(false)
const views = ['main', 'mirror', 'detail', 'sole'] as const
const view = ref<(typeof views)[number]>('main')
const zoom = ref({ on: false, x: 50, y: 50 })
function onZoom(e: PointerEvent) {
  if (e.pointerType !== 'mouse') return
  const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
  zoom.value = { on: true, x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 }
}
const off = computed(() => discountPercent(p.value.price, p.value.compareAt))
const tab = ref<'detail' | 'tech' | 'material' | 'care' | 'delivery'>('detail')

// Delivery estimate (mock): Bangkok postcodes next day, others +2
const postcode = ref('')
const eta = computed(() => {
  if (!/^\d{5}$/.test(postcode.value)) return null
  const days = postcode.value.startsWith('10') ? 1 : 3
  const d = new Date(Date.now() + days * 864e5)
  return d.toLocaleDateString('th-TH', { weekday: 'long', day: 'numeric', month: 'short' })
})
const popularSize = computed(() => p.value.sizes[Math.floor(p.value.sizes.length / 2)])

// Frequently bought together
const companion = computed(() => related(p.value, 1)[0]!)
function addBundle() {
  if (!pdp.size.value) { pdp.sizeError.value = true; document.getElementById('c04-size')?.scrollIntoView({ block: 'center', behavior: 'smooth' }); return }
  cart.add(p.value, pdp.colorId.value, pdp.size.value)
  cart.add(companion.value, companion.value.colors[0]!.id, companion.value.sizes.includes(pdp.size.value) ? pdp.size.value : companion.value.sizes[0]!)
  toast.show(`เพิ่ม ${p.value.name} + ${companion.value.name} ลงตะกร้าแล้ว`)
}
function mobileAdd() {
  if (!pdp.addToCart()) document.getElementById('c04-size')?.scrollIntoView({ block: 'center', behavior: 'smooth' })
}
useHead({ title: () => `${p.value.name} ${formatPrice(p.value.price)} — GAMBOL` })
</script>

<template>
  <div class="pb-24 lg:pb-0">
    <nav aria-label="breadcrumb" class="container-site py-4 text-sm text-muted">
      <NuxtLink :to="pdp.link('/')" class="hover:text-ink">หน้าแรก</NuxtLink> /
      <NuxtLink :to="pdp.link(`/products?category=${p.category}`)" class="hover:text-ink">{{ categoryLabels[p.category] }}</NuxtLink> /
      <span aria-current="page" class="text-ink">{{ p.name }}</span>
    </nav>

    <div class="container-site grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
      <!-- Gallery with hover zoom -->
      <div class="lg:sticky lg:top-[140px] lg:self-start">
        <div class="relative aspect-square cursor-zoom-in overflow-hidden rounded-card bg-surface" @pointermove="onZoom" @pointerleave="zoom.on = false">
          <div class="h-full p-[8%] transition-transform duration-150" :style="zoom.on ? { transform: 'scale(1.8)', transformOrigin: `${zoom.x}% ${zoom.y}%` } : {}">
            <ProductImg :product="p" :color-id="pdp.colorId.value" :view="view" eager />
          </div>
          <ul class="absolute left-3 top-3 flex flex-col gap-1">
            <li v-for="b in p.badges" :key="b" class="rounded-md bg-ink px-2 py-0.5 text-xs font-bold text-bg">{{ b === 'sale' ? `-${off}%` : badgeLabels[b] }}</li>
          </ul>
        </div>
        <div class="mt-3 grid grid-cols-4 gap-2" role="group" aria-label="ภาพสินค้า">
          <button v-for="v in views" :key="v" type="button" class="aspect-square rounded-media border-2 bg-surface p-2" :class="view === v ? 'border-accent' : 'border-transparent'" :aria-pressed="view === v" :aria-label="`ภาพ ${v}`" @click="view = v"><ProductImg :product="p" :color-id="pdp.colorId.value" :view="v" alt="" /></button>
        </div>
      </div>

      <div>
        <h1 class="text-3xl font-extrabold tracking-tight md:text-4xl">{{ p.name }}</h1>
        <p class="mt-1 text-muted">{{ p.subtitle }}</p>
        <a href="#c04-reviews" class="mt-2 inline-flex items-center gap-1 text-sm"><span class="text-[#f59e0b]">★★★★★</span><span class="font-semibold">{{ p.rating }}</span><span class="text-muted underline">({{ p.reviewCount.toLocaleString() }} รีวิว)</span></a>

        <div class="mt-4 rounded-card bg-surface p-4">
          <p class="flex items-baseline gap-3"><span class="text-3xl font-extrabold tabular-nums" :class="p.compareAt ? 'text-sale' : ''">{{ formatPrice(p.price) }}</span><s v-if="p.compareAt" class="text-muted">{{ formatPrice(p.compareAt) }}</s><span v-if="off" class="rounded bg-sale px-1.5 text-sm font-bold text-white">ประหยัด {{ formatPrice(p.compareAt! - p.price) }}</span></p>
          <p class="mt-1 text-sm text-muted">หรือผ่อน 0% {{ formatPrice(Math.ceil(p.price / 3)) }} × 3 เดือน · ใช้โค้ด PAIR15 ลดเพิ่มเมื่อซื้อ 2 คู่</p>
        </div>

        <fieldset class="mt-6">
          <legend class="font-bold">สี: <span class="font-normal">{{ pdp.color.value?.name }}</span></legend>
          <div class="mt-2 flex gap-2">
            <label v-for="c in p.colors" :key="c.id" class="cursor-pointer">
              <input v-model="pdp.colorId.value" type="radio" name="color" :value="c.id" class="peer sr-only">
              <span class="block h-16 w-16 rounded-media border-2 bg-surface p-1 peer-checked:border-accent peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--focus)]" :class="'border-line'"><ProductImg :product="p" :color-id="c.id" :alt="c.name" /></span>
            </label>
          </div>
        </fieldset>

        <fieldset id="c04-size" class="mt-6">
          <div class="flex items-center justify-between"><legend class="font-bold">ไซซ์ (EU)</legend><button type="button" class="flex items-center gap-1 text-sm font-semibold text-accent-text" @click="sizeGuide = true"><AppIcon name="ruler" :size="16" /> ตารางไซซ์</button></div>
          <p class="mt-1 text-sm text-muted">ไซซ์ตรงตามมาตรฐาน · ไซซ์ยอดนิยม: {{ popularSize }}</p>
          <div class="mt-2 grid grid-cols-5 gap-2 sm:grid-cols-7">
            <label v-for="z in p.sizes" :key="z">
              <input type="radio" name="size" class="peer sr-only" :checked="pdp.size.value === z" :disabled="pdp.isSoldOut(z)" @change="pdp.selectSize(z)">
              <span class="relative grid h-12 cursor-pointer place-items-center rounded-btn border-2 font-semibold tabular-nums peer-checked:border-accent peer-checked:bg-[#eef3ff] peer-checked:text-accent-text peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--focus)] peer-disabled:cursor-not-allowed peer-disabled:bg-surface peer-disabled:text-muted peer-disabled:line-through" :class="pdp.sizeError.value ? 'border-sale' : 'border-line hover:border-ink'">{{ z }}</span>
            </label>
          </div>
          <p v-if="pdp.sizeError.value" class="mt-2 text-sm font-semibold text-sale" role="alert">กรุณาเลือกไซซ์</p>
        </fieldset>

        <div class="mt-4">
          <div class="flex justify-between text-sm"><span class="font-semibold" :class="p.stock < 15 ? 'text-[#b45309]' : 'text-[#15803d]'">{{ p.stock < 15 ? `ใกล้หมด — เหลือ ${p.stock} คู่` : 'มีสินค้าพร้อมส่ง' }}</span><span class="text-muted">อัปเดตเมื่อสักครู่</span></div>
          <div class="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-2"><div class="h-full rounded-full" :class="p.stock < 15 ? 'bg-[#f59e0b]' : 'bg-[#22c55e]'" :style="{ width: Math.min(100, p.stock) + '%' }" /></div>
        </div>

        <div class="mt-5 hidden gap-2 lg:grid lg:grid-cols-[1fr_1fr_auto]">
          <button type="button" class="h-14 rounded-btn bg-accent text-lg font-bold text-accent-ink hover:brightness-110" @click="pdp.addToCart()">ใส่ตะกร้า</button>
          <button type="button" class="h-14 rounded-btn bg-ink text-lg font-bold text-bg" @click="pdp.buyNow()">ซื้อเลย</button>
          <button type="button" class="grid h-14 w-14 place-items-center rounded-btn border border-line" :aria-pressed="wish.has(p.slug)" aria-label="รายการโปรด" @click="wish.toggle(p.slug)"><AppIcon name="heart" :class="wish.has(p.slug) && 'fill-sale text-sale'" /></button>
        </div>

        <div class="mt-5 rounded-card border border-line p-4">
          <label for="c04-postcode" class="flex items-center gap-2 font-semibold"><AppIcon name="truck" :size="18" /> เช็กวันจัดส่ง</label>
          <div class="mt-2 flex gap-2"><input id="c04-postcode" v-model="postcode" inputmode="numeric" maxlength="5" placeholder="รหัสไปรษณีย์ เช่น 10110" class="h-11 flex-1 rounded-btn border border-line px-3 outline-none focus:border-accent"></div>
          <p class="mt-2 text-sm" aria-live="polite"><template v-if="eta">ได้รับภายใน <strong>{{ eta }}</strong> · ส่งฟรีเมื่อครบ ฿499</template><template v-else><span class="text-muted">กรุงเทพฯ ได้รับวันถัดไป · ต่างจังหวัด 2–3 วัน · รับที่สาขาใน 2 ชม.</span></template></p>
        </div>

        <dl class="mt-5 grid grid-cols-4 gap-2 text-center">
          <div v-for="(v, k) in p.benefits" :key="k" class="rounded-card bg-surface p-3">
            <dt class="text-xs font-semibold text-muted">{{ benefitLabels[k]!.th }}</dt>
            <dd class="text-2xl font-extrabold text-accent-text">{{ v }}<span class="text-sm text-muted">/5</span></dd>
          </div>
        </dl>

        <!-- Bundle -->
        <div v-if="companion" class="mt-5 rounded-card border-2 border-dashed border-accent p-4">
          <p class="font-bold">ซื้อคู่กันบ่อย · ลด 15% ด้วยโค้ด PAIR15</p>
          <div class="mt-3 flex items-center gap-3">
            <span class="h-16 w-20 rounded-media bg-surface p-1"><ProductImg :product="p" :color-id="pdp.colorId.value" alt="" /></span><AppIcon name="plus" :size="18" />
            <NuxtLink :to="pdp.link(`/product/${companion.slug}`)" class="h-16 w-20 rounded-media bg-surface p-1"><ProductImg :product="companion" :alt="companion.name" /></NuxtLink>
            <div class="ml-auto text-right"><p class="text-sm text-muted line-through">{{ formatPrice(p.price + companion.price) }}</p><p class="text-xl font-extrabold">{{ formatPrice(Math.round((p.price + companion.price) * 0.85)) }}</p></div>
          </div>
          <button type="button" class="mt-3 h-11 w-full rounded-btn border-2 border-accent font-bold text-accent-text hover:bg-accent hover:text-accent-ink" @click="addBundle">ใส่ทั้งสองคู่ลงตะกร้า</button>
        </div>

        <div class="mt-6">
          <div role="tablist" class="no-scrollbar flex gap-1 overflow-x-auto border-b border-line">
            <button v-for="t in ([['detail','รายละเอียด'],['tech','เทคโนโลยี'],['material','วัสดุ'],['care','การดูแล'],['delivery','จัดส่ง & คืน']] as const)" :key="t[0]" type="button" role="tab" :aria-selected="tab === t[0]" class="-mb-px shrink-0 border-b-2 px-3 py-3 text-sm font-semibold" :class="tab === t[0] ? 'border-accent text-accent-text' : 'border-transparent text-muted'" @click="tab = t[0]">{{ t[1] }}</button>
          </div>
          <div role="tabpanel" class="py-4 text-ink-2">
            <p v-if="tab === 'detail'">{{ p.description }}<br><span class="text-sm text-muted">น้ำหนัก {{ p.weightGrams }} กรัม/ข้าง · รหัส {{ p.id.toUpperCase() }}</span></p>
            <div v-else-if="tab === 'tech'"><p class="font-semibold">{{ p.technologies.map((t) => technologyLabels[t]).join(' + ') }}</p><ul class="mt-2 space-y-1 text-sm"><li v-for="b in technology.benefits" :key="b.id">✓ {{ b.labelTh }}: {{ b.claim }} ({{ b.metric }} {{ b.unit }})</li></ul></div>
            <ul v-else-if="tab === 'material'" class="space-y-1"><li v-for="m in p.materials" :key="m">• {{ m }}</li></ul>
            <ul v-else-if="tab === 'care'" class="space-y-1"><li v-for="m in p.care" :key="m">• {{ m }}</li></ul>
            <ul v-else class="space-y-1"><li>• ส่งฟรีเมื่อช้อปครบ ฿499</li><li>• เก็บเงินปลายทาง / PromptPay / บัตร</li><li>• เปลี่ยนไซซ์ฟรีครั้งแรก · คืนได้ภายใน 30 วัน</li></ul>
          </div>
        </div>
      </div>
    </div>

    <section id="c04-reviews" class="container-site mt-10 border-t border-line pt-10" aria-label="รีวิว">
      <h2 class="text-2xl font-extrabold">รีวิวจากผู้ซื้อ <span class="text-muted">({{ p.reviewCount.toLocaleString() }})</span></h2>
      <ul class="mt-4 grid gap-3 md:grid-cols-3">
        <li v-for="t in testimonials" :key="t.name" class="rounded-card bg-surface p-4"><p class="text-[#f59e0b]">★★★★★</p><p class="mt-1">{{ t.quote }}</p><p class="mt-2 text-xs text-muted">{{ t.name }} · <span class="text-[#15803d]">✓ ซื้อจริง</span></p></li>
      </ul>
    </section>

    <section class="container-site mt-12" aria-labelledby="c04-rel"><h2 id="c04-rel" class="text-2xl font-extrabold">สินค้าที่คล้ายกัน</h2><ul class="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4"><li v-for="r in related(p, 4)" :key="r.id"><C04ProductCard :product="r" /></li></ul></section>
    <section v-if="recentItems.length" class="container-site mt-12" aria-labelledby="c04-recent"><h2 id="c04-recent" class="text-2xl font-extrabold">ดูล่าสุด</h2><ul class="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4"><li v-for="r in recentItems" :key="r.id"><C04ProductCard :product="r" /></li></ul></section>

    <!-- Mobile sticky buy bar -->
    <div class="fixed inset-x-0 bottom-[calc(var(--tabbar-h)+env(safe-area-inset-bottom))] z-30 flex items-center gap-2 border-t border-line bg-bg p-3 lg:hidden">
      <div class="min-w-0 flex-1"><p class="truncate text-sm font-bold">{{ p.name }} {{ pdp.size.value ? `· ${pdp.size.value}` : '' }}</p><p class="text-sm font-extrabold tabular-nums">{{ formatPrice(p.price) }}</p></div>
      <button type="button" class="h-12 rounded-btn bg-accent px-5 font-bold text-accent-ink" @click="mobileAdd">ใส่ตะกร้า</button>
      <button type="button" class="h-12 rounded-btn bg-ink px-4 font-bold text-bg" @click="pdp.buyNow()">ซื้อเลย</button>
    </div>
    <SizeGuide v-model="sizeGuide" />
    <PrototypeBar class="hidden lg:block" />
  </div>
</template>
