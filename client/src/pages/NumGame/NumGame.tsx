import { useCallback, useEffect, useState } from "react";
import "./NumGame.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAvatar } from "../../Context/AvatarContext";

function generateQuestion(seriesLength = 5, maxStart = 20, maxStep = 5) {
  const start = Math.floor(Math.random() * maxStart) + 1;
  const step = Math.floor(Math.random() * maxStep) + 1;
  const series = Array.from(
    { length: seriesLength },
    (_, index) => start + index * step,
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
  const navigate = useNavigate();
  const { avatar, handleLevel } = useAvatar();

  const TOTAL_QUESTIONS = 10;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [lives, setLives] = useState(5);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(generateQuestion());
  const [feedback, setFeedback] = useState<null | "correct" | "wrong">(null);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleChoice = (choice: number) => {
    if (choice === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
      setCorrectStreak((prev) => prev + 1);
      setFeedback("correct");
    } else {
      setLives((prev) => prev - 1);
      setCorrectStreak(0);
      setFeedback("wrong");
    }
    setAnswered(true);
  };

  useEffect(() => {
    if (answered) {
      if (questionIndex < TOTAL_QUESTIONS - 1 && lives > 0) {
        const timer = setTimeout(() => {
          setQuestionIndex((prev) => prev + 1);
          setAnswered(false);
          setFeedback(null);
          setCurrentQuestion(generateQuestion());
        }, 1000);
        return () => clearTimeout(timer);
      }
      if (questionIndex >= TOTAL_QUESTIONS - 1 || lives <= 0) {
        setGameOver(true);
      }
    }
  }, [answered, questionIndex, lives]);

  // 🏆 Mise à jour du niveau de l'utilisateur avec Axios
  const handleGameOver = useCallback(async () => {
    if (!avatar || !avatar.id_user) {
      console.error("❌ Erreur : Impossible de récupérer l'utilisateur.");
      return;
    }

    const newLevel = score >= 8 ? 2 : 1;

    try {
      const response = await axios.post(
        `http://localhost:3310/api/users/${avatar.id_user}/level-up`,
        { newLevel },
        { withCredentials: true },
      );
      handleLevel(newLevel);
      console.info("✅ Niveau mis à jour avec succès :", response.data);
    } catch (error) {
      console.error("❌ Erreur lors de la mise à jour du niveau :", error);
    }
  }, [avatar, score, handleLevel]);

  useEffect(() => {
    if (gameOver) {
      handleGameOver();
    }
  }, [gameOver, handleGameOver]);

  const handleRestart = () => {
    setLives(5);
    setScore(0);
    setQuestionIndex(0);
    setAnswered(false);
    setFeedback(null);
    setCorrectStreak(0);
    setCurrentQuestion(generateQuestion());
    setGameOver(false);
  };

  const handleGoHome = () => {
    navigate(`/levelgame1/${avatar.name}`);
  };

  if (gameOver) {
    return (
      <div className="num-game-container">
        <h1>
          {lives > 0
            ? "Félicitations !"
            : "Oh non ! Tu as perdu toutes tes vies."}
        </h1>
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
    <div className="num-game-container">
      <h1>Retrouve le chiffre manquant !</h1>
      <p>
        Question {questionIndex + 1} sur {TOTAL_QUESTIONS}
      </p>
      <div className="lives">
        {Array.from({ length: lives }).map(() => (
          <span
            key={crypto.randomUUID()} // Utilisation d'un identifiant unique
            className={`heart ${feedback === "wrong" ? "shake" : ""}`}
          >
            ❤️
          </span>
        ))}
      </div>
      <div className="series">
        {currentQuestion.series.map((num) => (
          <div
            key={`series-${num}`} // Utilisation de la valeur num au lieu de l'index
            className={`series-item ${
              currentQuestion.series.indexOf(num) ===
              currentQuestion.missingIndex
                ? feedback === "correct"
                  ? "correct"
                  : feedback === "wrong"
                    ? "wrong"
                    : "missing"
                : ""
            }`}
          >
            {num === currentQuestion.series[currentQuestion.missingIndex]
              ? "?"
              : num}
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
      {correctStreak >= 2 && (
        <div className="encouragement">
          <h2>Bravo ! Tu es sur une super lancée ! 🚀</h2>
        </div>
      )}
    </div>
  );
}

export default NumGame;
