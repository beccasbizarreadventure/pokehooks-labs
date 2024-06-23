import React, { createContext, useCallback } from 'react';
import { usePokemonReducer } from '../utilities/usePokemonReducer';
import { CAPTURE, RELEASE, ADD_POKEMON, ADD_POKEMONS } from '../utilities/actions';
import {usePokemonData} from '../utilities/usePokemonData';

const PokemonContext = createContext();

const PokemonProvider = (props) => {
  const [state, dispatch] = usePokemonReducer();
  const { pokemons, capturedPokemons } = state;

  const capture = useCallback((pokemon) => dispatch({ type: CAPTURE, pokemon }), [dispatch]);
  const release = useCallback((pokemon) => dispatch({ type: RELEASE, pokemon }), [dispatch]);
  const addNewPokemon = useCallback((pokemon) => dispatch({ type: ADD_POKEMON, pokemon }), [dispatch]);
  const addPokemons = useCallback((pokemons) => dispatch({ type: ADD_POKEMONS, pokemons }), [dispatch]);

  usePokemonData(addPokemons);

  const providerValue = {
    pokemons,
    capturedPokemons,
    capture,
    release,
    addNewPokemon,
    addPokemons
  };

  return (
    <PokemonContext.Provider value={providerValue}>
      {props.children}
    </PokemonContext.Provider>
  );
};

export { PokemonContext, PokemonProvider };
