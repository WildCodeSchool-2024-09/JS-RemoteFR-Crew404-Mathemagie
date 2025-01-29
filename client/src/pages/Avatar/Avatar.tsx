import "./avatar.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function Avatar() {
  const [avatar, setAvatar] = useState({
    name: "",
    photo: "",
    classe: "",
    day: "",
    month: "",
    year: "",
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

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/avatar`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: avatar.name,
            classe: avatar.classe,
            photo: avatar.photo,
            birthday: `${avatar.year}-${avatar.month}-${avatar.day}`,
          }),
        },
      );

      if (response.ok) {
        console.info("User created successfully");
      } else {
        console.error("Error POST");
      }
    } catch (err) {
      console.error("Error", err);
    }
  };

  const images = [
    "/avatarphotos/cat.png",
    "/avatarphotos/fox.png",
    "/avatarphotos/tiger.png",
    "/avatarphotos/elephant.png",
    "/avatarphotos/cadenas.png",
  ];

  // Je gère la partie du carroussel pour les images
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleImageClick = (src: string) => {
    setAvatar((prevAvatar) => ({
      ...prevAvatar,
      photo: src,
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
                onClick={() => handleImageClick(src)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleImageClick(src);
                  }
                }}
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
          <p>Dans quelle classe es-tu?</p>
          <input
            type="text"
            name="classe"
            onChange={handleChange}
            placeholder="Je suis en..."
            className="input-bulle"
            value={avatar.classe}
          />
          <p>Quelle est ta date de naissance?</p>
          <div className="anniv">
            <select
              name="day"
              className="input-anniv"
              value={avatar.day}
              onChange={handleChange}
            >
              <option value="">Jour</option>
              {[...Array(31).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              name="month"
              className="input-anniv"
              value={avatar.month}
              onChange={handleChange}
            >
              <option value="">Mois</option>
              {[...Array(12).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <select
              name="year"
              className="input-anniv"
              value={avatar.year}
              onChange={handleChange}
            >
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
          <Link to="/">
            <button className="validate-button" type="submit">
              Je valide!
            </button>
          </Link>
        </section>
      </form>
    </>
  );
}

export default Avatar;
