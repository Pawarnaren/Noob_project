/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        // Add more font families as needed
      },
      colors: {
        custom: '#caf0f8',
      },
    },
  },
  plugins: [],
}

