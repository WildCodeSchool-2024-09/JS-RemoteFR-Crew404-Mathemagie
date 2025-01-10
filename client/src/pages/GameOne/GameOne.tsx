import { useState } from "react";
import "./GameOne.css";

function GameOne() {
  const [point, setPoint] = useState(0); 
  const [questionIndex, setQuestionIndex] = useState(0); 
  const [gameOver, setGameOver] = useState(false);
  const [reponseUtilisateur, setReponseUtilisateur] = useState("");
  const [vies, setVies] = useState(5); 

  const questions = [
    { num1: 5, result: 10 },
    { num1: 12, result: 20 },
    { num1: 20, result: 30 },
    { num1: 32, result: 50 },
    { num1: 50, result: 80 },
  ];

  const handleAnswer = () => {
    const questionActuelle = questions[questionIndex];
    const vraieReponseX = questionActuelle.result - questionActuelle.num1;

    // Vérification réponse
    if (parseInt(reponseUtilisateur) === vraieReponseX) {
      setPoint(point + 1); 
    } else {
      setVies(vies - 1); 
    }

    // Vérification état des vies
    if (vies - 1 === 0) {
      setGameOver(true); 
    } else {
      // Passer à la question suivante si vies dispo 
      if (questionIndex + 1 < questions.length) {
        setQuestionIndex(questionIndex + 1);
      } else {
        setGameOver(true); 
      }
    }

    setReponseUtilisateur(""); 
  };

  return (
    <>
     <section className="jeu-container">
      <h1>
        Afin de débloquer le niveau <strong>2</strong>, voici quelques petites additions ! Bonne
        chance !
      </h1>
      <section className="jeu-entier">
        {!gameOver ? (
          <div>
            <section className="question-jeu-un">
              <p>
                <strong>Question {questionIndex + 1}</strong>: {questions[questionIndex].result}{" "}
                = {questions[questionIndex].num1} + _
              </p>
            </section>
            <input
              type="number"
           
              value={reponseUtilisateur}
              onChange={(e) => setReponseUtilisateur(e.target.value)}
              placeholder="Ta réponse"
            />
            <button onClick={handleAnswer} className="entrer-bouton">
              OK
            </button>{" "}
            <div>
              <p>Vies restantes: {vies} ❤️</p>
            </div>
          </div>
        ) : (
          <div>
            <h4>Jeu terminé !</h4>
            <p>
              Ton score final est de {point}/{questions.length}.
            </p>
            {vies === 0 && <p>Dommage, tu as perdu toutes tes vies !</p>}
          </div>
        )}
      </section>
      </section>
    </>
  );
}

export default GameOne;
