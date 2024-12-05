import React from "react";

interface AttacksProps {
  moves: {
    move: {
      name: string;
    };
  }[];
}

const Attacks: React.FC<AttacksProps> = ({ moves }) => {
  return (
    <div className="section">
      <h3>Attaques</h3>
      <div className="list">
        {moves.slice(0, 2).map((move, index) => (
          <span key={index} className="type">
            {move.move.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Attacks;
