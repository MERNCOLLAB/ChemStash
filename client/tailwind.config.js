/** @type {import('tailwindcss').Config} */
import { tagColorUtilities } from './src/helpers/TagColors';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 25s linear infinite',
        marquee2: 'marquee2 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },

      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      fontWeight: {
        base: '400',
        semibold: '600',
      },
      fontSize: {
        xs: '10px',
        sm: '12px',
        base: '16px',
        md: '22px',
      },
      colors: {
        mainBackGroundColor: '#111827',
        columnBackGroundColor: '#1f2937',
        white0: '#F8FAFC',
        white1: '#F1F5F9',
        gray0: '#E2E8F0',
        gray1: '#94A3B8',
        gray2: '#64748B',
        blue0: '#4DA0D6',
        blue1: '#0072b2',
        success: '#10B981',
        danger: '#F43F5E',
        column1: '#64748B',
        column2: '#F59E0B',
        column3: '#0EA5E9',
        column4: '#F43F5E',
        column5: '#14B8A6',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('daisyui'),
    ({ addUtilities }) => {
      addUtilities(tagColorUtilities);
    },
  ],
  daisyui: {
    themes: [],
  },
};
