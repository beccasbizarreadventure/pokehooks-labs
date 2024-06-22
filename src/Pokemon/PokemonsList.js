/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import { PokemonContext } from './PokemonContext';
import {usePokemonData} from './listPokemons';

const PokemonsList = () => {
  const { pokemons, capture, addPokemons, addSprites, pokemonImages } = useContext(PokemonContext);
  usePokemonData(addPokemons, addSprites);

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
