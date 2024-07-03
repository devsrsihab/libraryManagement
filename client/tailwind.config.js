/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(0 166 152 / var(--tw-text-opacity))",
        secondary: "#b35b3d",
        title: "#0D3D67",
        subtitle: "#0D3D67",
        accent: "rgb(0, 128, 96)",
      },
      fontFamily: {
        sans: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
