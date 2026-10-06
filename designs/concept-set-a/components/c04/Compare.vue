<script setup lang="ts">
import { benefitLabels, categoryLabels } from '~/data/catalog'
const props = defineProps<{ title: string; products: string[] }>()
const { bySlugs } = useCatalog()
const { productLink } = useConcept()
const list = computed(() => bySlugs(props.products))
const keys = ['comfort', 'soft', 'light', 'durable'] as const
</script>

<template>
  <section id="technology" class="container-site py-12" aria-labelledby="c04-cmp-title">
    <h2 id="c04-cmp-title" class="text-2xl font-extrabold md:text-3xl">{{ title }}</h2>
    <p class="mt-1 text-muted">ทุกรุ่นใช้พื้น G-BOLD — ต่างกันที่จุดเด่น</p>
    <div class="mt-6 overflow-x-auto rounded-card border border-line">
      <table class="w-full min-w-[640px] text-left text-sm">
        <caption class="sr-only">เปรียบเทียบสินค้า</caption>
        <thead>
          <tr class="bg-surface">
            <th scope="col" class="w-40 p-4 font-semibold text-muted">รุ่น</th>
            <th v-for="p in list" :key="p.id" scope="col" class="p-4">
              <NuxtLink :to="productLink(p.slug)" class="flex items-center gap-3"><span class="h-12 w-14 shrink-0"><ProductImg :product="p" alt="" /></span><span><span class="block font-bold">{{ p.name }}</span><span class="font-normal text-muted">{{ categoryLabels[p.category] }}</span></span></NuxtLink>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-line">
          <tr><th scope="row" class="p-4 font-semibold text-muted">ราคา</th><td v-for="p in list" :key="p.id" class="p-4 font-bold tabular-nums">{{ formatPrice(p.price) }}</td></tr>
          <tr><th scope="row" class="p-4 font-semibold text-muted">น้ำหนัก/ข้าง</th><td v-for="p in list" :key="p.id" class="p-4 tabular-nums">{{ p.weightGrams }} g</td></tr>
          <tr v-for="k in keys" :key="k">
            <th scope="row" class="p-4 font-semibold text-muted">{{ benefitLabels[k]!.th }}</th>
            <td v-for="p in list" :key="p.id" class="p-4">
              <span class="flex items-center gap-2"><span class="h-2 w-24 overflow-hidden rounded-full bg-surface-2"><span class="block h-full rounded-full bg-accent" :style="{ width: p.benefits[k] * 20 + '%' }" /></span><span class="tabular-nums">{{ p.benefits[k] }}/5</span></span>
            </td>
          </tr>
          <tr><th scope="row" class="p-4 font-semibold text-muted">ไซซ์</th><td v-for="p in list" :key="p.id" class="p-4">{{ p.sizes[0] }}–{{ p.sizes[p.sizes.length - 1] }}</td></tr>
          <tr><th scope="row" class="p-4"><span class="sr-only">ดำเนินการ</span></th><td v-for="p in list" :key="p.id" class="p-4"><NuxtLink :to="productLink(p.slug)" class="inline-flex h-10 items-center rounded-btn bg-accent px-4 font-bold text-accent-ink">เลือกรุ่นนี้</NuxtLink></td></tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
