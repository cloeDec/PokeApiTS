import React, { useState } from "react";
import "./App.css";
import Recherche from "./components/Recherche";
import { fetchData } from "./service/pokeAPI";
import DataPokemon from "./components/DataPokemon";

const App: React.FC = () => {
  const [pokemon, setPokemon] = useState("");

  const handleRecherche = async (nom: string) => {
    const response = await fetchData(nom);
    setPokemon(response);
    console.log(response);
  };

  return (
    <div>
      <Recherche getByName={handleRecherche} />

      {pokemon && <DataPokemon pokemon={pokemon} />}
    </div>
  );
};

export default App;
