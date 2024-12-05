import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { usePokemons } from "../hooks/usePokemons";
import PokemonCard from "../components/PokemonCard";
import LoadingSpinner from "../components/LoadingSpinner";
import Recherche from "../components/SearchBar";
import { useFavorites } from "../hooks/useFavorites";

const VueCartodex: React.FC = () => {
  const { pokemons, isLoading, error } = usePokemons();
  const { favorites, toggleFavorite } = useFavorites();
  const [searchTerm, setSearchTerm] = useState("");
  const [displayedPokemons, setDisplayedPokemons] = useState(pokemons);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setDisplayedPokemons(pokemons);
    } else {
      const filtered = pokemons.filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pokemon.id.toString().includes(searchTerm)
      );
      setDisplayedPokemons(filtered);
    }
  }, [searchTerm, pokemons]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;

  return (
    <div className="cartodex-container">
      <Recherche value={searchTerm} onChange={setSearchTerm} />
      <div className="cards-container">
        {searchTerm.trim() === "" ? (
          <div className="pokemon-grid">
            {displayedPokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                isFavorite={favorites.includes(pokemon.id)}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <Swiper
            slidesPerView="auto"
            centeredSlides={true}
            spaceBetween={30}
            className="mySwiper"
          >
            {displayedPokemons.map((pokemon) => (
              <SwiperSlide key={pokemon.id}>
                <PokemonCard
                  pokemon={pokemon}
                  isFavorite={favorites.includes(pokemon.id)}
                  toggleFavorite={toggleFavorite}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default VueCartodex;
