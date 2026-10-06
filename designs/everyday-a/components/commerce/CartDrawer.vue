<script setup lang="ts">
/** Slide-in cart with free-shipping progress. Checkout is out of scope for the concept. */
const ui = useUiStore()
const cart = useCartStore()
const products = useProducts()
const site = useSite()
const open = computed(() => ui.overlay === 'cart')

const rows = computed(() => cart.lines.map((l) => {
  const p = products.value.find((x) => x.id === l.productId)
  const c = p?.colors.find((x) => x.id === l.colorId) ?? p?.colors[0]
  return p && c ? { line: l, product: p, color: c } : null
}).filter((r): r is NonNullable<typeof r> => !!r))
const subtotal = computed(() => rows.value.reduce((n, r) => n + r.product.price * r.line.qty, 0))
const threshold = computed(() => site.value?.freeShippingThreshold ?? 599)
const remaining = computed(() => Math.max(0, threshold.value - subtotal.value))
</script>

<template>
  <Teleport to="body">
    <Transition name="fade"><div v-if="open" class="fixed inset-0 z-overlay bg-black/45" @click="ui.close()" /></Transition>
    <Transition name="drawer">
      <aside v-if="open" role="dialog" aria-modal="true" aria-labelledby="cart-title" class="fixed inset-y-0 right-0 z-overlay flex w-[min(100vw,440px)] flex-col bg-paper" @keydown.esc="ui.close()">
        <div class="flex h-header shrink-0 items-center justify-between border-b border-line px-5">
          <h2 id="cart-title" class="display-s">Your Cart <span class="text-muted">({{ cart.count }})</span></h2>
          <button type="button" class="grid h-11 w-11 place-items-center" aria-label="ปิดตะกร้า" autofocus @click="ui.close()"><AppIcon name="close" /></button>
        </div>

        <div class="border-b border-line px-5 py-4 font-thai text-sm">
          <p v-if="remaining > 0">ช้อปเพิ่มอีก <strong>{{ formatPrice(remaining) }}</strong> เพื่อรับสิทธิ์ส่งฟรี</p>
          <p v-else class="font-semibold text-[#1F7A4A]">คุณได้รับสิทธิ์ส่งฟรีแล้ว</p>
          <div class="mt-2 h-1 overflow-hidden rounded-full bg-paper-2" role="progressbar" :aria-valuenow="Math.min(subtotal, threshold)" aria-valuemin="0" :aria-valuemax="threshold">
            <div class="h-full bg-red transition-[width] duration-500" :style="{ width: `${Math.min(100, (subtotal / threshold) * 100)}%` }" />
          </div>
        </div>

        <div class="flex-1 overflow-y-auto px-5">
          <div v-if="!rows.length" class="py-16 text-center">
            <p class="font-thai text-ink-2">ตะกร้าของคุณยังว่างอยู่</p>
            <NuxtLink to="/products?badge=best-seller" class="btn-primary mt-6" @click="ui.close()">Shop Best Sellers</NuxtLink>
          </div>
          <ul v-else class="divide-y divide-line">
            <li v-for="(r, i) in rows" :key="`${r.line.productId}-${r.line.colorId}-${r.line.size}`" class="flex gap-4 py-5">
              <NuxtLink :to="`/product/${r.product.slug}`" class="h-24 w-24 shrink-0 bg-paper-2" @click="ui.close()"><img :src="imageUrl(r.color.images[0])" :alt="r.product.name" class="h-full w-full object-contain p-2 mix-blend-multiply"></NuxtLink>
              <div class="flex flex-1 flex-col">
                <div class="flex justify-between gap-2">
                  <p class="font-semibold">{{ r.product.name }}</p>
                  <p class="font-medium">{{ formatPrice(r.product.price * r.line.qty) }}</p>
                </div>
                <p class="text-sm text-muted">{{ r.color.name }} · EU {{ r.line.size }}</p>
                <div class="mt-auto flex items-center justify-between pt-2">
                  <div class="flex items-center rounded-full border border-line">
                    <button type="button" class="grid h-9 w-9 place-items-center" :aria-label="`ลดจำนวน ${r.product.name}`" @click="cart.setQty(i, r.line.qty - 1)"><AppIcon name="minus" :size="16" /></button>
                    <span class="w-6 text-center text-sm" aria-live="polite">{{ r.line.qty }}</span>
                    <button type="button" class="grid h-9 w-9 place-items-center" :aria-label="`เพิ่มจำนวน ${r.product.name}`" @click="cart.setQty(i, r.line.qty + 1)"><AppIcon name="plus" :size="16" /></button>
                  </div>
                  <button type="button" class="text-sm text-muted underline underline-offset-4 hover:text-ink" @click="cart.remove(i)">ลบ</button>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div v-if="rows.length" class="pb-safe border-t border-line px-5 py-5">
          <div class="flex justify-between text-lg font-semibold"><span>Subtotal</span><span>{{ formatPrice(subtotal) }}</span></div>
          <p class="mt-1 font-thai text-sm text-muted">ค่าจัดส่งคำนวณในขั้นตอนถัดไป</p>
          <button type="button" class="btn-accent mt-4 w-full" @click="ui.notify('Checkout อยู่นอกขอบเขตของคอนเซ็ปต์นี้')">Checkout</button>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>
