import React from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { usePokemons } from '../hooks/usePokemons';
import PokemonCard from '../components/PokemonCard';
import LoadingSpinner from '../components/LoadingSpinner';

const FavoritesPokemon: React.FC = () => {
  const { pokemons, isLoading, error } = usePokemons();
  const { favorites, toggleFavorite } = useFavorites();

  // Filtrer les Pokémon favoris
  const favoritePokemon = pokemons.filter(pokemon => favorites.includes(pokemon.id));

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Réessayer</button>
      </div>
    );
  }

  if (favoritePokemon.length === 0) {
    return (
      <div className="empty-favorites">
        <h2>Aucun Pokémon favori</h2>
        <p>Ajoutez des Pokémon à vos favoris pour les voir apparaître ici !</p>
      </div>
    );
  }

  return (
    <div className="pokemon-container">
      <div className="pokemon-grid">
        {favoritePokemon.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            isFavorite={true}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPokemon;
