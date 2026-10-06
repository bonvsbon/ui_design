<script setup lang="ts">
/** Thumb-zone navigation for phones/tablets (hidden ≥1024px). */
const ui = useUiStore()
const cart = useCartStore()
const wishlist = useWishlistStore()
const route = useRoute()
const isActive = (p: string) => (p === '/' ? route.path === '/' : route.path.startsWith(p))
</script>

<template>
  <nav aria-label="แถบนำทางด้านล่าง" class="pb-safe fixed inset-x-0 bottom-0 z-header border-t border-line bg-paper/95 backdrop-blur lg:hidden">
    <ul class="grid h-tabbar grid-cols-5">
      <li>
        <NuxtLink to="/" class="flex h-full flex-col items-center justify-center gap-1 text-[0.62rem] font-semibold uppercase tracking-[0.08em]" :class="isActive('/') ? 'text-ink' : 'text-muted'" :aria-current="isActive('/') ? 'page' : undefined">
          <AppIcon name="home" :size="22" />Home
        </NuxtLink>
      </li>
      <li>
        <button type="button" class="flex h-full w-full flex-col items-center justify-center gap-1 text-[0.62rem] font-semibold uppercase tracking-[0.08em]" :class="isActive('/product') || ui.overlay === 'menu' ? 'text-ink' : 'text-muted'" @click="ui.open('menu')">
          <AppIcon name="grid" :size="22" />Shop
        </button>
      </li>
      <li>
        <button type="button" class="flex h-full w-full flex-col items-center justify-center gap-1 text-[0.62rem] font-semibold uppercase tracking-[0.08em]" :class="ui.overlay === 'search' ? 'text-ink' : 'text-muted'" @click="ui.open('search')">
          <AppIcon name="search" :size="22" />Search
        </button>
      </li>
      <li>
        <NuxtLink to="/wishlist" class="relative flex h-full flex-col items-center justify-center gap-1 text-[0.62rem] font-semibold uppercase tracking-[0.08em]" :class="isActive('/wishlist') ? 'text-ink' : 'text-muted'">
          <AppIcon name="heart" :size="22" />Wishlist
          <ClientOnly><span v-if="wishlist.ids.length" class="absolute left-1/2 top-2 ml-2 grid h-4 min-w-4 place-items-center rounded-full bg-red px-1 text-[0.6rem] text-white">{{ wishlist.ids.length }}</span></ClientOnly>
        </NuxtLink>
      </li>
      <li>
        <button type="button" class="relative flex h-full w-full flex-col items-center justify-center gap-1 text-[0.62rem] font-semibold uppercase tracking-[0.08em]" :class="ui.overlay === 'cart' ? 'text-ink' : 'text-muted'" @click="ui.open('cart')">
          <AppIcon name="bag" :size="22" />Cart
          <ClientOnly><span v-if="cart.count" class="absolute left-1/2 top-2 ml-2 grid h-4 min-w-4 place-items-center rounded-full bg-red px-1 text-[0.6rem] text-white">{{ cart.count }}</span></ClientOnly>
        </button>
      </li>
    </ul>
  </nav>
</template>
