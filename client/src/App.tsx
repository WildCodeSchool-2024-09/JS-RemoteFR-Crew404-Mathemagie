import { Link, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="layout">
      <header id="statsBar">
        <p>Niveau X</p>
        <p>X/X</p>
        <Link to="/avatar"> Conçois ton avatar !</Link>
        <Link to="/gameone"> Premier jeu !</Link>
      </header>
      <Link to="./carGame">Voiture</Link>

      <h1>Jeux de maths</h1>
      <Link to="/num-game">Retrouve le chiffre manquant</Link>

      <Outlet />
      <footer>Codé avec le ❤️ par la team @Crew404 </footer>
    </div>
  );
}

export default App;
