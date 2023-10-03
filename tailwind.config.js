/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "BG-green": "#7AC74F",
      "primary-blue": "#05C8FF",
      "primary-red": "#EC1313",
      "secondary-blue": "#71E0FF",
      "menu-block": "#FFC979",
      "pkemon-yellow": "#FFCC3C",
      "pkemon-blue": "#396BB7",
      "dpad-grey": "#3d3d3d",
    },
    fontFamily: {
      Just_Me_Again_Down_Here: ["Just Me Again Down Here"],
      Chakra_Petch: ["Chakra Petch", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        pokedex: "url(/pokedex-copy.svg)",
      },
    },
  },
  plugins: [],
};
