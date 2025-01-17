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
            Petits calculs
          </button>
        </Link>
        <Link to="/levelgame2">
          <button type="button" className="gameCard" id="objetsChiffres">
            Des objets et des chiffres
          </button>
        </Link>
      </section>
      <section className="quizSection">
        <button type="button" id="dailyQuiz">
          Quiz Quotidien
        </button>
      </section>
      <footer>Codé avec le ❤️ par la team @Crew404 </footer>
    </>
  );
}

export default GamesHome;
