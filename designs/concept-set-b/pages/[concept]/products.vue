<script setup lang="ts">
import { products, formatPrice } from '~/data/products'
import { concepts } from '~/data/concepts'
definePageMeta({ validate: (route) => concepts.some((c) => c.id === route.params.concept) })
const { base } = useConcept()
const route = useRoute()
const filtersOpen = ref(true)
const query = ref(String(route.query.q || ''))
const category = ref(String(route.query.category || 'All'))
const genders = ref<string[]>([])
const sizes = ref<number[]>([])
const colors = ref<string[]>([])
const technologies = ref<string[]>(route.query.technology ? [String(route.query.technology)] : [])
const collections = ref<string[]>(route.query.collection ? [String(route.query.collection)] : [])
const maxPrice = ref(1500)
const sort = ref('Featured')
const occasion = ref(String(route.query.occasion || ''))
watch(
  () => route.query,
  (q) => {
    query.value = String(q.q || '')
    category.value = String(q.category || 'All')
    collections.value = q.collection ? [String(q.collection)] : []
    technologies.value = q.technology ? [String(q.technology)] : []
    occasion.value = String(q.occasion || '')
  }
)
const allColors = [...new Set(products.flatMap((p) => p.colors.map((c) => c.name)))]
const allTech = [...new Set(products.map((p) => p.technology))]
const allCollections = [
  'New Arrivals',
  'Best Sellers',
  ...new Set(products.map((p) => p.collection)),
]
const filtered = computed(() => {
  let list = products.filter(
    (p) =>
      (category.value === 'All' ||
        p.category === category.value ||
        p.gender.includes(category.value)) &&
      (!query.value ||
        [p.name, p.category, p.collection, p.technology]
          .join(' ')
          .toLowerCase()
          .includes(query.value.toLowerCase())) &&
      (!genders.value.length || genders.value.some((g) => p.gender.includes(g))) &&
      (!sizes.value.length || sizes.value.some((s) => p.sizes.includes(s))) &&
      (!colors.value.length || colors.value.some((c) => p.colors.some((x) => x.name === c))) &&
      (!technologies.value.length || technologies.value.includes(p.technology)) &&
      (!collections.value.length ||
        collections.value.some(
          (c) =>
            c === p.collection ||
            (c === 'New Arrivals' && p.badge === 'NEW') ||
            (c === 'Best Sellers' && p.badge === 'BEST SELLER')
        )) &&
      p.price <= maxPrice.value &&
      (!occasion.value || p.occasions.includes(occasion.value))
  )
  if (sort.value === 'Price: low to high') list.sort((a, b) => a.price - b.price)
  if (sort.value === 'Price: high to low') list.sort((a, b) => b.price - a.price)
  if (sort.value === 'Newest first')
    list.sort((a, b) => Number(b.badge === 'NEW') - Number(a.badge === 'NEW'))
  return list
})
const heading = computed(() =>
  query.value
    ? `Results for “${query.value}”`
    : category.value !== 'All'
      ? category.value
      : occasion.value
        ? occasion.value + ' edit'
        : collections.value.length === 1
          ? collections.value[0]
          : 'Find your everyday.'
)
function toggleSize(size: number) {
  sizes.value = sizes.value.includes(size)
    ? sizes.value.filter((x) => x !== size)
    : [...sizes.value, size]
}
function reset() {
  query.value = ''
  category.value = 'All'
  genders.value = []
  sizes.value = []
  colors.value = []
  technologies.value = []
  collections.value = []
  maxPrice.value = 1500
  occasion.value = ''
  navigateTo(base.value + '/products', { replace: true })
}
onMounted(() => {
  if (window.innerWidth < 768) filtersOpen.value = false
})
useHead({ title: computed(() => `GAMBOL — ${heading.value} | Shop footwear`) })
</script>
<template>
  <main id="main" class="catalog-page container">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <NuxtLink :to="base">Home</NuxtLink><AppIcon name="next" :size="12" /><span
        >Shop all footwear</span
      >
    </nav>
    <div class="catalog-intro">
      <div>
        <h1>{{ heading }}</h1>
        <p>
          Made for your life, your pace, and every step in between.<br /><span lang="th"
            >รองเท้าคู่โปรด สำหรับทุกวันของคุณ</span
          >
        </p>
      </div>
      <label class="catalog-search"
        ><AppIcon name="search" :size="18" /><input
          v-model="query"
          type="search"
          placeholder="Search this collection"
          aria-label="Search this collection"
      /></label>
    </div>
    <nav class="category-pills" aria-label="Product categories">
      <button
        v-for="cat in [
          'All',
          'Men',
          'Women',
          'Kids',
          'Slides',
          'Flip-flops',
          'Sandals',
          'Sneakers',
        ]"
        :key="cat"
        :class="{ active: category === cat }"
        :aria-pressed="category === cat"
        @click="category = cat"
      >
        {{ cat === 'All' ? 'All footwear' : cat }}
      </button>
    </nav>
    <div class="catalog-toolbar">
      <div>
        <button
          class="filter-toggle"
          :aria-expanded="filtersOpen"
          aria-controls="product-filters"
          @click="filtersOpen = !filtersOpen"
        >
          <AppIcon name="filter" :size="17" />{{
            filtersOpen ? 'Hide filters' : 'Show filters'
          }}</button
        ><span aria-live="polite"
          >{{ filtered.length }} {{ filtered.length === 1 ? 'product' : 'products' }}</span
        >
      </div>
      <label
        >Sort by<select v-model="sort" aria-label="Sort products">
          <option>Featured</option>
          <option>Price: low to high</option>
          <option>Price: high to low</option>
          <option>Newest first</option>
        </select></label
      >
    </div>
    <div :class="['catalog-layout', { 'no-filters': !filtersOpen }]">
      <aside v-if="filtersOpen" id="product-filters" aria-label="Product filters">
        <details class="filter-group" open>
          <summary>Gender<AppIcon name="down" :size="14" /></summary>
          <div class="filter-options">
            <label v-for="g in ['Men', 'Women', 'Kids']" :key="g"
              ><input v-model="genders" type="checkbox" :value="g" />{{ g }}</label
            >
          </div>
        </details>
        <details class="filter-group" open>
          <summary>Category<AppIcon name="down" :size="14" /></summary>
          <div class="filter-options">
            <label
              v-for="c in ['All', 'Slides', 'Flip-flops', 'Sandals', 'Sneakers', 'Kids']"
              :key="c"
              ><input v-model="category" type="radio" :value="c" name="category" />{{ c }}</label
            >
          </div>
        </details>
        <details class="filter-group" open>
          <summary>Size (EU)<AppIcon name="down" :size="14" /></summary>
          <div class="size-filter-options">
            <button
              v-for="size in [
                28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
              ]"
              :key="size"
              :class="{ active: sizes.includes(size) }"
              :aria-pressed="sizes.includes(size)"
              @click="toggleSize(size)"
            >
              {{ size }}
            </button>
          </div>
        </details>
        <details class="filter-group">
          <summary>Colour<AppIcon name="down" :size="14" /></summary>
          <div class="filter-options">
            <label v-for="c in allColors" :key="c"
              ><input v-model="colors" type="checkbox" :value="c" />{{ c }}</label
            >
          </div>
        </details>
        <details class="filter-group" open>
          <summary>Price<AppIcon name="down" :size="14" /></summary>
          <label class="filter-price-label" for="max-price"
            >Up to {{ formatPrice(Number(maxPrice)) }}</label
          ><input
            id="max-price"
            v-model="maxPrice"
            class="filter-price-input"
            type="range"
            min="200"
            max="1500"
            step="50"
          />
        </details>
        <details class="filter-group">
          <summary>Technology<AppIcon name="down" :size="14" /></summary>
          <div class="filter-options">
            <label v-for="t in allTech" :key="t"
              ><input v-model="technologies" type="checkbox" :value="t" />{{ t }}</label
            >
          </div>
        </details>
        <details class="filter-group">
          <summary>Collection<AppIcon name="down" :size="14" /></summary>
          <div class="filter-options">
            <label v-for="c in allCollections" :key="c"
              ><input v-model="collections" type="checkbox" :value="c" />{{ c }}</label
            >
          </div>
        </details>
        <button class="clear-filters" @click="reset">Clear all filters</button>
      </aside>
      <div>
        <div
          v-if="
            genders.length ||
            sizes.length ||
            colors.length ||
            technologies.length ||
            collections.length ||
            occasion
          "
          class="active-filters"
        >
          <button v-for="g in genders" :key="g" @click="genders = genders.filter((x) => x !== g)">
            {{ g }}<AppIcon name="close" :size="12" /></button
          ><button v-for="s in sizes" :key="s" @click="toggleSize(s)">
            EU {{ s }}<AppIcon name="close" :size="12" /></button
          ><button v-for="c in colors" :key="c" @click="colors = colors.filter((x) => x !== c)">
            {{ c }}<AppIcon name="close" :size="12" /></button
          ><button
            v-for="t in technologies"
            :key="t"
            @click="technologies = technologies.filter((x) => x !== t)"
          >
            {{ t }}<AppIcon name="close" :size="12" /></button
          ><button
            v-for="c in collections"
            :key="c"
            @click="collections = collections.filter((x) => x !== c)"
          >
            {{ c }}<AppIcon name="close" :size="12" /></button
          ><button v-if="occasion" @click="occasion = ''">
            {{ occasion }}<AppIcon name="close" :size="12" />
          </button>
        </div>
        <div class="product-grid">
          <ProductCard v-for="p in filtered" :key="p.id" :product="p" />
          <div v-if="!filtered.length" class="empty-state">
            <AppIcon name="search" :size="40" />
            <h2>Let’s try a different fit.</h2>
            <p>
              No pairs match these filters. Clear a few choices to see more everyday favourites.
            </p>
            <button class="button button-dark" @click="reset">Reset filters</button>
          </div>
        </div>
        <p v-if="filtered.length" class="catalog-result-count">
          You’ve seen all {{ filtered.length }} pairs. Find the one that feels like you.
        </p>
      </div>
    </div>
  </main>
</template>
