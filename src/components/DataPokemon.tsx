import React from "react";

interface data {
  pokemon: any;
}

const DataPokemon: React.FC<data> = ({ pokemon }) => {
  return (
    <div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Taille : {pokemon.height}</p>
      <p>Poids : {pokemon.weight}</p>
      <p>
        Type : {pokemon.types.map((type: any) => type.type.name).join(", ")}
      </p>
    </div>
  );
};

export default DataPokemon;
