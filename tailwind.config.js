/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          50: '#fdfcfb',
          100: '#faf8f5',
          200: '#f5f0e8',
          300: '#ebe3d5',
          400: '#dfd4bf',
          500: '#d4c5aa',
          600: '#c4af8e',
          700: '#a68f6d',
          800: '#8a7558',
          900: '#6f5e47',
        },
        gold: {
          50: '#fdfbf7',
          100: '#faf6ed',
          200: '#f5ead1',
          300: '#ecd9a8',
          400: '#e0c47d',
          500: '#d4ae5a',
          600: '#b8923d',
          700: '#9a7732',
          800: '#7d602c',
          900: '#654f27',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
