import React, { createContext, useCallback } from 'react';
import { usePokemonReducer } from './usePokemonReducer';
import { CAPTURE, RELEASE, ADD_POKEMON, ADD_POKEMONS, ADD_SPRITES } from './actions';

const PokemonContext = createContext();

const PokemonProvider = (props) => {
  const [state, dispatch] = usePokemonReducer();
  const { pokemons, capturedPokemons, pokemonImages } = state;

  const capture = (pokemon) => () => dispatch({ type: CAPTURE, pokemon });
  const release = (pokemon) => () => dispatch({ type: RELEASE, pokemon });
  const addPokemon = (pokemon) => dispatch({ type: ADD_POKEMON, pokemon });
  const addPokemons = useCallback((pokemons) => {
    dispatch({ type: ADD_POKEMONS, pokemons });
    }, [dispatch]
  );

  const addSprites = useCallback((images) => {
    dispatch({ type: ADD_SPRITES, payload: images });
    }, [dispatch]
  );

  const providerValue = {
    pokemons,
    capturedPokemons,
    pokemonImages,
    capture,
    release,
    addPokemon,
    addPokemons,
    addSprites
  };

  return (
    <PokemonContext.Provider value={providerValue}>
      {props.children}
    </PokemonContext.Provider>
  );
};

export { PokemonContext, PokemonProvider };
