<script setup lang="ts">
import { technology } from '~/data/content'
defineProps<{ title: string }>()
const cols = [{ k: 'gbold', label: 'G-BOLD' }, { k: 'eva', label: 'EVA ทั่วไป' }, { k: 'rubber', label: 'ยาง' }] as const
function best(row: (typeof technology.comparison)[number]) {
  const vals = cols.map((c) => row[c.k])
  return row.higherIsBetter ? Math.max(...vals) : Math.min(...vals)
}
</script>

<template>
  <section class="container-site py-section" aria-labelledby="c05-cmp-title">
    <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent">Benchmark</p>
    <h2 id="c05-cmp-title" class="mt-3 font-display text-5xl font-medium tracking-tight">{{ title }}</h2>
    <div class="mt-8 overflow-x-auto">
      <table class="w-full min-w-[640px] border-collapse font-mono text-sm">
        <caption class="sr-only">เปรียบเทียบวัสดุพื้นรองเท้า (ค่าทดสอบตัวอย่าง)</caption>
        <thead><tr class="border-b border-line text-left text-xs uppercase text-muted"><th scope="col" class="py-3 font-normal">Metric</th><th v-for="c in cols" :key="c.k" scope="col" class="py-3 font-normal" :class="c.k === 'gbold' && 'text-accent'">{{ c.label }}</th></tr></thead>
        <tbody>
          <tr v-for="row in technology.comparison" :key="row.label" class="border-b border-line">
            <th scope="row" class="py-4 pr-4 text-left font-normal">{{ row.label }} <span class="text-muted">({{ row.higherIsBetter ? '↑ ดีกว่า' : '↓ ดีกว่า' }})</span></th>
            <td v-for="c in cols" :key="c.k" class="w-1/4 py-4 pr-6">
              <div class="flex items-center gap-3">
                <span class="h-2 flex-1 rounded-[2px] bg-surface-2"><span class="block h-full rounded-[2px]" :class="c.k === 'gbold' ? 'bg-accent' : 'bg-muted'" :style="{ width: (row[c.k] / Math.max(row.gbold, row.eva, row.rubber)) * 100 + '%' }" /></span>
                <span class="w-20 text-right tabular-nums" :class="row[c.k] === best(row) && 'text-accent'">{{ row[c.k] }} {{ row.unit }}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="mt-3 font-mono text-[11px] text-muted">* ค่าตัวอย่างสำหรับต้นแบบ — แทนที่ด้วยผลทดสอบจริงใน CMS</p>
  </section>
</template>
