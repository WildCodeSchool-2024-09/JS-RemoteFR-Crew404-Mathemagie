import { Link, useParams } from "react-router-dom";
import "./LevelGame1.css";
import { useAvatar } from "../../Context/AvatarContext";

function LevelGame1() {
  const { avatar } = useAvatar();
  const { name } = useParams();

  return (
    <section className="jeu-niveau">
      <h1 className="jeu-niveau-title">Bonne chance {name} !</h1>

      <Link to={`/num-game/${name}`}>
        <button type="button" className="niveau-btn">
          Niveau 1
        </button>
      </Link>

      <Link
        to={(avatar.current_level ?? 1) >= 2 ? `/game-one/${name}` : "#"}
        onClick={(e) => {
          if ((avatar.current_level ?? 1) < 2) {
            e.preventDefault();
          }
        }}
      >
        <button
          type="button"
          className={`niveau-btn ${
            (avatar.current_level ?? 1) < 2 ? "disabled" : ""
          }`}
          disabled={(avatar.current_level ?? 1) < 2}
        >
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
