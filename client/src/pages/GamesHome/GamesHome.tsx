import { Link } from "react-router-dom";
import "../GamesHome/GamesHome.css";

function GamesHome() {
  return (
    <>
      <section id="title">
        <h1>Choisis un jeu !</h1>
      </section>
      <section id="gamesList">
        <button type="button" className="gameCard">
          <p>Des objets et des chiffres</p>
        </button>
        <Link to="/levelgame1">
          <button type="button" className="gameCard">
            <p>Petits calculs !</p>
          </button>
        </Link>
        <button type="button" id="dailyQuiz">
          <p>Quiz Quotidien</p>
        </button>
      </section>
    </>
  );
}

export default GamesHome;
