<script setup lang="ts">
import type { Media } from '~/types'
withDefaults(defineProps<{ media: Media; eager?: boolean; width?: number; height?: number }>(), {
  eager: false,
  width: 1200,
  height: 1000,
})
</script>
<template>
  <picture
    ><source v-if="media.mobileSrc" media="(max-width: 767px)" :srcset="media.mobileSrc" />
    <img
      :src="media.src"
      :alt="media.alt"
      :width="width"
      :height="height"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : 'auto'"
      :style="{ objectPosition: media.position }"
      decoding="async"
  /></picture>
</template>
