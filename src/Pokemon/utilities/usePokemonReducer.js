import { useReducer, useEffect } from 'react';
import { CAPTURE, RELEASE, ADD_NEW_POKEMON, ADD_POKEMONS, SET_POKEMON_NAME } from './actions';
import { capturedPokemonsKey, pokemonsKey, capturedPokemonsExists, getCapturedPokemons, getPokemonsList } from './stateHelpersConstants';

const pokemonReducer = (state, action) => {
  const { type, pokemon, pokemons, name } = action;

  switch (type) {
    case CAPTURE:
      const newCapturedPokemons = [...state.capturedPokemons, pokemon];
      return {
        ...state,
        pokemons: getPokemonsList(state.pokemons, pokemon),
        capturedPokemons: newCapturedPokemons,
      };

    case RELEASE:
      const updatedCapturedPokemons = getCapturedPokemons(state.capturedPokemons, pokemon);
      return {
        ...state,
        pokemons: [...state.pokemons, pokemon],
        capturedPokemons: updatedCapturedPokemons,
      };

    case ADD_NEW_POKEMON:
      const updatedWithNewPokemon = [...state.pokemons, pokemon];
      localStorage.setItem(pokemonsKey, JSON.stringify(updatedWithNewPokemon));
      return {
        ...state,
        pokemons: updatedWithNewPokemon,
      };

    case ADD_POKEMONS:
      const removedCapturedPokemons = pokemons.filter(newPokemon =>
        !capturedPokemonsExists(state.capturedPokemons, newPokemon)
      );
      return {
        ...state,
        pokemons: removedCapturedPokemons,
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

export const usePokemonReducer = () => {
  const initialState = {
    pokemons: JSON.parse(localStorage.getItem(pokemonsKey)) || [],
    capturedPokemons: JSON.parse(localStorage.getItem(capturedPokemonsKey)) || [],
    pokemonName: '',
  };

  const [state, dispatch] = useReducer(pokemonReducer, initialState);

  console.log('Initial pokemons state', state.pokemons);
  console.log('Initial captured pokemons state', state.capturedPokemons);

  useEffect(() => {
    console.log('Updating capturedPokemons in localStorage:', state.capturedPokemons);
    localStorage.setItem(capturedPokemonsKey, JSON.stringify(state.capturedPokemons));
  }, [state.capturedPokemons]);

  useEffect(() => {
    console.log('Updating pokemons in localStorage:', state.pokemons);
    localStorage.setItem(pokemonsKey, JSON.stringify(state.pokemons));
  }, [state.pokemons]);

  return [state, dispatch];
};