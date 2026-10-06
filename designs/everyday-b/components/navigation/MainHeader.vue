<script setup lang="ts">
const ui = useUiStore()
const shop = useShopStore()
const route = useRoute()
const active = ref<string | null>(null)
const header = ref<HTMLElement>()
let closeTimer: ReturnType<typeof setTimeout> | undefined
function enter(name: string) {
  clearTimeout(closeTimer)
  active.value = name
}
function keepOpen() {
  clearTimeout(closeTimer)
}
function leave() {
  closeTimer = setTimeout(() => (active.value = null), 180)
}
function blur(e: FocusEvent) {
  if (!header.value?.contains(e.relatedTarget as Node)) active.value = null
}
watch(
  () => route.fullPath,
  () => {
    active.value = null
    ui.modal = null
  }
)
onBeforeUnmount(() => clearTimeout(closeTimer))
</script>
<template>
  <header
    ref="header"
    class="main-header"
    @mouseleave="leave"
    @keydown.esc="active = null"
    @focusout="blur"
  >
    <div class="header-inner">
      <button
        class="icon-button mobile-menu-trigger"
        aria-label="Open menu"
        @click="ui.open('menu')"
      >
        <AppIcon name="menu" />
      </button>
      <BrandLogo />
      <nav class="desktop-nav" aria-label="Main navigation">
        <button
          v-for="category in ['Men', 'Women', 'Kids', 'Sneakers']"
          :key="category"
          class="nav-link"
          :aria-expanded="active === category"
          aria-controls="mega-menu"
          @mouseenter="enter(category)"
          @click="enter(category)"
        >
          {{ category }}
        </button>
        <NuxtLink
          to="/products?new=true"
          class="nav-link"
          active-class=""
          exact-active-class=""
          :class="{ 'is-current': route.path === '/products' && route.query.new === 'true' }"
          @mouseenter="active = null"
          >New arrivals<span class="nav-dot"
        /></NuxtLink>
        <NuxtLink to="/technology" class="nav-link" @mouseenter="active = null">GBOLD™</NuxtLink>
        <NuxtLink to="/stories" class="nav-link" @mouseenter="active = null">Stories</NuxtLink>
      </nav>
      <div class="header-actions">
        <button class="icon-button" aria-label="Search products" @click="ui.open('search')">
          <AppIcon name="search" /></button
        ><NuxtLink to="/stores" class="icon-button desktop-action" aria-label="Find a store"
          ><AppIcon name="pin" /></NuxtLink
        ><button
          class="icon-button desktop-action"
          aria-label="Your account"
          @click="ui.open('account')"
        >
          <AppIcon name="user" /></button
        ><button
          class="icon-button desktop-action"
          aria-label="Open wishlist"
          @click="ui.open('wishlist')"
        >
          <AppIcon name="heart" /><span v-if="shop.wishlist.length" class="small-count">{{
            shop.wishlist.length
          }}</span></button
        ><button
          class="icon-button bag-button"
          :aria-label="`Open shopping bag, ${shop.count} items`"
          @click="ui.open('cart')"
        >
          <AppIcon name="bag" /><span class="bag-count">{{ shop.count }}</span>
        </button>
      </div>
    </div>
    <MegaMenu
      v-if="active"
      id="mega-menu"
      :category="active"
      @mouseenter="keepOpen"
      @close="active = null"
    />
  </header>
</template>
