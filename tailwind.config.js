/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      boxShadow: {
        y: '0 0px 5px rgba(255, 255, 255, 0.5)',
      },
    },
  },
  plugins: [],
}
