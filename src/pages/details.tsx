import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPokemonById } from "../hooks/usePokemons";
import { PokemonDetails, typeColors, PokemonType } from "../components/pokemonTypes";
import LoadingSpinner from "../components/LoadingSpinner";
import Type from "../components/Type";
import Stats from "../components/Stats";
import Evolution from "../components/Evolution";

type TabType = "about" | "stats" | "evolutions";

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("about");

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        if (!id) return;
        const data = await getPokemonById(parseInt(id));
        setPokemon(data);
      } catch (error) {
        console.error("Error:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id, navigate]);

  if (loading) return <LoadingSpinner />;
  if (!pokemon) return <div>Pokemon non trouvé</div>;

  const primaryType = pokemon.types[0].type.name as PokemonType;
  const backgroundColor = typeColors[primaryType];

  const renderTabContent = () => {
    switch (activeTab) {
      case "about":
        return (
          <div className="about-section">
            <div className="pokemon-specify">
              <p>N°{pokemon.id}</p>
              <p>Taille : {pokemon.height / 10} m</p>
              <p>Poids : {pokemon.weight / 10} kg</p>
            </div>
            <Type types={pokemon.types} />
          </div>
        );
      case "stats":
        return <Stats stats={pokemon.stats} />;
      case "evolutions":
        return <Evolution pokemonId={pokemon.id} />;
      default:
        return null;
    }
  };

  return (
    <div className="details-container">
      <div className="details-card" style={{ backgroundColor }}>
        <div className="title">
          <h2>{pokemon.name}</h2>
          <span className="pokemon-number">#{pokemon.id.toString().padStart(3, '0')}</span>
        </div>
        <img
          src={pokemon.sprites.other.home.front_default}
          alt={pokemon.name}
          loading="lazy"
        />
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === "about" ? "active" : ""}`}
            onClick={() => setActiveTab("about")}
          >
            About
          </button>
          <button
            className={`tab-button ${activeTab === "stats" ? "active" : ""}`}
            onClick={() => setActiveTab("stats")}
          >
            Stats
          </button>
          <button
            className={`tab-button ${activeTab === "evolutions" ? "active" : ""}`}
            onClick={() => setActiveTab("evolutions")}
          >
            Évolutions
          </button>
        </div>
        <div className="tab-content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Details;
