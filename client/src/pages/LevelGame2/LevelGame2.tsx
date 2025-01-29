import { Link } from "react-router-dom";
import "./LevelGame2.css";

function LevelGame2() {
  return (
    <section className="jeu-niveau">
      <h1 className="jeu-niveau-title">Choisis un niveau</h1>
      <Link to="/car-game">
        <button type="button">Niveau 1</button>
      </Link>

      <Link to="/euro-game">
        <button type="button">Niveau 2</button>
      </Link>
    </section>
  );
}

export default LevelGame2;
