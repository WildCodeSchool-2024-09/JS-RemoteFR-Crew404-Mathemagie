import { useCallback, useEffect, useState } from "react";
import "./RandomEquation.css";

function RandomEquation() {
  const [equation, setEquation] = useState<string>("");
  const [answers, setAnswers] = useState<number[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<number[] | number>([]);
  const [score, setScore] = useState(Number(0));
  const [feedback, setFeedback] = useState<string>("");

  const handleClick = useCallback(() => {
    // ici je génère mes deux valeurs entre 0 et 20
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    // j'additionne mes deux valeurs pour définir la réponse de l'addition
    const rightAnswer = a + b;
    setCorrectAnswer(rightAnswer);
    setEquation(`${a} + ${b} = _`);

    // je crée mon tableau qui va contenir mes deux fausses réponses

    const wrongAnswers: number[] = [];

    // je fais une boucle qui continuera tant que ma mauvaise réponse n'est pas supérieure à 0, différente de la bonne réponse, ET aussi différente de l'autre mauvaise réponse puis je
    // stocke la mauvaise réponse dans mon tableau initialisé juste avant
    while (wrongAnswers.length < 2) {
      const wrongAnswer = rightAnswer + Math.floor(Math.random() * 20) - 10;
      if (
        wrongAnswer > 0 &&
        wrongAnswer !== rightAnswer &&
        !wrongAnswers.includes(wrongAnswer)
      ) {
        wrongAnswers.push(wrongAnswer);
      }
    }

    // je stocke les 3 choix dans un nouveau tableau (ici la syntaxe avec ... fait en sorte que les deux mauvaises réponses sont stockées en tant que valeur et non en tant que tableau )
    const allAnswers = [rightAnswer, ...wrongAnswers];

    //je mélange l'ordre de mes réponses

    const randomOrder = allAnswers.sort(() => Math.random() - 0.5);

    // je mets à jour mon state qui va me permettre d'afficher mes réponses dans des boutons
    setAnswers(randomOrder);
  }, []);

  useEffect(() => {
    handleClick();
  }, [handleClick]);

  //je vérifie si la réponse de l'utilisateur correspond à la somme de a + b

  const handleAnswer = (answer: number) => {
    if (answer === correctAnswer) {
      setScore(score + 1);
      setFeedback("correct");
    } else {
      setFeedback("wrong");
    }

    setTimeout(() => setFeedback(""), 1000);

    return handleClick();
  };

  return (
    <div id="game">
      <div className="interface">
        <p id="equationTitle">Quel est le résultat de :</p>
        <p id="equation" className={feedback}>
          {equation}
        </p>
        <p id="score">Score : {score}</p>
        <div id="answerList">
          {answers.map((answer) => (
            <button
              key={answer}
              type="button"
              onClick={() => handleAnswer(answer)}
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RandomEquation;
