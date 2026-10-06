import type { Config } from 'tailwindcss'

/** Design tokens — keep in sync with the CSS custom properties in assets/css/main.css (docs/design-strategy.md §3). */
export default <Partial<Config>>{
  content: ['./components/**/*.{vue,ts}', './layouts/**/*.vue', './pages/**/*.vue', './app.vue', './error.vue', './data/**/*.ts', './composables/**/*.ts'],
  theme: {
    screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1440px' },
    extend: {
      // Hex (not var()) so opacity modifiers like bg-paper/95 work. Mirrors :root tokens in main.css.
      colors: {
        paper: '#F7F4EE',
        'paper-2': '#EEE9E0',
        ink: '#17150F',
        'ink-2': '#3F3B33',
        muted: '#6B665C',
        line: '#DCD5C8',
        red: { DEFAULT: '#D42A1E', deep: '#A41E14' },
        lagoon: { DEFAULT: '#0F3A39', 2: '#1E5653' },
        sun: '#F3C443',
        sky: '#D6E6E3',
      },
      fontFamily: {
        sans: ['Archivo', 'Anuphan', 'system-ui', 'sans-serif'],
        thai: ['Anuphan', 'Archivo', 'system-ui', 'sans-serif'],
      },
      maxWidth: { site: '1440px', narrow: '1120px', prose: '62ch' },
      spacing: { gutter: 'var(--gutter)', section: 'var(--section-y)', header: 'var(--header-h)', tabbar: 'var(--tabbar-h)' },
      transitionTimingFunction: { out: 'cubic-bezier(.22,1,.36,1)' },
      zIndex: { header: '40', overlay: '60', toast: '80' },
    },
  },
}
