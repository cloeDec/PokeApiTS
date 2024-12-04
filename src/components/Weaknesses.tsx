import React, { useEffect, useState } from "react";
import { fetchWeaknessesFromAPI } from "../service/pokeAPI";

interface WeaknessesProps {
  types: string[];
}

const Weaknesses: React.FC<WeaknessesProps> = ({ types }) => {
  const [weaknesses, setWeaknesses] = useState<string[]>([]);

  useEffect(() => {
    const fetchAllWeaknesses = async () => {
      const allWeaknesses = new Set<string>();

      // Parcours des types et récupération des faiblesses pour chaque type
      for (const type of types) {
        const typeWeaknesses = await fetchWeaknessesFromAPI(type);
        typeWeaknesses.forEach((weakness : string) => allWeaknesses.add(weakness));
      }

      setWeaknesses(Array.from(allWeaknesses));
    };

    fetchAllWeaknesses();
  }, [types]);

  return (
    <div>
      <h3>Faiblesses</h3>
      {weaknesses.length > 0 ? (
        <ul>
          {weaknesses.map((weakness, index) => (
            <li key={index}>{weakness}</li>
          ))}
        </ul>
      ) : (
        <p>Aucune faiblesse détectée.</p>
      )}
    </div>
  );
};

export default Weaknesses;
