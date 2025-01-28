import { Link, Outlet } from "react-router-dom";
import "./App.css";
import Home from "./assets/images/home.png";

function App() {
  return (
    <div className="layout">
      <header id="statsBar">
        <Link to="/">
          <img src={Home} alt="Page d'accueil" className="Home" />
        </Link>
        <p>Niveau X</p>
        <p>X/X</p>
        <Link to="/avatar"> Conçois ton avatar !</Link>
        <Link to="/game-one"> Premier jeu !</Link>
        <Link to="/car-game">Objets</Link>
        <Link to="/num-game">Retrouve le chiffre manquant</Link>
        <Link to="/euro-game">EuroGame</Link>
      </header>
      <Outlet />
    </div>
  );
}

export default App;
