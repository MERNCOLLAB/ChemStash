/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mainBackGroundColor: '#111827',
        columnBackGroundColor: '#1f2937',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [],
  },
};
