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

  const [modal, setModal] = useState(false);
  const [exists, setExists] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRedirection = () => {
    window.location.href = "/login";
  };

  const handleSignUp = () => {
    setModal(true);
    setTimeout(() => setModal(false), 2000);
    setTimeout(() => handleRedirection(), 2000);
  };

  const handleAlreadyCreated = () => {
    setExists(true);
    setTimeout(() => setExists(false), 2000);
  };

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

  const handleRegister = () => {
    window.location.href = "/login";
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
