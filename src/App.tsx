import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Homepage from "./pages/homepage";
import FavoritesPokemon from "./pages/favoritesPokemon";
import VueCartodex from "./pages/vueCartodex";
import Details from "./pages/details";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Liste des Pokémon</Link>
        <Link to="/cartodex">Vue Carte</Link>
        <Link to="/favoris">Mes Favoris</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/favoris" element={<FavoritesPokemon />} />
        <Route path="/cartodex" element={<VueCartodex />} />
        <Route path="/pokemon/:id" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;
