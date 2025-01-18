/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      scrollSnapType:{
        y: 'y-mandatory'
      },
      scrollSnapAlign:{
        center: 'center'
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}
