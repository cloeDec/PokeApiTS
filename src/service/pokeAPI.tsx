import axios from "axios";


const API = "https://pokeapi.co/api/v2/";

export const fetchData = async (nom:string) => {
    try{
        const response = await axios.get(API + "/pokemon/" + nom);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};