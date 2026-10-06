<script setup lang="ts">
import type { Cta, Product } from '~/types'
/** One product, told as a story: oversized headline, big pack-shot with live colour switching, three benefits. */
const props = defineProps<{ eyebrow: string; product: Product; colorId?: string; headline: string[]; body: string; benefits: { title: string; body: string }[]; cta: Cta }>()
const color = ref(Math.max(0, props.product.colors.findIndex((c) => c.id === props.colorId)))
const image = computed(() => imageUrl(props.product.colors[color.value].images[0]))
const uid = useId()
</script>

<template>
  <section class="relative overflow-hidden bg-sky py-section" :aria-labelledby="uid">
    <div class="wrap grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
      <div class="lg:col-span-4">
        <p class="eyebrow text-red">{{ eyebrow }}</p>
        <h2 :id="uid" class="display-l mt-4"><span v-for="l in headline" :key="l" class="block">{{ l }}</span></h2>
        <p class="mt-5 max-w-sm font-thai leading-relaxed text-ink-2">{{ body }}</p>
        <p class="mt-6 text-sm"><span class="font-semibold">{{ product.name }}</span> · {{ formatPrice(product.price) }}</p>
        <div class="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label="ดูสีอื่น">
          <button
            v-for="(c, n) in product.colors" :key="c.id" type="button" role="radio" :aria-checked="color === n" :aria-label="c.name"
            class="h-8 w-8 rounded-full ring-1 ring-inset ring-black/20 transition" :class="color === n ? 'outline outline-2 outline-offset-2 outline-ink' : ''"
            :style="{ background: c.hex }" @click="color = n"
          />
        </div>
        <NuxtLink :to="cta.to" class="btn-primary mt-8">{{ cta.label }}</NuxtLink>
      </div>

      <div class="relative lg:col-span-5">
        <div class="absolute inset-[6%] rounded-full border border-ink/10 bg-white/35" aria-hidden="true" />
        <Transition name="fade" mode="out-in">
          <img :key="image" :src="image" :alt="`${product.name} สี ${product.colors[color].name}`" width="575" height="575" loading="lazy" class="relative mx-auto aspect-square w-full max-w-[560px] object-contain mix-blend-multiply">
        </Transition>
      </div>

      <ol class="grid gap-6 sm:grid-cols-3 lg:col-span-3 lg:grid-cols-1 lg:gap-8">
        <li v-for="(b, n) in benefits" :key="b.title" v-reveal="n * 100" class="border-t border-ink/20 pt-4">
          <p class="text-xs font-semibold tabular-nums tracking-[0.14em] text-red">{{ String(n + 1).padStart(2, '0') }}</p>
          <p class="display-s mt-2">{{ b.title }}</p>
          <p class="mt-1 font-thai text-sm text-ink-2">{{ b.body }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
