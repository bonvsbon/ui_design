<script setup lang="ts">
defineProps<{ error: { statusCode: number; statusMessage?: string } }>()
</script>
<template>
  <main class="error-page">
    <a href="/concept-01" class="wordmark">GAMBOL<span>®</span></a
    ><span class="small-label">{{ error.statusCode }}</span>
    <h1>Let’s get you<br />back on your feet.</h1>
    <p>
      {{
        error.statusCode === 404
          ? 'This page has wandered off. Your next favourite pair is still out there.'
          : 'We couldn’t load this page. Please try again in a moment.'
      }}
    </p>
    <button class="button button-dark" @click="clearError({ redirect: '/concept-01' })">
      Return to GAMBOL
    </button>
  </main>
</template>
<style scoped>
.error-page {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  text-align: center;
  background: oklch(0.97 0 0);
  color: oklch(0.2 0 0);
}
.wordmark {
  margin-bottom: 70px;
}
.small-label {
  margin-bottom: 18px;
}
h1 {
  font-size: clamp(40px, 6vw, 72px);
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -0.04em;
}
p {
  font-size: 14px;
  max-width: 370px;
  margin: 25px 0;
}
.button {
  margin-top: 10px;
}
</style>
