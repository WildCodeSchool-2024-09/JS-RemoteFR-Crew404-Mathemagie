import { useEffect, useState } from "react";
import "./CarGame.css";
import car from "../assets/images/car.png";

function CarGame () {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hearts, setHearts] = useState(6);
  const carsCount = 5; // Nombre de voitures à deviner

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const validateAnswer = () => {
    if (selectedAnswer === carsCount) {
      setScore(score + 1);
    } else {
      setHearts(hearts - 1);
    }
    setSelectedAnswer(null); // Réinitialiser la réponse sélectionnée
  };

  return (
    <div className="car-game-container">
      <h1>
        Jeu 1<p>Associez les objets au bon chiffre</p>
      </h1>
      <div className="timer">Temps restant : {timeLeft} sec</div>
      <div className="hearts"> ❤️ : {hearts}</div>
      <div className="cars">
        {Array.from({ length: carsCount }).map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <img key={index} src={car} alt="voiture" />
        ))}
      </div>
      <div className="answers">
        {[5, 4, 3].map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => setSelectedAnswer(num)}
          >
            {num}
          </button>
        ))}
        <button type="button" onClick={validateAnswer}>
          Valider
        </button>
      </div>
      <div className="score">Score : {score}</div>
    </div>
  );
};

export default CarGame;
