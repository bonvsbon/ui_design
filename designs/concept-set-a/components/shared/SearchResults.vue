<script setup lang="ts">
import { categoryLabels } from '~/data/catalog'

/**
 * Grouped predictive results (Products / Categories / Collections / Articles).
 * Presentation-neutral: each concept wraps it in its own overlay, dropdown or palette.
 */
const props = withDefaults(defineProps<{ query: string; dense?: boolean; columns?: boolean }>(), { dense: false, columns: true })
const emit = defineEmits<{ select: []; pick: [q: string] }>()
const q = toRef(props, 'query')
const { results, highlight } = useSearch(q)
const { link, productLink } = useConcept()
</script>

<template>
  <div>
    <div v-if="!query.trim()" class="space-y-3">
      <p class="text-xs font-semibold uppercase tracking-[0.14em] text-muted">ค้นหายอดนิยม</p>
      <div class="flex flex-wrap gap-2">
        <button v-for="s in popularSearches" :key="s" type="button" class="rounded-chip border border-line px-3 py-1.5 text-sm hover:border-ink" @click="emit('pick', s)">{{ s }}</button>
      </div>
    </div>

    <div v-else-if="!results.total" class="py-6">
      <p class="text-lg">ไม่พบผลลัพธ์สำหรับ “{{ query }}”</p>
      <p class="mt-1 text-sm text-muted">ลองค้นด้วยคำอื่น เช่น “แตะหูหนีบ” หรือดู <NuxtLink :to="link('/products')" class="underline" @click="emit('select')">สินค้าทั้งหมด</NuxtLink></p>
    </div>

    <div v-else :class="columns ? 'grid gap-8 md:grid-cols-[1.4fr_1fr]' : 'space-y-6'" aria-live="polite">
      <section v-if="results.products.length" aria-labelledby="sr-products">
        <h3 id="sr-products" class="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted">สินค้า · {{ results.products.length }}</h3>
        <ul class="space-y-1">
          <li v-for="p in results.products" :key="p.id">
            <NuxtLink :to="productLink(p.slug)" class="group flex items-center gap-3 rounded-card p-2 hover:bg-surface-2 focus-visible:bg-surface-2" @click="emit('select')">
              <span class="grid h-14 w-16 shrink-0 place-items-center overflow-hidden rounded-media bg-white"><ProductImg :product="p" /></span>
              <span class="min-w-0 flex-1">
                <span class="block truncate font-semibold"><template v-for="(part, i) in highlight(p.name)" :key="i"><mark v-if="part.hit" class="bg-accent text-accent-ink">{{ part.text }}</mark><template v-else>{{ part.text }}</template></template></span>
                <span class="block truncate text-sm text-muted">{{ categoryLabels[p.category] }} · {{ p.subtitle }}</span>
              </span>
              <span class="text-sm font-semibold tabular-nums">{{ formatPrice(p.price) }}</span>
            </NuxtLink>
          </li>
        </ul>
        <NuxtLink :to="link(`/products?q=${encodeURIComponent(query)}`)" class="mt-3 inline-flex items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline" @click="emit('select')">
          ดูสินค้าทั้งหมดสำหรับ “{{ query }}” <AppIcon name="arrow" :size="16" />
        </NuxtLink>
      </section>

      <div class="space-y-6">
        <section v-if="results.categories.length" aria-labelledby="sr-cats">
          <h3 id="sr-cats" class="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">หมวดหมู่</h3>
          <ul class="flex flex-wrap gap-2">
            <li v-for="c in results.categories" :key="c.slug">
              <NuxtLink :to="link(`/products?${toQuery(c.query)}`)" class="inline-flex items-center gap-2 rounded-chip bg-surface-2 px-3 py-1.5 text-sm hover:bg-ink hover:text-bg" @click="emit('select')">
                {{ c.labelTh }} <span class="text-muted">{{ c.label }}</span>
              </NuxtLink>
            </li>
          </ul>
        </section>
        <section v-if="results.collections.length" aria-labelledby="sr-cols">
          <h3 id="sr-cols" class="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">คอลเลกชัน</h3>
          <ul class="space-y-2">
            <li v-for="c in results.collections" :key="c.slug">
              <NuxtLink :to="link(`/products?collection=${c.slug}`)" class="flex items-center gap-3 hover:underline" @click="emit('select')">
                <span class="h-10 w-10 shrink-0 overflow-hidden rounded-media"><SmartImg :id="c.media" sizes="40px" alt="" /></span>
                <span><span class="block font-semibold">{{ c.name }}</span><span class="block text-sm text-muted">{{ c.tagline }}</span></span>
              </NuxtLink>
            </li>
          </ul>
        </section>
        <section v-if="results.articles.length" aria-labelledby="sr-arts">
          <h3 id="sr-arts" class="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">บทความ</h3>
          <ul class="space-y-2">
            <li v-for="a in results.articles" :key="a.slug">
              <a href="#stories" class="block hover:underline" @click="emit('select')">
                <span class="text-xs uppercase tracking-wider text-muted">{{ a.category }} · {{ a.readMinutes }} นาที</span>
                <span class="block font-medium">{{ a.title }}</span>
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>
