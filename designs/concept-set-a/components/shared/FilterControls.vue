<script setup lang="ts">
/**
 * Facet controls (Gender, Category, Activity, Size, Colour, Price, Technology, Collection).
 * Uses native inputs for keyboard + screen-reader support; styled only through tokens.
 */
const props = withDefaults(defineProps<{ open?: string[]; compact?: boolean }>(), { open: () => ['gender', 'category', 'size'] })
const f = useProductFilters()
const priceDraft = ref<number>(f.priceMax.value ?? f.priceBounds.max)
watch(() => f.priceMax.value, (v) => (priceDraft.value = v ?? f.priceBounds.max))
</script>

<template>
  <div class="divide-y divide-line">
    <details v-for="facet in f.facets.value" :key="facet.key" class="group py-4" :open="props.open.includes(facet.key)">
      <summary class="flex cursor-pointer list-none items-center justify-between font-semibold [&::-webkit-details-marker]:hidden">
        <span>{{ facet.label }}<span v-if="f.selected.value[facet.key].length" class="ml-2 rounded-chip bg-accent px-1.5 text-xs text-accent-ink">{{ f.selected.value[facet.key].length }}</span></span>
        <AppIcon name="chevron-down" :size="18" class="transition-transform group-open:rotate-180" />
      </summary>

      <fieldset class="mt-3">
        <legend class="sr-only">{{ facet.label }}</legend>
        <div v-if="facet.type === 'size'" class="grid grid-cols-5 gap-1.5">
          <label v-for="o in facet.options" :key="o.value" class="relative">
            <input type="checkbox" class="peer sr-only" :checked="f.isOn(facet.key, o.value)" :disabled="!o.count" @change="f.toggle(facet.key, o.value)">
            <span class="grid h-10 cursor-pointer place-items-center rounded-btn border border-line text-sm tabular-nums peer-checked:border-ink peer-checked:bg-ink peer-checked:text-bg peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--focus)] peer-disabled:cursor-not-allowed peer-disabled:opacity-35 peer-disabled:line-through">{{ o.label }}</span>
          </label>
        </div>
        <div v-else-if="facet.type === 'color'" class="flex flex-wrap gap-2">
          <label v-for="o in facet.options" :key="o.value" class="relative" :title="o.label">
            <input type="checkbox" class="peer sr-only" :checked="f.isOn(facet.key, o.value)" @change="f.toggle(facet.key, o.value)">
            <span class="flex cursor-pointer items-center gap-2 rounded-chip border border-line py-1 pl-1 pr-3 text-sm peer-checked:border-ink peer-checked:ring-1 peer-checked:ring-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-[var(--focus)]">
              <span class="h-6 w-6 rounded-full border border-black/10" :style="{ background: (o as any).swatch }" />{{ o.label }} <span class="text-muted">{{ o.count }}</span>
            </span>
          </label>
        </div>
        <ul v-else class="space-y-1">
          <li v-for="o in facet.options" :key="o.value">
            <label class="flex cursor-pointer items-center gap-3 py-1" :class="!o.count && !f.isOn(facet.key, o.value) && 'opacity-45'">
              <input type="checkbox" class="h-[18px] w-[18px] accent-[var(--ink)]" :checked="f.isOn(facet.key, o.value)" @change="f.toggle(facet.key, o.value)">
              <span class="flex-1">{{ o.label }}</span>
              <span class="text-sm tabular-nums text-muted">{{ o.count }}</span>
            </label>
          </li>
        </ul>
      </fieldset>
    </details>

    <div class="py-4">
      <label for="price-max" class="flex items-center justify-between font-semibold">
        <span>ราคาสูงสุด</span><span class="tabular-nums text-muted">{{ formatPrice(priceDraft) }}</span>
      </label>
      <input
        id="price-max" v-model.number="priceDraft" type="range" :min="150" :max="f.priceBounds.max" step="50"
        class="mt-3 w-full accent-[var(--ink)]" @change="f.setPrice(priceDraft)"
      >
      <div class="mt-1 flex justify-between text-xs text-muted"><span>฿150</span><span>{{ formatPrice(f.priceBounds.max) }}</span></div>
    </div>
  </div>
</template>
