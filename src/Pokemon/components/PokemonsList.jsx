/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';


const PokemonsList = () => {
  const { pokemons, capture, capturedPokemons } = useContext(PokemonContext);

  const handleCapture = (pokemon) => {
    capture(pokemon);
    console.log(pokemon);
    console.log(capturedPokemons);
  };

  return (
    <div className="pokemons-list">
      <h2>Pokemons List</h2>

      <table>
        <thead>
          <tr>
            <th>Pokemon</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {pokemons.map((pokemon) => (
            <tr key={pokemon.name}>
              <td>{pokemon.name}</td>
              <td>
                <img src={pokemon.imageUrl} alt={pokemon.name} style={{ width: '100px', height: '100px' }} />
              </td>
              <td>
                <button onClick={() => handleCapture(pokemon)}>Capture</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PokemonsList;
