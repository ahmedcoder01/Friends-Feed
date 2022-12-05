/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#0075ff",
        "secondary": "#ffed4a",
        "black": "#222222",
      },






    },
  },


  plugins: [require("daisyui")],
}
