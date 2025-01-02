import "./GamesHome.css";

function GamesHome() {
  return (
    <>
      <header id="statsBar">
        <p>Niveau X</p>
        <p>X/X</p>
      </header>
      <body>
        <section id="title">
          <h1>Choisis un jeu !</h1>
        </section>
        <section id="gamesList">
          <div className="gameCard">
            <p>Des objets et des chiffres</p>
          </div>
          <div className="gameCard">
            <p>Petits calculs !</p>
          </div>
          <div id="dailyQuiz">
            <p>Quiz Quotidien</p>
          </div>
        </section>
      </body>
    </>
  );
}

export default GamesHome;
