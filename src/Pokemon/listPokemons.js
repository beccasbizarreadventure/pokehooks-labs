import { useEffect } from "react";

export const usePokemonData = (addPokemons, addSprites) => {
  useEffect(() => {
    const fetchPokemonSprites = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=15&offset=0');
        const data = await response.json();
        const allPKMdata = data.results;
        const imgUrls = [];

        for (let i = 0; i < allPKMdata.length; i++) {
          const pokemon = allPKMdata[i];
          const imgResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
          const imgData = await imgResponse.json();
          const imageUrl = imgData.sprites.other.showdown.front_default;
          imgUrls.push(imageUrl);
        }
        addPokemons(allPKMdata);
        addSprites(imgUrls);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemonSprites();
  }, []);
};