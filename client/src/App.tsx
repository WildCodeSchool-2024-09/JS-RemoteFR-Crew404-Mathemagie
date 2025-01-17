import { Link, Outlet } from "react-router-dom";
import "./App.css";
import Home from "../src/assets/images/home.png";

function App() {
  return (
    <div className="layout">
      <header id="statsBar">
        <Link to="/">
          <img src={Home} alt="Page d'accueil" className="Home" />
        </Link>
        <p>Niveau X</p>
        <p>X/X</p>
      </header>
      <Outlet />
      <footer>Codé avec le ❤️ par la team @Crew404 </footer>
    </div>
  );
}

export default App;
