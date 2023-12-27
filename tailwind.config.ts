import { gridAutoFill } from './tailwind.plugins';
import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
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
        primary: '#1ed760',
      },

      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },

      keyframes: {
        'enter-in': {
          to: { transform: 'translateY(0px)', opacity: '1' },
        },

        'accordion-down': {
          from: { height: '0px' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },

        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0px' },
        },
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'enter-in': 'enter-in 0.2s ease-in forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@shrutibalasa/tailwind-grid-auto-fit'), gridAutoFill],
} satisfies Config;
