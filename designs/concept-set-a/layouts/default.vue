<script setup lang="ts">
useFontStylesheet('https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=IBM+Plex+Sans+Thai:wght@400;500;600;700&display=swap')
useHead({
})
</script>

<template>
  <div class="min-h-screen bg-[#f6f5f2] text-[#111]" style="--font-display:'Archivo','IBM Plex Sans Thai',sans-serif;--font-body:'IBM Plex Sans Thai',sans-serif">
    <slot />
  </div>
</template>
