const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["**/*.{ejs, js}", "**/**/*.{ejs, js}"],
  theme: {
    screens: {
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        'primary-color': '0fa'
      }
    },
  },
  plugins: [],
}
