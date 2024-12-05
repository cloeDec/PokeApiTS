import { useState, useEffect } from 'react';
import { PokemonDetails } from '../components/pokemonTypes';
import { fetchAllPokemon, fetchData } from '../service/pokeAPI';

export const usePokemons = () => {
  const [pokemons, setPokemons] = useState<PokemonDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const pokemonList = await fetchAllPokemon();
        const detailedPokemonList = await Promise.all(
          pokemonList.map((pokemon: any) => fetchData(pokemon.name))
        );
        setPokemons(detailedPokemonList);
      } catch (err) {
        setError("Erreur lors du chargement des Pokémon");
        console.error("Erreur:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  return { pokemons, isLoading, error };
};

export const getPokemonById = async (id: number) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) throw new Error('Pokemon not found');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching pokemon:', error);
    throw error;
  }
}; 