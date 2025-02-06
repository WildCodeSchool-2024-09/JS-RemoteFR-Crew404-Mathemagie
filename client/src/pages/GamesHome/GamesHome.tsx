import { Link, useLoaderData } from "react-router-dom";
import { useAvatar } from "../../Context/AvatarContext";
import type { Avatar } from "../../types/types";
import "../GamesHome/GamesHome.css";

function GamesHome() {
  const { handleAvatar } = useAvatar();
  const user = useLoaderData() as Avatar;
  handleAvatar(user);
  return (
    <>
      <section id="title">
        <h1>Choisis un jeu, {user.prenom} 🤓</h1>
      </section>
      <section id="gamesList">
        <Link to={`/levelgame1/${user.prenom}`}>
          <button type="button" className="gameCard" id="petitsCalculs">
            Petits Calculs
          </button>
        </Link>
        <Link to={`/levelgame2/${user.prenom}`}>
          <button type="button" className="gameCard" id="objetsChiffres">
            Objets & Chiffres
          </button>
        </Link>
      </section>

      <section className="BonusSection">
        <Link to={`/bonus-game/${user.prenom}`}>
          <button type="button" className="bonusGame" id="bonusGame">
            Mange Tes Maths !
          </button>
        </Link>
      </section>
      <img src={user.photo} alt="Avatar" className="avatar-image" />

      <footer>
        Codé avec le ❤️ par la team <strong>@Mathémagie</strong>
      </footer>
    </>
  );
}

export default GamesHome;
