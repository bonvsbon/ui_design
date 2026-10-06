<script setup lang="ts">
const { message } = useToast()
</script>

<template>
  <div class="pointer-events-none fixed inset-x-0 bottom-[calc(var(--tabbar-h)+16px)] z-[70] flex justify-center px-4 lg:bottom-6" role="status" aria-live="polite">
    <Transition name="fade">
      <p v-if="message" class="pointer-events-auto max-w-md rounded-btn bg-inverse px-4 py-3 text-sm text-inverse-ink shadow-pop">{{ message }}</p>
    </Transition>
  </div>
</template>
