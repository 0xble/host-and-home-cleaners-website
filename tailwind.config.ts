/* eslint-disable ts/no-require-imports */
import type { Config } from 'tailwindcss'
// import colors from 'tailwindcss/colors'

const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF385C',
          100: '#FFF0F1',
          200: '#FFF0F1', // Same as 100
          300: '#FFE2E5',
          400: '#FFCAD2',
          500: '#FF9FAC',
          600: '#FF6980',
          700: '#FF385C',
          800: '#ED1143',
          900: '#C80839',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontWeight: '200',
              color: '#000000',
            },
            h2: {
              fontWeight: '200',
              color: '#000000',
            },
            a: {
              'color': '#FF6980',
              'fontWeight': 'inherit',
              '&:hover': {
                textDecoration: 'underline',
              },
              '@media (prefers-color-scheme: dark)': {
                color: '#FF385C',
              },
            },
          },
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
} satisfies Config

export default config
