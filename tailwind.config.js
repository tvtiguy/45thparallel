/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'band-dark': '#1a1a2e',
        'band-accent': '#16213e',
        'band-highlight': '#e94560',
        'band-light': '#f5f5f5',
      },
      fontFamily: {
        'display': ['Bebas Neue', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
