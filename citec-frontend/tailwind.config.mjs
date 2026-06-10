/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--citec-font-sans)'],
        display: ['var(--citec-font-display)'],
      },
      colors: {
        'primary-text': 'rgb(var(--color-primary-text-rgb) / <alpha-value>)',
        'secondary-text': 'rgb(var(--color-secondary-text-rgb) / <alpha-value>)',
        'muted-text': 'rgb(var(--color-muted-text-rgb) / <alpha-value>)',
        'accent-text': 'rgb(var(--color-accent-text-rgb) / <alpha-value>)',
        'page-bg': 'rgb(var(--color-page-bg-rgb) / <alpha-value>)',
        surface: 'rgb(var(--color-surface-rgb) / <alpha-value>)',
        'surface-muted': 'rgb(var(--color-surface-muted-rgb) / <alpha-value>)',
        'border-subtle': 'rgb(var(--color-border-subtle-rgb) / <alpha-value>)',
        'action-bg': 'rgb(var(--color-action-bg-rgb) / <alpha-value>)',
        'action-bg-hover': 'rgb(var(--color-action-bg-hover-rgb) / <alpha-value>)',
        'action-text': 'rgb(var(--color-action-text-rgb) / <alpha-value>)',
        citec: {
          ink: 'rgb(var(--citec-ink-rgb) / <alpha-value>)',
          'ink-soft': 'rgb(var(--citec-ink-soft-rgb) / <alpha-value>)',
          navy: 'rgb(var(--citec-navy-rgb) / <alpha-value>)',
          blue: 'rgb(var(--citec-blue-rgb) / <alpha-value>)',
          paper: 'rgb(var(--citec-paper-rgb) / <alpha-value>)',
          surface: 'rgb(var(--citec-surface-rgb) / <alpha-value>)',
          mist: 'rgb(var(--citec-mist-rgb) / <alpha-value>)',
          line: 'rgb(var(--citec-line-rgb) / <alpha-value>)',
          cyan: 'rgb(var(--citec-cyan-rgb) / <alpha-value>)',
          violet: 'rgb(var(--citec-violet-rgb) / <alpha-value>)',
          warm: 'rgb(var(--citec-warm-rgb) / <alpha-value>)',
          success: 'rgb(var(--citec-success-rgb) / <alpha-value>)',
        },
      },
      borderRadius: {
        citec: 'var(--citec-radius)',
        'citec-lg': 'var(--citec-radius-lg)',
      },
      boxShadow: {
        soft: 'var(--citec-shadow-soft)',
        glass: 'var(--citec-shadow-glass)',
      },
      transitionTimingFunction: {
        premium: 'var(--citec-ease)',
      },
    },
  },
  plugins: [],
};
