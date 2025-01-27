import { Link } from "react-router-dom";
import "../GamesHome/GamesHome.css";

function GamesHome() {
  return (
    <>
      <section id="title">
        <h1>Choisis un jeu, Maël !🤓</h1>
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
          Quiz Quotidien
        </button>
      </section>
      <footer>
        Codé avec le ❤️ par la team <strong>@Crew404</strong>
      </footer>
    </>
  );
}

export default GamesHome;
