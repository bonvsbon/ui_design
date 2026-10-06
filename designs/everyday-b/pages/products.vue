<script setup lang="ts">
import type { Filters } from '~/components/product/CatalogFilters.vue'
const route = useRoute()
const router = useRouter()
const { products } = useCatalog()
const filterDialog = ref<HTMLDialogElement>()
const sort = ref('featured')
const blank: Filters = {
  gender: '',
  type: '',
  size: '',
  color: '',
  maxPrice: 1000,
  technology: '',
  collection: '',
  lifestyle: '',
  new: false,
  best: false,
  kidsGroup: '',
  q: '',
}
function fromRoute(): Filters {
  const o = { ...blank }
  for (const key of Object.keys(o) as (keyof Filters)[]) {
    const val = route.query[key]
    if (key === 'new' || key === 'best') o[key] = val === 'true'
    else if (key === 'maxPrice') o.maxPrice = Number(val) || 1000
    else (o as any)[key] = String(val || '')
  }
  if (
    !route.query.gender &&
    !route.query.type &&
    !route.query.collection &&
    !route.query.lifestyle &&
    !route.query.q &&
    !route.query.new &&
    !route.query.best &&
    !route.query.technology
  )
    o.gender = 'Men'
  if (o.gender === 'All') o.gender = ''
  return o
}
const filters = ref<Filters>(fromRoute())
watch(
  () => route.query,
  () => {
    filters.value = fromRoute()
  }
)
function change(value: Filters) {
  filters.value = value
  const query: Record<string, string> = {}
  for (const [key, val] of Object.entries(value)) if (val && val !== 1000) query[key] = String(val)
  if (!value.gender) query.gender = 'All'
  router.replace({ query })
}
const filtered = computed(() => {
  let items = products.filter(
    (p) =>
      (!filters.value.gender || p.gender.includes(filters.value.gender as any)) &&
      (!filters.value.type || p.type === filters.value.type) &&
      (!filters.value.size ||
        (p.sizes.includes(Number(filters.value.size)) &&
          !p.unavailableSizes.includes(Number(filters.value.size)))) &&
      (!filters.value.color || p.colors.some((c) => c.name === filters.value.color)) &&
      p.price <= filters.value.maxPrice &&
      (!filters.value.technology || p.technology === filters.value.technology) &&
      (!filters.value.collection || p.collection === filters.value.collection) &&
      (!filters.value.lifestyle || p.lifestyles.includes(filters.value.lifestyle)) &&
      (!filters.value.new || p.badge === 'NEW') &&
      (!filters.value.best || p.badge === 'BEST SELLER') &&
      (!filters.value.kidsGroup ||
        p.kidsGroup === filters.value.kidsGroup ||
        p.kidsGroup === 'Both') &&
      (!filters.value.q ||
        `gambol แกมโบล รองเท้า ${p.name} ${p.code} ${p.type} ${p.collection}`
          .toLowerCase()
          .includes(filters.value.q.toLowerCase()))
  )
  if (sort.value === 'price-low') items = [...items].sort((a, b) => a.price - b.price)
  if (sort.value === 'price-high') items = [...items].sort((a, b) => b.price - a.price)
  if (sort.value === 'name') items = [...items].sort((a, b) => a.name.localeCompare(b.name))
  if (sort.value === 'new')
    items = [...items].sort((a, b) => Number(b.badge === 'NEW') - Number(a.badge === 'NEW'))
  return items
})
const title = computed(() =>
  filters.value.q
    ? `RESULTS FOR “${filters.value.q}”`
    : filters.value.collection ||
      filters.value.lifestyle ||
      (filters.value.gender
        ? `${filters.value.gender === 'Kids' ? 'KIDS’' : filters.value.gender.toUpperCase() + '’S'} FOOTWEAR`
        : 'EVERYDAY FOOTWEAR')
)
const activeFilters = computed(() =>
  Object.entries(filters.value).filter(([k, v]) => v && v !== 1000 && k !== 'gender')
)
useSeoMeta({ title: () => `${title.value} | GAMBOL` })
</script>
<template>
  <div class="catalog-page container">
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <NuxtLink to="/">Home</NuxtLink><AppIcon name="right" :size="12" /><span>Shop</span>
    </nav>
    <div class="catalog-header">
      <div>
        <h1>{{ title }}</h1>
        <p>Comfort that goes with you. <span lang="th">คู่ที่ใช่ ไปได้ทุกวัน</span></p>
      </div>
      <img
        src="/images/shoe-3-alt.webp"
        width="220"
        height="160"
        alt="Black GAMBOL Everyday Slide"
      />
    </div>
    <div class="quick-filters" aria-label="Quick footwear filters">
      <button
        v-for="type in ['All', 'Flip Flops', 'Slides', 'Sandals', 'Sneakers']"
        :key="type"
        :class="{ active: filters.type === (type === 'All' ? '' : type) }"
        :aria-pressed="filters.type === (type === 'All' ? '' : type)"
        @click="change({ ...filters, type: type === 'All' ? '' : type })"
      >
        {{ type }}
      </button>
    </div>
    <div class="catalog-toolbar">
      <span aria-live="polite"
        >{{ filtered.length }} {{ filtered.length === 1 ? 'pair' : 'pairs' }} to make your day</span
      >
      <div>
        <button class="text-link mobile-filter-button" @click="filterDialog?.showModal()">
          <AppIcon name="filter" :size="17" />FILTER{{
            activeFilters.length ? ' (' + activeFilters.length + ')' : ''
          }}</button
        ><label class="sort-label"
          >Sort by<select v-model="sort">
            <option value="featured">Featured</option>
            <option value="new">New arrivals</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="name">Name: A–Z</option>
          </select></label
        >
      </div>
    </div>
    <div v-if="activeFilters.length" class="active-filters">
      <button
        v-for="[key, value] in activeFilters"
        :key="key"
        @click="
          change({
            ...filters,
            [key]: typeof value === 'boolean' ? false : key === 'maxPrice' ? 1000 : '',
          })
        "
      >
        {{
          key === 'new'
            ? 'New arrivals'
            : key === 'best'
              ? 'Best sellers'
              : key === 'maxPrice'
                ? `Up to ${formatPrice(Number(value))}`
                : value
        }}<AppIcon name="close" :size="13" /></button
      ><button class="clear-filters" @click="change({ ...blank })">Clear all</button>
    </div>
    <div class="catalog-layout">
      <aside class="desktop-filters">
        <div class="filters-title">
          <h2>FILTERS</h2>
          <button @click="change({ ...blank })">Reset</button>
        </div>
        <CatalogFilters :model-value="filters" @update:model-value="change" />
      </aside>
      <div>
        <div v-if="filtered.length" class="catalog-grid">
          <template v-for="(p, index) in filtered" :key="p.id"
            ><ProductCard :product="p" /><NuxtLink
              v-if="index === 7"
              to="/technology"
              class="catalog-editorial"
              ><img
                src="/images/city-life.webp"
                alt="Everyday comfort in the city"
                width="800"
                height="500"
                loading="lazy" />
              <div>
                <span>YOUR DAY, MADE SOFTER.</span>
                <h2>EVERYDAY COMFORT.</h2>
                <span class="text-link"
                  >MEET GBOLD<AppIcon name="arrow" :size="18"
                /></span></div></NuxtLink
          ></template>
        </div>
        <div v-else class="empty-state catalog-empty">
          <AppIcon name="search" :size="42" />
          <h2>No pairs in this combination.</h2>
          <p>Try another size, style, or colour. There’s more comfort to discover.</p>
          <button class="button primary" @click="change({ ...blank })">
            RESET FILTERS<AppIcon name="arrow" :size="18" />
          </button>
        </div>
        <div class="catalog-bottom">
          <span>You've seen all {{ filtered.length }} pairs.</span
          ><NuxtLink to="/technology" class="text-link"
            >GET TO KNOW GBOLD<AppIcon name="upRight" :size="17"
          /></NuxtLink>
        </div>
      </div>
    </div>
    <dialog
      ref="filterDialog"
      class="filter-dialog"
      aria-labelledby="filter-title"
      @click="$event.target === filterDialog && filterDialog?.close()"
    >
      <div class="dialog-heading">
        <h2 id="filter-title">FIND YOUR PAIR.</h2>
        <button class="icon-button" aria-label="Close filters" @click="filterDialog?.close()">
          <AppIcon name="close" />
        </button>
      </div>
      <CatalogFilters :model-value="filters" @update:model-value="change" />
      <div class="filter-dialog-actions">
        <button class="text-link" @click="change({ ...blank })">RESET</button
        ><button class="button primary" @click="filterDialog?.close()">
          SHOW {{ filtered.length }} PAIRS<AppIcon name="arrow" :size="18" />
        </button>
      </div>
    </dialog>
  </div>
</template>
