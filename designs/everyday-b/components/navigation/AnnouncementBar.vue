<script setup lang="ts">
const cms = useContentStore()
</script>
<template>
  <div class="announcement">
    <span>{{ cms.content.announcement.text }}</span
    ><NuxtLink :to="cms.content.announcement.link.href"
      ><span lang="th">{{ cms.content.announcement.link.label }}</span
      ><AppIcon name="arrow" :size="13"
    /></NuxtLink>
  </div>
</template>
