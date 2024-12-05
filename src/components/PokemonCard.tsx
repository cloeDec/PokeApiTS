import React from "react";
import { useNavigate } from "react-router-dom";
import { PokemonDetails, typeColors, PokemonType } from "./pokemonTypes";

interface PokemonCardProps {
  pokemon: PokemonDetails;
  isFavorite: boolean;
  toggleFavorite: (id: number) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  isFavorite,
  toggleFavorite,
}) => {
  const navigate = useNavigate();
  const primaryType = pokemon.types[0].type.name as PokemonType;
  const backgroundColor = typeColors[primaryType];

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.favorite-button')) return;
    navigate(`/pokemon/${pokemon.id}`);
  };

  return (
    <div 
      className="card" 
      style={{ backgroundColor, cursor: 'pointer' }}
      onClick={handleClick}
    >
      <div className="title">
        <h2>{pokemon.name}</h2>
        <button
          onClick={() => toggleFavorite(pokemon.id)}
          className={`favorite-button ${isFavorite ? "active" : ""}`}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>
      <img
        src={pokemon.sprites.other.home.front_default}
        alt={pokemon.name}
        loading="lazy"
      />
    </div>
  );
};

export default PokemonCard;
