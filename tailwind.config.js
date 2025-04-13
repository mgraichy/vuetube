/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        // defined in src/assets/main.css:
        vue: 'rgb(var(--color-vue))',
      },
    },
  },
  plugins: [],
}
