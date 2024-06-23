export const addNewGuy = () => {
  const fetchPokemon = async (pokemonName) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      console.log(response)
      if (!response.ok) {
        throw new Error('Pokemon not found');
      }
      const data = await response.json();
      const pokemon = data;
      console.log(pokemon);
      const imageUrl = pokemon.sprites.other.showdown.front_shiny;

      return { ...pokemon, imageUrl };

    } catch (error) {
      console.error('Error fetching Pokemon:', error.message);
      return null;
    }
  };

  return { fetchPokemon };
};
