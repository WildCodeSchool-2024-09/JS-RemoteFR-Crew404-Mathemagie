import "./avatar.css";
import { useState } from "react";

function Avatar() {
  const images = [
    "/public/avatarphotos/chat.png",
    "/public/avatarphotos/chien.png",
    "/public/avatarphotos/renard.png",
    "/public/avatarphotos/cadenas.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <>
      <section className="pagetotale">
        <h2>Avatar</h2>
        <section className="caroussel">
          <img
            src={images[currentIndex]}
            alt={`Animal ${currentIndex + 1}`}
            className="animal"
          />
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
      <section className="questions-creation">
        <p>Comment souhaites-tu que je t'appelle ?</p>
        <input
          type="text"
          placeholder="Je m'appelle..."
          className="input-bulle"
        />
        <p>Dans quelle classe es-tu?</p>
        <input
          type="text"
          placeholder="Je suis en..."
          className="input-bulle"
        />
        <p>Quelle est ta date de naissance?</p>
        <div className="anniv">
          <select className="input-anniv">
            <option value="">Jour</option>
            {[...Array(31).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <select className="input-anniv">
            <option value="">Mois</option>
            {[...Array(12).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          <select className="input-anniv">
            <option value="">Année</option>
            {[...Array(2025 - 2000 + 1).keys()].map((i) => (
              <option key={2000 + i} value={2000 + i}>
                {2000 + i}
              </option>
            ))}
          </select>
        </div>
      </section>
      <section className="creation-button">
        <button className="validate-button" type="button">
          Je valide!
        </button>
      </section>
    </>
  );
}

export default Avatar;
