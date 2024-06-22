/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { PokemonContext } from './PokemonContext';

const url = 'https://pokeapi.co/api/v2/pokemon?limit=150&offset=0';

const PokemonsList = () => {
  const { pokemons, capture, addPokemons, addSprites, pokemonImages } = useContext(PokemonContext);

  useEffect(() => {
    const fetchPokemonSprites = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        const allPKMdata = data.results;
        
        addPokemons(data.results);

        const imgUrls = [];

        for (let i = 0; i < allPKMdata.length; i++) {
          const pokemon = allPKMdata[i];
          const imgResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
          const imgData = await imgResponse.json();
          const imageUrl = imgData.sprites.other.showdown.front_default;
          imgUrls.push(imageUrl);
        }

        addSprites(imgUrls);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemonSprites();
  }, [addPokemons, addSprites]);

  return (
    <div className="pokemons-list">
      <h2>Pokemons List</h2>

      <table>
        <thead>
          <tr>
            <th>Pokemon</th>
            <th>Image</th>
            <th>Capture</th>
          </tr>
        </thead>
        <tbody>
          {pokemons.map((pokemon, index) => (
            <tr key={pokemon.name}>
              <td>{pokemon.name}</td>
              <td>
                {pokemonImages && pokemonImages[index] && (
                  <img src={pokemonImages[index]} alt={pokemon.name} style={{ width: '100px', height: '100px' }} />
                )}
              </td>
              <td>
                <button onClick={() => capture(pokemon)}>Capture</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PokemonsList;
