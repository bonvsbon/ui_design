<script setup lang="ts">
const site = useSite()
const email = ref('')
const done = ref(false)
function subscribe() {
  if (!email.value) return
  done.value = true
  email.value = ''
}
</script>

<template>
  <footer class="bg-ink text-paper">
    <div class="wrap pb-10 pt-16 lg:pt-24">
      <div class="grid gap-12 lg:grid-cols-12">
        <!-- Newsletter -->
        <div class="lg:col-span-5">
          <GambolLogo inverted />
          <h2 class="display-m mt-8 max-w-md">Step Into<br>Something Easy</h2>
          <p class="mt-4 max-w-sm font-thai text-white/70">รับข่าวคอลเลกชันใหม่ โปรโมชันสมาชิก และไอเดียแต่งตัวก่อนใคร</p>
          <form class="mt-6 flex max-w-md gap-2" @submit.prevent="subscribe">
            <label for="nl-email" class="sr-only">อีเมลของคุณ</label>
            <input id="nl-email" v-model="email" type="email" required autocomplete="email" placeholder="อีเมลของคุณ" class="field flex-1 border-white/20 bg-white/5 font-thai text-paper placeholder:text-white/50 focus:border-white">
            <button class="btn-light shrink-0" type="submit">Subscribe</button>
          </form>
          <p v-if="done" class="mt-3 font-thai text-sm text-sun" role="status">ขอบคุณ! เราจะส่งข่าวดีให้คุณเร็ว ๆ นี้</p>
        </div>

        <!-- Link columns -->
        <nav aria-label="Footer" class="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-span-7">
          <div v-for="col in site?.footer" :key="col.heading">
            <h3 class="eyebrow text-white/50">{{ col.heading }}</h3>
            <ul class="mt-4 space-y-3">
              <li v-for="l in col.links" :key="l.label">
                <NuxtLink :to="l.to" class="text-[0.95rem] text-white/85 transition-colors hover:text-white hover:underline underline-offset-4">{{ l.label }}</NuxtLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div class="mt-16 flex flex-col gap-6 border-t border-white/15 pt-8 md:flex-row md:items-center md:justify-between">
        <ul class="flex gap-2" aria-label="Social channels">
          <li v-for="s in site?.social" :key="s.icon">
            <a :href="s.href" target="_blank" rel="noopener" class="grid h-11 w-11 place-items-center rounded-full border border-white/20 transition-colors hover:bg-white hover:text-ink" :aria-label="s.label">
              <AppIcon :name="s.icon" :size="20" />
            </a>
          </li>
        </ul>
        <div class="font-thai text-sm text-white/55">
          <p>บริษัท แกมโบล (ประเทศไทย) · สมุทรสาคร · <a href="mailto:hello@gambol.co.th" class="underline-offset-4 hover:underline">hello@gambol.co.th</a> · 02-408-5074</p>
          <p class="mt-1">© 2026 GAMBOL. Concept design — not the live website.</p>
        </div>
      </div>
    </div>
  </footer>
</template>
