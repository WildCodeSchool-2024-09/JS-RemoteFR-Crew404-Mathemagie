import { Link } from "react-router-dom";
import "../GamesHome/GamesHome.css";

function GamesHome() {
  return (
    <>
      <section id="title">
        <h1>Choisis un jeu </h1>
      </section>
      <section id="gamesList">
        <Link to="/levelgame1">
          <button type="button" className="gameCard" id="petitsCalculs">
            <p>Petits calculs</p>
          </button>
        </Link>
        <Link to="/levelgame2">
          <button type="button" className="gameCard" id="objetsChiffres">
            <p>Des objets et des chiffres</p>
          </button>
        </Link>
      </section>
      <section className="quizSection">
        <button type="button" id="dailyQuiz">
          <p>Quiz Quotidien</p>
        </button>
      </section>
    </>
  );
}

export default GamesHome;
