import axios from "axios";


const API = "https://pokeapi.co/api/v2/";

// recherche des pokemons 
export const getPokemonData = async (nom: string) => {
    try {
        const response = await axios.get(`${API}pokemon/${nom}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};


// Recup tous les pokemons 
export const getAllPokemon = async (limit: number = 151, offset: number = 0) => {
    try {
        const response = await axios.get(`${API}pokemon?limit=${limit}&offset=${offset}`);
        return response.data.results; // Liste des pokémons
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Fonction pour récupérer les faiblesses des types depuis la PokeAPI
export const fetchWeaknessesFromAPI = async (type: string) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/type/${type.toLowerCase()}`);
      const weaknesses = response.data.damage_relations.double_damage_from;
  
      // Extraire les noms des faiblesses et les retourner sous forme de tableau de chaînes
      return weaknesses.map((weakness: { name: string }) => weakness.name);
    } catch (error) {
      console.error("Erreur lors de la récupération des faiblesses:", error);
      return [];
    }
  };
export const fetchPokemonSpecies = async (pokemonId: number) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
    );
    if (!response.ok) throw new Error('Species not found');
    return await response.json();
  } catch (error) {
    console.error('Error fetching pokemon species:', error);
    throw error;
  }
};

export const fetchEvolutionChain = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Evolution chain not found');
    return await response.json();
  } catch (error) {
    console.error('Error fetching evolution chain:', error);
    throw error;
  }
};

export const fetchPokemonDetails = async (name: string) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    if (!response.ok) throw new Error('Pokemon not found');
    return await response.json();
  } catch (error) {
    console.error('Error fetching pokemon details:', error);
    throw error;
  }
};

export const fetchAllPokemon = async () => {
  try {
    const response = await fetch(
      'https://pokeapi.co/api/v2/pokemon?limit=151'
    );
    if (!response.ok) throw new Error('Failed to fetch pokemon list');
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching all pokemon:', error);
    throw error;
  }
};

export const fetchData = async (name: string) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    if (!response.ok) throw new Error(`Failed to fetch pokemon: ${name}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching pokemon ${name}:`, error);
    throw error;
  }
}; 