<script setup lang="ts">
const ui = useUiStore()
const shop = useShopStore()
const route = useRoute()
const { products, stories, findProduct } = useCatalog()
const dialog = ref<HTMLDialogElement>()
const query = ref('')
const email = ref('')
const accountSaved = ref(false)
const stage = ref<'bag' | 'review'>('bag')
const quickImage = ref('')
const product = computed(() => findProduct(ui.productId))
const q = computed(() => query.value.toLowerCase().trim())
const results = computed(() =>
  products
    .filter(
      (p) =>
        !q.value ||
        `gambol แกมโบล รองเท้า ${p.name} ${p.code} ${p.type} ${p.collection} ${p.gender.join(' ')}`
          .toLowerCase()
          .includes(q.value)
    )
    .slice(0, 6)
)
const collections = computed(() =>
  [...new Set(products.map((p) => p.collection))].filter(
    (c) => !q.value || q.value === 'gambol' || c.toLowerCase().includes(q.value)
  )
)
const categories = computed(() =>
  ['Men', 'Women', 'Kids', 'Sneakers'].filter(
    (c) => !q.value || q.value === 'gambol' || c.toLowerCase().includes(q.value)
  )
)
const storyResults = computed(() =>
  stories
    .filter(
      (s) =>
        !q.value ||
        q.value === 'gambol' ||
        `${s.title} ${s.excerpt} ${s.category}`.toLowerCase().includes(q.value)
    )
    .slice(0, 3)
)
const title = computed(
  () =>
    ({
      search: 'FIND YOUR NEXT FAVOURITE.',
      cart: stage.value === 'review' ? 'YOUR ORDER PREVIEW.' : 'YOUR BAG.',
      wishlist: 'YOUR SAVED PAIRS.',
      quick: 'TAKE A CLOSER LOOK.',
      account: 'GOOD TO SEE YOU.',
      menu: 'WHERE TO NEXT?',
    })[ui.modal || 'search']
)
function close() {
  ui.modal = null
}
watch(
  () => ui.modal,
  async (value) => {
    await nextTick()
    if (value) {
      if (!dialog.value?.open) dialog.value?.showModal()
      if (value === 'quick') quickImage.value = product.value?.image || ''
      if (value === 'cart') stage.value = 'bag'
      if (value === 'search') query.value = ''
      await nextTick()
      dialog.value?.querySelector<HTMLElement>('[autofocus]')?.focus()
    } else dialog.value?.close()
  }
)
watch(() => route.fullPath, close)
onBeforeUnmount(() => dialog.value?.close())
function saveAccount() {
  try {
    localStorage.setItem('gambol-reef-account-email', email.value)
  } catch {}
  accountSaved.value = true
}
function submitSearch() {
  navigateTo(`/products?q=${encodeURIComponent(query.value)}`)
  close()
}
</script>
<template>
  <dialog
    ref="dialog"
    class="commerce-dialog"
    :class="[
      `dialog-${ui.modal}`,
      { 'drawer-dialog': ['cart', 'wishlist', 'menu', 'account'].includes(ui.modal || '') },
    ]"
    aria-labelledby="commerce-title"
    @cancel="close"
    @close="close"
    @click="$event.target === dialog && close()"
  >
    <div class="dialog-inner">
      <div class="dialog-heading">
        <h2 id="commerce-title">{{ title }}</h2>
        <button class="icon-button" aria-label="Close dialog" @click="close">
          <AppIcon name="close" />
        </button>
      </div>
      <template v-if="ui.modal === 'search'"
        ><form
          class="search-field"
          @submit.prevent="submitSearch"
        >
          <AppIcon name="search" :size="27" /><label for="search-query" class="sr-only"
            >Search products, collections, categories and stories</label
          ><input
            id="search-query"
            v-model="query"
            autofocus
            placeholder="Try ‘Gambol’, slides, or your next adventure…"
            autocomplete="off"
          /><button
            v-if="query"
            type="button"
            class="icon-button"
            aria-label="Clear search"
            @click="query = ''"
          >
            <AppIcon name="close" :size="18" />
          </button>
        </form>
        <div class="search-layout">
          <section>
            <div class="search-section-heading">
              <h3>{{ q ? 'PRODUCTS' : 'POPULAR PAIRS' }}</h3>
              <span aria-live="polite">{{ results.length }} matches</span>
            </div>
            <div class="search-products">
              <NuxtLink
                v-for="p in results"
                :key="p.id"
                :to="`/product/${p.id}`"
                class="search-result"
                @click="close"
                ><img :src="p.image" :alt="p.name" width="150" height="130" />
                <div>
                  <h4>{{ p.name }}</h4>
                  <p>{{ p.type }} · {{ p.colors.length }} colors</p>
                  <strong>{{ formatPrice(p.price) }}</strong>
                </div>
                <AppIcon name="arrow" :size="18"
              /></NuxtLink>
            </div>
            <div v-if="!results.length" class="empty-state">
              <h3>No pairs found yet.</h3>
              <p>Try a style such as “slides”, a collection, or a shorter search.</p>
              <button class="text-link" @click="query = ''">
                SHOW POPULAR PAIRS<AppIcon name="arrow" :size="17" />
              </button>
            </div>
          </section>
          <aside class="search-suggestions">
            <div>
              <h3>COLLECTIONS</h3>
              <NuxtLink
                v-for="c in collections"
                :key="c"
                :to="`/products?collection=${encodeURIComponent(c)}`"
                >{{ c }}<AppIcon name="upRight" :size="16"
              /></NuxtLink>
              <p v-if="!collections.length">No matching collections</p>
            </div>
            <div>
              <h3>CATEGORIES</h3>
              <NuxtLink
                v-for="c in categories"
                :key="c"
                :to="`/products?${c === 'Sneakers' ? 'type' : 'gender'}=${c}`"
                >{{ c }}<AppIcon name="upRight" :size="16"
              /></NuxtLink>
              <p v-if="!categories.length">No matching categories</p>
            </div>
            <div>
              <h3>STORIES</h3>
              <NuxtLink v-for="s in storyResults" :key="s.id" :to="`/stories/${s.id}`">{{
                s.title
              }}</NuxtLink>
              <p v-if="!storyResults.length">No matching stories</p>
            </div>
          </aside>
        </div></template
      >
      <template v-if="ui.modal === 'quick' && product"
        ><div class="quick-layout">
          <div class="quick-image">
            <img :src="quickImage" :alt="product.name" width="700" height="750" />
          </div>
          <PurchasePanel :product="product" quick @color="quickImage = $event" /></div
      ></template>
      <template v-if="ui.modal === 'wishlist'"
        ><p class="dialog-intro">The pairs you keep coming back to.</p>
        <div v-if="shop.wishlist.length" class="wishlist-grid">
          <ProductCard
            v-for="p in products.filter((p) => shop.wishlist.includes(p.id))"
            :key="p.id"
            :product="p"
          />
        </div>
        <div v-else class="empty-state">
          <AppIcon name="heart" :size="44" />
          <h3>A little room for favourites.</h3>
          <p>Tap the heart on a pair you love. We’ll keep it here for you.</p>
          <NuxtLink to="/products" class="button primary" @click="close"
            >FIND YOUR PAIR<AppIcon name="arrow" :size="18"
          /></NuxtLink></div
      ></template>
      <template v-if="ui.modal === 'cart'"
        ><p v-if="stage === 'review'" class="preview-notice">
          This is a local order preview. No payment has been taken and no order has been sent.
        </p>
        <template v-if="shop.count"
          ><p class="dialog-intro">
            {{ shop.count }} {{ shop.count === 1 ? 'good reason' : 'good reasons' }} to get out
            there.
          </p>
          <div class="bag-items">
            <article v-for="item in shop.detailed" :key="item.key" class="bag-item">
              <img
                :src="
                  item.product.colors.find((c) => c.name === item.color)?.image ||
                  item.product.image
                "
                :alt="item.product.name"
                width="140"
                height="140"
              />
              <div>
                <NuxtLink :to="`/product/${item.product.id}`"
                  ><h3>{{ item.product.name }}</h3></NuxtLink
                >
                <p>{{ item.color }} · EU {{ item.size }}</p>
                <div v-if="stage === 'bag'" class="quantity-control">
                  <button
                    :disabled="item.quantity === 1"
                    :aria-label="`Decrease ${item.product.name} quantity`"
                    @click="shop.quantity(item.key, item.quantity - 1)"
                  >
                    <AppIcon name="minus" :size="14" /></button
                  ><span>{{ item.quantity }}</span
                  ><button
                    :disabled="item.quantity === 10"
                    :aria-label="`Increase ${item.product.name} quantity`"
                    @click="shop.quantity(item.key, item.quantity + 1)"
                  >
                    <AppIcon name="plus" :size="14" />
                  </button>
                </div>
                <span v-else>Quantity: {{ item.quantity }}</span>
              </div>
              <div class="bag-item-price">
                <strong>{{ formatPrice(item.product.price * item.quantity) }}</strong
                ><button
                  v-if="stage === 'bag'"
                  class="icon-button"
                  :aria-label="`Remove ${item.product.name} from bag`"
                  @click="shop.remove(item.key)"
                >
                  <AppIcon name="trash" :size="17" />
                </button>
              </div>
            </article>
          </div>
          <div class="bag-summary">
            <div>
              <span>Subtotal</span><strong>{{ formatPrice(shop.subtotal) }}</strong>
            </div>
            <p>Shipping and any applicable charges would be calculated by a live checkout.</p>
            <button v-if="stage === 'bag'" class="button primary" @click="stage = 'review'">
              REVIEW ORDER PREVIEW<AppIcon name="arrow" :size="19" /></button
            ><button v-else class="button secondary" @click="stage = 'bag'">
              BACK TO YOUR BAG<AppIcon name="left" :size="19" /></button
            ><button class="text-link" @click="close">KEEP EXPLORING</button>
          </div></template
        >
        <div v-else class="empty-state">
          <AppIcon name="bag" :size="44" />
          <h3>Your next good day starts here.</h3>
          <p>Find a pair that feels like you.</p>
          <NuxtLink to="/products" class="button primary" @click="close"
            >EXPLORE THE COLLECTION<AppIcon name="arrow" :size="18"
          /></NuxtLink></div
      ></template>
      <template v-if="ui.modal === 'account'"
        ><p class="dialog-intro">Make a little space for your favourites.</p>
        <form v-if="!accountSaved" class="account-form" @submit.prevent="saveAccount">
          <p>
            This concept remembers your email on this device. A connected account service would
            handle sign-in and order history.
          </p>
          <label for="account-email">Email address</label
          ><input
            id="account-email"
            v-model="email"
            autofocus
            type="email"
            required
            autocomplete="email"
            placeholder="you@example.com"
          /><button class="button primary">SAVE MY EMAIL<AppIcon name="arrow" :size="18" /></button>
        </form>
        <div v-else class="empty-state" role="status">
          <AppIcon name="check" :size="40" />
          <h3>You're all set for this preview.</h3>
          <p>{{ email }} has been saved on this device. No sign-in email was sent.</p>
          <button class="button secondary" @click="ui.open('wishlist')">
            VIEW SAVED PAIRS<AppIcon name="heart" :size="18" />
          </button></div
      ></template>
      <template v-if="ui.modal === 'menu'"
        ><nav class="mobile-menu-links" aria-label="Shop menu">
          <NuxtLink
            v-for="c in ['Men', 'Women', 'Kids', 'Sneakers']"
            :key="c"
            :to="`/products?${c === 'Sneakers' ? 'type' : 'gender'}=${c}`"
            >{{ c.toUpperCase() }}<AppIcon name="upRight" /></NuxtLink
          ><NuxtLink to="/products?new=true">New arrivals<AppIcon name="arrow" /></NuxtLink
          ><NuxtLink to="/technology">GBOLD Technology<AppIcon name="arrow" /></NuxtLink
          ><NuxtLink to="/stories">Stories & style<AppIcon name="arrow" /></NuxtLink
          ><NuxtLink to="/stores">Find a store<AppIcon name="pin" /></NuxtLink
          ><button @click="ui.open('account')">Your account<AppIcon name="user" /></button>
        </nav>
        <img
          class="menu-photo"
          src="/images/coast-mobile.webp"
          alt="An easy weekend by the coast"
          width="800"
          height="533"
      /></template>
    </div>
  </dialog>
</template>
