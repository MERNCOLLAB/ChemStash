/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
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
        blue0: '#4F46E5',
        blue1: '#4338CA',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [],
  },
};
