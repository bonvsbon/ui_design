<script setup lang="ts">
/**
 * Mobile bottom navigation: Home · Shop · Search · Wishlist · Cart.
 * One accessible structure; `variant` changes its physical form per concept.
 */
const props = withDefaults(defineProps<{ variant?: 'bar' | 'float' | 'paper' | 'tabs' | 'lab' }>(), { variant: 'bar' })
const { link } = useConcept()
const route = useRoute()
const cart = useCart()
const wish = useWishlist()
const { searchOpen } = useUi()

const items = computed(() => [
  { key: 'home', label: 'หน้าแรก', icon: 'home', to: link('/') },
  { key: 'shop', label: 'ช้อป', icon: 'grid', to: link('/products') },
  { key: 'search', label: 'ค้นหา', icon: 'search' },
  { key: 'wish', label: 'รายการโปรด', icon: 'heart', to: link('/products?wishlist=1'), badge: wish.count.value },
  { key: 'cart', label: 'ตะกร้า', icon: 'bag', badge: cart.count.value },
])
function isActive(key: string) {
  if (key === 'home') return /^\/concept-0\d\/?$/.test(route.path)
  if (key === 'shop') return route.path.includes('/products') || route.path.includes('/product/')
  if (key === 'search') return searchOpen.value
  if (key === 'cart') return cart.open.value
  return false
}
function onTap(key: string) {
  if (key === 'search') searchOpen.value = true
  if (key === 'cart') cart.open.value = true
}

function itemClass(key: string) {
  return [
    'relative flex flex-col items-center justify-center gap-1 text-[11px] leading-none',
    isActive(key) ? (props.variant === 'float' ? 'text-accent' : 'text-ink font-semibold') : (props.variant === 'float' ? 'opacity-70' : 'text-muted'),
    props.variant === 'lab' && 'uppercase tracking-wider text-[10px]',
  ]
}
const shell = computed(() => ({
  bar: 'inset-x-0 bottom-0 border-t border-line bg-bg',
  float: 'inset-x-3 bottom-3 rounded-[999px] bg-ink text-bg shadow-pop',
  paper: 'inset-x-0 bottom-0 border-t border-line bg-surface',
  tabs: 'inset-x-0 bottom-0 border-t border-line bg-white',
  lab: 'inset-x-0 bottom-0 border-t border-line bg-bg font-mono',
}[props.variant]))
</script>

<template>
  <nav aria-label="เมนูหลักบนมือถือ" :class="['fixed z-40 lg:hidden', shell]" :style="variant === 'float' ? '' : 'padding-bottom: env(safe-area-inset-bottom)'">
    <ul class="grid h-tabbar grid-cols-5">
      <li v-for="it in items" :key="it.key" class="contents">
        <NuxtLink v-if="it.to" :to="it.to" :class="itemClass(it.key)" :aria-current="isActive(it.key) ? 'page' : undefined">
          <span class="relative">
            <AppIcon :name="it.icon" :size="22" />
            <span v-if="it.badge" class="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-ink">{{ it.badge }}</span>
          </span>
          <span>{{ it.label }}</span>
          <span v-if="variant === 'tabs' && isActive(it.key)" class="absolute inset-x-5 top-0 h-0.5 rounded bg-accent" />
        </NuxtLink>
        <button v-else type="button" :class="itemClass(it.key)" :aria-label="it.badge ? `${it.label} ${it.badge}` : undefined" @click="onTap(it.key)">
          <span class="relative">
            <AppIcon :name="it.icon" :size="22" />
            <span v-if="it.badge" class="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-ink">{{ it.badge }}</span>
          </span>
          <span>{{ it.label }}</span>
          <span v-if="variant === 'tabs' && isActive(it.key)" class="absolute inset-x-5 top-0 h-0.5 rounded bg-accent" />
        </button>
      </li>
    </ul>
  </nav>
</template>
