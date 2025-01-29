import { Link } from "react-router-dom";
import "../GamesHome/GamesHome.css";

function GamesHome() {
  return (
    <>
      <section id="title">
        <h1>Choisis un jeu, Utilisateur !🤓</h1>
      </section>
      <section id="gamesList">
        <Link to="/levelgame1">
          <button type="button" className="gameCard" id="petitsCalculs">
            Petits Calculs
          </button>
        </Link>
        <Link to="/levelgame2">
          <button type="button" className="gameCard" id="objetsChiffres">
            Objets & Chiffres
          </button>
        </Link>
      </section>
      <section className="quizSection">
        <button type="button" id="dailyQuiz">
          Jeu Quotidien
        </button>
      </section>
      <section className="BonusSection">
        <Link to="/bonus-game">
          <button type="button" className="bonusGame" id="bonusGame">
            Mange Tes Maths !
          </button>
        </Link>
      </section>
      <footer>
        Codé avec le ❤️ par la team <strong>@Mathémagie</strong>
      </footer>
    </>
  );
}

export default GamesHome;
