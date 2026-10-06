<script setup lang="ts">
/** Quick View dialog — opened from any product card. Focus is trapped by <dialog>. */
const ui = useUiStore()
const products = useProducts()
const product = computed(() => products.value.find((p) => p.id === ui.quickViewId) ?? null)
const color = ref(0)
const dlg = ref<HTMLDialogElement | null>(null)

watch(() => ui.overlay === 'quickview' && !!product.value, (open) => {
  color.value = 0
  if (!dlg.value) return
  if (open && !dlg.value.open) dlg.value.showModal()
  if (!open && dlg.value.open) dlg.value.close()
})
const image = computed(() => imageUrl(product.value?.colors[color.value]?.images[0] ?? ''))
</script>

<template>
  <dialog
    ref="dlg"
    class="m-0 mt-auto max-h-[92dvh] w-full max-w-none overflow-y-auto bg-paper p-0 text-ink backdrop:bg-black/50 md:m-auto md:max-h-[86vh] md:max-w-4xl"
    aria-labelledby="qv-title" @close="ui.close()" @click.self="ui.close()"
  >
    <div v-if="product" class="grid md:grid-cols-2">
      <div class="relative aspect-square bg-paper-2 md:aspect-auto">
        <img :src="image" :alt="`${product.name} ${product.colors[color].name}`" class="h-full w-full object-contain p-10 mix-blend-multiply">
      </div>
      <div class="relative p-6 md:p-8">
        <button type="button" class="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full hover:bg-paper-2" aria-label="ปิด" @click="ui.close()">
          <AppIcon name="close" />
        </button>
        <span id="qv-title" class="sr-only">{{ product.name }}</span>
        <ProductBuyBox v-model:color="color" :product="product" compact />
      </div>
    </div>
  </dialog>
</template>
