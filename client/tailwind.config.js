/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#e59285',
        secondary: '#3c3c3c',
        accent: 'rgb(0, 128, 96)',
      },
      fontFamily:{
        poppins: ['Poppins', 'sans-serif'],
      }
    },
  },
  daisyui: {
    themes: ["light", "dark"],
  },
  plugins: [require("daisyui")],
}