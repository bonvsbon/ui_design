<script setup lang="ts">
const ui = useUiStore()
</script>

<template>
  <div class="pointer-events-none fixed inset-x-0 bottom-[calc(var(--tabbar-h)+16px)] z-toast flex justify-center px-4 lg:bottom-8" aria-live="polite" role="status">
    <Transition name="drop">
      <p v-if="ui.toast" :key="ui.toast.id" class="pointer-events-auto flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-thai text-sm text-paper shadow-lg">
        <AppIcon name="check" :size="16" class="text-sun" /> {{ ui.toast.text }}
      </p>
    </Transition>
  </div>
</template>
