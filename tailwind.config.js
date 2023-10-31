/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        black: "#000",
        gray: "rgba(255, 255, 255, 0.75)",
      },
      spacing: {},
      fontFamily: {
        "whyte-inktrap": "'Whyte Inktrap'",
        inter: "Inter",
        "source-sans-pro": "'Source Sans Pro'",
        "milky-way":"'Milky Way'",
        "stars":"'Stars'",
      },
    },
    fontSize: {
      "5xl": "1.5rem",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: false,
  },
};
