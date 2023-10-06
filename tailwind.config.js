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
      pokemonTypesColors: {
        Normal: "#A8A878", // Normal type - Grey
        Fire: "#F08030", // Fire type - Orange
        Water: "#6890F0", // Water type - Blue
        Electric: "#F8D030", // Electric type - Yellow
        Grass: "#78C850", // Grass type - Green
        Ice: "#98D8D8", // Ice type - Light Blue
        Fighting: "#C03028", // Fighting type - Red
        Poison: "#A040A0", // Poison type - Purple
        Ground: "#E0C068", // Ground type - Brown
        Flying: "#A890F0", // Flying type - Indigo
        Psychic: "#F85888", // Psychic type - Pink
        Bug: "#A8B820", // Bug type - Lime
        Rock: "#B8A038", // Rock type - Tan
        Ghost: "#705898", // Ghost type - Lavender
        Dragon: "#7038F8", // Dragon type - Dark Blue
        Dark: "#705848", // Dark type - Dark Gray
        Steel: "#B8B8D0", // Steel type - Silver
        Fairy: "#EE99AC", // Fairy type - Light Pink
      },
    },
  },
  plugins: [],
};
