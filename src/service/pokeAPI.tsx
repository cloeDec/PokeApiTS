import axios from "axios";


const API = "https://pokeapi.co/api/v2/";

// recheche des pokemons
export const fetchData = async (nom:string) => {
    try{
        const response = await axios.get(API + "/pokemon/" + nom);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};


// Recup tous les pokemons 
export const fetchAllPokemon = async (limit: number = 151, offset: number = 0) => {
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