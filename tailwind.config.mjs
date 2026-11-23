/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ink: '#09090B',
        surface: '#111113',
        line: '#27272A',
        emerald: {
          400: '#34D399',
          500: '#10B981',
          950: '#052E16',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        md: '1rem',
        lg: '1.5rem',
        xl: '1.75rem',
        '2xl': '2rem',
        '3xl': '2.25rem',
      },
      boxShadow: {
        'glass-inset': 'inset 0 1px 0 rgba(255,255,255,.16)',
        'glass-depth': '0 24px 80px rgba(0,0,0,.32)',
      },
      backgroundImage: {
        'hero-grid': 'linear-gradient(rgba(63,63,70,.22) 1px, transparent 1px), linear-gradient(90deg, rgba(63,63,70,.22) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
