/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./src/**/*.css"],
  theme: {
    extend: {
      colors: {
        customRed: '#EF233C',
        customBlue: '#003566',
        customLight: '#F9F7F3',
        customGreen: '#386641',
        customBlueFilter:'#124A7D'
      },
    },
  },
  plugins: [],
};
