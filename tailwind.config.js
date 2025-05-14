/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '370px',
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },

    extend: {
      scrollSnapType:{
        y: 'y-mandatory'
      },
      scrollSnapAlign:{
        center: 'center'
      },
      opacity: {
        '0': '0',
        '10': '0.1',
        '20': '0.2',
        '30': '0.3',
        '40': '0.4',
        '50': '0.5',
        '60': '0.6',
        '70': '0.7',
        '80': '0.8',
        '90': '0.9',
        '100': '1'
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
  safelist: [
    {
      pattern: /^(bg|text|border)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)$/
    },
    {
      pattern: /^(bg|text|border)-opacity-([0-9]{1,2}|100)$/
    },
    {
      pattern: /^(bg|text|border)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)\/([0-9]{1,3})$/
    },
    {
      pattern: /^rounded(-none|-sm|-md|-lg|-xl|-2xl|-3xl|-full|)$/
    },
  ]
}
