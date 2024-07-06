export const capturedPokemonsKey = 'capturedPokemons';
export const pokemonNameKey = 'pokemonName';
export const pokemonsKey = 'pokemons';

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