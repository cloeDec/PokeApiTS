import React from "react";

interface RechercheProps {
  value: string;
  onChange: (value: string) => void;
}

const Recherche: React.FC<RechercheProps> = ({ value, onChange }) => {
  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher un Pokémon..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Recherche;
