import { useEffect } from "react";

export const usePokemonData = (addPokemons) => {
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=15&offset=0');
        const data = await response.json();
        const allPKMdata = data.results;

        // Create an array of promises where each promise fetches a Pokemon's data (imgData) and constructs an object { ...pokemon, imageUrl }
        const promises = allPKMdata.map(async (pokemon) => {
          const imgResponse = await fetch(pokemon.url);
          const imgData = await imgResponse.json();
          const imageUrl = imgData.sprites.other.showdown.front_shiny;

          return { ...pokemon, imageUrl };
        });

        // Wait for all promises to resolve
        const pokemonData = await Promise.all(promises);
        
        // Add all fetched Pokemon data at once
        addPokemons(pokemonData);
        console.log(pokemonData);
        
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemon();
  }, [addPokemons]);
};