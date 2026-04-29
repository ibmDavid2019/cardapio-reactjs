/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage:{
        "home": "url('../../public/assets/bg.png')"
      }
    },
  },
  plugins: [],
}

