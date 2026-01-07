/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bitcoin: '#f97316',
        'dark-bg': '#050505',
        'card-bg': '#0f1115',
      },
    },
  },
  plugins: [],
}
