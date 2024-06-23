import { useReducer } from 'react';
import { CAPTURE, RELEASE, ADD_POKEMON, ADD_POKEMONS, SET_POKEMON_NAME } from './actions';

const getCapturedPokemons = (capturedPokemons, releasedPokemon) =>
  capturedPokemons.filter((pokemon) => pokemon !== releasedPokemon);

const getPokemonsList = (pokemons, capturedPokemon) =>
  pokemons.filter((pokemon) => pokemon !== capturedPokemon);


const pokemonReducer = (state, action) => {
  const { type, pokemon, pokemons, name } = action;

  switch (type) {
    case CAPTURE:
      return {
        ...state,
        pokemons: getPokemonsList(state.pokemons, pokemon),
        capturedPokemons: [...state.capturedPokemons, pokemon],
      };

    case RELEASE:
      return {
        ...state,
        pokemons: [...state.pokemons, pokemon],
        capturedPokemons: getCapturedPokemons(state.capturedPokemons, pokemon),
      };

    case ADD_POKEMON:
      return {
        ...state,
        pokemons: [...state.pokemons, pokemon],
      };

    case ADD_POKEMONS:
      return {
        ...state,
        pokemons: [...state.pokemons, ...pokemons],
      };

    case SET_POKEMON_NAME:
      return {
        ...state,
        pokemonName: name,
      };

    default:
      return state;
  }
};

export const usePokemonReducer = () =>
  useReducer(pokemonReducer, {
    pokemons: [],
    capturedPokemons: [],
    pokemonName: '',
  });