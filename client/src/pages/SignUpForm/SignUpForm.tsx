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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /**
     * On a testé avec axios, point faible, trop fort.
     */
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/register`,
      register,
    );

    console.info(response.data);

    /**
     * On a testé avec fetch, point fort, trop faible.
     */
    // const response = await fetch("http://localhost:3310/api/register", {
    // 	method: "POST",
    // 	headers: {
    // 		"Content-Type": "application/json",
    // 	},
    // 	body: JSON.stringify(register),
    // });

    // const data = await response.json();

    // console.log(data);
  };

  return (
    <div className="sign-up-container">
      <div className="sign-up-card">
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
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
