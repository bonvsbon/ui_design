<script setup lang="ts">
import type { Media } from '~/types'
/**
 * Responsive, lazy image with focal point + optional mobile art direction.
 * `priority` = above-the-fold (eager + fetchpriority=high) for LCP.
 */
const props = withDefaults(defineProps<{
  media: Media
  sizes?: string
  widths?: number[]
  ratio?: number
  priority?: boolean
  imgClass?: string
}>(), { sizes: '100vw', widths: () => [480, 768, 1080, 1440, 1920], priority: false, imgClass: '' })

const src = computed(() => imageUrl(props.media.src, props.widths[2] ?? 1080, props.ratio ? Math.round((props.widths[2] ?? 1080) * props.ratio) : undefined))
const srcset = computed(() => imageSrcset(props.media.src, props.widths, props.ratio))
const mobileSrcset = computed(() => props.media.mobileSrc ? (imageSrcset(props.media.mobileSrc, [480, 768, 1080], 1.4) ?? imageUrl(props.media.mobileSrc)) : undefined)
</script>

<template>
  <picture class="block h-full w-full">
    <source v-if="mobileSrcset" media="(max-width: 767px)" :srcset="mobileSrcset" sizes="100vw">
    <img
      :src="src" :srcset="srcset" :sizes="srcset ? sizes : undefined" :alt="media.alt"
      :loading="priority ? 'eager' : 'lazy'" :fetchpriority="priority ? 'high' : 'auto'" decoding="async"
      :style="{ objectPosition: media.focal || '50% 50%' }"
      :class="['h-full w-full object-cover', imgClass]"
    >
  </picture>
</template>
