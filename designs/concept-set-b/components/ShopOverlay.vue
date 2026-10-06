<script setup lang="ts">
import { products, formatPrice } from '~/data/products'
const { base } = useConcept()
const { shop, panel, count, total, selectedStory, toast } = useShop()
const dialog = ref<HTMLDialogElement>(),
  query = ref(''),
  searchInput = ref<HTMLInputElement>(),
  accountName = ref(''),
  accountEmail = ref(''),
  region = ref('Samut Sakhon'),
  placed = ref(false),
  sizeGroup = ref('Adults')
const title = computed(
  () =>
    ({
      search: 'Find your next favourite.',
      wishlist: 'Your saved pairs',
      cart: `Your bag (${count.value})`,
      account: 'A little more GAMBOL',
      stores: 'Find your nearest GAMBOL',
      checkout: 'Your demo order',
      size: 'Find your size',
      story: selectedStory.value,
    })[panel.value || 'search']
)
const delivery = computed(() => (total.value >= 599 || total.value === 0 ? 0 : 40))
const matches = computed(() => {
  const q = query.value.trim().toLowerCase()
  return products
    .filter(
      (p) =>
        !q ||
        [p.name, p.category, p.collection, p.technology, p.gender.join(' ')].some((x) =>
          x.toLowerCase().includes(q)
        )
    )
    .slice(0, 5)
})
const resultCategories = computed(() =>
  ['Slides', 'Flip-flops', 'Sandals', 'Sneakers', 'Men', 'Women', 'Kids'].filter(
    (x) => !query.value || x.toLowerCase().includes(query.value.toLowerCase())
  )
)
const resultCollections = computed(() =>
  ['Everyday Ease', 'City Motion', 'Open Air', 'Little Steps'].filter(
    (x) =>
      !query.value ||
      x.toLowerCase().includes(query.value.toLowerCase()) ||
      matches.value.some((p) => p.collection === x)
  )
)
const stories = ['The everyday slide guide', 'A weekend without a clock', 'Meet GBOLD comfort']
const matchingStories = computed(() =>
  stories.filter((x) => !query.value || x.toLowerCase().includes(query.value.toLowerCase()))
)
const cartRows = computed(() =>
  shop.value.cart
    .map((item, index) => ({
      item,
      index,
      product: products.find((p) => p.id === item.productId)!,
    }))
    .filter((x) => x.product)
)
const favoriteProducts = computed(() => products.filter((p) => shop.value.wishlist.includes(p.id)))
watch(panel, async (value) => {
  await nextTick()
  if (value !== panel.value) return
  if (value) {
    placed.value = false
    if (!dialog.value?.open) dialog.value?.showModal()
    document.body.style.overflow = 'hidden'
    if (value === 'search') searchInput.value?.focus()
  } else {
    dialog.value?.close()
    document.body.style.overflow = ''
  }
})
function close() {
  panel.value = null
}
function backdrop(e: MouseEvent) {
  if (e.target === dialog.value) {
    const r = dialog.value.getBoundingClientRect()
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)
      close()
  }
}
function quantity(index: number, delta: number) {
  const item = shop.value.cart[index]
  if (!item) return
  item.quantity += delta
  if (item.quantity <= 0) shop.value.cart.splice(index, 1)
}
function saveAccount() {
  shop.value.name = accountName.value.trim()
  shop.value.email = accountEmail.value
  toast('Your demo profile is saved on this device')
}
function placeOrder() {
  placed.value = true
  shop.value.cart = []
}
function keyboard(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    panel.value = panel.value === 'search' ? null : 'search'
  }
}
onMounted(() => window.addEventListener('keydown', keyboard))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', keyboard)
  document.body.style.overflow = ''
})
</script>
<template>
  <dialog
    ref="dialog"
    :class="['shop-dialog', { 'search-dialog': panel === 'search' }]"
    aria-labelledby="dialog-title"
    @cancel.prevent="close"
    @click="backdrop"
  >
    <div class="dialog-header">
      <h2 id="dialog-title">{{ title }}</h2>
      <button class="icon-button" aria-label="Close dialog" @click="close">
        <AppIcon name="close" />
      </button>
    </div>
    <div class="dialog-content">
      <template v-if="panel === 'search'"
        ><div class="search-input-wrap">
          <AppIcon name="search" :size="25" /><input
            ref="searchInput"
            v-model="query"
            placeholder="Try “slide”"
            aria-label="Search products, categories, collections and articles"
          /><button v-if="query" class="icon-button" aria-label="Clear search" @click="query = ''">
            <AppIcon name="close" :size="16" />
          </button>
        </div>
        <div v-if="!query" class="suggested-searches">
          <button
            v-for="word in ['Slide', 'Everyday', 'Kids', 'GBOLD']"
            :key="word"
            @click="query = word"
          >
            {{ word }}
          </button>
        </div>
        <div class="search-layout">
          <div>
            <span class="search-label">PRODUCTS · {{ matches.length }}</span
            ><NuxtLink
              v-for="p in matches"
              :key="p.id"
              :to="base + '/product/' + p.id"
              class="search-product"
              @click="close"
              ><img :src="p.image" :alt="p.name" width="100" height="100" />
              <div>
                <h3>{{ p.name }}</h3>
                <p>{{ p.category }} · {{ p.collection }}</p>
                <strong>{{ formatPrice(p.price) }}</strong>
              </div></NuxtLink
            >
            <p v-if="!matches.length" class="no-search-results">
              No pairs found for “{{ query }}”. Try slides, kids, or everyday.
            </p>
            <NuxtLink
              :to="base + '/products?q=' + encodeURIComponent(query)"
              class="text-link"
              @click="close"
              >See all search results<AppIcon name="right" :size="16"
            /></NuxtLink>
          </div>
          <div class="search-groups">
            <div>
              <span class="search-label">CATEGORIES</span
              ><NuxtLink
                v-for="cat in resultCategories"
                :key="cat"
                :to="base + '/products?category=' + cat"
                @click="close"
                >{{ cat }}<AppIcon name="next" :size="14"
              /></NuxtLink>
              <p v-if="!resultCategories.length" class="no-search-results">
                No matching categories.
              </p>
            </div>
            <div>
              <span class="search-label">COLLECTIONS</span
              ><NuxtLink
                v-for="c in resultCollections"
                :key="c"
                :to="base + '/products?collection=' + c"
                @click="close"
                >{{ c }}<AppIcon name="next" :size="14"
              /></NuxtLink>
              <p v-if="!resultCollections.length" class="no-search-results">
                No matching collections.
              </p>
            </div>
            <div>
              <span class="search-label">ARTICLES</span
              ><button
                v-for="s in matchingStories"
                :key="s"
                @click="
                  ($event) => {
                    selectedStory = s
                    panel = 'story'
                  }
                "
              >
                {{ s }}<AppIcon name="arrow" :size="14" />
              </button>
              <p v-if="!matchingStories.length" class="no-search-results">No matching stories.</p>
            </div>
          </div>
        </div></template
      >
      <template v-else-if="panel === 'cart'"
        ><template v-if="cartRows.length"
          ><div
            v-for="{ item, product, index } in cartRows"
            :key="product.id + item.color + item.size"
            class="cart-item"
          >
            <img
              :src="product.colors.find((c) => c.name === item.color)?.image || product.image"
              :alt="product.name"
              width="150"
              height="150"
            />
            <div>
              <h3>{{ product.name }}</h3>
              <p>{{ item.color }} · EU {{ item.size }}</p>
              <div class="quantity-control">
                <button
                  :aria-label="'Decrease quantity of ' + product.name"
                  @click="quantity(index, -1)"
                >
                  <AppIcon name="minus" :size="12" /></button
                ><span>{{ item.quantity }}</span
                ><button
                  :aria-label="'Increase quantity of ' + product.name"
                  @click="quantity(index, 1)"
                >
                  <AppIcon name="plus" :size="12" />
                </button>
              </div>
              <button class="remove-item" @click="shop.cart.splice(index, 1)">
                Remove {{ product.name }}
              </button>
            </div>
            <strong>{{ formatPrice(product.price * item.quantity) }}</strong>
          </div>
          <div class="cart-summary">
            <p>
              {{
                total >= 599
                  ? 'Your order qualifies for free delivery.'
                  : `You’re ${formatPrice(599 - total)} away from free delivery.`
              }}
            </p>
            <div class="free-delivery-progress">
              <span :style="{ width: Math.min((total / 599) * 100, 100) + '%' }"></span>
            </div>
            <div>
              <span>Subtotal</span><strong>{{ formatPrice(total) }}</strong>
            </div>
            <div>
              <span>Delivery</span
              ><span>{{ delivery === 0 ? 'Free' : formatPrice(delivery) }}</span>
            </div>
            <button class="button button-dark" @click="panel = 'checkout'">
              Continue to checkout<AppIcon name="right" :size="18" /></button
            ><button class="button button-outline" @click="close">Keep exploring</button
            ><span class="demo-note"
              >Prototype shopping bag. Checkout is a local demonstration; no payment will be
              collected.</span
            >
          </div></template
        >
        <div v-else class="empty-state">
          <AppIcon name="bag" :size="45" />
          <h2>Your next favourite is out there.</h2>
          <p>Your bag is empty. Let’s find a little everyday comfort.</p>
          <NuxtLink :to="base + '/products'" class="button button-dark" @click="close"
            >Explore the collection<AppIcon name="right"
          /></NuxtLink></div
      ></template>
      <template v-else-if="panel === 'wishlist'"
        ><div v-if="favoriteProducts.length" class="wishlist-grid">
          <ProductCard v-for="p in favoriteProducts" :key="p.id" :product="p" />
        </div>
        <div v-else class="empty-state">
          <AppIcon name="heart" :size="45" />
          <h2>Keep your favourites close.</h2>
          <p>Tap the heart on any pair to save it here for later.</p>
          <NuxtLink :to="base + '/products'" class="button button-dark" @click="close"
            >Find your favourites</NuxtLink
          >
        </div></template
      >
      <template v-else-if="panel === 'account'"
        ><div v-if="shop.name" class="account-profile">
          <AppIcon name="user" :size="45" />
          <h3>Hello, {{ shop.name }}.</h3>
          <p>
            {{ shop.email }}<br />{{ shop.wishlist.length }} saved pairs · {{ count }} items in your
            bag
          </p>
          <button class="button button-dark" @click="panel = 'wishlist'">
            See your saved pairs</button
          ><button
            class="button"
            @click="
              ($event) => {
                shop.name = ''
                shop.email = ''
              }
            "
          >
            Clear demo profile</button
          ><span class="demo-note"
            >This profile is saved only in this browser. No account has been created on a
            server.</span
          >
        </div>
        <template v-else
          ><p class="account-intro">
            Make yourself at home. Save a demo profile to personalise this prototype.
          </p>
          <form class="account-form" @submit.prevent="saveAccount">
            <label class="form-label"
              >Your name<input
                v-model="accountName"
                autocomplete="given-name"
                required
                maxlength="60"
                placeholder="What should we call you?" /></label
            ><label class="form-label"
              >Email address<input
                v-model="accountEmail"
                type="email"
                autocomplete="email"
                required
                placeholder="you@example.com" /></label
            ><button class="button button-dark" type="submit">Save demo profile</button>
          </form>
          <span class="demo-note"
            >Local demo only. No sign-in, password, or remote account is created.</span
          ></template
        ></template
      >
      <template v-else-if="panel === 'stores'"
        ><p class="account-intro">Feel the fit in person. Select an area to find GAMBOL nearby.</p>
        <label class="form-label"
          >Area<select v-model="region">
            <option>Samut Sakhon</option>
            <option>Bangkok</option>
            <option>Chiang Mai</option>
            <option>Phuket</option>
          </select></label
        >
        <div class="store-map">
          <img src="/images/city.jpg" alt="Bangkok city streets" width="700" height="350" />
          <div><AppIcon name="pin" />{{ region }}</div>
        </div>
        <div v-if="region === 'Samut Sakhon'" class="store-result">
          <h3>GAMBOL Head Office</h3>
          <p>
            116/58 Moo 1, Rama II Road<br />Bang Nam Chuet, Mueang Samut Sakhon 74000<br />Call
            ahead for visitor and product availability.
          </p>
          <a href="tel:+6624085074" class="text-link">02-408-5074</a><br /><a
            href="https://www.google.com/maps/search/?api=1&query=Gambol+116%2F58+Samut+Sakhon"
            target="_blank"
            rel="noopener"
            class="text-link"
            >Open directions<AppIcon name="arrow" :size="16"
          /></a>
        </div>
        <div v-else class="store-result">
          <h3>Find GAMBOL in {{ region }}</h3>
          <p>
            Check the official store directory for current stockists and opening hours in this area.
          </p>
          <a
            href="https://www.gambol.co.th/find-our-store/"
            target="_blank"
            rel="noopener"
            class="text-link"
            >Open official store directory<AppIcon name="arrow" :size="16"
          /></a>
        </div>
        <span class="demo-note"
          >Locations are not connected to live store inventory.</span
        ></template
      >
      <template v-else-if="panel === 'size'"
        ><p class="account-intro">
          Measure from your heel to your longest toe. Leave a little room to move.
        </p>
        <label class="form-label"
          >Size range<select v-model="sizeGroup">
            <option>Adults</option>
            <option>Kids</option>
          </select></label
        >
        <table class="size-table">
          <caption class="sr-only">
            Illustrative European shoe sizes and foot lengths
          </caption>
          <thead>
            <tr>
              <th>EU size</th>
              <th>Foot length (cm)</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="size in sizeGroup === 'Adults'
                ? [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
                : [28, 29, 30, 31, 32, 33, 34, 35]"
              :key="size"
            >
              <td>{{ size }}</td>
              <td>{{ (size * 0.667 - 1.5).toFixed(1) }}</td>
            </tr>
          </tbody>
        </table>
        <span class="demo-note"
          >Illustrative sizing for this prototype. Confirm the final product-specific size chart
          before ordering.</span
        ></template
      >
      <template v-else-if="panel === 'checkout'"
        ><div v-if="placed" class="checkout-success">
          <AppIcon name="success" :size="52" />
          <h3>You’re all set<br />for a softer everyday.</h3>
          <p>Your demo order is complete. No payment was taken and no order was sent.</p>
          <button class="button button-dark" @click="close">Keep exploring</button>
        </div>
        <template v-else-if="count"
          ><div class="checkout-summary">
            <div>
              <span>{{ count }} {{ count === 1 ? 'pair' : 'pairs' }}</span
              ><strong>{{ formatPrice(total) }}</strong>
            </div>
            <div>
              <span>Delivery</span><span>{{ delivery ? formatPrice(delivery) : 'Free' }}</span>
            </div>
            <div>
              <strong>Total</strong><strong>{{ formatPrice(total + delivery) }}</strong>
            </div>
          </div>
          <p class="account-intro">
            Preview the order flow with sample details. No payment or real order is created.
          </p>
          <form class="checkout-form" @submit.prevent="placeOrder">
            <label class="form-label"
              >Name<input required placeholder="Demo customer" autocomplete="off" /></label
            ><label class="form-label"
              >Email<input
                type="email"
                required
                placeholder="demo@example.com"
                autocomplete="off" /></label
            ><label class="form-label"
              >Delivery address<textarea
                required
                placeholder="Use a sample address for this demo"
                rows="3"
              ></textarea></label
            ><button class="button button-dark" type="submit">
              Place demo order<AppIcon name="check" :size="18" />
            </button></form
        ></template>
        <div v-else class="empty-state">
          <p>Your bag is empty.</p>
          <button class="button button-dark" @click="panel = 'cart'">Return to bag</button>
        </div></template
      >
      <template v-else-if="panel === 'story'"
        ><img
          src="/images/product-4.png"
          :alt="selectedStory"
          width="900"
          height="600"
          class="story-dialog-photo" />
        <p class="story-dialog-body">
          A morning coffee by the river. A detour down a lane you’ve never noticed. An afternoon
          that stretches a little longer than you planned. Some of the best moments happen when you
          leave room for them.
        </p>
        <p class="story-dialog-body">
          In Thailand, the everyday is full of small discoveries. We believe your favourite pair
          should make it easier to enjoy them: soft underfoot, light in your bag, and ready when you
          are.
        </p>
        <p class="story-dialog-body" lang="th">
          เพราะทุกก้าวมีเรื่องราว เลือกรองเท้าคู่ที่สบาย แล้วออกไปใช้ชีวิตในแบบที่เป็นคุณ
        </p>
        <NuxtLink
          :to="base + '/products?occasion=Everyday'"
          class="button button-dark"
          @click="close"
          >Shop the everyday edit<AppIcon name="arrow" :size="18" /></NuxtLink
      ></template>
    </div>
  </dialog>
</template>
