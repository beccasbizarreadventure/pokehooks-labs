export const addNewGuy = () => {
  const fetchNewPokemon = async (pokemonName) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      console.log(response)
      if (!response.ok) {
        throw new Error('Pokemon not found');
      }
      const data = await response.json();
      const pokemon = data.name;
      console.log(pokemon);
      const imageUrl = data.sprites.other.showdown.front_shiny;

      return { name: pokemon, url:`https://pokeapi.co/api/v2/pokemon/${data.id}`, imageUrl: imageUrl };

    } catch (error) {
      console.error('Error fetching Pokemon:', error.message);
      return null;
    }
  };

  return { fetchNewPokemon };
};
