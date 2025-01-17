import { Link } from "react-router-dom";
import "./LevelGame1.css";

function LevelGame1() {
  return (
    <section className="jeu-niveau">
      <Link to="/num-game">
        <button type="button">Niveau 1</button>
      </Link>
      <Link to="/game-one">
        <button type="button">Niveau 2</button>
      </Link>
      <Link to="/random-equation">
        <button type="button">Bonus</button>
      </Link>
    </section>
  );
}

export default LevelGame1;
