export const capturedPokemonsKey = 'capturedPokemons';
export const pokemonsKey = 'pokemons';

//Array.some tests whether at least one element in the array passes the test implemented by the provided function. 
//It returns true if, in the array, it finds an element for which the provided function returns true; 
//otherwise it returns false. It doesn't modify the array
export const capturedPokemonsExists = (capturedPokemons, newPokemon) => {
  return capturedPokemons.some(pokemon => pokemon.name === newPokemon.name);
};

export const getCapturedPokemons = (capturedPokemons, releasedPokemon) => {
  const updatedCapturedPokemons = capturedPokemons.filter((pokemon) => pokemon !== releasedPokemon);
  localStorage.setItem(capturedPokemonsKey, JSON.stringify(updatedCapturedPokemons));
  return updatedCapturedPokemons;
};

export const getPokemonsList = (pokemons, capturedPokemon) => {
  const updatedPokemons = pokemons.filter((pokemon) => pokemon !== capturedPokemon);
  localStorage.setItem(pokemonsKey, JSON.stringify(updatedPokemons));
  return updatedPokemons;
};