import { Link } from "react-router-dom";
import "../LoginForm/LoginForm.css";

function Home() {
  return (
    <div className="home-container">
      <h1>Bienvenue sur la page d'accueil</h1>
      <p>
        Ceci est une page d'accueil de base pour commencer votre projet React.
      </p>
      <Link to="/login" className="home-button">
        Accéder à la page de connexion
      </Link>
    </div>
  );
}

export default Home;
