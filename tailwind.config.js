/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray-950': '#1e1e1e',
        'darkBlue': '#001D4A',
      },
      fontFamily: {
        arial: ['Arial', 'sans-serif'], // Added Arial font
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      display: ["focus-group"], // Fixed typo ("focus-grpup" to "focus-group")
    },
  },
};
