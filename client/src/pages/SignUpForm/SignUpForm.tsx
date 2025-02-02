import "../SignUpForm/SignUpForm.css";
import axios from "axios";
import { useState } from "react";

function SignUpForm() {
  const [register, setRegister] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  // mon state qui alterne entre true et false pour afficher "inscription réussie" ou juste rien afficher
  const [modal, setModal] = useState(false);
  // mon state qui alterne entre true et false pour afficher "ce compte existe déjà !" ou rien
  const [exists, setExists] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //le handleRegister qui se trigger selon la condition de dessous
  const handleRegister = () => {
    window.location.href = "/login";
  };

  //constante déclenchée si jamais le compte a bien été créé et qui me redirige vers le login
  const handleSignUp = () => {
    setModal(true);
    setTimeout(() => setModal(false), 2000);
    setTimeout(() => handleRegister(), 2000);
  };

  //constante déclenchée si le compte existe déjà
  const handleAlreadyCreated = () => {
    setExists(true);
    setTimeout(() => setExists(false), 2000);
  };

  //constante qui se déclenche à l'envoi du formulaire, si tout est ok le message d'inscription s'affiche et me redirige vers la page connexion
  //par contre si il y a une erreur (genre utilisateur déjà existant avec cet email) ça affiche le message d'erreur (via la constante handleAlreadyCreated)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/register`,
        register,
      );
      if (response.status === 201) {
        handleSignUp();
      }
    } catch (error) {
      handleAlreadyCreated();
      console.error(error);
    }
  };

  return (
    <>
      <div className="sign-up-container">
        <div className="sign-up-card">
          <p className={modal ? "modal" : "hidden-modal"}>
            Inscription réussie !
          </p>
          <p className={exists ? "alreadyCreated" : "hidden-alreadyCreated"}>
            Ce compte existe déjà !
          </p>
          <h2 className="sign-up-title">Inscription</h2>
          <p className="sign-up-subtitle">Créez votre compte</p>

          <form onSubmit={handleSubmit} className="sign-up-form">
            <input
              id="lastname"
              name="lastname"
              type="text"
              required
              className="input-field"
              placeholder="Lastname"
              onChange={handleChange}
            />
            <input
              id="firstname"
              name="firstname"
              type="text"
              required
              className="input-field"
              placeholder="Firstname"
              onChange={handleChange}
            />
            <input
              id="email"
              name="email"
              type="email"
              required
              className="input-field"
              autoComplete="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              id="password"
              name="password"
              type="password"
              className="input-field"
              placeholder="Password"
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
            <button type="submit" className="btn-primary">
              S'inscrire
            </button>
            <button
              type="submit"
              className="haveAccount"
              onClick={handleRegister}
            >
              J'ai déjà un compte
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUpForm;
