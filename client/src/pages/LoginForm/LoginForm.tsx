import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../LoginForm/LoginForm.css";
import axios from "axios";
import batman from "../../assets/images/batman.png";

function LoginForm() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/login`,
      login,
    );
    console.info(response.data);
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Connexion</h2>
        <p className="login-subtitle">
          Bienvenue ! Connectez-vous pour continuer.
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={login.email}
            onChange={handleChange}
            className="input-field"
            placeholder="Email"
            required
            autoComplete="email"
          />
          <input
            type="password"
            name="password"
            className="input-field"
            placeholder="Mot de passe"
            required
            value={login.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          <button type="submit" className="btn-connect">
            Connexion
          </button>
          <button
            type="button"
            className="btn-signUp"
            onClick={() => navigate("/sign-up")}
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
