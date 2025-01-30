import { useEffect, useState } from "react";
import "./CarGame.css";

import animals from "../../assets/images/Animals.png";
import busBus from "../../assets/images/BusBus.png";
import moto from "../../assets/images/Moto.png";
import billets from "../../assets/images/billets.png";
import caisse from "../../assets/images/caisse.png";
import decapo from "../../assets/images/decapo.png";
import enfants from "../../assets/images/enfants.png";
import s from "../../assets/images/s.png";
import somme from "../../assets/images/somme.png";

const questions = [
  {
    question: "Il y'a combien de voitures ?",
    answer: 10,
    image: caisse,
    options: [4, 5, 2, 10],
  },
  {
    question: "Il y'a combien de voitures noires ?",
    answer: 2,
    image: caisse,
    options: [4, 5, 2, 6],
  },

  {
    question: "Compte les billets de 20€ ?",
    answer: 7,
    image: s,
    options: [7, 6, 5, 4],
  },
  {
    question: "Compte le nombre d'animaux ?",
    answer: 9,
    image: animals,
    options: [11, 8, 9, 6],
  },
  {
    question: "Quelle est la somme des 2 billets ?",
    answer: 100,
    image: somme,
    options: [90, 100, 73, 64],
  },
  {
    question: "Quel est le nombre de voitures décapotables ?",
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
    question: "Quelle est la somme de ces 2 billets ?",
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
    image: busBus,
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
  const [, setSelectedAnswer] = useState<number | null>(null);

  useEffect(() => {
    setCurrentQuestion(questions[questionIndex]);
  }, [questionIndex]);

  const handleChoice = (answer: number) => {
    setSelectedAnswer(answer);
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

  if (questionIndex === TOTAL_QUESTIONS - 1 && answered) {
    return (
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

      <div className="question" style={{ color: "#4059ad" }}>
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
