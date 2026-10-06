<script setup lang="ts">
const { base } = useConcept()
const { panel, toast } = useShop()
const email = ref('')
const subscribed = ref(false)
function subscribe() {
  subscribed.value = true
  toast('You’re on the list. Demo signup saved on this device.')
  try {
    localStorage.setItem('gambol-newsletter', email.value)
  } catch {}
}
</script>
<template>
  <footer class="app-footer">
    <div class="container footer-top">
      <div class="footer-intro">
        <NuxtLink :to="base" class="wordmark">GAMBOL<span>®</span></NuxtLink>
        <p>
          Comfort for wherever life takes you.<br /><span lang="th"
            >ก้าวที่สบาย ในสไตล์ที่เป็นคุณ</span
          >
        </p>
        <span class="footer-origin">Designed for life in Thailand.</span>
      </div>
      <div class="footer-links">
        <h3>Find your pair</h3>
        <NuxtLink :to="base + '/products?category=Men'">Men</NuxtLink
        ><NuxtLink :to="base + '/products?category=Women'">Women</NuxtLink
        ><NuxtLink :to="base + '/products?category=Kids'">Kids</NuxtLink
        ><NuxtLink :to="base + '/products'">Shop all footwear</NuxtLink>
      </div>
      <div class="footer-links">
        <h3>A little help</h3>
        <button @click="panel = 'stores'">Find a store</button
        ><button @click="panel = 'size'">Size guide</button
        ><button @click="panel = 'account'">My account</button
        ><NuxtLink :to="base + '#technology'">Our technology</NuxtLink>
      </div>
      <div class="newsletter">
        <h3>Good things, in your inbox.</h3>
        <p>Fresh drops, everyday inspiration, and a little more GAMBOL.</p>
        <form v-if="!subscribed" @submit.prevent="subscribe">
          <label class="sr-only" for="newsletter-email">Email address</label
          ><input
            id="newsletter-email"
            v-model="email"
            type="email"
            placeholder="Your email address"
            required
          /><button type="submit" aria-label="Subscribe to newsletter">
            <AppIcon name="right" />
          </button>
        </form>
        <p v-else class="success-text">
          <AppIcon name="check" :size="18" /> You’re on the list. Thank you!
        </p>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>© 2026 GAMBOL. A design exploration.</span><span>Thailand · English · THB ฿</span
      ><NuxtLink to="/overview"
        >Explore all five concepts<AppIcon name="arrow" :size="14"
      /></NuxtLink>
    </div>
  </footer>
</template>
