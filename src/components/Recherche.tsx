import React from "react";
import { useState } from "react";

interface rechercheProps {
  getByName: (nom: string) => void;
}

const Recherche: React.FC<rechercheProps> = ({ getByName }) => {
  const [rechercheNom, setRechercheNom] = useState("");

  const fonctionRecherche = () => {
    getByName(rechercheNom);
  };

  return (
    <div>
      <input
        type="text"
        value={rechercheNom}
        onChange={(e) => setRechercheNom(e.target.value)}
      ></input>

      <button onClick={fonctionRecherche}>Recherche pokemon</button>
    </div>
  );
};

export default Recherche;
