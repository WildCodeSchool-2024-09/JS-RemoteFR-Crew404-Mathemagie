import { Link, useParams } from "react-router-dom";
import "./LevelGame1.css";

function LevelGame1() {
  const { name } = useParams();
  return (
    <section className="jeu-niveau">
      <h1 className="jeu-niveau-title">Choisis un niveau {name} </h1>
      <Link to={`/num-game/${name}`}>
        <button type="button" className="niveau-btn">
          Niveau 1
        </button>
      </Link>
      <Link to={`/game-one/${name}`}>
        <button type="button" className="niveau-btn">
          Niveau 2
        </button>
      </Link>
      <Link to={`/random-equation/${name}`}>
        <button type="button" className="niveau-btn bonus-btn">
          Bonus
        </button>
      </Link>
    </section>
  );
}

export default LevelGame1;
