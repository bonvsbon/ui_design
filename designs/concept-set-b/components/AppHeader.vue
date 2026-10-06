<script setup lang="ts">
const { concept, base } = useConcept()
const { panel, count, shop } = useShop()
const route = useRoute()
const menu = ref(false)
const links = ['Men', 'Women', 'Kids', 'Sneakers', 'New Arrivals', 'Technology', 'Stories']
function link(name: string) {
  return ['Technology', 'Stories'].includes(name)
    ? base.value + '#' + (name === 'Technology' ? 'technology' : 'stories')
    : base.value +
        '/products?' +
        (name === 'New Arrivals' ? 'collection=New Arrivals' : 'category=' + name)
}
watch(
  () => route.fullPath,
  () => (menu.value = false)
)
</script>
<template>
  <div class="announcement">
    <span>Made for your everyday. <span lang="th">นุ่มสบาย ทุกก้าวที่เป็นคุณ</span></span
    ><button @click="panel = 'cart'">
      Free shipping over ฿599 <AppIcon name="right" :size="13" />
    </button>
  </div>
  <header :class="['app-header', { 'menu-open': menu }]">
    <div class="header-main container-wide">
      <button
        class="icon-button mobile-menu"
        aria-label="Open shop menu"
        :aria-expanded="menu"
        @click="menu = !menu"
      >
        <AppIcon :name="menu ? 'close' : 'menu'" />
      </button>
      <NuxtLink :to="base" class="wordmark" aria-label="Gambol home">GAMBOL<span>®</span></NuxtLink>
      <nav class="desktop-nav" aria-label="Main navigation">
        <NuxtLink v-for="name in links" :key="name" :to="link(name)">{{ name }}</NuxtLink>
      </nav>
      <button v-if="concept.id === 'concept-04'" class="header-search" @click="panel = 'search'">
        <AppIcon name="search" /><span>Search for your next favourite pair</span><kbd>⌘ K</kbd>
      </button>
      <div class="header-actions">
        <button class="icon-button" aria-label="Search products" @click="panel = 'search'">
          <AppIcon name="search" />
        </button>
        <button class="icon-button hide-small" aria-label="Find a store" @click="panel = 'stores'">
          <AppIcon name="pin" />
        </button>
        <button class="icon-button hide-small" aria-label="Your account" @click="panel = 'account'">
          <AppIcon name="user" />
        </button>
        <button
          class="icon-button hide-small"
          aria-label="Your wishlist"
          @click="panel = 'wishlist'"
        >
          <AppIcon name="heart" /><span v-if="shop.wishlist.length" class="notification-dot"></span>
        </button>
        <button
          class="icon-button bag-button"
          :aria-label="'Shopping bag, ' + count + ' items'"
          @click="panel = 'cart'"
        >
          <AppIcon name="bag" /><span class="bag-count">{{ count }}</span>
        </button>
      </div>
    </div>
    <nav
      v-if="concept.id === 'concept-03' || concept.id === 'concept-04'"
      class="secondary-nav"
      aria-label="Explore collection"
    >
      <NuxtLink v-for="name in links" :key="name" :to="link(name)">{{ name }}</NuxtLink>
    </nav>
    <nav v-if="menu" class="mega-menu" aria-label="Shop menu">
      <NuxtLink v-for="name in links" :key="name" :to="link(name)"
        >{{ name }}<AppIcon name="right" /></NuxtLink
      ><button
        @click="
          ($event) => {
            panel = 'stores'
            menu = false
          }
        "
      >
        Find a store<AppIcon name="pin" /></button
      ><button
        @click="
          ($event) => {
            panel = 'account'
            menu = false
          }
        "
      >
        My account<AppIcon name="user" />
      </button>
    </nav>
  </header>
</template>
