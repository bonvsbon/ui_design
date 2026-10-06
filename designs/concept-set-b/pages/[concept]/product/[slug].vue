<script setup lang="ts">
import { products, formatPrice } from '~/data/products'
import { concepts } from '~/data/concepts'
definePageMeta({
  validate: (route) =>
    concepts.some((c) => c.id === route.params.concept) &&
    (route.params.slug === 'demo' || products.some((p) => p.id === route.params.slug)),
})
const route = useRoute()
const { base } = useConcept()
const { shop, panel, toggleWish, addToCart, viewProduct } = useShop()
const product = computed(() => products.find((p) => p.id === route.params.slug) || products[0]!)
const color = ref(0),
  size = ref<number | null>(null),
  gallery = ref(0),
  error = ref(false)
const galleryImages = computed(() =>
  [
    product.value.colors[color.value]?.image || product.value.image,
    product.value.hoverImage,
    ...product.value.colors.filter((c) => c.image).map((c) => c.image!),
  ].filter((x, i, a) => a.indexOf(x) === i)
)
const related = computed(() => products.filter((p) => p.id !== product.value.id).slice(0, 4))
const recent = computed(() =>
  shop.value.recent
    .filter((id) => id !== product.value.id)
    .map((id) => products.find((p) => p.id === id)!)
    .filter(Boolean)
    .slice(0, 4)
)
function add(buy = false) {
  if (!size.value) {
    error.value = true
    document.getElementById('sizes')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    return
  }
  addToCart(product.value.id, product.value.colors[color.value]!.name, size.value)
  if (buy) panel.value = 'checkout'
}
watch(
  () => route.params.slug,
  () => {
    color.value = 0
    size.value = null
    gallery.value = 0
    error.value = false
    if (import.meta.client) viewProduct(product.value.id)
  }
)
watch(color, () => (gallery.value = 0))
onMounted(() => viewProduct(product.value.id))
useHead({ title: computed(() => `GAMBOL — ${product.value.name} | Everyday comfort`) })
</script>
<template>
  <main id="main" class="product-page">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <NuxtLink :to="base">Home</NuxtLink><AppIcon name="next" :size="12" /><NuxtLink
          :to="base + '/products'"
          >Shop</NuxtLink
        ><AppIcon name="next" :size="12" /><NuxtLink
          :to="base + '/products?category=' + product.category"
          >{{ product.category }}</NuxtLink
        ><AppIcon name="next" :size="12" /><span>{{ product.name }}</span>
      </nav>
      <div class="pdp-main">
        <div class="pdp-gallery">
          <div class="pdp-thumbnails">
            <button
              v-for="(image, i) in galleryImages"
              :key="image"
              :class="{ active: gallery === i }"
              :aria-pressed="gallery === i"
              :aria-label="'View ' + product.name + ' image ' + (i + 1)"
              @click="gallery = i"
            >
              <img :src="image" :alt="product.name + ' view ' + (i + 1)" width="100" height="100" />
            </button>
          </div>
          <div class="pdp-main-image">
            <img
              :src="galleryImages[gallery]"
              :alt="product.name + ' in ' + product.colors[color]?.name"
              width="800"
              height="900"
              fetchpriority="high"
            /><span>Thoughtfully designed. Effortlessly comfortable.</span>
          </div>
        </div>
        <div class="pdp-details">
          <p class="pdp-eyebrow">
            {{ product.gender.join(' / ') }} · {{ product.category }} · {{ product.collection }}
          </p>
          <div class="pdp-name-row">
            <h1>{{ product.name }}</h1>
            <button
              :aria-label="
                (shop.wishlist.includes(product.id) ? 'Remove from' : 'Add to') + ' wishlist'
              "
              :aria-pressed="shop.wishlist.includes(product.id)"
              @click="toggleWish(product.id)"
            >
              <AppIcon
                name="heart"
                :class="{ filled: shop.wishlist.includes(product.id) }"
                :size="24"
              />
            </button>
          </div>
          <div class="pdp-price">
            {{ formatPrice(product.price)
            }}<del v-if="product.originalPrice">{{ formatPrice(product.originalPrice) }}</del
            ><span v-if="product.badge">{{ product.badge }}</span>
          </div>
          <p class="pdp-description">{{ product.description }}</p>
          <div class="pdp-color">
            <div class="pdp-label">
              <span
                >Colour: <span>{{ product.colors[color]?.name }}</span></span
              ><span>{{ product.colors.length }} colours</span>
            </div>
            <div class="pdp-color-options">
              <button
                v-for="(c, i) in product.colors"
                :key="c.name"
                :class="{ active: color === i }"
                :aria-label="'Select ' + c.name"
                :aria-pressed="color === i"
                @click="color = i"
              >
                <img v-if="c.image" :src="c.image" :alt="c.name" width="80" height="80" /><span
                  v-else
                  class="color-block"
                  :style="{ '--swatch': c.value }"
                ></span>
              </button>
            </div>
          </div>
          <div id="sizes" class="pdp-sizes">
            <div class="pdp-label">
              <span>Select size <span>(EU)</span></span
              ><button @click="panel = 'size'">Size guide</button>
            </div>
            <div class="size-grid">
              <button
                v-for="s in product.sizes"
                :key="s"
                :aria-label="'Size EU ' + s"
                :aria-pressed="size === s"
                :class="{ selected: size === s }"
                @click="
                  ($event) => {
                    size = s
                    error = false
                  }
                "
              >
                {{ s }}
              </button>
            </div>
            <p v-if="error" role="alert" class="size-error">
              Choose your size to add this pair to your bag.
            </p>
          </div>
          <div class="pdp-buttons">
            <button class="button button-dark" @click="add()">
              ADD TO CART<AppIcon name="bag" :size="17" /></button
            ><button class="button button-outline" @click="add(true)">
              BUY NOW<AppIcon name="arrow" :size="17" />
            </button>
          </div>
          <div class="pdp-delivery">
            <span><AppIcon name="truck" :size="16" />Free delivery on orders over ฿599</span
            ><span
              ><AppIcon name="returns" :size="16" />Easy returns within 7 days · Unworn pairs</span
            >
          </div>
          <div class="pdp-benefits">
            <span
              v-for="b in [
                { icon: 'steps', name: 'Comfort' },
                { icon: 'layers', name: 'Soft' },
                { icon: 'feather', name: 'Lightweight' },
                { icon: 'shield', name: 'Durable' },
              ]"
              :key="b.name"
              ><AppIcon :name="b.icon" :size="23" />{{ b.name }}</span
            >
          </div>
          <details class="product-accordion" open>
            <summary>
              The {{ product.technology }} feeling<AppIcon name="plus" :size="16" />
            </summary>
            <p>
              Our signature material brings together a cushioned feel, lightweight construction, and
              everyday resilience. A contoured footbed helps support your natural stride, wherever
              the day takes you.
            </p>
          </details>
          <details class="product-accordion">
            <summary>Product description<AppIcon name="plus" :size="16" /></summary>
            <p>{{ product.description }}</p>
          </details>
          <details class="product-accordion">
            <summary>Materials & care<AppIcon name="plus" :size="16" /></summary>
            <p>
              Illustrative specifications: flexible synthetic upper with an EVA-based cushioned
              footbed. Clean gently with mild soap and water, then air dry in the shade. Avoid
              prolonged direct heat. Final material composition should be confirmed for each
              production SKU.
            </p>
          </details>
          <details class="product-accordion">
            <summary>Delivery & returns<AppIcon name="plus" :size="16" /></summary>
            <p>
              Demo policy: standard delivery within Thailand in 2–4 business days. ฿40 shipping,
              free on orders from ฿599. Unworn pairs in their original packaging can be returned
              within 7 days. This prototype does not place real orders.
            </p>
          </details>
        </div>
      </div>
    </div>
    <section class="related-section container section-space">
      <div class="section-heading">
        <h2>You might get along.</h2>
        <NuxtLink :to="base + '/products'" class="text-link"
          >Explore all footwear<AppIcon name="right" :size="16"
        /></NuxtLink>
      </div>
      <div class="product-grid"><ProductCard v-for="p in related" :key="p.id" :product="p" /></div>
    </section>
    <section v-if="recent.length" class="container section-space">
      <div class="section-heading">
        <h2>A second look.</h2>
        <span class="text-link">Recently viewed</span>
      </div>
      <div class="product-grid"><ProductCard v-for="p in recent" :key="p.id" :product="p" /></div>
    </section>
  </main>
</template>
