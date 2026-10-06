<script setup lang="ts">
const { panel } = useShop()
</script>
<template>
  <section class="store-section container">
    <div>
      <AppIcon name="pin" :size="32" />
      <div>
        <h2>A good fit, closer than you think.</h2>
        <p>Stop by. Try a pair. Feel the difference for yourself.</p>
      </div>
    </div>
    <button class="button button-dark" @click="panel = 'stores'">
      Find a store<AppIcon name="arrow" :size="18" />
    </button>
  </section>
</template>
