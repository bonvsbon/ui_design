<script setup lang="ts">
const open = defineModel<boolean>({ default: false })
useOverlay(open)
const rows = [
  [35, 22.5, 3], [36, 23, 3.5], [37, 23.5, 4], [38, 24, 5], [39, 25, 6], [40, 25.5, 6.5],
  [41, 26, 7.5], [42, 27, 8], [43, 27.5, 9], [44, 28.5, 10], [45, 29, 10.5], [46, 30, 11.5],
]
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" class="fixed inset-0 z-[80] grid place-items-end bg-black/50 sm:place-items-center" @click.self="open = false">
        <div role="dialog" aria-modal="true" aria-labelledby="sg-title" class="max-h-[85vh] w-full overflow-y-auto rounded-t-card bg-bg p-6 text-ink sm:max-w-lg sm:rounded-card">
          <div class="flex items-start justify-between">
            <h2 id="sg-title" class="font-display text-2xl">ตารางไซซ์</h2>
            <button type="button" class="grid h-10 w-10 place-items-center" aria-label="ปิดตารางไซซ์" @click="open = false"><AppIcon name="close" /></button>
          </div>
          <p class="mt-2 text-sm text-muted">วัดความยาวเท้าจากส้นถึงปลายนิ้วที่ยาวที่สุด หากอยู่ระหว่างไซซ์ แนะนำให้เลือกไซซ์ใหญ่ขึ้น</p>
          <table class="mt-4 w-full text-left text-sm tabular-nums">
            <thead><tr class="border-b border-line text-muted"><th scope="col" class="py-2">EU</th><th scope="col">ความยาวเท้า (ซม.)</th><th scope="col">UK</th></tr></thead>
            <tbody><tr v-for="r in rows" :key="r[0]" class="border-b border-line"><td class="py-2 font-semibold">{{ r[0] }}</td><td>{{ r[1] }}</td><td>{{ r[2] }}</td></tr></tbody>
          </table>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
