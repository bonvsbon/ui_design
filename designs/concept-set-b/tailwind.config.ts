import type { Config } from 'tailwindcss'
export default <Partial<Config>>{
  content: ['./components/**/*.vue', './pages/**/*.vue', './layouts/**/*.vue', './app.vue'],
  theme: {
    extend: {
      fontFamily: { sans: ['Manrope', 'Noto Sans Thai', 'sans-serif'] },
      colors: { brand: 'var(--accent)', ink: 'var(--ink)' },
    },
  },
}
