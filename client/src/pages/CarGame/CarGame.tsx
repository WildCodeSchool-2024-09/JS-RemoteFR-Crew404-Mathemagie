import { useEffect, useState } from "react";
import "./CarGame.css";
import Animals from "../../assets/images/Animals.png";
import BusBus from "../../assets/images/BusBus.png";
import moto from "../../assets/images/Moto.png";
import berline from "../../assets/images/berline.png";
import billets from "../../assets/images/billets.png";
import decapo from "../../assets/images/decapo.png";
import enfants from "../../assets/images/enfants.png";
import s from "../../assets/images/s.png";
import somme from "../../assets/images/somme.png";

const questions = [
  {
    question: "Combien de berlines y'a t-il ?",
    answer: 6,
    image: berline,
    options: [4, 5, 2, 6],
  },
  {
    question: "Combien de berlines noires y'a t-il ?",
    answer: 2,
    image: berline,
    options: [4, 5, 2, 6],
  },

  {
    question: "Combien de billets de 20€ y'a t-il ?",
    answer: 7,
    image: s,
    options: [7, 6, 5, 4],
  },
  {
    question: "Comptez le nombre d'animaux ?",
    answer: 9,
    image: Animals,
    options: [11, 8, 9, 6],
  },
  {
    question: "Quelle est la somme des 2 billets ?",
    answer: 100,
    image: somme,
    options: [90, 100, 73, 64],
  },
  {
    question: "Quel est le nombre de cabriolets ?",
    answer: 4,
    image: decapo,
    options: [2, 4, 6, 7],
  },
  {
    question: "Combien d'enfants ont les cheveux de couleur noire' ?",
    answer: 3,
    image: enfants,
    options: [8, 6, 3, 4],
  },
  {
    question: "Quelle est la somme de ces billets ?",
    answer: 35,
    image: billets,
    options: [32, 34, 43, 35],
  },
  {
    question: "Combien de roues possède chaque moto ?",
    answer: 2,
    image: moto,
    options: [2, 3, 7, 5],
  },
  {
    question: "Combien de vitres possède ce bus ?",
    answer: 10,
    image: BusBus,
    options: [8, 12, 9, 10],
  },
];

function CarGame() {
  const TOTAL_QUESTIONS = 10;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [lives, setLives] = useState(6);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [, setFeedback] = useState<null | "correct" | "wrong">(null);
  const [timeLeft] = useState(100);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  useEffect(() => {
    setCurrentQuestion(questions[questionIndex]);
  }, [questionIndex]);

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

  useEffect(() => {
    if (answered) {
      const timer = setTimeout(() => {
        if (questionIndex < TOTAL_QUESTIONS - 1 && lives > 0) {
          setQuestionIndex(questionIndex + 1);
          setAnswered(false);
          setFeedback(null);
        } else if (lives <= 0) {
          alert(`Fin du jeu ! Votre score final est : ${score}`);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [answered, questionIndex, lives, score]);

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

  const validateAnswer = () => {
    if (selectedAnswer === currentQuestion.answer) {
      setScore(score + 1);
    } else {
      setLives(lives - 1);
    }
    setSelectedAnswer(null);
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
        Jeu 1<p>Associez les objets au bon chiffre</p>
      </h1>

      <div className="lives">
        {Array.from({ length: lives }).map((_, index) => (
          <span key={index.toString()} className="heart">
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
            disabled={lives === 0}
          >
            {num}
          </button>
        ))}
      </div>
      <div className="timer">Temps restant : {timeLeft} sec</div>
      <div className="hearts"> ❤️ : {lives}</div>
      <button type="button" onClick={validateAnswer}>
        Valider
      </button>
    </div>
  );
}

export default CarGame;
