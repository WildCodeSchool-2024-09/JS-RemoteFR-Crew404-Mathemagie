import { Link } from "react-router-dom";
import "./LevelGame1.css";

function LevelGame1() {
  return (
    <section className="jeu-niveau">
      <h1 className="jeu-niveau-title">Choisis un niveau</h1>
      <Link to="/num-game">
        <button type="button" className="niveau-btn">
          Niveau 1
        </button>
      </Link>
      <Link to="/game-one">
        <button type="button" className="niveau-btn">
          Niveau 2
        </button>
      </Link>
      <Link to="/random-equation">
        <button type="button" className="niveau-btn bonus-btn">
          Bonus
        </button>
      </Link>
    </section>
  );
}

export default LevelGame1;
