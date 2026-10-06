<script setup lang="ts">
/** Full-screen predictive search: Products · Collections · Categories · Stories. */
const ui = useUiStore()
const open = computed(() => ui.overlay === 'search')
const term = ref('')
const input = ref<HTMLInputElement | null>(null)
const results = useSearch(term)
const products = useProducts()
const trending = computed(() => sortProducts(products.value, 'best').slice(0, 4))
const route = useRoute()

watch(open, async (v) => {
  if (!v) return
  await nextTick()
  input.value?.focus()
})
watch(() => route.fullPath, () => { if (open.value) ui.close() })

const total = computed(() => results.value ? results.value.products.length + results.value.collections.length + results.value.categories.length + results.value.stories.length : 0)
function submit() {
  if (!term.value.trim()) return
  navigateTo({ path: '/products', query: { q: term.value.trim() } })
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" role="dialog" aria-modal="true" aria-label="ค้นหา" class="fixed inset-0 z-overlay flex flex-col overflow-y-auto bg-paper" @keydown.esc="ui.close()">
        <div class="wrap flex items-center gap-3 border-b border-ink py-4 lg:py-8">
          <form class="flex flex-1 items-center gap-3" role="search" @submit.prevent="submit">
            <AppIcon name="search" :size="28" class="text-muted" />
            <label for="search-input" class="sr-only">ค้นหาสินค้า คอลเลกชัน หรือบทความ</label>
            <input
              id="search-input" ref="input" v-model="term" type="search" autocomplete="off"
              placeholder="ค้นหา เช่น Slide, หูหนีบ, GBOLD"
              class="min-w-0 flex-1 bg-transparent font-thai text-2xl outline-none placeholder:text-muted/70 focus-visible:outline-none lg:text-5xl"
            >
          </form>
          <button type="button" class="grid h-11 w-11 place-items-center rounded-full hover:bg-paper-2" aria-label="ปิดการค้นหา" @click="ui.close()"><AppIcon name="close" /></button>
        </div>

        <div class="wrap flex-1 py-8 pb-28 lg:py-12">
          <p class="sr-only" aria-live="polite">{{ results ? `พบ ${total} ผลลัพธ์` : '' }}</p>

          <!-- Empty state -->
          <div v-if="!results" class="grid gap-12 lg:grid-cols-12">
            <div class="lg:col-span-3">
              <p class="eyebrow text-muted">Popular Searches</p>
              <ul class="mt-4 flex flex-wrap gap-2">
                <li v-for="s in popularSearches" :key="s"><button type="button" class="chip" @click="term = s">{{ s }}</button></li>
              </ul>
            </div>
            <div class="lg:col-span-9">
              <p class="eyebrow text-muted">Trending Now</p>
              <ul class="mt-4 grid grid-cols-2 gap-5 md:grid-cols-4">
                <li v-for="p in trending" :key="p.id"><ProductCard :product="p" /></li>
              </ul>
            </div>
          </div>

          <!-- Results -->
          <div v-else-if="total" class="grid gap-12 lg:grid-cols-12">
            <section class="lg:col-span-7" aria-labelledby="sr-products">
              <h2 id="sr-products" class="eyebrow text-muted">Products ({{ results.products.length }})</h2>
              <ul class="mt-4 divide-y divide-line">
                <li v-for="p in results.products" :key="p.id">
                  <NuxtLink :to="`/product/${p.slug}`" class="group flex items-center gap-4 py-3">
                    <span class="grid h-20 w-20 shrink-0 place-items-center bg-paper-2"><img :src="imageUrl(productImage(p))" :alt="''" class="h-full w-full object-contain p-2 mix-blend-multiply" loading="lazy"></span>
                    <span class="flex-1">
                      <span class="block font-semibold group-hover:underline underline-offset-4">{{ p.name }}</span>
                      <span class="block font-thai text-sm text-muted">{{ p.subtitle }}</span>
                    </span>
                    <span class="font-medium">{{ formatPrice(p.price) }}</span>
                  </NuxtLink>
                </li>
              </ul>
              <button v-if="results.products.length" type="button" class="link-arrow mt-6" @click="submit">ดูสินค้าทั้งหมดสำหรับ “{{ term }}” <AppIcon name="arrow-right" :size="16" class="arrow" /></button>
            </section>
            <div class="grid content-start gap-10 lg:col-span-4 lg:col-start-9">
              <section v-if="results.collections.length" aria-labelledby="sr-col">
                <h2 id="sr-col" class="eyebrow text-muted">Collections</h2>
                <ul class="mt-3 space-y-1">
                  <li v-for="c in results.collections" :key="c.slug"><NuxtLink :to="`/products?collection=${c.slug}`" class="flex items-baseline justify-between gap-3 py-2 hover:text-red"><span class="font-semibold">{{ c.name }}</span><span class="font-thai text-sm text-muted">{{ c.tagline }}</span></NuxtLink></li>
                </ul>
              </section>
              <section v-if="results.categories.length" aria-labelledby="sr-cat">
                <h2 id="sr-cat" class="eyebrow text-muted">Categories</h2>
                <ul class="mt-3 flex flex-wrap gap-2">
                  <li v-for="c in results.categories" :key="c.to"><NuxtLink :to="c.to" class="chip">{{ c.label }}</NuxtLink></li>
                </ul>
              </section>
              <section v-if="results.stories.length" aria-labelledby="sr-st">
                <h2 id="sr-st" class="eyebrow text-muted">Stories</h2>
                <ul class="mt-3 space-y-3">
                  <li v-for="s in results.stories" :key="s.slug"><NuxtLink :to="`/stories/${s.slug}`" class="block font-thai hover:underline underline-offset-4">{{ s.title }}</NuxtLink></li>
                </ul>
              </section>
            </div>
          </div>

          <div v-else class="py-16 text-center">
            <p class="display-s">No Results</p>
            <p class="mt-3 font-thai text-ink-2">ไม่พบผลลัพธ์สำหรับ “{{ term }}” ลองค้นหาด้วยคำอื่น หรือเลือกจากหมวดหมู่ยอดนิยม</p>
            <ul class="mt-6 flex flex-wrap justify-center gap-2">
              <li v-for="s in popularSearches" :key="s"><button type="button" class="chip" @click="term = s">{{ s }}</button></li>
            </ul>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
