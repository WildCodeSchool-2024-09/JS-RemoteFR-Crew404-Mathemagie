import { Link } from "react-router-dom";
import "../Notfound/NotFound.css";

function NotFound() {
  return (
    <div className="not-found-container">
      <h1 className="error-code">404</h1>
      <div className="error-message">
        <h2>Oups !</h2>
        <p>Voilà qui n'était pas prévu</p>
      </div>
      <div className="error-image">
        <img
          src="https://img.icons8.com/ios/100/000000/maintenance.png"
          alt="Maintenance icon"
        />
      </div>
      <Link className="home-button" to="/dashboard">
        Retour à l'accueil
      </Link>
    </div>
  );
}

export default NotFound;
