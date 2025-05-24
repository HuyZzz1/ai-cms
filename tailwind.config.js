/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "xs-min": "426px",
        "sm-min": "577px",
        "md-min": "769px",
        "lg-min": "1026px",
        "mlg-min": "1281px",
        "xl-min": "1441px",
        "xxl-min": "1601px",

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
