// App.tsx

import React, { useState } from "react";
import "./App.css";
import Recherche from "./components/Recherche";
import { fetchData } from "./service/pokeAPI";
import DataPokemon from "./components/DataPokemon";
import ListePokemon from "./components/AllPokemon";

const App: React.FC = () => {
  const [pokemon, setPokemon] = useState<any | null>(null); // Change l'état pour inclure null

  const handleRecherche = async (nom: string) => {
    const response = await fetchData(nom);
    setPokemon(response);
    console.log(response);
  };

  return (
    <div>
      <Recherche getByName={handleRecherche} />

      {pokemon ? (
        <DataPokemon pokemon={pokemon} />
      ) : (
        <p>Aucun Pokémon sélectionné</p>
      )}

      <ListePokemon />
    </div>
  );
};

export default App;
