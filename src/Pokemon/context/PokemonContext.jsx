import React, { createContext, useCallback, useEffect } from "react";
import { usePokemonReducer } from "../utilities/usePokemonReducer";
import {
  CAPTURE,
  RELEASE,
  ADD_NEW_POKEMON,
  ADD_POKEMONS,
  SET_POKEMON_NAME,
} from "../utilities/actions";

const PokemonContext = createContext();

const PokemonProvider = (props) => {
  const [state, dispatch] = usePokemonReducer();
  const { pokemons, capturedPokemons, pokemonName } = state;
  const capture = useCallback(
    (pokemon) => dispatch({ type: CAPTURE, pokemon }),
    [dispatch]
  );
  const release = useCallback(
    (pokemon) => dispatch({ type: RELEASE, pokemon }),
    [dispatch]
  );

  const setPokemonName = useCallback(
    (name) => dispatch({ type: SET_POKEMON_NAME, name }),
    [dispatch]
  );

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=15&offset=0"
        );
        const data = await response.json();
        const allPKMdata = data.results;

        // Create an array of promises where each promise fetches a Pokemon's data (imgData) and constructs an object { ...pokemon, imageUrl }
        const promises = allPKMdata.map(async (pokemon) => {
          const imgResponse = await fetch(pokemon.url);
          const imgData = await imgResponse.json();
          const imageUrl = imgData.sprites.other.showdown.front_shiny;

          return { ...pokemon, imageUrl };
        });

        // Wait for all promises to resolve
        const pokemonData = await Promise.all(promises);

        // Add all fetched Pokemon data at once
        dispatch({ type: ADD_POKEMONS, pokemons: pokemonData });
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemon();
  }, [dispatch]);

  const addNewPokemon = useCallback(
    (pokemon) => dispatch({ type: ADD_NEW_POKEMON, pokemon }),
    [dispatch]
  );

  const providerValue = {
    pokemons,
    capturedPokemons,
    pokemonName,
    capture,
    release,
    addNewPokemon,
    // addPokemons,
    setPokemonName,
  };

  return (
    <PokemonContext.Provider value={providerValue}>
      {props.children}
    </PokemonContext.Provider>
  );
};

export { PokemonContext, PokemonProvider };
