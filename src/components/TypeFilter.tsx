import React from "react";
import { PokemonType, typeColors } from "./pokemonTypes";

interface TypeFilterProps {
  selectedTypes: PokemonType[];
  onTypeSelect: (type: PokemonType) => void;
}

const TypeFilter: React.FC<TypeFilterProps> = ({
  selectedTypes,
  onTypeSelect,
}) => {
  const types = Object.keys(typeColors) as PokemonType[];

  return (
    <div className="type-filter">
      <h3>Filtrer par type</h3>
      <div className="type-buttons">
        {types.map((type) => (
          <button
            key={type}
            className={`type-button ${
              selectedTypes.includes(type) ? "selected" : ""
            }`}
            style={{
              backgroundColor: typeColors[type]
            }}
            onClick={() => onTypeSelect(type)}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TypeFilter;
