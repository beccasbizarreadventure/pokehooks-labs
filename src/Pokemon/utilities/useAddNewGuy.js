import axios from "axios";

export const addNewGuy = () => {
  const fetchNewPokemon = async (pokemonName) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      console.log(response)
      if (!response.data) {
        throw new Error('Pokemon not found');
      }
      const data = response.data;
      const {name, id, types, sprites } = data;
      const imageUrl = sprites.other.showdown.front_default;
      const type = types[0].type.name;
      return { id: id, name: name, url:`https://pokeapi.co/api/v2/pokemon/${id}`, imageUrl: imageUrl, type: type };

    } catch (error) {
      console.error('Error fetching Pokemon:', error.message);
      return null;
    }
  };

  return { fetchNewPokemon };
};
