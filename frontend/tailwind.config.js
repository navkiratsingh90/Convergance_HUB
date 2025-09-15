/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        oceanBlue: "#1CA9C9",
        sunsetOrange: "#FF4500",
        forestGreen: "#228B22",
        lavender: "#E6E6FA",
        golden: "#FFD700",
        midnight: "#191970",
        coralPink: "#FF7F50",
        customGray: "#3A3A3A",
      },
    },
  },
  plugins: [],
}

