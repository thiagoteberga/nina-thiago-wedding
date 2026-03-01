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
          50: '#fdf5f7',
          100: '#f9e6eb',
          200: '#f5d6dd',
          300: '#eeb6c3',
          400: '#e89aac',
          500: '#e27e95',
          600: '#d6637d',
          700: '#c04965',
          800: '#aa2f4d',
          900: '#8a1f3a',
        },
        gold: {
          50: '#fef2f2',
          100: '#fdd8d8',
          200: '#fab6b6',
          300: '#f58989',
          400: '#e65555',
          500: '#c72928',
          600: '#b01f1e',
          700: '#991818',
          800: '#7d1313',
          900: '#5f0e0e',
        },
      },
      fontFamily: {
        'lavonia': ['Lavonia', 'cursive'],
        'alice': ['var(--font-alice)', 'serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
