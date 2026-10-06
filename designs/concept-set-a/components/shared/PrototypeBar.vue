<script setup lang="ts">
/** Reviewer toolbar: jump between concepts and open the CMS preview. Not part of the storefront design. */
const props = defineProps<{ hasCms?: boolean }>()
const { concept } = useConcept()
const { cmsOpen } = useUi()
const route = useRoute()
const page = computed(() => (route.path.includes('/product/') ? '/product/demo' : route.path.includes('/products') ? '/products' : ''))
const open = ref(false)
</script>

<template>
  <div class="fixed bottom-[calc(var(--tabbar-h)+12px+env(safe-area-inset-bottom))] left-3 z-[50] font-[system-ui] text-[13px] lg:bottom-4 lg:left-4">
    <div class="flex items-center gap-1 rounded-full border border-black/10 bg-white/95 p-1 text-[#111] shadow-lg backdrop-blur">
      <NuxtLink to="/" class="grid h-8 place-items-center rounded-full px-3 font-semibold hover:bg-[#f0f0f0]" aria-label="กลับไปหน้าภาพรวมแนวคิด">◐ {{ concept.number }}</NuxtLink>
      <button type="button" class="h-8 rounded-full px-3 hover:bg-[#f0f0f0]" :aria-expanded="open" aria-controls="concept-jump" @click="open = !open">สลับแนวคิด</button>
      <button v-if="props.hasCms" type="button" class="h-8 rounded-full bg-[#111] px-3 font-semibold text-white" @click="cmsOpen = true">CMS</button>
    </div>
    <ul v-show="open" id="concept-jump" class="absolute bottom-12 left-0 w-64 overflow-hidden rounded-xl border border-black/10 bg-white text-[#111] shadow-xl">
      <li v-for="c in Object.values(conceptMeta)" :key="c.id">
        <NuxtLink :to="c.base + page" class="flex items-center gap-3 px-4 py-2.5 hover:bg-[#f4f4f4]" :class="c.id === concept.id && 'font-bold'" @click="open = false">
          <span class="tabular-nums text-[#888]">{{ c.number }}</span>{{ c.short }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
