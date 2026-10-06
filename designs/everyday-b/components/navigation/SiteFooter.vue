<script setup lang="ts">
import { footerGroups } from '~/data/site'
const email = ref('')
const submitted = ref(false)
const error = ref('')
function subscribe() {
  error.value = ''
  try {
    localStorage.setItem('gambol-reef-newsletter', email.value)
    submitted.value = true
  } catch {
    error.value = 'Your browser could not save this preference. Please try again.'
  }
}
</script>
<template>
  <footer class="site-footer">
    <div class="newsletter container">
      <div>
        <h2>LET THE GOOD DAYS FIND YOU.</h2>
        <p>A little style, new arrivals, and something good in your inbox.</p>
      </div>
      <form @submit.prevent="subscribe">
        <label for="newsletter-email" class="sr-only">Email address</label>
        <div v-if="!submitted" class="newsletter-input">
          <input
            id="newsletter-email"
            v-model="email"
            type="email"
            placeholder="Your email address"
            autocomplete="email"
            required
          /><button aria-label="Subscribe to the newsletter"><AppIcon name="arrow" /></button>
        </div>
        <p v-else role="status">You're on the list, in this preview. Thanks for stopping by!</p>
        <small v-if="!submitted"
          >By signing up, you agree to our
          <NuxtLink to="/support#privacy">privacy notice</NuxtLink>.</small
        >
        <p v-if="error" role="alert">{{ error }}</p>
      </form>
    </div>
    <div class="footer-links container">
      <div class="footer-brand">
        <BrandLogo />
        <p>Comfort for wherever<br />the day takes you.</p>
        <p lang="th">สบายทุกก้าว ไปกับแกมโบล</p>
        <div class="social-icons">
          <a
            href="https://www.facebook.com/GAMBOLThailand"
            aria-label="GAMBOL on Facebook"
            target="_blank"
            rel="noopener"
            ><AppIcon name="facebook" /></a
          ><a
            href="https://www.instagram.com/gambolthailand/"
            aria-label="GAMBOL on Instagram"
            target="_blank"
            rel="noopener"
            ><AppIcon name="instagram"
          /></a>
        </div>
      </div>
      <div v-for="group in footerGroups" :key="group.title" class="footer-group">
        <h3>{{ group.title }}</h3>
        <NuxtLink v-for="link in group.links" :key="link[0]" :to="link[1]">{{ link[0] }}</NuxtLink>
      </div>
    </div>
    <div class="footer-bottom container">
      <span>© {{ new Date().getFullYear() }} GAMBOL. Everyday feels better.</span
      ><span>Thailand · THB ฿</span><NuxtLink to="/studio">Concept studio</NuxtLink>
    </div>
    <div class="concept-note">
      Independent design concept. Products, prices, inventory and checkout are illustrative.
    </div>
  </footer>
</template>
