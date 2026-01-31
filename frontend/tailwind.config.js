/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sps-blue': '#000260',
        'sps-yellow': '#FCDA35',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}