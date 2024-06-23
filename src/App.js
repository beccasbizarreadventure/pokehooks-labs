import React from 'react';

import { PokemonProvider } from './Pokemon/context/PokemonContext.jsx';
import PokemonsList from './Pokemon/components/PokemonsList.jsx';
import Pokedex from './Pokemon/components/Pokedex.jsx';
import PokemonForm from './Pokemon/components/PokemonForm.jsx';

const App = () => (
  <PokemonProvider>
    <div className="main">
      <PokemonsList />
      <Pokedex />
    </div>
    <div className="form-wrapper">
      <PokemonForm />
    </div>
  </PokemonProvider>
);

export default App;
