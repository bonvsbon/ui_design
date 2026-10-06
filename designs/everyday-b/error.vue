<script setup lang="ts">
defineProps<{ error: { statusCode: number; statusMessage: string } }>()
</script>
<template>
  <div class="error-page">
    <a href="/" class="brand-logo">GAMBOL®</a>
    <p>{{ error.statusCode }}</p>
    <h1>LET’S GET YOU<br />BACK ON TRACK.</h1>
    <p>
      {{
        error.statusCode === 404
          ? 'This page has wandered off. Your next favourite pair is still here.'
          : 'Something interrupted the journey. Please try again.'
      }}
    </p>
    <button class="button primary" @click="clearError({ redirect: '/' })">BACK TO GAMBOL →</button>
  </div>
</template>
