import React, { createContext, useCallback } from 'react';
import { usePokemonReducer } from './usePokemonReducer';
import { CAPTURE, RELEASE, ADD_POKEMON, ADD_POKEMONS } from './actions';
import {usePokemonData} from './usePokemonData';

const PokemonContext = createContext();

const PokemonProvider = (props) => {
  const [state, dispatch] = usePokemonReducer();
  const { pokemons, capturedPokemons, pokemonImages } = state;

  // const capture = (pokemon) => () => dispatch({ type: CAPTURE, pokemon });
  // const release = (pokemon) => () => dispatch({ type: RELEASE, pokemon });
  // const addPokemon = (pokemon) => dispatch({ type: ADD_POKEMON, pokemon });
  // const addPokemons = useCallback((pokemons) => {
  //   dispatch({ type: ADD_POKEMONS, pokemons });
  //   }, [dispatch]
  // );

  const capture = useCallback((pokemon) => dispatch({ type: CAPTURE, pokemon }), [dispatch]);
  const release = useCallback((pokemon) => dispatch({ type: RELEASE, pokemon }), [dispatch]);
  const addPokemon = useCallback((pokemon) => dispatch({ type: ADD_POKEMON, pokemon }), [dispatch]);
  const addPokemons = useCallback((pokemons) => dispatch({ type: ADD_POKEMONS, pokemons }), [dispatch]);

  usePokemonData(addPokemons);

  const providerValue = {
    pokemons,
    capturedPokemons,
    pokemonImages,
    capture,
    release,
    addPokemon,
    addPokemons
  };

  return (
    <PokemonContext.Provider value={providerValue}>
      {props.children}
    </PokemonContext.Provider>
  );
};

export { PokemonContext, PokemonProvider };
