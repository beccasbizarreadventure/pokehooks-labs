import React, { createContext, useCallback, useEffect } from "react";
import { usePokemonReducer } from "../utilities/usePokemonReducer";
import {
  CAPTURE,
  RELEASE,
  ADD_NEW_POKEMON,
  ADD_POKEMONS,
  SET_POKEMON_NAME,
} from "../utilities/actions";
import axios from "axios";

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
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=15&offset=0"
        );
        const allPKMdata = response.data.results;

        // Create an array of promises where each promise fetches a Pokemon's data (imgData) and constructs an object { ...pokemon, imageUrl }
        const pokemonPromises = allPKMdata.map(async (pokemon) => {
          const pokemonResponse = await axios.get(pokemon.url);
          const { id, name, sprites } = pokemonResponse.data;
          const imageUrl = sprites.other.showdown.front_shiny;
          return { id: id, name: name, url: pokemon.url, imageUrl: imageUrl };
        });

        // Wait for all promises to resolve
        const pokemonData = await Promise.all(pokemonPromises);

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
    setPokemonName,
  };

  return (
    <PokemonContext.Provider value={providerValue}>
      {props.children}
    </PokemonContext.Provider>
  );
};

export { PokemonContext, PokemonProvider };
