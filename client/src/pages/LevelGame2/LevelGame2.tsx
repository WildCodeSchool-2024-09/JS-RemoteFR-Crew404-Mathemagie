import { Link } from "react-router-dom";
import "./LevelGame2.css";

function LevelGame2() {
  return (
    <section className="jeu-niveau">
      <Link to="/car-game">
        <button type="button">Niveau 1</button>
      </Link>
    </section>
  );
}

export default LevelGame2;
