import axios from "axios";

const fetchPokemonData = async (pokemon_name) => {
  let url = "https://pokeapi.co/api/v2/pokemon/";
  url += pokemon_name;
  console.log(url);
  const data = await axios.get(url);
  return data.data;
};

export default fetchPokemonData;
