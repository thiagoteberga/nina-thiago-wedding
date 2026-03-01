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
          50: '#fff5f7',
          100: '#ffe8ed',
          200: '#ffd1db',
          300: '#ffb3c6',
          400: '#ff8fa8',
          500: '#ff6b8a',
          600: '#e91e63',
          700: '#c2185b',
          800: '#ad1457',
          900: '#880e4f',
        },
        gold: {
          50: '#fff5f5',
          100: '#ffe0e0',
          200: '#ffc2c2',
          300: '#ff9999',
          400: '#ff6b6b',
          500: '#f44336',
          600: '#e53935',
          700: '#d32f2f',
          800: '#c62828',
          900: '#b71c1c',
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
