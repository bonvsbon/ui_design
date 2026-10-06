<script setup lang="ts">
import { technology } from '~/data/content'
const props = defineProps<{ product: string }>()
const { getProduct } = useCatalog()
const { productLink } = useConcept()
const p = computed(() => getProduct(props.product)!)
const active = ref(0)
</script>

<template>
  <section id="technology" class="bg-inverse text-inverse-ink" aria-labelledby="c01-tech-title">
    <div class="container-site grid gap-12 py-section lg:grid-cols-2 lg:gap-20">
      <div>
        <p class="font-display text-[11px] uppercase tracking-[0.24em] text-white/60">Signature technology</p>
        <h2 id="c01-tech-title" class="mt-3 font-display font-black uppercase leading-[0.85]" style="font-size: clamp(72px, 12vw, 180px); font-stretch: 125%">
          {{ technology.name }}<span class="text-accent">.</span>
        </h2>
        <p class="mt-6 max-w-md text-lg text-white/80">{{ technology.tagline }}</p>

        <ul class="mt-10 border-t border-white/20" role="tablist" aria-label="คุณสมบัติ G-BOLD">
          <li v-for="(b, n) in technology.benefits" :key="b.id" class="border-b border-white/20">
            <button
              type="button" role="tab" :aria-selected="active === n" class="grid w-full grid-cols-[1fr_auto] items-baseline gap-4 py-5 text-left transition-colors"
              :class="active === n ? 'text-white' : 'text-white/45 hover:text-white/80'" @click="active = n" @mouseenter="active = n"
            >
              <span>
                <span class="block font-display text-sm font-bold uppercase tracking-[0.16em]">{{ b.label }}</span>
                <span class="block text-sm">{{ b.labelTh }} — {{ b.claim }}</span>
              </span>
              <span class="font-display font-black tabular-nums leading-none" style="font-size: clamp(36px, 4.5vw, 64px); font-stretch: 110%">{{ b.metric }}<small class="ml-1 text-base font-semibold">{{ b.unit }}</small></span>
            </button>
          </li>
        </ul>
      </div>

      <div class="relative flex flex-col">
        <div class="relative grid flex-1 place-items-center bg-accent p-10" style="min-height: 420px">
          <span class="absolute left-4 top-4 font-display text-[11px] font-bold uppercase tracking-[0.2em] text-accent-ink">{{ technology.benefits[active]!.label }} / 0{{ active + 1 }}</span>
          <ProductImg :product="p" :view="active === 3 ? 'sole' : active === 1 ? 'detail' : active === 2 ? 'mirror' : 'main'" class="max-h-[360px] transition-transform duration-700 ease-out" />
          <!-- vs standard bar -->
          <div class="absolute inset-x-4 bottom-4 text-accent-ink">
            <div class="flex justify-between font-display text-[11px] font-bold uppercase tracking-[0.16em]"><span>G-BOLD vs. EVA ทั่วไป</span><span class="tabular-nums">{{ technology.benefits[active]!.vsStandard }}%</span></div>
            <div class="mt-2 h-1 bg-black/20"><div class="h-full bg-black transition-all duration-700" :style="{ width: Math.min(100, technology.benefits[active]!.vsStandard / 1.4) + '%' }" /></div>
          </div>
        </div>
        <NuxtLink :to="productLink(p.slug)" class="mt-4 flex items-center justify-between border border-white/30 px-5 py-4 font-display text-xs font-bold uppercase tracking-[0.16em] hover:bg-white hover:text-ink">
          <span>สัมผัส G-BOLD ใน {{ p.name }}</span><AppIcon name="arrow" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
