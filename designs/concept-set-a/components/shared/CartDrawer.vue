<script setup lang="ts">
import { site } from '~/data/content'

const cart = useCart()
const { link, productLink } = useConcept()
useOverlay(cart.open)
const remaining = computed(() => Math.max(0, site.freeShippingThreshold - cart.subtotal.value))
const progress = computed(() => Math.min(100, (cart.subtotal.value / site.freeShippingThreshold) * 100))
const toast = useToast()
</script>

<template>
  <Teleport to="body">
    <Transition name="fade"><div v-if="cart.open.value" class="fixed inset-0 z-[60] bg-black/40" @click="cart.open.value = false" /></Transition>
    <Transition name="slide-r">
      <aside v-if="cart.open.value" role="dialog" aria-modal="true" aria-labelledby="cart-title" class="fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col bg-bg text-ink shadow-pop">
        <header class="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 id="cart-title" class="font-display text-xl">ตะกร้าของคุณ <span class="text-muted">({{ cart.count.value }})</span></h2>
          <button type="button" class="grid h-10 w-10 place-items-center rounded-btn hover:bg-surface-2" aria-label="ปิดตะกร้า" @click="cart.open.value = false"><AppIcon name="close" /></button>
        </header>
        <div class="border-b border-line px-5 py-3 text-sm">
          <p v-if="remaining > 0">ช้อปเพิ่มอีก <strong>{{ formatPrice(remaining) }}</strong> เพื่อรับส่งฟรี</p>
          <p v-else class="font-semibold">คุณได้รับสิทธิ์ส่งฟรีแล้ว</p>
          <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2"><div class="h-full bg-accent transition-all" :style="{ width: progress + '%' }" /></div>
        </div>
        <div class="flex-1 overflow-y-auto px-5">
          <p v-if="!cart.lines.value.length" class="py-16 text-center text-muted">ยังไม่มีสินค้าในตะกร้า</p>
          <ul v-else class="divide-y divide-line">
            <li v-for="l in cart.lines.value" :key="l.key" class="flex gap-4 py-4">
              <NuxtLink :to="productLink(l.slug)" class="h-20 w-24 shrink-0 overflow-hidden rounded-media bg-white" @click="cart.open.value = false">
                <img :src="productImageUrl(l.image)" :alt="l.name" class="on-plate h-full w-full object-contain" :style="{ filter: l.filter }">
              </NuxtLink>
              <div class="min-w-0 flex-1">
                <p class="font-semibold">{{ l.name }}</p>
                <p class="text-sm text-muted">{{ l.colorName }} · EU {{ l.size }}</p>
                <div class="mt-2 flex items-center justify-between">
                  <div class="inline-flex items-center rounded-btn border border-line">
                    <button type="button" class="grid h-8 w-8 place-items-center" :aria-label="`ลดจำนวน ${l.name}`" @click="cart.setQty(l.key, l.qty - 1)"><AppIcon name="minus" :size="14" /></button>
                    <span class="w-6 text-center text-sm tabular-nums" aria-live="polite">{{ l.qty }}</span>
                    <button type="button" class="grid h-8 w-8 place-items-center" :aria-label="`เพิ่มจำนวน ${l.name}`" @click="cart.setQty(l.key, l.qty + 1)"><AppIcon name="plus" :size="14" /></button>
                  </div>
                  <span class="font-semibold tabular-nums">{{ formatPrice(l.price * l.qty) }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <footer class="border-t border-line p-5">
          <div class="flex justify-between text-lg font-semibold"><span>ยอดรวม</span><span class="tabular-nums">{{ formatPrice(cart.subtotal.value) }}</span></div>
          <p class="mt-1 text-sm text-muted">ค่าจัดส่งและส่วนลดคำนวณในขั้นตอนถัดไป</p>
          <button type="button" class="mt-4 h-12 w-full rounded-btn bg-ink font-semibold text-bg disabled:opacity-40" :disabled="!cart.count.value" @click="toast.show('ต้นแบบ: หน้าชำระเงินยังไม่ได้เชื่อมต่อระบบหลังบ้าน')">ไปชำระเงิน</button>
          <NuxtLink :to="link('/products')" class="mt-2 block text-center text-sm underline" @click="cart.open.value = false">ช้อปต่อ</NuxtLink>
        </footer>
      </aside>
    </Transition>
  </Teleport>
</template>
