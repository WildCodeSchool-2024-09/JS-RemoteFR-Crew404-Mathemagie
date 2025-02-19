import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useAvatar } from "../../Context/AvatarContext";
import api from "../../services/api";
import { errorToast, successToast } from "../../services/toasts";
import type { Avatar } from "../../types/types";
import "./updateAvatar.css";

function UpdateAvatar() {
  const navigate = useNavigate();
  const data = useLoaderData() as Avatar;
  const { avatar: contextAvatar, handleAvatar: updateAvatar } = useAvatar();

  const [avatar, setAvatar] = useState({
    id_user: data.id_user,

    name: data.name,
    picture: data.picture,
    grade: data.grade,
  });

  const currentLevel = contextAvatar.current_level;

  const levelToImages: Record<number, string[]> = {
    1: [
      "/avatarphotos/chat/chat_bw.png",
      "/avatarphotos/elephant/elephant_bw.png",
      "/avatarphotos/renard/renard_bw.png",
      "/avatarphotos/tigre/tigre_bw.png",
    ],
    2: [
      "/avatarphotos/chat/chat_bw.png",
      "/avatarphotos/chat/chat_couleur.png",
      "/avatarphotos/elephant/elephant_bw.png",
      "/avatarphotos/elephant/elephant.png",
      "/avatarphotos/renard/renard_bw.png",
      "/avatarphotos/renard/renard.png",
      "/avatarphotos/tigre/tigre_bw.png",
      "/avatarphotos/tigre/tigre.png",
    ],
    3: [
      "/avatarphotos/chat/chat_bw.png",
      "/avatarphotos/chat/chat_couleur.png",
      "/avatarphotos/chat/cat_hat.png",
      "/avatarphotos/chat/chat_glasses.png",
      "/avatarphotos/chat/cat_glasses_hat.png",

      "/avatarphotos/renard/renard_bw.png",
      "/avatarphotos/renard/renard.png",
      "/avatarphotos/renard/renard_hat.png",
      "/avatarphotos/renard/renard_glasses.png",
      "/avatarphotos/renard/renard_hat_glasses.png",

      "/avatarphotos/tigre/tigre_bw.png",
      "/avatarphotos/tigre/tigre.png",
      "/avatarphotos/tigre/tigre_hat.png",
      "/avatarphotos/tigre/tigre_glasses.png",
      "/avatarphotos/tigre/tigre_hat_glasses.png",

      "/avatarphotos/elephant/elephant_bw.png",
      "/avatarphotos/elephant/elephant.png",
      "/avatarphotos/elephant/elephant_hat.png",
      "/avatarphotos/elephant/elephant_glasses.png",
      "/avatarphotos/elephant/elephant_glasses_hat.png",
    ],
  };

  const unlockedImages = levelToImages[currentLevel ?? 0] || [
    "/avatarphotos/cadenas.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + unlockedImages.length) % unlockedImages.length,
    );
    setAvatar((prevAvatar) => ({
      ...prevAvatar,
      picture:
        unlockedImages[
          (currentIndex - 1 + unlockedImages.length) % unlockedImages.length
        ],
    }));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % unlockedImages.length);
    setAvatar((prevAvatar) => ({
      ...prevAvatar,
      picture: unlockedImages[(currentIndex + 1) % unlockedImages.length],
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setAvatar((prevAvatar) => ({ ...prevAvatar, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.put(
        `/api/updateavatar/${contextAvatar.id_user}`,
        avatar,
      );

      if (response.status === 200) {
        successToast("Super, le profil est mis à jour !");
        localStorage.setItem("avatar", JSON.stringify(avatar));

        updateAvatar({
          id_user: response.data.updatedUser.id_user,
          name: avatar.name,
          picture: avatar.picture,
          grade: avatar.grade,
          day: "",
          month: "",
          year: "",
          current_level: response.data.updatedUser.current_level,
        });

        navigate(`/gameshome/${response.data.updatedUser.id_user}`);
      } else {
        errorToast("Oups, une erreur est survenue !");
        console.error(response);
      }
    } catch (err) {
      console.error("Error", err);
    }
  };

  return (
    <>
      <section className="pagetotale">
        <section className="caroussel">
          <h2> Choisis ton Avatar</h2>
          <section className="caroussel-images">
            <img
              src={
                unlockedImages[
                  (currentIndex - 1 + unlockedImages.length) %
                    unlockedImages.length
                ]
              }
              alt="Avatar précédent"
              className="animal inactive"
            />
            <img
              src={unlockedImages[currentIndex]}
              alt="Avatar sélectionné"
              className="animal active"
            />
            <img
              src={unlockedImages[(currentIndex + 1) % unlockedImages.length]}
              alt="Avatar suivant"
              className="animal inactive"
            />
          </section>
          <div className="button-controls">
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

export default UpdateAvatar;
