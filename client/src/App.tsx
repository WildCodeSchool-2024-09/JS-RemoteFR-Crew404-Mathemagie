import { Link, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="layout">
      <header id="statsBar">
        <p>Niveau X</p>
        <p>X/X</p>
        <Link to="/avatar"> Conçois ton avatar !</Link>
        <Link to="/game-one"> Premier jeu !</Link>
        <Link to="/car-game">Voiture</Link>
        <Link to="/num-game">Retrouve le chiffre manquant</Link>
      </header>
      <Outlet />
      <footer>Codé avec le ❤️ par la team @Crew404 </footer>
    </div>
  );
}

export default App;
