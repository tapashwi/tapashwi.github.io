/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0a0a0a",
          darker: "#050505",
          accent: "#00ff88",
          secondary: "#1a1a2e",
        },
      },
    },
  },
  plugins: [],
};
