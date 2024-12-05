import React from "react";

interface StatsProps {
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

const Stats: React.FC<StatsProps> = ({ stats }) => {
  const getStatName = (name: string): string => {
    switch (name) {
      case "hp":
        return "PV";
      case "attack":
        return "Attack";
      case "defense":
        return "Defence";
      case "special-attack":
        return "Sp. Attack";
      case "special-defense":
        return "Sp. Defence";
      case "speed":
        return "Speed";
      default:
        return name;
    }
  };

  const calculateMinMaxStats = (
    baseStat: number,
    isHP: boolean
  ): { min: number; max: number } => {
    if (isHP) {
      const min = Math.floor(((2 * baseStat + 0) * 100) / 100 + 100 + 10);
      const max = Math.floor(((2 * baseStat + 31 + 63) * 100) / 100 + 100 + 10);
      return { min, max };
    }
    const min = Math.floor(
      Math.floor(((2 * baseStat + 0) * 100) / 100 + 5) * 0.9
    );
    const max = Math.floor(
      Math.floor(((2 * baseStat + 31 + 63) * 100) / 100 + 5) * 1.1
    );
    return { min, max };
  };

  // Calculer le total des stats de base
  const totalBaseStat = stats.reduce((acc, stat) => acc + stat.base_stat, 0);

  return (
    <div className="stats-section">
      <h3>Base Stats</h3>
      <div className="stats-list">
        {stats.map((stat, index) => {
          const isHP = stat.stat.name === "hp";
          const { min, max } = calculateMinMaxStats(stat.base_stat, isHP);

          return (
            <div key={index} className="stat-item">
              <div className="stat-name">{getStatName(stat.stat.name)}</div>
              <div className="stat-base">{stat.base_stat}</div>
              <div className="stat-bar-container">
                <div
                  className="stat-bar"
                  style={{
                    width: `${(stat.base_stat / 255) * 100}%`,
                  }}
                />
              </div>
              <div className="stat-range">
                {min} - {max}
              </div>
            </div>
          );
        })}
        <div className="stat-total">
          <div className="stat-name">Total</div>
          <div className="stat-base">{totalBaseStat}</div>
          <div className="stat-range">
            <span>Min</span>
            <span>Max</span>
          </div>
        </div>
      </div>
      <div className="stats-info">
        <small>
          Les valeurs min/max sont calculées au niveau 100.
          <br />
          Min: 0 IV, 0 EV, nature défavorable
          <br />
          Max: 31 IV, 252 EV, nature favorable
        </small>
      </div>
    </div>
  );
};

export default Stats;
