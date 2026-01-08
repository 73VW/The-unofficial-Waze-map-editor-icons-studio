/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './main.js',
    './src/**/*.{js,ts,jsx,tsx,scss,css}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
