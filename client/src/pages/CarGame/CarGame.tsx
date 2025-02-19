import { useEffect, useState } from "react";
import { useAvatar } from "../../Context/AvatarContext";
import questionsCarGame from "../../services/questionCarGame";
import "./CarGame.css";
import axios from "axios";
import Confetti from "react-confetti";
import { Link } from "react-router-dom";

function CarGame() {
  const { handleLevel, avatar } = useAvatar();
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
    const updateLvl = async (lvl: number) => {
      try {
        await axios.post(
          `http://localhost:3310/api/users/${avatar.id_user}/level-up`,
          {
            newLevel: lvl, // Passage au niveau 2 si les conditions sont remplies
          },
          {
            withCredentials: true,
          },
        );
        handleLevel(lvl);
      } catch (err) {
        console.error(err);
      }
    };

    if (answered) {
      const timer = setTimeout(() => {
        if (questionIndex < TOTAL_QUESTIONS - 1 && lives > 0) {
          setQuestionIndex(questionIndex + 1);
          setAnswered(false);
          setFeedback(null);
          setSelectedAnswer(null);
        } else if (questionIndex === TOTAL_QUESTIONS - 1 && lives >= 0) {
          updateLvl(3).then(() => {
            console.info("niveau mis à jour");
          });
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [answered, questionIndex, lives, avatar.id_user, handleLevel]);

  if (lives <= 0) {
    return (
      <div className="car-game-container car-game-container--end">
        <h1>Oh non ! Tu as perdu toutes tes vies.</h1>
        <p>Ton score final : {score}</p>
        <button
          type="button"
          onClick={() => {
            setQuestionIndex(0);
            setLives(6);
            setScore(0);
            setAnswered(false);
            setFeedback(null);
            setSelectedAnswer(null);
          }}
          className="car-game-button"
        >
          Rejouer
        </button>
        <Link to={`/gameshome/${avatar.id_user}`} className="game-button">
          Retourner à l'accueil
        </Link>
      </div>
    );
  }

  if (questionIndex === TOTAL_QUESTIONS - 1 && answered) {
    return (
      <div className="car-game-container car-game-container--end">
        <Confetti />
        <h1>Félicitations !</h1>
        <p>
          Ton score : {score} / {TOTAL_QUESTIONS}
        </p>
        <Link to={`/euro-game/${avatar.name}`} className="car-game-button">
          Passer au niveau 2
        </Link>
        <Link to="/dashboard" className="car-game-button">
          Retourner à l'accueil
        </Link>
      </div>
    );
  }

  return (
    <div className="car-game-container">
      <div className="car-game-lives">
        {Array.from({ length: lives }).map((_, index) => (
          <span key={index.toString()} className="car-game-heart">
            ❤️
          </span>
        ))}
      </div>

      <h1>Associe les objets au bon chiffre !</h1>

      <div className="car-game-question">
        <p style={{ color: "#4059ad", fontSize: "1.5rem" }}>
          {currentQuestion.question}
        </p>
        <img
          src={currentQuestion.image}
          alt="Question"
          className="car-game-question-image"
          width="450px"
        />
      </div>
      <div className="car-game-answers">
        {currentQuestion.options.map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => handleChoice(num)}
            disabled={answered}
            className={
              answered
                ? num === currentQuestion.answer
                  ? "car-game-answer--correct"
                  : "car-game-answer--wrong"
                : "car-game-answer"
            }
          >
            {num}
          </button>
        ))}
      </div>
      <div className="car-game-score">Score : {score}</div>
    </div>
  );
}

export default CarGame;
