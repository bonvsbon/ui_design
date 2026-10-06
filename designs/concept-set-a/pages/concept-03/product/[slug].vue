<script setup lang="ts">
import { activityLabels, badgeLabels, benefitLabels } from '~/data/catalog'
import { technology, testimonials } from '~/data/content'
import { homeC03 } from '~/data/home/c03'
definePageMeta({ layout: 'c03' })

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
const icons: Record<string, string> = { comfort: 'smile', soft: 'cloud', light: 'feather', durable: 'shield' }
const moments = homeC03.find((s) => s.type === 'Moments')!.props.moments as { key: string; th: string; media: string; story: string }[]
const scenes = computed(() => moments.filter((m) => p.value.activities.includes(m.key as any)).slice(0, 3))
const review = computed(() => testimonials.find((t) => t.product === p.value.slug) ?? testimonials[0]!)
useHead({ title: () => `${p.value.name} — GAMBOL` })
</script>

<template>
  <div>
    <nav aria-label="breadcrumb" class="container-site py-5 text-sm text-muted">
      <NuxtLink :to="pdp.link('/')" class="hover:text-ink">หน้าแรก</NuxtLink> ›
      <NuxtLink :to="pdp.link('/products')" class="hover:text-ink">รองเท้าทั้งหมด</NuxtLink> ›
      <span aria-current="page" class="text-ink">{{ p.name }}</span>
    </nav>

    <div class="container-site grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
      <div class="grid gap-3 md:grid-cols-[80px_1fr]">
        <div class="order-2 flex gap-2 md:order-1 md:flex-col" role="group" aria-label="เลือกภาพ">
          <button v-for="v in views" :key="v" type="button" class="aspect-square w-20 overflow-hidden rounded-media border-2 bg-surface p-1" :class="view === v ? 'border-accent' : 'border-transparent'" :aria-pressed="view === v" :aria-label="`ภาพมุม ${v}`" @click="view = v">
            <ProductImg :product="p" :color-id="pdp.colorId.value" :view="v" alt="" />
          </button>
        </div>
        <div class="order-1 grid aspect-square place-items-center rounded-card bg-[#efe2cf] p-[8%] md:order-2">
          <ProductImg :product="p" :color-id="pdp.colorId.value" :view="view" eager />
        </div>
      </div>

      <div>
        <p class="text-sm text-accent-text"><span v-for="b in p.badges" :key="b" class="mr-2">{{ badgeLabels[b] }}</span></p>
        <h1 class="mt-2 font-display text-5xl md:text-6xl">{{ p.name }}</h1>
        <p class="mt-2 text-lg italic text-ink-2" style="font-family: var(--font-display)">{{ p.shortDescription }}</p>
        <div class="mt-4 flex items-baseline gap-3">
          <p class="text-3xl tabular-nums" :class="p.compareAt ? 'text-sale' : ''">{{ formatPrice(p.price) }}</p>
          <s v-if="p.compareAt" class="text-muted">{{ formatPrice(p.compareAt) }}</s>
          <a href="#c03-review" class="ml-auto text-sm"><span class="text-accent-text">★ {{ p.rating }}</span> · {{ p.reviewCount.toLocaleString() }} รีวิว</a>
        </div>

        <fieldset class="mt-8">
          <legend class="font-semibold">สี <span class="font-normal text-muted">· {{ pdp.color.value?.name }}</span></legend>
          <div class="mt-3 flex gap-3">
            <label v-for="c in p.colors" :key="c.id">
              <input v-model="pdp.colorId.value" type="radio" name="color" :value="c.id" class="peer sr-only">
              <span class="block h-10 w-10 cursor-pointer rounded-full ring-2 ring-transparent ring-offset-2 ring-offset-bg peer-checked:ring-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--focus)]" :style="{ background: c.hex }" :title="c.name" />
            </label>
          </div>
        </fieldset>

        <fieldset class="mt-6">
          <div class="flex items-center justify-between"><legend class="font-semibold">ไซซ์ (EU)</legend><button type="button" class="text-sm underline" @click="sizeGuide = true">วัดไซซ์อย่างไร?</button></div>
          <div class="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6">
            <label v-for="z in p.sizes" :key="z">
              <input type="radio" name="size" class="peer sr-only" :checked="pdp.size.value === z" :disabled="pdp.isSoldOut(z)" @change="pdp.selectSize(z)">
              <span class="grid h-12 cursor-pointer place-items-center rounded-full border tabular-nums peer-checked:border-ink peer-checked:bg-ink peer-checked:text-bg peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--focus)] peer-disabled:cursor-not-allowed peer-disabled:opacity-40 peer-disabled:line-through" :class="pdp.sizeError.value ? 'border-sale' : 'border-line hover:border-ink'">{{ z }}</span>
            </label>
          </div>
          <p v-if="pdp.sizeError.value" class="mt-2 text-sm text-sale" role="alert">เลือกไซซ์ที่พอดีก่อนนะคะ</p>
        </fieldset>

        <div class="mt-6 grid grid-cols-[1fr_1fr_auto] gap-2">
          <button type="button" class="h-14 rounded-full bg-accent font-semibold text-accent-ink hover:brightness-110" @click="pdp.addToCart()">เพิ่มลงตะกร้า</button>
          <button type="button" class="h-14 rounded-full border border-ink font-semibold hover:bg-ink hover:text-bg" @click="pdp.buyNow()">ซื้อเลย</button>
          <button type="button" class="grid h-14 w-14 place-items-center rounded-full border border-line" :aria-pressed="wish.has(p.slug)" aria-label="รายการโปรด" @click="wish.toggle(p.slug)"><AppIcon name="heart" :class="wish.has(p.slug) && 'fill-accent text-accent'" /></button>
        </div>

        <p class="mt-6 font-semibold">เหมาะกับ</p>
        <ul class="mt-2 flex flex-wrap gap-2">
          <li v-for="a in p.activities" :key="a"><NuxtLink :to="pdp.link(`/products?activity=${a}`)" class="inline-block rounded-full bg-surface-2 px-3 py-1 text-sm hover:bg-ink hover:text-bg">{{ activityLabels[a]!.th }}</NuxtLink></li>
        </ul>

        <ul class="mt-8 grid grid-cols-2 gap-3">
          <li v-for="(v, k) in p.benefits" :key="k" class="flex items-center gap-3 rounded-card bg-surface p-4">
            <span class="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-surface-2 text-accent-text"><AppIcon :name="icons[k]!" :size="22" /></span>
            <span><span class="block font-semibold">{{ benefitLabels[k]!.th }}</span><span class="flex gap-1" :aria-label="`${v} จาก 5`"><span v-for="n in 5" :key="n" class="h-2 w-2 rounded-full" :class="n <= v ? 'bg-accent' : 'bg-line'" /></span></span>
          </li>
        </ul>

        <div class="mt-8 divide-y divide-line border-y border-line">
          <details class="py-4" open><summary class="cursor-pointer font-semibold">เรื่องของคู่นี้</summary><p class="mt-3 text-ink-2">{{ p.description }}</p></details>
          <details class="py-4"><summary class="cursor-pointer font-semibold">เทคโนโลยี {{ technology.name }}</summary><p class="mt-3 text-ink-2">{{ technology.summary }}</p><ul class="mt-2 text-sm text-muted"><li v-for="l in technology.layers" :key="l.id">· {{ l.nameTh }} — {{ l.caption }}</li></ul></details>
          <details class="py-4"><summary class="cursor-pointer font-semibold">วัสดุ</summary><ul class="mt-3 text-ink-2"><li v-for="m in p.materials" :key="m">· {{ m }}</li></ul></details>
          <details class="py-4"><summary class="cursor-pointer font-semibold">การดูแลรักษา</summary><ul class="mt-3 text-ink-2"><li v-for="m in p.care" :key="m">· {{ m }}</li></ul></details>
          <details class="py-4"><summary class="cursor-pointer font-semibold">การจัดส่งและคืนสินค้า</summary><p class="mt-3 text-ink-2">ส่งฟรีเมื่อช้อปครบ ฿499 · กรุงเทพฯ ถึงวันถัดไป · รับที่สาขาได้ · คืนได้ภายใน 30 วัน</p></details>
        </div>
      </div>
    </div>

    <section v-if="scenes.length" class="mt-section bg-surface py-section" aria-labelledby="c03-scene-title">
      <div class="container-site">
        <h2 id="c03-scene-title" class="font-display text-4xl italic md:text-5xl">ใส่ {{ p.name }} ไปไหนได้บ้าง</h2>
        <ul class="mt-8 grid gap-5 md:grid-cols-3">
          <li v-for="s in scenes" :key="s.key">
            <div class="aspect-[4/5] overflow-hidden rounded-media"><SmartImg :id="s.media" :ratio="1.25" sizes="(min-width:768px) 33vw, 100vw" /></div>
            <p class="mt-3 font-display text-2xl">{{ s.th }}</p>
            <p class="text-muted">{{ s.story }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section id="c03-review" class="container-site py-section text-center" aria-label="รีวิว">
      <p class="text-accent-text">★★★★★</p>
      <blockquote class="mx-auto mt-4 max-w-3xl font-display text-3xl italic leading-snug md:text-4xl">“{{ review.quote }}”</blockquote>
      <p class="mt-4 text-muted">— {{ review.name }}, {{ review.city }}</p>
    </section>

    <section class="container-site" aria-labelledby="c03-rel-title">
      <h2 id="c03-rel-title" class="font-display text-4xl">เข้าคู่กันดี</h2>
      <ul class="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4"><li v-for="(r, n) in related(p, 4)" :key="r.id"><C03ProductCard :product="r" :tint="n" /></li></ul>
      <template v-if="recentItems.length">
        <h2 class="mt-16 font-display text-3xl italic">ที่คุณเพิ่งดู</h2>
        <ul class="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4"><li v-for="(r, n) in recentItems" :key="r.id"><C03ProductCard :product="r" :tint="n + 1" /></li></ul>
      </template>
    </section>
    <SizeGuide v-model="sizeGuide" />
    <PrototypeBar />
  </div>
</template>
