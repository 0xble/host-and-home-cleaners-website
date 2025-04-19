/* eslint-disable ts/no-require-imports */
import type { Config } from 'tailwindcss'

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
    screens: {
      'xs': '360px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1400px',
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        'xs': '360px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        shade: {
          DEFAULT: '#222222',
          light: '#FFFFFF',
          dark: '#222222',
        },
        neutral: {
          DEFAULT: '#5E5E5E',
          50: '#F7F7F7',
          100: '#EBEBEB',
          200: '#DDDDDD',
          300: '#D3D3D3',
          400: '#C2C2C2',
          500: '#B0B0B0',
          600: '#717171',
          700: '#5E5E5E',
          800: '#4B4B4B',
          900: '#383838',
        },
        primary: {
          DEFAULT: '#FF385C', // Same as 700
          50: '#FFF0F1',
          100: '#FFE2E5',
          200: '#FFE2E5',
          300: '#FFE2E5',
          400: '#FFCAD2',
          500: '#FF9FAC',
          600: '#FF6980',
          700: '#FF385C',
          800: '#ED1143',
          900: '#C80839',
          foreground: 'hsl(var(--primary-foreground))',
        },
        error: {
          DEFAULT: '#C13515',
          light: '#FEF8F6',
          dark: '#C13515',
        },
        accent: {
          DEFAULT: '#D03660',
          light: '#F6D7DF',
          dark: '#D03660',
          foreground: 'hsl(var(--accent-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: '#C13515',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: '#F7F7F7',
          foreground: '#717171',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        success: '#008A05',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontWeight: 'inherit',
            },
            h2: {
              fontWeight: 'inherit',
            },
            a: {
              fontWeight: 'inherit',
              textDecoration: 'none',
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
      gradientColorStops: {
        gradient: {
          start: '#D33753',
          middle: '#D13660',
          end: '#C72D65',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
} satisfies Config

export default config
