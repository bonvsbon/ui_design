<script setup lang="ts">
useSeoMeta({ title: 'Find GAMBOL near you | Store locator' })
</script>
<template>
  <div class="stores-page">
    <nav class="breadcrumbs container" aria-label="Breadcrumb">
      <NuxtLink to="/">Home</NuxtLink><AppIcon name="right" :size="12" /><span>Find a store</span>
    </nav>
    <StoreLocator standalone />
    <div class="store-contact container">
      <h2>LET’S GET YOU THERE.</h2>
      <p>For confirmed locations and product availability, contact the GAMBOL team.</p>
      <a href="tel:+6624085074">02-408-5074</a
      ><a href="mailto:hello@gambol.co.th">hello@gambol.co.th</a>
    </div>
  </div>
</template>
