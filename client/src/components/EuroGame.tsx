import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { Link } from "react-router-dom";
import { useAvatar } from "../Context/AvatarContext";
import questionsEuroGame from "../services/questionEuroGame";
import "./EuroGame.css";

function EuroGame() {
  const { avatar } = useAvatar();
  const TOTAL_QUESTIONS = 10;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(100);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(questionsEuroGame[0]);
  const [feedback, setFeedback] = useState<null | "correct" | "wrong">(null);

  useEffect(() => {
    setCurrentQuestion(questionsEuroGame[questionIndex]);
    setProgress(100);
  }, [questionIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => Math.max(prev - 1, 0));
    }, 500);

    return () => clearInterval(timer);
  }, []);

  const handleChoice = (answer: number | string) => {
    if (answer === currentQuestion.answer) {
      setScore(score + 1);
      setFeedback("correct");
    } else {
      setFeedback("wrong");
    }
    setAnswered(true);
  };

  useEffect(() => {
    if (answered) {
      const timer = setTimeout(() => {
        if (questionIndex < questionsEuroGame.length - 1) {
          setQuestionIndex(questionIndex + 1);
          setAnswered(false);
          setFeedback(null);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [answered, questionIndex]);

  const handleRestart = () => {
    setProgress(100);
    setScore(0);
    setQuestionIndex(0);
    setAnswered(false);
    setFeedback(null);
    setCurrentQuestion(questionsEuroGame[0]);
  };

  if (progress <= 0) {
    return (
      <div className="game-container">
        <h1>Oh non ! Tu n'as pas terminé à temps.</h1>
        <p>Ton score final : {score}</p>
        <button type="button" onClick={handleRestart} className="game-button">
          Rejouer
        </button>
        <Link to={`/gamehome/${avatar.id_user}`} className="game-button">
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
        <button type="button" onClick={handleRestart} className="game-button">
          Rejouer
        </button>
        <Link
          className="game-button-primary"
          type="button"
          to={`/gameshome/${avatar.id_user}`}
        >
          Retourner à l'accueil
        </Link>
      </div>
    );
  }

  return (
    <div className="car-game-container">
      <h1>Associez les objets au bon chiffre avant la fin du chrono</h1>

      {progress > 0 && (
        <div
          className="progress-bar"
          style={{
            width: `${progress}%`,
            backgroundColor:
              progress > 50
                ? "green"
                : progress > 20
                  ? "yellow"
                  : progress > 10
                    ? "orange"
                    : "red",
            height: "20px",
          }}
        />
      )}

      <div className="question" style={{ color: "#4059ad" }}>
        {currentQuestion.question}
        <img
          src={currentQuestion.image}
          alt="Question"
          className="question-image"
        />
      </div>
      <div className="answers">
        {currentQuestion.options.map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => handleChoice(num)}
            disabled={progress === 0}
          >
            {num}
          </button>
        ))}
      </div>
      <div className="score-eurogame">Score : {score}</div>
      {feedback && (
        <div className={`feedback ${feedback}`}>
          {feedback === "correct" ? "Bonne réponse !" : "Mauvaise réponse !"}
        </div>
      )}
    </div>
  );
}

export default EuroGame;
