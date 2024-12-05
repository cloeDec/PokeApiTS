import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="pokeball-spinner"></div>
      <p>Chargement des Pokémon...</p>
    </div>
  );
};

export default LoadingSpinner; 