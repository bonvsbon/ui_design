<script setup lang="ts">
import type { HomeSection } from '~/types'

/**
 * Prototype stand-in for the CMS "Homepage" screen: staff toggle and reorder
 * sections and the page re-renders instantly. Nothing here is hardcoded per concept.
 */
const props = defineProps<{
  sections: HomeSection[]
  toggle: (id: string) => void
  move: (id: string, dir: -1 | 1) => void
  reset: () => void
}>()
const { cmsOpen } = useUi()
useOverlay(cmsOpen)
</script>

<template>
  <Teleport to="body">
    <Transition name="fade"><div v-if="cmsOpen" class="fixed inset-0 z-[90] bg-black/40" @click="cmsOpen = false" /></Transition>
    <Transition name="slide-r">
      <aside v-if="cmsOpen" role="dialog" aria-modal="true" aria-labelledby="cms-title" class="fixed inset-y-0 right-0 z-[91] flex w-full max-w-sm flex-col bg-white font-[system-ui] text-[#111] shadow-2xl">
        <header class="border-b border-[#e5e5e5] p-5">
          <div class="flex items-center justify-between">
            <h2 id="cms-title" class="text-lg font-bold">Homepage sections</h2>
            <button type="button" class="grid h-9 w-9 place-items-center rounded-md hover:bg-[#f2f2f2]" aria-label="ปิด" @click="cmsOpen = false"><AppIcon name="close" /></button>
          </div>
          <p class="mt-1 text-sm text-[#555]">ตัวอย่างหน้าจอ CMS: เปิด/ปิด และจัดลำดับ section ได้ทันที ข้อมูลทุกบล็อกมาจาก <code class="rounded bg-[#f2f2f2] px-1">data/home/*.ts</code></p>
        </header>
        <ol class="flex-1 divide-y divide-[#eee] overflow-y-auto">
          <li v-for="(s, i) in props.sections" :key="s.id" class="flex items-center gap-3 px-5 py-3" :class="!s.enabled && 'opacity-50'">
            <span class="w-5 text-right text-xs tabular-nums text-[#777]">{{ i + 1 }}</span>
            <label class="flex flex-1 cursor-pointer items-center gap-3">
              <input type="checkbox" class="h-4 w-4 accent-[#111]" :checked="s.enabled" @change="props.toggle(s.id)">
              <span class="min-w-0">
                <span class="block truncate text-sm font-semibold">{{ s.label }}</span>
                <span class="block text-xs text-[#777]">{{ s.type }}</span>
              </span>
            </label>
            <span class="flex">
              <button type="button" class="grid h-8 w-8 place-items-center rounded hover:bg-[#f2f2f2] disabled:opacity-30" :disabled="i === 0" :aria-label="`เลื่อน ${s.label} ขึ้น`" @click="props.move(s.id, -1)"><AppIcon name="chevron" :size="16" class="-rotate-90" /></button>
              <button type="button" class="grid h-8 w-8 place-items-center rounded hover:bg-[#f2f2f2] disabled:opacity-30" :disabled="i === props.sections.length - 1" :aria-label="`เลื่อน ${s.label} ลง`" @click="props.move(s.id, 1)"><AppIcon name="chevron" :size="16" class="rotate-90" /></button>
            </span>
          </li>
        </ol>
        <footer class="border-t border-[#e5e5e5] p-5">
          <button type="button" class="h-10 w-full rounded-md border border-[#ccc] text-sm font-semibold hover:bg-[#f7f7f7]" @click="props.reset()">คืนค่าเริ่มต้น</button>
        </footer>
      </aside>
    </Transition>
  </Teleport>
</template>
