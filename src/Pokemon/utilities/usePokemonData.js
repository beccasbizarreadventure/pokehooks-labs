import { useEffect } from "react";

export const usePokemonData = (addPokemon) => {
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=15&offset=0');
        const data = await response.json();
        const allPKMdata = data.results;

        for (let i = 0; i < allPKMdata.length; i++) {
          const pokemon = allPKMdata[i];
          const imgResponse = await fetch(pokemon.url); 
          const imgData = await imgResponse.json();
          const imageUrl = imgData.sprites.other.showdown.front_shiny;

          addPokemon({ ...pokemon, imageUrl });
        }
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemon();
  }, [addPokemon]);
};