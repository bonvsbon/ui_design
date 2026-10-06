<script setup lang="ts">
import { footwearTypes } from '~/data/site'
export interface Filters {
  gender: string
  type: string
  size: string
  color: string
  maxPrice: number
  technology: string
  collection: string
  lifestyle: string
  new: boolean
  best: boolean
  kidsGroup: string
  q: string
}
const radioName = useId()
const props = defineProps<{ modelValue: Filters }>()
const emit = defineEmits<{ 'update:modelValue': [value: Filters] }>()
const { products } = useCatalog()
const colors = [...new Set(products.flatMap((p) => p.colors.map((c) => c.name)))]
const collections = [...new Set(products.map((p) => p.collection))]
function update(key: keyof Filters, value: unknown) {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}
</script>
<template>
  <div class="catalog-filters">
    <fieldset>
      <legend>Shop for</legend>
      <label v-for="g in ['All', 'Men', 'Women', 'Kids']" :key="g" class="check-label"
        ><input
          type="radio"
          :name="radioName"
          :checked="modelValue.gender === (g === 'All' ? '' : g)"
          @change="update('gender', g === 'All' ? '' : g)"
        /><span>{{ g }}</span></label
      >
    </fieldset>
    <fieldset>
      <legend>Footwear type</legend>
      <label v-for="type in footwearTypes" :key="type" class="check-label"
        ><input
          type="checkbox"
          :checked="modelValue.type === type"
          @change="update('type', modelValue.type === type ? '' : type)"
        /><span>{{ type }}</span></label
      >
    </fieldset>
    <fieldset>
      <legend>Size (EU)</legend>
      <div class="filter-sizes">
        <button
          v-for="s in [28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45]"
          :key="s"
          :class="{ selected: modelValue.size === String(s) }"
          :aria-label="`Filter size ${s}`"
          :aria-pressed="modelValue.size === String(s)"
          @click="update('size', modelValue.size === String(s) ? '' : String(s))"
        >
          {{ s }}
        </button>
      </div>
    </fieldset>
    <label class="filter-select"
      >Color<select
        :value="modelValue.color"
        @change="update('color', ($event.target as HTMLSelectElement).value)"
      >
        <option value="">All colors</option>
        <option v-for="c in colors" :key="c">{{ c }}</option>
      </select></label
    ><label class="price-range"
      >Price up to {{ formatPrice(modelValue.maxPrice)
      }}<input
        type="range"
        min="200"
        max="1000"
        step="50"
        :value="modelValue.maxPrice"
        @input="update('maxPrice', Number(($event.target as HTMLInputElement).value))"
      /><span>฿200 <span>฿1,000</span></span></label
    ><label class="filter-select"
      >Technology<select
        :value="modelValue.technology"
        @change="update('technology', ($event.target as HTMLSelectElement).value)"
      >
        <option value="">All technologies</option>
        <option>GBOLD</option>
        <option>Lightweight</option>
      </select></label
    ><label class="filter-select"
      >Collection<select
        :value="modelValue.collection"
        @change="update('collection', ($event.target as HTMLSelectElement).value)"
      >
        <option value="">All collections</option>
        <option v-for="c in collections" :key="c">{{ c }}</option>
      </select></label
    >
    <fieldset>
      <legend>Featured</legend>
      <label class="check-label"
        ><input
          type="checkbox"
          :checked="modelValue.new"
          @change="update('new', !modelValue.new)"
        />New arrivals</label
      ><label class="check-label"
        ><input
          type="checkbox"
          :checked="modelValue.best"
          @change="update('best', !modelValue.best)"
        />Best sellers</label
      >
    </fieldset>
  </div>
</template>
