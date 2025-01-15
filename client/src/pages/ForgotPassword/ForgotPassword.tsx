import { useState } from "react";
import "../ForgotPassword/ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2 className="forgot-password-title">
          Réinitialisation du mot de passe
        </h2>
        <p className="forgot-password-subtitle">
          Entrez votre adresse e-mail pour réinitialiser votre mot de passe
        </p>

        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="input-field"
            placeholder="Votre e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">
            Réinitialiser le mot de passe
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
