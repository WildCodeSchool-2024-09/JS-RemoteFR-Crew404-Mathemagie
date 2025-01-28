import { useEffect, useState } from "react";
import "./EuroGame.css";
import piece from "../assets/images/Pièce.png";
import ad from "../assets/images/ad.png";
import ae from "../assets/images/ae.png";
import cen from "../assets/images/cen.png";
import cent from "../assets/images/cent.png";
import centi from "../assets/images/centi.png";
import ces from "../assets/images/ces.png";
import cinq from "../assets/images/cinq.png";
import jep from "../assets/images/jep.png";
import un from "../assets/images/un.png";

// Déplacer questions en dehors du composant
const questions = [
  {
    question: "Combien de centimes valent ces pièces ?",
    answer: 80,
    image: cent,
    options: [45, 50, 20, 80],
  },
  {
    question: "Quelle est la somme de ces trois pièces ?",
    answer: 1.22,
    image: centi,
    options: [3, 20, 2.2, 1.22],
  },

  {
    question: "Combien de centimes valent toutes les pièces en bronze ?",
    answer: 3,
    image: cen,
    options: [3, 8, 5, 4],
  },
  {
    question: "Quelle est la somme totale ?",
    answer: 385,
    image: ces,
    options: [350, 385, 380, 305],
  },
  {
    question: "Combien valent ces billets ?",
    answer: 885,
    image: ad,
    options: [880, 890, 888, 885],
  },
  {
    question: "Donnez la somme totale ?",
    answer: 300,
    image: jep,
    options: [200, 300, 250, 150],
  },
  {
    question: "Combien de billets de 50€ y'a t-il ?",
    answer: 1,
    image: ae,
    options: [5, 6, 1, 4],
  },
  {
    question: "Donnez la somme de toutes les pièces contenant de l'or ?",
    answer: 3.8,
    image: piece,
    options: [4.5, 3.5, 3.8],
  },
  {
    question: "Combien valent les 5 pièces d'1€?",
    answer: 5,
    image: un,
    options: [6, 4, 5],
  },
  {
    question: "Quelle est la somme des billets?",
    answer: 10,
    image: cinq,
    options: [250, 150, 200, 300],
  },
  // Ajoutez d'autres questions si nécessaire
];

function EuroGame() {
  const TOTAL_QUESTIONS = 10; // Nombre total de questions
  const [questionIndex, setQuestionIndex] = useState(0);
  const [lives, setLives] = useState(6);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [feedback, setFeedback] = useState<null | "correct" | "wrong">(null);

  useEffect(() => {
    setCurrentQuestion(questions[questionIndex]);
  }, [questionIndex]); // Maintenant on peut retirer questions des dépendances

  const handleChoice = (answer: number) => {
    if (answer === currentQuestion.answer) {
      setScore(score + 1);
      setFeedback("correct");
    } else {
      setLives(lives - 1);
      setFeedback("wrong");
    }
    setAnswered(true);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (answered) {
      const timer = setTimeout(() => {
        if (questionIndex < TOTAL_QUESTIONS - 1) {
          setQuestionIndex(questionIndex + 1);
          setAnswered(false);
          setFeedback(null);
        } else {
          alert(`Fin du jeu ! Votre score final est : ${score}`);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [answered, questionIndex, lives]); // Retirer TOTAL_QUESTIONS des dépendances

  const handleRestart = () => {
    setLives(6);
    setScore(0);
    setQuestionIndex(0);
    setAnswered(false);
    setFeedback(null);
    setCurrentQuestion(questions[0]);
  };

  const handleGoHome = () => {
    window.location.href = "/home";
  };

  // Rendu conditionnel pour afficher les messages de fin de jeu
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
    <div className="car-game-container">
      <h1>
        Jeu 2<p>Associez les objets au bon chiffre avant la fin du chrono</p>
      </h1>

      <div className="lives">
        {Array.from({ length: lives }).map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <span key={index} className="heart">
            ❤️
          </span>
        ))}
      </div>

      <div className="question">
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
            disabled={lives === 0} // Désactive les boutons si le jeu est terminé
          >
            {num}
          </button>
        ))}
      </div>
      <div className="score">Score : {score}</div>
      {feedback && (
        <div className={`feedback ${feedback}`}>
          {feedback === "correct" ? "Bonne réponse !" : "Mauvaise réponse !"}
        </div>
      )}
    </div>
  );
}

export default EuroGame;
