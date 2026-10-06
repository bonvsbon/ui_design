<script setup lang="ts">
import { benefits } from '~/data/site'
const route = useRoute()
const { findProduct, products } = useCatalog()
const product = computed(() => findProduct(String(route.params.slug)))
if (!product.value)
  throw createError({ statusCode: 404, statusMessage: 'This pair could not be found' })
const selectedImage = ref(product.value!.image)
watch(
  () => product.value?.id,
  () => {
    selectedImage.value = product.value?.image || ''
  }
)
const gallery = computed(() => [
  product.value!.image,
  product.value!.alternate,
  ...product.value!.colors.slice(1).map((c) => c.image),
])
useSeoMeta({
  title: () => `${product.value?.name} | GAMBOL`,
  description: () => product.value?.description,
})
</script>
<template>
  <div v-if="product" class="product-page">
    <nav class="breadcrumbs container" aria-label="Breadcrumb">
      <NuxtLink to="/">Home</NuxtLink><AppIcon name="right" :size="12" /><NuxtLink to="/products"
        >Shop</NuxtLink
      ><AppIcon name="right" :size="12" /><span>{{ product.name }}</span>
    </nav>
    <div class="pdp-layout container">
      <div class="pdp-gallery">
        <div class="pdp-main-image">
          <span v-if="product.badge" class="product-badge">{{ product.badge }}</span
          ><img
            :src="selectedImage"
            :alt="product.name + ' product view'"
            width="900"
            height="900"
            fetchpriority="high"
          />
        </div>
        <div class="pdp-thumbnails">
          <button
            v-for="(src, i) in gallery"
            :key="src"
            :aria-label="`View ${product.name} image ${i + 1}`"
            :aria-pressed="selectedImage === src"
            :class="{ active: src === selectedImage }"
            @click="selectedImage = src"
          >
            <img :src="src" alt="" width="150" height="130" />
          </button>
        </div>
        <div class="pdp-lifestyle">
          <img
            src="/images/city-life.webp"
            alt="Everyday city comfort inspiration with casual slides"
            width="1024"
            height="1536"
            loading="lazy"
          />
          <div>
            <img
              :src="product.alternate"
              :alt="product.name + ' detail view'"
              width="500"
              height="500"
              loading="lazy"
            /><span>MADE TO GO<br />WITH YOUR FLOW.</span>
          </div>
        </div>
      </div>
      <PurchasePanel :product="product" @color="selectedImage = $event" />
    </div>
    <section class="pdp-benefits container">
      <div v-for="b in benefits" :key="b.id">
        <AppIcon :name="b.icon" :size="29" />
        <h2>{{ b.label }}</h2>
        <p lang="th">{{ b.thai }}</p>
      </div>
    </section>
    <section class="love-section container">
      <div>
        <span class="red-label">YOUR EVERYDAY, A LITTLE BETTER.</span>
        <h2>WHY YOU’LL<br />LOVE IT.</h2>
        <p>
          Easy to put on. Easy to make your own. A pair that feels right for the way your day
          unfolds.
        </p>
        <NuxtLink to="/stories/a-day-on-your-feet" class="text-link"
          >A LITTLE COMFORT KNOW-HOW<AppIcon name="arrow" :size="18"
        /></NuxtLink>
      </div>
      <img
        :src="product.alternate"
        :alt="product.name + ' sole and strap details'"
        width="800"
        height="700"
        loading="lazy"
      />
    </section>
    <TechnologyExplorer />
    <div class="section container">
      <ProductCarousel
        title="GOOD COMPANY FOR YOUR PAIR."
        subtitle="You may also like"
        :products="products.filter((p) => p.id !== product!.id).slice(0, 6)"
      />
    </div>
  </div>
</template>
