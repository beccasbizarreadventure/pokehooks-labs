import React, { createContext, useEffect } from "react";
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

  const capture = (pokemon) => dispatch({ type: CAPTURE, pokemon });
  const release = (pokemon) => dispatch({ type: RELEASE, pokemon });
  const setPokemonName = (name) => dispatch({ type: SET_POKEMON_NAME, name });
  const addNewPokemon = (pokemon) => dispatch({ type: ADD_NEW_POKEMON, pokemon });

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=25&offset=0"
        );
        const allPKMdata = response.data.results;
        // Create an array of promises where each promise fetches a Pokemon's data (imgData) and constructs an object { ...pokemon, imageUrl }
        const pokemonPromises = allPKMdata.map(async (pokemon) => {
          const pokemonResponse = await axios.get(pokemon.url);
          const { id, name, sprites, types } = pokemonResponse.data;
          const imageUrl = sprites.other.showdown.front_default;
          const type = types[0].type.name;
          return { id: id, name: name, url: pokemon.url, imageUrl: imageUrl, type: type };
        });

        const pokemonData = await Promise.all(pokemonPromises);

        dispatch({ type: ADD_POKEMONS, pokemons: pokemonData });
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };

    fetchPokemon();
  }, [dispatch]);

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
