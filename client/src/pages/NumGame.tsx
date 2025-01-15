import { useEffect, useState } from "react";
import "./NumGame.css";

function generateQuestion() {
  const seriesLength = 5;
  const start = Math.floor(Math.random() * 10) + 1; // Début de la série
  const step = Math.floor(Math.random() * 5) + 1;
  const series = Array.from(
    { length: seriesLength },
    (_, i) => start + i * step,
  );

  const missingIndex = Math.floor(Math.random() * seriesLength);
  const correctAnswer = series[missingIndex];
  const choices = [
    correctAnswer,
    correctAnswer + Math.floor(Math.random() * 3) + 1,
    correctAnswer - Math.floor(Math.random() * 3) - 1,
  ].sort(() => Math.random() - 0.5); // Mélange des choix

  return { series, missingIndex, correctAnswer, choices };
}

function NumGame() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [lives, setLives] = useState(5);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(generateQuestion());

  const handleChoice = (choice: number): void => {
    if (choice === currentQuestion.correctAnswer) {
      setScore(score + 1);
    } else {
      setLives(lives - 1);
    }
    setAnswered(true);
  };

  useEffect(() => {
    if (answered) {
      if (questionIndex < 4 && lives > 0) {
        const timer = setTimeout(() => {
          setQuestionIndex(questionIndex + 1);
          setAnswered(false);
          setCurrentQuestion(generateQuestion());
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [answered, questionIndex, lives]);

  const handleGoHome = (): void => {
    window.location.href = "/home";
  };

  const handleRestart = (): void => {
    setLives(5);
    setScore(0);
    setQuestionIndex(0);
    setAnswered(false);
    setCurrentQuestion(generateQuestion());
  };

  if (lives <= 0) {
    return (
      <div className="game-container">
        <h1>Oh non ! Tu as perdu toutes tes vies.</h1>
        <p>Ton score final : {score}</p>
        <button type="button" onClick={handleRestart} className="game-button">
          Rejouer
        </button>
        <button type="button" onClick={handleGoHome} className="game-button">
          Retourner à l'accueil
        </button>
      </div>
    );
  }

  if (questionIndex >= 5) {
    return (
      <div className="game-container">
        <h1>Félicitations !</h1>
        <p>Ton score : {score} / 5</p>
        <button type="button" onClick={handleRestart} className="game-button">
          Rejouer
        </button>
        <button type="button" onClick={handleGoHome} className="game-button">
          Retourner à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="lives">
        {Array.from({ length: lives }).map((_, index) => (
          <span
            key={`heart-${index}-${new Date().getTime()}`}
            className="heart"
          >
            ❤️
          </span>
        ))}
      </div>
      <h1>Retrouve le chiffre manquant !</h1>
      <div className="series">
        {currentQuestion.series.map((num, index) => {
          const uniqueKey = `${num}-${index}-${currentQuestion.missingIndex}`;
          return (
            <div
              key={uniqueKey}
              className={`series-item ${index === currentQuestion.missingIndex ? "missing" : ""}`}
            >
              {index === currentQuestion.missingIndex ? "?" : num}
            </div>
          );
        })}
      </div>
      <div className="choices">
        {currentQuestion.choices.map((choice) => (
          <button
            key={`choice-${choice}-${currentQuestion.series.join("-")}`}
            type="button"
            className="choice-button"
            onClick={() => handleChoice(choice)}
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
}

export default NumGame;
