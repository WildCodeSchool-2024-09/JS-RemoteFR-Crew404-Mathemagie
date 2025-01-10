import { useState } from "react";
import "./RandomEquation.css";

function RandomEquation() {
  const [equation, setEquation] = useState<string>("");
  const [answers, setAnswers] = useState<number[]>([]);

  const handleClick = () => {
    // ici je génère mes deux valeurs entre 0 et 20
    const a = Math.floor(Math.random() * 20);
    const b = Math.floor(Math.random() * 20);
    // j'additionne mes deux valeurs pour définir la réponse de l'addition
    const rightAnswer = a + b;
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
  };

  return (
    <div id="game">
      <div className="interface">
        <button type="button" onClick={handleClick} id="generateButton">
          Appuie pour générer une addition aléatoire !
        </button>
        <p id="equation">{equation}</p>
        <div id="answerList">
          {answers.map((answer) => (
            <button key={answer} type="button">
              {answer}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RandomEquation;
