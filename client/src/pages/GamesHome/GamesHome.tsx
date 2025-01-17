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
        <button type="button" className="gameCard">
          <p>Petits calculs !</p>
        </button>
        <button type="button" id="dailyQuiz">
          <p>Quiz Quotidien</p>
        </button>
      </section>
    </>
  );
}

export default GamesHome;
