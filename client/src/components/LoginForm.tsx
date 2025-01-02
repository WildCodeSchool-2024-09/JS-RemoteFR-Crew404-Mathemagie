import "./LoginForm.css";

const LoginForm = () => {
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Connexion</h2>
        <p className="login-subtitle">Veuillez entrer vos informations</p>

        <form className="login-form">
          <input
            type="text"
            className="input-field"
            placeholder="Nom d'utilisateur"
          />
          <input
            type="password"
            className="input-field"
            placeholder="Mot de passe"
          />
          <button type="submit" className="btn-primary">
            Se connecter
          </button>

          <a href="/forgot-password" className="forgot-password">
            Mot de passe oublié ?
          </a>

          {/* Bouton d'inscription */}
          <button
            type="button"
            className="btn-secondary"
            onClick={(e) => {
              e.preventDefault(); // Prevent form submission
              window.location.href = "/sign-up"; // Redirection vers la page d'inscription
            }}
          >
            S'inscrire
          </button>
        </form>
      </div>
      <div className="login-illustration">
        <img src="illustration.png" alt="Illustration" />
      </div>
    </div>
  );
};

export default LoginForm;
