import React, { useEffect, useState } from "react";
import { fetchAllPokemon, fetchData } from "../service/pokeAPI";
import Weaknesses from "../components/Weaknesses";

interface Pokemon {
  name: string;
  url: string;
}

const details: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<any[]>([]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      const pokemons: Pokemon[] = await fetchAllPokemon();
      const detailedPokemonList = await Promise.all(
        pokemons.map(async (pokemon: Pokemon) => {
          const details = await fetchData(pokemon.name);
          return details;
        })
      );
      setPokemonList(detailedPokemonList);
    };

    fetchPokemonList();
  }, []);

  return (
    <div className="container">
      {pokemonList.map((pokemon: any, index: number) => (
        <div key={index} className="card">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <h2>{pokemon.name}</h2>
          <p>Taille : {pokemon.height} m</p>
          <p>Poids : {pokemon.weight} kg</p>
          <div className="types">
            {pokemon.types.map((type: any, index: number) => (
              <span key={index}>{type.type.name}</span>
            ))}
          </div>
          {/* Affichage des faiblesses */}
          <Weaknesses types={pokemon.types.map((type: any) => type.type.name)} />
        </div>
      ))}
    </div>
  );
};

export default details;
