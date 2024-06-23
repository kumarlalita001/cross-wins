/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navyBlue: "#080329",
        lightBlue: "#87CEEB",
        darkGrey: "#333333",
        navyPink: "blue-900",
        "lalit-pink": "rgb(146 64 14)",
      },
    },
  },
  plugins: [],
};
