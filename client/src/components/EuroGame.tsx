import { useEffect, useState } from "react";
import "./EuroGame.css";
import Confetti from "react-confetti";
import piece from "../assets/images/Piece.png";
import ad from "../assets/images/ad.png";
import ae from "../assets/images/ae.png";
import cen from "../assets/images/cen.png";
import cent from "../assets/images/cent.png";
import centi from "../assets/images/centi.png";
import ces from "../assets/images/ces.png";
import cinq from "../assets/images/cinq.png";
import jep from "../assets/images/jep.png";
import un from "../assets/images/un.png";

const questions = [
  {
    question: "Combien de centimes valent ces pièces ?",
    answer: 80,
    image: cent,
    options: [45, 50, 80, "Je ne sais pas"],
  },
  {
    question: "Quelle est la somme de ces trois pièces ?",
    answer: 1.22,
    image: centi,
    options: [3, 2.2, 1.22, "Je ne sais pas"],
  },

  {
    question: "Combien de centimes valent toutes les pièces en bronze ?",
    answer: 8,
    image: cen,
    options: [3, 8, 5, "Je ne sais pas"],
  },
  {
    question: "Quelle est la somme totale ?",
    answer: 385,
    image: ces,
    options: [350, 385, 380, "Je ne sais pas"],
  },
  {
    question: "Combien valent ces billets ?",
    answer: 885,
    image: ad,
    options: [880, 885, 888, "Je ne sais pas"],
  },
  {
    question: "Donnez la somme totale ?",
    answer: 300,
    image: jep,
    options: [200, 300, 250, "Je ne sais pas"],
  },
  {
    question: "Combien de billets de 50€ y'a t-il ?",
    answer: 1,
    image: ae,
    options: [5, 6, 1, "Je ne sais pas"],
  },
  {
    question: "Donnez la somme de toutes les pièces contenant de l'or ?",
    answer: 3.8,
    image: piece,
    options: [4.5, 3.5, 3.8, "Je ne sais pas"],
  },
  {
    question: "Combien valent les 5 pièces d'1€?",
    answer: 5,
    image: un,
    options: [6, 4, 5, "Je ne sais pas"],
  },
  {
    question: "Quelle est la somme des billets?",
    answer: 200,
    image: cinq,
    options: [250, 150, 200, "Je ne sais pas"],
  },
];

function EuroGame() {
  const TOTAL_QUESTIONS = 10;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(100);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [feedback, setFeedback] = useState<null | "correct" | "wrong">(null);

  useEffect(() => {
    setCurrentQuestion(questions[questionIndex]);
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
        if (questionIndex < questions.length - 1) {
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
    setCurrentQuestion(questions[0]);
  };

  const handleGoHome = () => {
    window.location.href = "/home";
  };

  if (progress <= 0) {
    return (
      <div className="game-container">
        <h1>Oh non ! Tu n'as pas terminé à temps.</h1>
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
        <button type="button" onClick={handleGoHome} className="game-button">
          Retourner à l'accueil
        </button>
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
