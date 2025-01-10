import { useState } from "react";
import "./RandomEquation.css";

function RandomEquation() {
  const [equation, setEquation] = useState<string>("");
  const [answer, setAnswer] = useState(0);
  const [firstWrong, setFirstWrong] = useState(0);
  const [secondWrong, setSecondWrong] = useState(0);

  const handleClick = () => {
    const a = Math.floor(Math.random() * 20);
    const b = Math.floor(Math.random() * 20);

    const rightAnswer = a + b;
    setAnswer(rightAnswer);
    setEquation(`${a} + ${b} = _`);

    const wrongAnswers = [
      rightAnswer + Math.floor(Math.random() * 50),
      rightAnswer + Math.floor(Math.random() * 50),
    ];
    setFirstWrong(wrongAnswers[0]);
    setSecondWrong(wrongAnswers[1]);
  };
  return (
    <div id="game">
      <div className="interface">
        <button type="button" onClick={handleClick} id="generateButton">
          Appuie pour générer une addition aléatoire !
        </button>
        <p id="equation">{equation}</p>
        <div id="answerList">
          <button type="button">{firstWrong}</button>
          <button type="button">{answer}</button>
          <button type="button">{secondWrong}</button>
        </div>
      </div>
    </div>
  );
}

export default RandomEquation;
