<script setup lang="ts">
import { lifestyles } from '~/data/lifestyles'
import { techLayers } from '~/data/technology'
import { collections, typeLabels } from '~/data/products'

/**
 * Product detail. `/product/demo` is an alias to the flagship product for demos.
 */
const route = useRoute()
const slug = computed(() => (route.params.slug === 'demo' ? 'gbold-classic-slide' : String(route.params.slug)))
const { data: product } = await useAsyncData(() => `product-${slug.value}`, () => useApi().getProduct(slug.value), { watch: [slug] })
if (!product.value) throw createError({ statusCode: 404, statusMessage: 'ไม่พบสินค้า', fatal: true })

const products = useProducts()
const color = ref(0)
watch(slug, () => { color.value = 0 })

const p = computed(() => product.value!)
const life = computed(() => lifestyles.find((l) => l.slug === p.value.lifestyles[0]) ?? lifestyles[0])
const lifeList = computed(() => p.value.lifestyles.map((s) => lifestyles.find((l) => l.slug === s)).filter((l) => !!l).slice(0, 3))
const related = computed(() => products.value
  .filter((x) => x.id !== p.value.id && (x.type === p.value.type || x.genders.some((g) => p.value.genders.includes(g))))
  .sort((a, b) => Number(b.type === p.value.type) - Number(a.type === p.value.type) || a.salesRank - b.salesRank)
  .slice(0, 10))
const collection = computed(() => collections.find((c) => p.value.collections.includes(c.slug)))

// Mobile sticky bar: visible once the main CTA scrolls out of view
const buyBox = ref<HTMLElement | null>(null)
const showBar = ref(false)
let io: IntersectionObserver | undefined
onMounted(() => {
  if (!buyBox.value) return
  io = new IntersectionObserver(([e]) => { showBar.value = !e.isIntersecting && e.boundingClientRect.top < 0 })
  io.observe(buyBox.value)
})
onBeforeUnmount(() => io?.disconnect())
const scrollToBuy = () => buyBox.value?.scrollIntoView({ behavior: 'smooth', block: 'center' })

useHead(() => ({
  title: `${p.value.name} — ${p.value.subtitle}`,
  meta: [{ name: 'description', content: p.value.description }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org', '@type': 'Product', name: p.value.name, sku: p.value.code, brand: { '@type': 'Brand', name: 'GAMBOL' },
      description: p.value.description, offers: { '@type': 'Offer', priceCurrency: 'THB', price: p.value.price, availability: 'https://schema.org/InStock' },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: p.value.rating, reviewCount: p.value.reviewCount },
    }),
  }],
}))
</script>

