<script setup lang="ts">
import type { Product } from '~/types'
const props = defineProps<{ product: Product; quick?: boolean }>()
const emit = defineEmits<{ color: [image: string] }>()
const shop = useShopStore()
const ui = useUiStore()
const selectedColor = ref(0)
const size = ref<number>()
const error = ref(false)
const current = computed(() => props.product.colors[selectedColor.value]!)
watch(
  () => props.product.id,
  () => {
    selectedColor.value = 0
    size.value = undefined
    error.value = false
  }
)
function changeColor(i: number) {
  selectedColor.value = i
  emit('color', current.value.image)
}
function add(buy = false) {
  if (!size.value) {
    error.value = true
    return
  }
  shop.add(props.product.id, current.value.name, size.value)
  ui.open('cart')
  if (buy) ui.notify('Your pair is ready. Review your bag to continue.')
  else ui.notify(`${props.product.name} added to your bag`)
}
function chooseSize(value: number) {
  size.value = value
  error.value = false
}
</script>
<template>
  <div class="purchase-panel">
    <p class="product-collection">{{ product.collection }} · {{ product.code }}</p>
    <component :is="quick ? 'h3' : 'h1'" class="purchase-title">{{ product.name }}</component>
    <p class="purchase-category">{{ product.gender.join(' / ') }} · {{ product.type }}</p>
    <div class="purchase-price">{{ formatPrice(product.price) }}<span>THB</span></div>
    <p class="purchase-description">{{ product.description }}</p>
    <fieldset class="color-picker">
      <legend>
        Color <span>· {{ current.name }}</span>
      </legend>
      <div class="color-row">
        <button
          v-for="(color, index) in product.colors"
          :key="color.name"
          class="swatch large"
          :class="{ selected: selectedColor === index }"
          :style="{ '--swatch': color.value }"
          :aria-label="color.name"
          :aria-pressed="selectedColor === index"
          @click="changeColor(index)"
        >
          <span />
        </button>
      </div>
    </fieldset>
    <fieldset class="size-picker" :aria-describedby="error ? 'size-error' : undefined">
      <legend>Choose your size <span>EU</span></legend>
      <div class="size-grid">
        <button
          v-for="n in product.sizes"
          :key="n"
          :disabled="product.unavailableSizes.includes(n)"
          :aria-label="`Size ${n}${product.unavailableSizes.includes(n) ? ', unavailable' : ''}`"
          :aria-pressed="size === n"
          :class="{ selected: size === n }"
          @click="chooseSize(n)"
        >
          {{ n }}
        </button>
      </div>
      <p v-if="error" id="size-error" class="form-error" role="alert">
        Choose a size before adding your pair.
      </p>
    </fieldset>
    <details class="size-guide">
      <summary>Size guide <AppIcon name="plus" :size="15" /></summary>
      <p>
        Measure from heel to longest toe. This concept chart is an approximate guide; try your pair
        for the best fit.
      </p>
      <table>
        <caption class="sr-only">
          Illustrative EU size to foot length guide
        </caption>
        <thead>
          <tr>
            <th scope="col">EU size</th>
            <th scope="col">Foot length</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in product.sizes" :key="n">
            <th scope="row">{{ n }}</th>
            <td>{{ ((n * 2) / 3 - 1.5).toFixed(1) }} cm</td>
          </tr>
        </tbody>
      </table>
    </details>
    <p class="availability">
      <span />{{
        size ? `Size ${size} available in this preview` : 'Select a size to find your fit'
      }}
    </p>
    <div class="purchase-actions">
      <button class="button primary" @click="add()">
        ADD TO BAG<AppIcon name="bag" :size="19" /></button
      ><button
        class="icon-button save-product"
        :aria-label="`${shop.wishlist.includes(product.id) ? 'Remove from' : 'Add to'} wishlist`"
        :aria-pressed="shop.wishlist.includes(product.id)"
        @click="shop.toggle(product.id)"
      >
        <AppIcon name="heart" />
      </button>
    </div>
    <button v-if="!quick" class="button secondary buy-now" @click="add(true)">
      BUY NOW<AppIcon name="arrow" :size="18" />
    </button>
    <div class="purchase-service">
      <NuxtLink to="/stores"
        ><AppIcon name="pin" :size="17" />Try your pair in store<AppIcon
          name="right"
          :size="15" /></NuxtLink
      ><NuxtLink to="/support#shipping"
        ><AppIcon name="truck" :size="17" />Shipping & returns information<AppIcon
          name="right"
          :size="15"
      /></NuxtLink>
    </div>
    <NuxtLink v-if="quick" :to="`/product/${product.id}`" class="text-link" @click="ui.modal = null"
      >VIEW FULL DETAILS<AppIcon name="arrow" :size="18"
    /></NuxtLink>
  </div>
</template>
