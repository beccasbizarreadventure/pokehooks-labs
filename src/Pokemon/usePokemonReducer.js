import { useReducer } from 'react';
import { CAPTURE, RELEASE, ADD_POKEMON, ADD_POKEMONS } from './actions';

const getCapturedPokemons = (capturedPokemons, releasedPokemon) =>
  capturedPokemons.filter((pokemon) => pokemon !== releasedPokemon);

const releasePokemon = (releasedPokemon, state) => ({
  pokemons: [...state.pokemons, releasedPokemon],
  capturedPokemons: getCapturedPokemons(state.capturedPokemons, releasedPokemon),
  pokemonImages: state.pokemonImages
});

// const getPokemonsList = (pokemons, capturedPokemon) =>
//   pokemons.filter((pokemon) => pokemon !== capturedPokemon);

const capturePokemon = (pokemon, state) => { 
  return {
    pokemons: state.pokemons.filter(capturedPokemon => capturedPokemon !== pokemon),
    capturedPokemons: [...state.capturedPokemons, pokemon],
    pokemonImages: [...state.pokemonImages, pokemon.imageUrl],
  };
};

const addPokemon = (pokemon, state) => ({
  pokemons: [...state.pokemons, pokemon],
  capturedPokemons: state.capturedPokemons,
  pokemonImages: state.pokemonImages
});


const addPokemons = (pokemon, state) => ({
  pokemons: [...state.pokemons, pokemon],
  capturedPokemons: state.capturedPokemons,
  pokemonImages: [...state.pokemonImages, pokemon.imageUrl],
});

const pokemonReducer = (state, action) => {
  switch (action.type) {
    case CAPTURE:
      return capturePokemon(action.pokemon, state);
    case RELEASE:
      return releasePokemon(action.pokemon, state);
    case ADD_POKEMON:
      return addPokemon(action.pokemon, state);
    case ADD_POKEMONS:
      return addPokemons(action.pokemons, state);
    default:
      return state;
  }
};

export const usePokemonReducer = () =>
  useReducer(pokemonReducer, {
    pokemons: [],
    capturedPokemons: [],
    pokemonImages: [],
  });