<template>
  <div v-if="product">
    <nav aria-label="breadcrumb" class="wrap py-4 text-sm text-muted">
      <ol class="flex flex-wrap gap-1.5">
        <li><NuxtLink to="/" class="hover:text-ink">Home</NuxtLink> /</li>
        <li><NuxtLink :to="`/products?gender=${p.genders[0]}`" class="capitalize hover:text-ink">{{ p.genders[0] }}</NuxtLink> /</li>
        <li><NuxtLink :to="`/products?gender=${p.genders[0]}&type=${p.type}`" class="hover:text-ink">{{ typeLabels[p.type].en }}</NuxtLink> /</li>
        <li aria-current="page" class="text-ink">{{ p.name }}</li>
      </ol>
    </nav>

    <!-- 60 / 40 -->
    <div class="lg:wrap lg:grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-12 xl:gap-16">
      <div class="relative">
        <div v-if="p.badges.length" class="absolute left-4 top-4 z-10 flex gap-1"><ProductBadge v-for="b in p.badges" :key="b" :badge="b" /></div>
        <ProductGallery :product="p" :color="color" :lifestyle="life.media" />
      </div>
      <div class="wrap pt-8 lg:px-0 lg:pt-0">
        <div class="lg:sticky lg:top-[calc(var(--header-h)+24px)]">
          <div ref="buyBox"><ProductBuyBox v-model:color="color" :product="p" /></div>
          <div class="mt-8">
            <p class="eyebrow mb-4 text-muted">GBOLD™ Benefits</p>
            <BenefitIcons :benefits="p.benefits" />
          </div>
        </div>
      </div>
    </div>

    <!-- Why you'll love it -->
    <section class="mt-section bg-paper-2 py-section" aria-labelledby="love-title">
      <div class="wrap">
        <h2 id="love-title" class="display-l">Why You'll<br>Love It</h2>
        <p class="thai-lead mt-4 max-w-xl text-ink-2">{{ p.description }}</p>
      </div>
      <div class="wrap mt-12 grid gap-4 md:grid-cols-12">
        <div class="relative overflow-hidden md:col-span-7 md:row-span-2">
          <div class="aspect-[4/5] md:aspect-auto md:h-full"><AppImage :media="life.media" sizes="(min-width:768px) 58vw, 100vw" :widths="[640, 960, 1280]" /></div>
          <p class="absolute bottom-6 left-6 max-w-xs font-thai text-2xl font-semibold text-white [text-shadow:0_1px_12px_rgb(0_0_0/.45)]">“{{ p.tagline }}”</p>
        </div>
        <div class="flex flex-col justify-between bg-white p-8 md:col-span-5">
          <AppIcon name="lite" :size="34" class="text-red" />
          <div class="mt-10"><p class="display-l">{{ p.weightGrams }}<span class="text-3xl">g</span></p><p class="mt-2 font-thai text-ink-2">น้ำหนักต่อข้าง (ไซซ์ 40) เบาจนลืมว่าใส่อยู่</p></div>
        </div>
        <div class="grid gap-4 sm:grid-cols-2 md:col-span-5">
          <div class="bg-lagoon p-6 text-white">
            <AppIcon name="soft" :size="30" class="text-sun" />
            <p class="display-s mt-8">Soft Footbed</p>
            <p class="mt-1 font-thai text-sm text-white/75">นุ่มตั้งแต่ก้าวแรก ไม่ต้องรอให้เข้าเท้า</p>
          </div>
          <div class="bg-sun p-6">
            <AppIcon name="durable" :size="30" />
            <p class="display-s mt-8">Wash &amp; Go</p>
            <p class="mt-1 font-thai text-sm text-ink-2">ล้างน้ำได้ แห้งไว ใส่ได้ทั้งแดดและฝน</p>
          </div>
        </div>
      </div>
      <div class="wrap mt-10">
        <p class="eyebrow text-muted">Made for</p>
        <ul class="mt-3 flex flex-wrap gap-2">
          <li v-for="l in lifeList" :key="l!.slug"><NuxtLink :to="`/products?lifestyle=${l!.slug}`" class="chip">{{ l!.title }} <span class="font-thai text-muted">· {{ l!.tagline }}</span></NuxtLink></li>
        </ul>
      </div>
    </section>

    <!-- GBOLD construction -->
    <section v-if="p.gbold" class="bg-lagoon py-section text-white" aria-labelledby="pdp-tech">
      <div class="wrap grid items-center gap-12 lg:grid-cols-12">
        <div class="lg:col-span-6"><div class="mx-auto max-w-[560px]"><SoleIllustration /></div></div>
        <div class="lg:col-span-5 lg:col-start-8">
          <p class="eyebrow text-sun">GBOLD Technology™</p>
          <h2 id="pdp-tech" class="display-l mt-4">What's Under<br>Your Feet</h2>
          <ol class="mt-8 divide-y divide-white/15 border-y border-white/15">
            <li v-for="(l, n) in techLayers" :key="l.name" class="grid grid-cols-[2.5rem_1fr] gap-3 py-4">
              <span class="text-sm font-semibold tabular-nums text-sun">{{ String(n + 1).padStart(2, '0') }}</span>
              <div><p class="font-semibold">{{ l.name }} <span class="font-thai font-normal text-white/70">· {{ l.th }}</span></p><p class="font-thai text-sm text-white/70">{{ l.note }}</p></div>
            </li>
          </ol>
          <NuxtLink to="/technology" class="btn-light mt-8">Explore GBOLD Technology</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Details -->
    <section class="wrap-narrow py-section" aria-labelledby="pdp-details">
      <h2 id="pdp-details" class="display-m">Details</h2>
      <div class="mt-8 divide-y divide-line border-y border-line font-thai">
        <details open class="group py-5">
          <summary class="flex cursor-pointer list-none items-center justify-between font-sans text-sm font-semibold uppercase tracking-[0.12em]">Description <AppIcon name="chevron-down" :size="18" class="transition-transform group-open:rotate-180" /></summary>
          <p class="mt-4 max-w-prose text-ink-2">{{ p.description }}</p>
          <p class="mt-3 text-sm text-muted">รหัสสินค้า {{ p.code }} · Style line {{ p.styleLine }}<template v-if="collection"> · {{ collection.name }}</template></p>
        </details>
        <details class="group py-5">
          <summary class="flex cursor-pointer list-none items-center justify-between font-sans text-sm font-semibold uppercase tracking-[0.12em]">Materials <AppIcon name="chevron-down" :size="18" class="transition-transform group-open:rotate-180" /></summary>
          <ul class="mt-4 list-disc space-y-1 pl-5 text-ink-2"><li v-for="m in p.materials" :key="m">{{ m }}</li></ul>
        </details>
        <details class="group py-5">
          <summary class="flex cursor-pointer list-none items-center justify-between font-sans text-sm font-semibold uppercase tracking-[0.12em]">Size &amp; Fit <AppIcon name="chevron-down" :size="18" class="transition-transform group-open:rotate-180" /></summary>
          <p class="mt-4 text-ink-2">ไซซ์ตรงตามมาตรฐาน EU หากเท้ากว้างแนะนำเพิ่มครึ่งไซซ์ · <NuxtLink to="/stories/size-guide" class="underline underline-offset-4">ดูวิธีวัดเท้า</NuxtLink></p>
        </details>
      </div>
    </section>

    <!-- Related -->
    <section class="pb-section" aria-labelledby="pdp-related">
      <div class="wrap"><SectionHeader id="pdp-related" title="You May Also Like" subtitle="คู่ที่เข้ากับสไตล์ของคุณ" /></div>
      <ProductCarousel class="mt-10" :products="related" label="สินค้าที่คุณอาจชอบ" />
    </section>

    <!-- Mobile sticky purchase bar -->
    <Transition name="sheet">
      <div v-if="showBar" class="fixed inset-x-0 bottom-tabbar z-30 flex items-center gap-3 border-t border-line bg-paper px-4 py-3 lg:hidden">
        <img :src="imageUrl(p.colors[color].images[0])" alt="" class="h-12 w-12 bg-paper-2 object-contain mix-blend-multiply">
        <div class="min-w-0 flex-1"><p class="truncate text-sm font-semibold">{{ p.name }}</p><p class="text-sm">{{ formatPrice(p.price) }}</p></div>
        <button type="button" class="btn-accent px-5" @click="scrollToBuy">Select Size</button>
      </div>
    </Transition>
  </div>
</template>
