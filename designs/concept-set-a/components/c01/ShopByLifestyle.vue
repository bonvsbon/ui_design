<script setup lang="ts">
const props = defineProps<{ title: string; tabs: { key: string; label: string; media: string }[] }>()
const { byActivity } = useCatalog()
const { link } = useConcept()
const active = ref(props.tabs[0]!.key)
const tab = computed(() => props.tabs.find((t) => t.key === active.value)!)
const items = computed(() => byActivity(active.value, 3))
function onKey(e: KeyboardEvent, n: number) {
  const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
  if (!d) return
  const next = props.tabs[(n + d + props.tabs.length) % props.tabs.length]!
  active.value = next.key
  nextTick(() => document.getElementById(`c01-tab-${next.key}`)?.focus())
}
</script>

<template>
  <section class="container-site py-section" aria-labelledby="c01-life-title">
    <h2 id="c01-life-title" class="font-display text-4xl font-black uppercase leading-none md:text-6xl" style="font-stretch: 118%">{{ title }}</h2>
    <div role="tablist" aria-label="ไลฟ์สไตล์" class="no-scrollbar mt-6 flex gap-6 overflow-x-auto border-b border-line">
      <button
        v-for="(t, n) in tabs" :id="`c01-tab-${t.key}`" :key="t.key" type="button" role="tab" :aria-selected="active === t.key" :tabindex="active === t.key ? 0 : -1"
        aria-controls="c01-life-panel" class="-mb-px shrink-0 border-b-2 py-3 font-display text-sm font-bold uppercase tracking-[0.12em]"
        :class="active === t.key ? 'border-ink' : 'border-transparent text-muted hover:text-ink'" @click="active = t.key" @keydown="onKey($event, n)"
      >{{ t.label }}</button>
    </div>
    <div id="c01-life-panel" role="tabpanel" :aria-labelledby="`c01-tab-${active}`" class="mt-8 grid gap-5 lg:grid-cols-[1fr_1.6fr]">
      <div class="relative aspect-[4/5] overflow-hidden lg:aspect-auto">
        <Transition name="fade" mode="out-in"><SmartImg :id="tab.media" :key="tab.key" sizes="(min-width:1024px) 38vw, 100vw" /></Transition>
        <NuxtLink :to="link(`/products?activity=${active}`)" class="absolute bottom-4 left-4 inline-flex h-11 items-center gap-2 bg-bg px-5 font-display text-xs font-bold uppercase tracking-[0.16em]">Shop {{ tab.label }} <AppIcon name="arrow" :size="16" /></NuxtLink>
      </div>
      <ul class="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-5">
        <li v-for="p in items" :key="p.id"><C01ProductCard :product="p" /></li>
      </ul>
    </div>
  </section>
</template>
