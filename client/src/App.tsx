import { Link, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="layout">
      <header id="statsBar">
        <p>Niveau X</p>
        <p>X/X</p>
        <Link to="./avatar"> Conçois ton avatar !</Link>
      </header>
      <Link to="./GameOne">GamOne</Link>
      <Link to="./NumGame">Retrouve le chiffre manquant</Link>
      <Outlet />
      <footer>Codé avec le ❤️ par la team @Crew404</footer>
    </div>
  );
}

export default App;
