<script setup lang="ts">
import { media, mediaUrl, mediaSrcset } from '~/data/media'

/** Responsive, lazy CMS media image (art-directed crop via `ratio`, focal point from the media library). */
const props = withDefaults(defineProps<{
  id: string
  ratio?: number
  sizes?: string
  eager?: boolean
  alt?: string
  imgClass?: string
}>(), { sizes: '100vw', eager: false })

const asset = computed(() => media[props.id])
</script>

<template>
  <img
    v-if="asset"
    :src="mediaUrl(id, 1200, ratio ? Math.round(1200 * ratio) : undefined)"
    :srcset="mediaSrcset(id, undefined, ratio)"
    :sizes="sizes"
    :alt="alt ?? asset.alt"
    :loading="eager ? 'eager' : 'lazy'"
    :fetchpriority="eager ? 'high' : undefined"
    decoding="async"
    :class="['block h-full w-full object-cover', imgClass]"
    :style="{ objectPosition: asset.focal }"
  >
</template>
