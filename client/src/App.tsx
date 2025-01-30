import { Link, Outlet } from "react-router-dom";
import "./App.css";
import Home from "./assets/images/home.png";
import { AvatarProvider } from "./pages/Context/AvatarContext";

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
      <AvatarProvider>
        <Outlet />
      </AvatarProvider>
    </div>
  );
}

export default App;
