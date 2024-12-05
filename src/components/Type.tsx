import React from 'react';
import { typeColors, PokemonType } from './pokemonTypes';

interface TypeProps {
  types: {
    type: {
      name: string;
    };
  }[];
}

const Type: React.FC<TypeProps> = ({ types }) => {
  return (
    <div className="section">
      <h3>Types</h3>
      <div className="list">
        {types.map((type, index) => (
          <span 
            key={index} 
            className={`type ${type.type.name}`}
            style={{ backgroundColor: typeColors[type.type.name as PokemonType] }}
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Type;
