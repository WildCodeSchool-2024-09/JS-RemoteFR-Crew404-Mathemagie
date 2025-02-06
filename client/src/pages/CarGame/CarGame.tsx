import { useEffect, useState } from "react";
import questionsCarGame from "../../services/questionCarGame";
import "./CarGame.css";

import Confetti from "react-confetti";
import { Link } from "react-router-dom";

function CarGame() {
  const TOTAL_QUESTIONS = 10;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [lives, setLives] = useState(6);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(questionsCarGame[0]);
  const [, setFeedback] = useState<null | "correct" | "wrong">(null);
  const [, setSelectedAnswer] = useState<number | null>(null);

  useEffect(() => {
    setCurrentQuestion(questionsCarGame[questionIndex]);
  }, [questionIndex]);

  const handleChoice = (answer: number | string) => {
    setSelectedAnswer(typeof answer === "number" ? answer : null);
    if (answer === currentQuestion.answer) {
      setScore(score + 1);
      setFeedback("correct");
    } else {
      setLives(lives - 1);
      setFeedback("wrong");
    }
    setAnswered(true);
  };

  useEffect(() => {
    if (answered) {
      const timer = setTimeout(() => {
        if (questionIndex < TOTAL_QUESTIONS - 1 && lives > 0) {
          setQuestionIndex(questionIndex + 1);
          setAnswered(false);
          setFeedback(null);
          setSelectedAnswer(null);
        } else if (questionIndex === TOTAL_QUESTIONS - 1 && lives >= 0) {
          <div className="game-container">
            <h1>Félicitations !</h1>
            <p>
              Ton score : {score} / {TOTAL_QUESTIONS}
            </p>
            <button
              type="button"
              onClick={() => {
                window.location.href = "/euro-game";
              }}
              className="game-button"
            >
              Rejouer
            </button>
            <button
              type="button"
              onClick={() => {
                window.location.href = "/home";
              }}
              className="game-button"
            >
              Retourner à l'accueil
            </button>
          </div>;
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [answered, questionIndex, lives, score]);

  if (lives <= 0) {
    return (
      <div className="game-container">
        <h1>Oh non ! Tu as perdu toutes tes vies.</h1>
        <p>Ton score final : {score}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="game-button"
        >
          Rejouer
        </button>
        <Link to="/home" className="game-button">
          Retourner à l'accueil
        </Link>
      </div>
    );
  }

  if (questionIndex === TOTAL_QUESTIONS - 1 && answered) {
    return (
      <div className="game-container">
        <Confetti />
        <h1>Félicitations !</h1>
        <p>
          Ton score : {score} / {TOTAL_QUESTIONS}
        </p>
        <button
          type="button"
          onClick={() => {
            window.location.href = "/euro-game";
          }}
          className="game-button"
        >
          Passer au niveau 2
        </button>
        <button
          type="button"
          onClick={() => {
            window.location.href = "/home";
          }}
          className="game-button"
        >
          Retourner à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div className="car-game-container">
      <div className="lives">
        {Array.from({ length: lives }).map((_, index) => (
          <span key={index.toString()} className="heart">
            ❤️
          </span>
        ))}
      </div>

      <h1>Associe les objets au bon chiffre !</h1>

      <div
        className="question"
        style={{ color: "#4059ad", fontSize: "1.5rem" }}
      >
        {currentQuestion.question}
        <img
          src={currentQuestion.image}
          alt="Question"
          className="question-image"
          width="600px"
        />
      </div>
      <div className="answers">
        {currentQuestion.options.map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => handleChoice(num)}
            disabled={answered}
            className={
              answered
                ? num === currentQuestion.answer
                  ? "correct"
                  : "wrong"
                : ""
            }
          >
            {num}
          </button>
        ))}
      </div>
      <div className="score-cargame">Score : {score}</div>
    </div>
  );
}

export default CarGame;
