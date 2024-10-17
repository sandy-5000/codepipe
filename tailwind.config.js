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
        light: '0 0 3px rgba(255, 255, 255, 0.5)',
        normal: '0 0 6px rgba(255, 255, 255, 0.5)',
      },
    },
  },
  plugins: [],
}
