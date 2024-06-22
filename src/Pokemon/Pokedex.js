import React, { useContext } from 'react';
import { PokemonContext } from './PokemonContext';

const Pokedex = () => {
  const { capturedPokemons, pokemonImages, release } = useContext(PokemonContext);

  const handleRelease = (pokemon) => {
    release(pokemon);
  };

  return (
    <div className="pokedex">
      <h2>Pokedex</h2>

      <table>
        <thead>
          <tr>
            <th>Pokemon</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {capturedPokemons.map((pokemon, index) => (
            <tr key={pokemon.name}>
              <td>{pokemon.name}</td>
              <td>
                {pokemonImages && pokemonImages[index] && (
                  <img src={pokemonImages[index]} alt={pokemon.name} style={{ width: '100px', height: '100px' }} />
                )}
              </td>
              <td>
                <button onClick={() => handleRelease(pokemon)}>Release</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pokedex;
