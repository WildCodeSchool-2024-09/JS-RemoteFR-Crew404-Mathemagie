import { Link } from "react-router-dom";
import "./LevelGame1.css";

function LevelGame1() {
  return (
    <section className="jeu-niveau">
      <Link to="/num-game">
        <button type="button">
          Niveau <strong>1</strong>{" "}
        </button>
      </Link>
      <Link to="/game-one">
        <button type="button">
          Niveau <strong>2</strong>
        </button>
      </Link>
      <Link to="/random-equation">
        <button type="button">Bonus</button>
      </Link>
    </section>
  );
}

export default LevelGame1;
