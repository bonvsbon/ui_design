import type { Config } from 'tailwindcss'

/**
 * Design tokens.
 * Every concept defines the same CSS custom properties (see assets/css/main.css),
 * so one utility vocabulary (bg-bg, text-ink, rounded-card, font-display…) renders
 * five different visual systems without per-concept Tailwind configs.
 */
export default <Partial<Config>>{
  content: [
    './components/**/*.{vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.ts',
    './data/**/*.ts',
    './app.vue',
  ],
  theme: {
    screens: {
      xs: '420px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        ink: 'var(--ink)',
        'ink-2': 'var(--ink-2)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        accent: 'var(--accent)',
        'accent-ink': 'var(--accent-ink)',
        'accent-text': 'var(--accent-text)',
        'accent-2': 'var(--accent-2)',
        'accent-2-ink': 'var(--accent-2-ink)',
        sale: 'var(--sale)',
        inverse: 'var(--inverse)',
        'inverse-ink': 'var(--inverse-ink)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
        mono: 'var(--font-mono)',
      },
      borderRadius: {
        btn: 'var(--r-btn)',
        card: 'var(--r-card)',
        media: 'var(--r-media)',
        chip: 'var(--r-chip)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        pop: 'var(--shadow-pop)',
      },
      maxWidth: {
        site: 'var(--container)',
        prose: '62ch',
      },
      spacing: {
        gutter: 'var(--gutter)',
        section: 'var(--section-y)',
        nav: 'var(--nav-h)',
        tabbar: 'var(--tabbar-h)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(.22,1,.36,1)',
        snap: 'cubic-bezier(.65,0,.35,1)',
      },
    },
  },
}
