/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Geist', 'ui-sans-serif', 'system-ui'],
        display: ['Geist', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        citec: {
          ink: '#071526',
          'ink-soft': '#284156',
          navy: '#0d2742',
          blue: '#164b77',
          paper: '#f7fbfd',
          surface: '#ffffff',
          mist: '#eef5f8',
          line: '#d8e4eb',
          cyan: '#64c8df',
          violet: '#7770c9',
          warm: '#f5f1e8',
          success: '#2f8f77',
        },
      },
      borderRadius: {
        citec: '8px',
      },
      boxShadow: {
        soft: '0 24px 70px rgba(13, 39, 66, 0.10)',
        glass: '0 18px 48px rgba(13, 39, 66, 0.12)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
