import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../LoginForm/LoginForm.css";
import { useAuth } from "../../Context/AuthContext";
import batman from "../../assets/images/batman.png";
import api from "../../services/api";
import { errorToast, successToast } from "../../services/toasts";

function LoginForm() {
  const nav = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  //mon state qui alterne entre true et false pour afficher "Adresse mail ou mot de passe incorrect."
  const [modalLogin, setModalLogin] = useState(false);

  const { handleLogin } = useAuth();

  //stockage de l'input de l'utilisateur pour vérifier dans handleSubmit si le mdp et email sont corrects
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //constante qui se déclenche lors du submit du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/login", login);

      if (response.status === 200) {
        handleLogin(response.data);
        // pour l'instant, je redirige vers /avatar, in fine, nous allons être redirigé vers /dashboard
        successToast(`Bonjour ${response.data.firstname} !`);
        nav("/dashboard");
      }
    } catch (error) {
      console.error(error);
      errorToast("Oups, une erreur est survenue! 😱");
      setModalLogin(true);
    }
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
          <p className={modalLogin ? "modalLogin" : "hidden-modalLogin"}>
            Adresse mail ou mot de passe incorrect.
          </p>
          <button type="submit" className="btn-connect">
            Connexion
          </button>

          <Link to="/sign-up" className="btn-signUp">
            Sign Up
          </Link>
        </form>

        <Link to="/forgot-password" className="forgot-password">
          Mot de passe oublié ?
        </Link>
      </div>
      <div className="login-illustration">
        <img src={batman} alt="Illustration" />
      </div>
    </div>
  );
}

export default LoginForm;
