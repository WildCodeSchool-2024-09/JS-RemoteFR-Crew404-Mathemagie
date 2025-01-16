import "../SignUpForm/SignUpForm.css";

function SignUpForm() {
  return (
    <div className="sign-up-container">
      <div className="sign-up-card">
        <h2 className="sign-up-title">Inscription</h2>
        <p className="sign-up-subtitle">Créez votre compte</p>

        <form className="sign-up-form">
          <input
            type="text"
            className="input-field"
            placeholder="Nom complet"
          />
          <input type="email" className="input-field" placeholder="Email" />
          <input
            type="password"
            className="input-field"
            placeholder="Mot de passe"
          />
          <button type="submit" className="btn-primary">
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
