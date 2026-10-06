/** v-reveal: fade/rise content once it enters the viewport. No-op without IntersectionObserver or with reduced motion. */
export default defineNuxtPlugin((nuxtApp) => {
  let io: IntersectionObserver | null = null
  const getIO = () => {
    if (io || typeof IntersectionObserver === 'undefined') return io
    io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io!.unobserve(e.target) }
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
    return io
  }
  nuxtApp.vueApp.directive('reveal', {
    getSSRProps: () => ({}),
    mounted(el: HTMLElement, binding) {
      const obs = getIO()
      if (!obs || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      // Skip elements already on screen at load so nothing flashes above the fold
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return
      el.classList.add('reveal')
      if (binding.value) el.style.transitionDelay = `${binding.value}ms`
      obs.observe(el)
    },
  })
})
