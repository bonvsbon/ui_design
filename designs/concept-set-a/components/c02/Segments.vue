<script setup lang="ts">
const props = defineProps<{ items: { key: string; title: string; th: string; media: string; to: string; products: string[] }[] }>()
const { link, productLink } = useConcept()
const { bySlugs } = useCatalog()
const active = ref(0)
</script>

<template>
  <section class="container-site py-section" aria-label="เลือกตามสไตล์">
    <div class="flex h-[640px] flex-col gap-3 md:h-[560px] md:flex-row">
      <div
        v-for="(s, n) in items" :key="s.key"
        class="group relative overflow-hidden rounded-card text-white transition-[flex-grow] duration-700 ease-out"
        :class="active === n ? 'flex-[2.2]' : 'flex-1'"
        @mouseenter="active = n" @focusin="active = n"
      >
        <SmartImg :id="s.media" sizes="(min-width:768px) 66vw, 100vw" img-class="absolute inset-0 transition-transform duration-1000 group-hover:scale-105" />
        <div class="absolute inset-0" :class="n ? 'bg-gradient-to-t from-[#2b37ff]/90 via-[#2b37ff]/30' : 'bg-gradient-to-t from-black/90 via-black/30'" />
        <div class="absolute inset-x-5 bottom-5 md:inset-x-8 md:bottom-8">
          <p class="font-display uppercase leading-[0.85]" style="font-size: clamp(56px, 8vw, 128px)">{{ s.title }}</p>
          <p class="mt-1 text-lg font-semibold">{{ s.th }}</p>
          <div class="mt-4 flex flex-wrap items-center gap-2 transition-opacity duration-500" :class="active === n ? 'opacity-100' : 'opacity-0 md:pointer-events-none'">
            <NuxtLink v-for="p in bySlugs(s.products)" :key="p.id" :to="productLink(p.slug)" class="flex items-center gap-2 rounded-full bg-white py-1 pl-1 pr-4 text-ink">
              <span class="h-10 w-12 overflow-hidden rounded-full bg-white"><ProductImg :product="p" alt="" /></span><span class="font-bold">{{ p.name }}</span>
            </NuxtLink>
            <NuxtLink :to="link(s.to)" class="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-5 font-extrabold italic uppercase text-accent-ink">ช้อป {{ s.title }} <AppIcon name="arrow" :size="18" /></NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
