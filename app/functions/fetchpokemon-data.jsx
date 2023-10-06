import axios from "axios";

const fetchPokemonData = async (pokemon_name) => {
  let url = "https://pokeapi.co/api/v2/pokemon/";
  url += pokemon_name;
  console.log(url);
  const data = await axios.get(url);
  url = data.data.species.url;
  const speciesdata = await axios.get(url);
  const textentry = speciesdata.data.flavor_text_entries;
  let english = [];
  for (let i = 0; i < textentry.length && i < 3; i++) {
    if (textentry[i].language.name === "en") {
      var text = textentry[i].flavor_text;
      text = text.replace(/\n/g, " ");
      text = text.replace(/[\u000c]/g, " ");
      english.push(text);
    }
  }
  english = english.filter((item, index) => english.indexOf(item) === index);

  let newdata = data.data;

  newdata["text_entry"] = english;
  console.log(newdata);

  return newdata;
};

export default fetchPokemonData;
