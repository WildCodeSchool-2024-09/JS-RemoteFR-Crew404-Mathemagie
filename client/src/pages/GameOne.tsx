import { useEffect, useState } from "react";
import "./GameOne.css";

function GameOne() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [lives, setLives] = useState(5); // Jauge de vie
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false); // Pour savoir si la question a été répondue

  const questions = [
    {
      series: [1, 3, 5, 7, 9], // Logique : Ajouter 2
      missingIndex: 2,
      correctAnswer: 5,
      choices: [2, 5, 7],
    },
    {
      series: [2, 4, 6, 8, 10], // Logique : Ajouter 2
      missingIndex: 4,
      correctAnswer: 10,
      choices: [8, 10, 12],
    },
    {
      series: [5, 10, 15, 20, 25], // Logique : Ajouter 5
      missingIndex: 3,
      correctAnswer: 20,
      choices: [15, 20, 30],
    },
    {
      series: [10, 20, 30, 40, 50], // Logique : Ajouter 10
      missingIndex: 1,
      correctAnswer: 20,
      choices: [10, 20, 25],
    },
    {
      series: [3, 6, 9, 12, 15], // Logique : Ajouter 3
      missingIndex: 0,
      correctAnswer: 3,
      choices: [3, 6, 9],
    },
  ];

  const handleChoice = (choice: number): void => {
    const currentQuestion = questions[questionIndex];

    if (choice === currentQuestion.correctAnswer) {
      setScore(score + 1); // Ajoute 1 au score
    } else {
      setLives(lives - 1); // Retire une vie
    }

    setAnswered(true); // Marque la question comme répondue
  };

  useEffect(() => {
    if (answered) {
      if (questionIndex < questions.length - 1 && lives > 0) {
        const timer = setTimeout(() => {
          setQuestionIndex(questionIndex + 1); // Passe à la question suivante
          setAnswered(false); // Réinitialise l'état pour la nouvelle question
        }, 1000); // Attends 1 seconde avant de passer à la question suivante
        return () => clearTimeout(timer);
      }
    }
  }, [answered, questionIndex, lives]);

  const handleGoHome = (): void => {
    window.location.href = "/home";
  };

  const handleNextLevel = (): void => {
    window.location.href = "/next-level";
  };

  if (lives <= 0) {
    return (
      <div className="game-container">
        <h1>Oh non ! Tu as perdu toutes tes vies.</h1>
        <p>Ton score final : {score}</p>
        <button type="button" onClick={() => window.location.reload()}>
          Rejouer
        </button>
        <button type="button" onClick={handleGoHome}>
          Retourner à l'accueil
        </button>
      </div>
    );
  }

  if (questionIndex >= questions.length) {
    return (
      <div className="game-container">
        <h1>Félicitations !</h1>
        <p>
          Ton score : {score} / {questions.length}
        </p>
        <button type="button" onClick={() => window.location.reload()}>
          Rejouer
        </button>
        <button type="button" onClick={handleNextLevel}>
          Niveau suivant
        </button>
      </div>
    );
  }

  const currentQuestion = questions[questionIndex];

  return (
    <div className="game-container">
      <div className="lives">
        {Array.from({ length: lives }).map((_, index) => (
          <span
            key={`heart-${index}-${new Date().getTime()}`}
            className="heart"
          >
            ❤️
          </span>
        ))}
      </div>
      <h1>Retrouve le chiffre manquant !</h1>
      <div className="series">
        {currentQuestion.series.map((num, index) => (
          <div
            key={`series-${num}`}
            className={`series-item ${index === currentQuestion.missingIndex ? "missing" : ""}`}
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
            className="choice-button"
            onClick={() => handleChoice(choice)}
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GameOne;
