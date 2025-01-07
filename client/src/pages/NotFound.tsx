import "./NotFound.css";

const NotFound = () => {
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
      <button
        type="button"
        className="home-button"
        onClick={() => {
          window.location.href = "/sign-up";
        }}
      >
        Retour à l'accueil
      </button>
    </div>
  );
};

export default NotFound;
