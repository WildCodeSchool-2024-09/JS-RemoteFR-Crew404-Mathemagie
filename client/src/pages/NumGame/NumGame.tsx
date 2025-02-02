import { useEffect, useState } from "react";
import "../NumGame/NumGame.css";

function generateQuestion(seriesLength = 5, maxStart = 20, maxStep = 5) {
  const start = Math.floor(Math.random() * maxStart) + 1;
  const step = Math.floor(Math.random() * maxStep) + 1;
  const series = Array.from(
    { length: seriesLength },
    (_, i) => start + i * step,
  );

  const missingIndex = Math.floor(Math.random() * seriesLength);
  const correctAnswer = series[missingIndex];
  const choices = [
    correctAnswer,
    correctAnswer + Math.floor(Math.random() * 5) + 1,
    correctAnswer - Math.floor(Math.random() * 5) - 1,
  ].sort(() => Math.random() - 0.5);

  return { series, missingIndex, correctAnswer, choices };
}

function NumGame() {
  const TOTAL_QUESTIONS = 10;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [lives, setLives] = useState(5);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(generateQuestion());
  const [feedback, setFeedback] = useState<null | "correct" | "wrong">(null);
  const [xpBlocked, setXpBlocked] = useState(
    localStorage.getItem("numGameCompleted") === "true",
  );
  const [correctStreak, setCorrectStreak] = useState(0);

  const handleChoice = (choice: number) => {
    if (choice === currentQuestion.correctAnswer) {
      if (!xpBlocked) setScore(score + 1);
      setCorrectStreak(correctStreak + 1);
      setFeedback("correct");
    } else {
      setLives(lives - 1);
      setCorrectStreak(0);
      setFeedback("wrong");
    }
    setAnswered(true);
  };

  useEffect(() => {
    if (answered) {
      if (questionIndex < TOTAL_QUESTIONS - 1 && lives > 0) {
        const timer = setTimeout(() => {
          setQuestionIndex(questionIndex + 1);
          setAnswered(false);
          setFeedback(null);
          setCurrentQuestion(generateQuestion());
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [answered, questionIndex, lives]);

  const handleRestart = () => {
    setLives(5);
    setScore(0);
    setQuestionIndex(0);
    setAnswered(false);
    setFeedback(null);
    setCorrectStreak(0);
    setCurrentQuestion(generateQuestion());

    const hasAlreadyWon = localStorage.getItem("numGameCompleted") === "true";
    setXpBlocked(hasAlreadyWon);
  };

  const handleGoHome = () => {
    window.location.href = "/home";
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

  if (questionIndex >= TOTAL_QUESTIONS) {
    if (score > 0) {
      localStorage.setItem("numGameCompleted", "true");
      setXpBlocked(true);
    }

    return (
      <div className="game-container">
        <h1>Félicitations !</h1>
        <p>
          Ton score : {score} / {TOTAL_QUESTIONS}
        </p>
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
        {Array.from({ length: lives }).map((_, index) => {
          const uniqueKey = `heart-${index}-${Math.random()}`;
          return (
            <span
              key={uniqueKey}
              className={`heart ${feedback === "wrong" ? "shake" : ""}`}
            >
              ❤️
            </span>
          );
        })}
      </div>
      <h1>Retrouve le chiffre manquant !</h1>
      <p>
        Question {questionIndex + 1} sur {TOTAL_QUESTIONS}
      </p>
      <div className="series">
        {currentQuestion.series.map((num, index) => (
          <div
            key={`series-${num}-${currentQuestion.missingIndex === index ? "missing" : num}`}
            className={`series-item ${
              index === currentQuestion.missingIndex
                ? feedback === "correct"
                  ? "correct"
                  : feedback === "wrong"
                    ? "wrong"
                    : "missing"
                : ""
            }`}
          >
            {index === currentQuestion.missingIndex ? "?" : num}
          </div>
        ))}
      </div>
      <div className="choices">
        {currentQuestion.choices.map((choice) => (
          <button
            key={`choice-${choice}`}
            type="button"
            className="choice-button-un"
            onClick={() => handleChoice(choice)}
          >
            {choice}
          </button>
        ))}
      </div>

      {/* 🔥 Message d'encouragement (sans bouton rejouer) */}
      {correctStreak >= 2 && (
        <div className="encouragement">
          <h2>Bravo ! Tu es sur une super lancée ! 🚀</h2>
        </div>
      )}
    </div>
  );
}

export default NumGame;
