import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { errorToast, successToast } from "../../services/toasts";
import type { Avatar } from "../../types/types";
import "./updateAvatar.css";

function updateAvatar() {
  const navigate = useNavigate();
  const data = useLoaderData() as Avatar;
  const [avatar, setAvatar] = useState({
    name: data.name,
    picture: data.picture,
    grade: data.grade,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setAvatar((prevAvatar) => ({
      ...prevAvatar,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /**
     * Je dois modifier ce bloc de code pour correspondre à un update d'utilisateur
     */
    try {
      const response = await api.post("/api/updateavatar", {
        name: avatar.name,
        grade: avatar.grade,
        picture: avatar.picture,
      });

      if (response.status === 201) {
        successToast("Super, le profil est créé !");
        localStorage.removeItem("avatar");
        localStorage.setItem("avatar", JSON.stringify(avatar));

        navigate(`/gameshome/${response.data.id}`);
      } else {
        errorToast("Oups, une erreur est survenue !");
        console.error(response);
      }
    } catch (err) {
      console.error("Error", err);
    }
  };

  const images = [
    "/avatarphotos/chat/chat_bw.png",
    "/avatarphotos/renard/renard_bw.png",
    "/avatarphotos/tigre/tigre_bw.png",
    "/avatarphotos/elephant/elephant_bw.png",
    "/avatarphotos/cadenas.png",
  ];

  // Je gère la partie du carroussel pour les images
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
    setAvatar((prevAvatar) => ({
      ...prevAvatar,
      picture: images[currentIndex + 1],
    }));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setAvatar((prevAvatar) => ({
      ...prevAvatar,
      picture: images[currentIndex + 1],
    }));
  };

  return (
    <>
      <section className="pagetotale">
        <section className="caroussel">
          {" "}
          <h2> Choisis ton Avatar</h2>
          <section className="caroussel-images">
            {images.map((src, index) => (
              <img
                key={src}
                src={src}
                alt={`Animal ${index}`}
                className={`animal ${index === currentIndex ? "active" : ""}`}
              />
            ))}
          </section>
          <div className=" button-controls">
            <button
              type="button"
              onClick={handlePrevious}
              className="prev-button"
            >
              Précédent
            </button>
            <button type="button" onClick={handleNext} className="next-button">
              Suivant
            </button>
          </div>
        </section>
      </section>
      <form onSubmit={handleSubmit}>
        <section className="questions-creation">
          <p>Comment souhaites-tu que je t'appelle ?</p>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Je m'appelle..."
            className="input-bulle"
            value={avatar.name}
          />
          <label htmlFor="grade">Dans quelle classe es-tu?</label>
          <input
            type="text"
            name="grade"
            id="grade"
            onChange={handleChange}
            placeholder="Je suis en..."
            className="input-bulle"
            value={avatar.grade}
          />
        </section>
        <section className="creation-button">
          <button className="validate-button" type="submit">
            Je valide!
          </button>
        </section>
      </form>
    </>
  );
}

export default updateAvatar;
