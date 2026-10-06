<script setup lang="ts">
import type { NuxtError } from '#app'
const props = defineProps<{ error: NuxtError }>()
useHead({ title: String(props.error.statusCode) })
</script>

<template>
  <NuxtLayout>
    <section class="wrap grid min-h-[60vh] place-content-center py-section text-center">
      <p class="eyebrow text-red">Error {{ error.statusCode }}</p>
      <h1 class="display-xl mt-4">Wrong<br>Turn</h1>
      <p class="thai-lead mx-auto mt-5 max-w-md text-ink-2">{{ error.statusCode === 404 ? 'ไม่พบหน้าที่คุณกำลังมองหา แต่ยังมีรองเท้าอีกหลายคู่รอคุณอยู่' : error.statusMessage }}</p>
      <div class="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" class="btn-primary" @click="clearError({ redirect: '/' })">Back to Home</button>
        <button type="button" class="btn-outline" @click="clearError({ redirect: '/products' })">Shop All</button>
      </div>
    </section>
  </NuxtLayout>
</template>
