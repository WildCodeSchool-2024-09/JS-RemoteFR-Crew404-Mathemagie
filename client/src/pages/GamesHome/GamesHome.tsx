import { Link, useParams } from "react-router-dom";
import "../GamesHome/GamesHome.css";

function GamesHome() {
  const { name, photo } = useParams();
  const decodedPhoto = photo ? decodeURIComponent(photo) : "";

  return (
    <>
      <section id="title">
        <h1>Choisis un jeu, {name} 🤓</h1>
      </section>
      <section id="gamesList">
        <Link to={`/levelgame1/${name}`}>
          <button type="button" className="gameCard" id="petitsCalculs">
            Petits Calculs
          </button>
        </Link>
        <Link to={`/levelgame2/${name}`}>
          <button type="button" className="gameCard" id="objetsChiffres">
            Objets & Chiffres
          </button>
        </Link>
      </section>

      <section className="BonusSection">
        <Link to={`/bonus-game/${name}`}>
          <button type="button" className="bonusGame" id="bonusGame">
            Mange Tes Maths !
          </button>
        </Link>
      </section>

      {decodedPhoto && (
        <img src={decodedPhoto} alt="Avatar" className="avatar-image" />
      )}

      <footer>
        Codé avec le ❤️ par la team <strong>@Mathémagie</strong>
      </footer>
    </>
  );
}

export default GamesHome;
