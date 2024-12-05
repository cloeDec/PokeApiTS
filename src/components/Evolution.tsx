import React, { useEffect, useState } from "react";
import { 
  fetchPokemonSpecies, 
  fetchEvolutionChain, 
  fetchPokemonDetails 
} from "../service/pokeAPI";

interface EvolutionProps {
  pokemonId: number;
}

interface Evolution {
  id: number;
  name: string;
  image: string;
}

const Evolution: React.FC<EvolutionProps> = ({ pokemonId }) => {
  const [evolutions, setEvolutions] = useState<Evolution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvolutions = async () => {
      try {
        // Récupérer la chaîne d'évolution
        const speciesData = await fetchPokemonSpecies(pokemonId);
        const evolutionData = await fetchEvolutionChain(speciesData.evolution_chain.url);

        // Traiter la chaîne d'évolution
        const evoChain: Evolution[] = [];
        let evoData = evolutionData.chain;

        do {
          const pokemonData = await fetchPokemonDetails(evoData.species.name);
          
          evoChain.push({
            id: pokemonData.id,
            name: evoData.species.name,
            image: pokemonData.sprites.other.home.front_default,
          });

          evoData = evoData.evolves_to[0];
        } while (evoData && evoData.hasOwnProperty("evolves_to"));

        setEvolutions(evoChain);
      } catch (error) {
        console.error("Error fetching evolutions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvolutions();
  }, [pokemonId]);

  if (loading) return null;
  if (evolutions.length <= 1) return null;

  return (
    <div className="section">
      <h3>Évolutions</h3>
      <div className="evolution-chain">
        {evolutions.map((evolution, index) => (
          <React.Fragment key={evolution.id}>
            {index > 0 && <div className="evolution-arrow">→</div>}
            <div className="evolution-item">
              <img src={evolution.image} alt={evolution.name} />
              <span>{evolution.name}</span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Evolution; 