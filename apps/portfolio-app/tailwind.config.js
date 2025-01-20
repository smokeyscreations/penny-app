/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./apps/portfolio-app/src/**/*.{html,ts,scss,css}"],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-primeui')],
}

