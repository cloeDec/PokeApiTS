import React from "react";
import { PokemonType, typeWeaknesses, typeColors } from "./pokemonTypes";

interface WeaknessesProps {
  types: { type: { name: string } }[];
}

const Weaknesses: React.FC<WeaknessesProps> = ({ types }) => {
  const calculateWeaknesses = () => {
    const weaknesses = new Set<PokemonType>();

    types.forEach(({ type }) => {
      const pokemonType = type.name as PokemonType;
      typeWeaknesses[pokemonType]?.forEach((weakness) => {
        weaknesses.add(weakness);
      });
    });

    return Array.from(weaknesses).slice(0, 2);
  };

  return (
    <div className="section">
      <h3>Faiblesses</h3>
      <div className="list">
        {calculateWeaknesses().map((weakness, index) => (
          <span 
            key={index} 
            className={`type ${weakness}`}
            style={{ backgroundColor: typeColors[weakness] }}
          >
            {weakness}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Weaknesses;
