/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'media',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'RubikMono': ['Rubik Mono One', 'monospace'],
        'Rubik': ['Rubik', 'sans-serif'],
      }
    },
  },
  plugins: [],
}