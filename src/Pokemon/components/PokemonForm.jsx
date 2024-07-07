import React, { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import { addNewGuy } from '../utilities/useAddNewGuy';

const PokemonForm = () => {
  
  const { addNewPokemon, pokemonName, setPokemonName } = useContext(PokemonContext);
  const { fetchNewPokemon } = addNewGuy();

  const handleNameOnChange = (event) => {
    setPokemonName(event.target.value.toLowerCase());
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!pokemonName.trim()) {
      alert('Please enter a Pokemon name');
      return;
    }

    const newPokemon = await fetchNewPokemon(pokemonName);

    if (newPokemon) {
      addNewPokemon(newPokemon);
      setPokemonName('');
    } else {
      alert('Pokemon not found');
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="pokemon name"
        value={pokemonName}
        onChange={handleNameOnChange}
      />
      <input type="submit" value="Add" />
    </form>
  );
};

export default PokemonForm;
