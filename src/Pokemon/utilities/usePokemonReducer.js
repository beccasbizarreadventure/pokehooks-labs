import { useReducer, useEffect } from 'react';
import { CAPTURE, RELEASE, ADD_NEW_POKEMON, ADD_POKEMONS, SET_POKEMON_NAME } from './actions';
import { capturedPokemonsKey, pokemonsKey, pokemonNameKey, pokemonExists, capturedPokemonsExists, getCapturedPokemons, getPokemonsList } from './stateHelpersConstants';

const pokemonReducer = (state, action) => {
  const { type, pokemon, pokemons, name } = action;

  switch (type) {
    case CAPTURE:
      const newCapturedPokemons = [...state.capturedPokemons, pokemon];
      localStorage.setItem(capturedPokemonsKey, JSON.stringify(newCapturedPokemons));
      return {
        ...state,
        pokemons: getPokemonsList(state.pokemons, pokemon),
        capturedPokemons: newCapturedPokemons,
      };

    case RELEASE:
      const updatedCapturedPokemons = getCapturedPokemons(state.capturedPokemons, pokemon);
      localStorage.setItem(capturedPokemonsKey, JSON.stringify(updatedCapturedPokemons));
      return {
        ...state,
        pokemons: [...state.pokemons, pokemon],
        capturedPokemons: updatedCapturedPokemons,
      };

    case ADD_NEW_POKEMON:
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

export const usePokemonReducer = () => {
  const initialState = {
    pokemons: [],
    capturedPokemons: JSON.parse(localStorage.getItem(capturedPokemonsKey)) || [], 
    pokemonName: '',
  };

  const [state, dispatch] = useReducer(pokemonReducer, initialState);

  useEffect(() => {
    localStorage.setItem(capturedPokemonsKey, JSON.stringify(state.capturedPokemons));
  }, [state.capturedPokemons]);

  useEffect(() => {
    localStorage.setItem(pokemonsKey, JSON.stringify(state.pokemons));
  }, [state.pokemons]);

  return [state, dispatch];
};

// import { useReducer } from 'react';
// import { CAPTURE, RELEASE, ADD_POKEMON, ADD_POKEMONS, SET_POKEMON_NAME } from './actions';

// const getCapturedPokemons = (capturedPokemons, releasedPokemon) =>
//   capturedPokemons.filter((pokemon) => pokemon !== releasedPokemon);

// const getPokemonsList = (pokemons, capturedPokemon) =>
//   pokemons.filter((pokemon) => pokemon !== capturedPokemon);


// const pokemonReducer = (state, action) => {
//   const { type, pokemon, pokemons, name } = action;

//   switch (type) {
//     case CAPTURE:
//       return {
//         ...state,
//         pokemons: getPokemonsList(state.pokemons, pokemon),
//         capturedPokemons: [...state.capturedPokemons, pokemon],
//       };

//     case RELEASE:
//       return {
//         ...state,
//         pokemons: [...state.pokemons, pokemon],
//         capturedPokemons: getCapturedPokemons(state.capturedPokemons, pokemon),
//       };

//     case ADD_POKEMON:
//       return {
//         ...state,
//         pokemons: [...state.pokemons, pokemon],
//       };

//     case ADD_POKEMONS:
//       return {
//         ...state,
//         pokemons: [...state.pokemons, ...pokemons],
//       };

//     case SET_POKEMON_NAME:
//       return {
//         ...state,
//         pokemonName: name,
//       };

//     default:
//       return state;
//   }
// };

// export const usePokemonReducer = () =>
//   useReducer(pokemonReducer, {
//     pokemons: [],
//     capturedPokemons: [],
//     pokemonName: '',
//   });