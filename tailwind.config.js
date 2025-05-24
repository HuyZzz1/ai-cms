/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xxl: { max: "1600px" },
        xl: { max: "1440px" },
        mlg: { max: "1280px" },
        lg: { max: "1025px" },
        md: { max: "768px" },
        sm: { max: "576px" },
        xs: { max: "425px" },
      },
    },
  },
  plugins: [],
};
