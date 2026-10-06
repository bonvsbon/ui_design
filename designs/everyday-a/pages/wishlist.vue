<script setup lang="ts">
useHead({ title: 'Wishlist' })
const wishlist = useWishlistStore()
const products = useProducts()
const items = computed(() => products.value.filter((p) => wishlist.ids.includes(p.id)))
const suggestions = computed(() => sortProducts(products.value, 'best').slice(0, 8))
</script>

<template>
  <div class="pb-section">
    <header class="wrap pb-8 pt-12">
      <h1 class="display-l">Wishlist</h1>
      <ClientOnly><p class="thai-lead mt-3 text-ink-2">{{ items.length ? `${items.length} คู่ที่คุณชอบ` : 'กดรูปหัวใจบนสินค้าเพื่อเก็บไว้ดูภายหลัง' }}</p></ClientOnly>
    </header>
    <ClientOnly>
      <ul v-if="items.length" class="wrap grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4">
        <li v-for="p in items" :key="p.id"><ProductCard :product="p" /></li>
      </ul>
      <section v-else aria-labelledby="wl-sugg">
        <div class="wrap"><SectionHeader id="wl-sugg" title="Start With a Favourite" subtitle="รุ่นยอดนิยมที่คนเลือกมากที่สุด" /></div>
        <ProductCarousel class="mt-8" :products="suggestions" label="สินค้าแนะนำ" />
      </section>
    </ClientOnly>
  </div>
</template>
