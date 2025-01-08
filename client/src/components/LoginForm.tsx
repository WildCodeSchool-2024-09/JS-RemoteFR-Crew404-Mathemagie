import "./LoginForm.css";
import batman from "../assets/images/batman.png";

function LoginForm() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Connexion</h2>
        <p className="login-subtitle">
          Bienvenue ! Connectez-vous pour continuer.
        </p>

        <form className="login-form">
          <input
            type="email"
            className="input-field"
            placeholder="Email"
            required
          />
          <input
            type="password"
            className="input-field"
            placeholder="Mot de passe"
            required
          />
          <button type="submit" className="btn-primary">
            Connexion
          </button>

          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              window.location.href = "/sign-up";
            }}
          >
            Sign Up
          </button>
        </form>

        <a href="/forgot-password" className="forgot-password">
          Mot de passe oublié ?
        </a>

      </div>
      <div className="login-illustration">
        <img src={batman} alt="Illustration" />
      </div>
    </div>
  );
}

export default LoginForm;
