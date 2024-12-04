import React from "react";

interface AttacksProps {
  moves: any[];
}

const Attacks: React.FC<AttacksProps> = ({ moves }) => {
  const first10Moves = moves.slice(0, 2);

  console.log(Attacks)
  return (
    <div>
      <h3>Attaques</h3>
      {first10Moves.length > 0 ? (
        <ul>
          {first10Moves.map((move: any, index: number) => (
            <li key={index}>
              <p><strong>{move.move.name}</strong></p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucune attaque disponible.</p>
      )}
    </div>
  );
};

export default Attacks;
