/** @type {import('tailwindcss').Config} */
module.exports = {
  content:  ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      linearGradients: {
        'bg1': ['226deg', 'rgba(255, 255, 255, 1) 22.92%', 'rgbargba(255, 255, 255, 1) 52.08%', 'rgba(255, 255, 255, 1) 100%'],
      },
      colors: {
        
        yellowish: {
          DEFAULT: '#FFC107',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-gradients'),
  ],
}