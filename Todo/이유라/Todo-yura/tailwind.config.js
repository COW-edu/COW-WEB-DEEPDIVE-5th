/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          black: '#434343',
          lime: '#EEFFE7',
          green: '#43DB7B',
        },
        secondary: {
          carrot: '#ffb96e',
          carrotShadow: '#f2a751',
          gray: '#939393',
        },
      },
    },
  },
  plugins: [],
};
