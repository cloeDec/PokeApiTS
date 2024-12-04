import React, { useEffect, useState } from "react";
import { fetchAllPokemon, fetchData } from "../service/pokeAPI";
import Weaknesses from "./Weaknesses";
import Attacks from "./Attacks";

interface Pokemon {
  name: string;
  url: string;
}

const ListePokemon: React.FC = () => {
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
          <h2>{pokemon.name}</h2>
          <p>
            PV :{" "}
            {
              pokemon.stats.find((stat: any) => stat.stat.name === "hp")
                ?.base_stat
            }
          </p>
          <img src={pokemon.sprites.other.home.front_default} alt={pokemon.name} />
          <div className="pokemon-specify">
            <p>N°{pokemon.id} </p>
            <p>Taille : {pokemon.height} m</p>
            <p>Poids : {pokemon.weight} kg</p>
          </div>
          <div className="types">
            {pokemon.types.map((type: any, index: number) => (
              <span key={index}>{type.type.name}</span>
            ))}
          </div>
          <Attacks moves={pokemon.moves} />
        </div>
      ))}
    </div>
  );
};

export default ListePokemon;
