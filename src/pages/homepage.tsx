import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { useFavorites } from "../hooks/useFavorites";
import { usePokemons } from "../hooks/usePokemons";
import PokemonCard from "../components/PokemonCard";
import LoadingSpinner from "../components/LoadingSpinner";
import "../App.css";

const Homepage: React.FC = () => {
  const { pokemons, isLoading, error } = usePokemons();
  const { favorites, toggleFavorite } = useFavorites();

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Réessayer</button>
      </div>
    );
  }

  return (
    <div className="swiper-container">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="pokemon-swiper"
      >
        {pokemons.map((pokemon) => (
          <SwiperSlide key={pokemon.id}>
            <PokemonCard
              pokemon={pokemon}
              isFavorite={favorites.includes(pokemon.id)}
              toggleFavorite={toggleFavorite}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Homepage;
