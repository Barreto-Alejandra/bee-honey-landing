// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}", 
    "./public/index.html"
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
      },
      colors: {
        amber: {
          400: "#F6C134",
          600: "#D39B17",
          700: "#AF7D0D",
          800: "#8F630C",
        },
        honey: {
          light: "#FFFDF9",
        },
        moss: {
          600: "#6F8A3B",
          800: "#4B5E2A",
        },
        yellow: {
          700: "#B07A10",
        },
        gray: {
          light: "#FBF8EF",
        },
      },
      fontFamily: {
        heading: ["'Playfair Display'", "serif"],
        body: ["'Inter'", "sans-serif"],
        cursive: ["'Pacifico'", "cursive"],
      },
    },
  },
  plugins: [],
};

