import { Link, useParams } from "react-router-dom";
import { useAvatar } from "../../Context/AvatarContext";
import "./LevelGame2.css";

function LevelGame2() {
  const { avatar } = useAvatar();

  const { name } = useParams();
  return (
    <section className="jeu-niveau">
      <h1 className="jeu-niveau-title">Choisis un niveau</h1>
      <Link to={`/car-game/${avatar.name}`}>
        <button type="button" className="niveau-btn">
          Niveau 1
        </button>
      </Link>

      <Link
        to={(avatar.current_level ?? 1) >= 3 ? `/euro-game/${name}` : "#"}
        onClick={(e) => {
          if ((avatar.current_level ?? 1) < 3) {
            e.preventDefault();
          }
        }}
      >
        <button
          type="button"
          className={`niveau-btn ${
            (avatar.current_level ?? 1) < 3 ? "disabled" : ""
          }`}
          disabled={(avatar.current_level ?? 1) < 3}
        >
          Niveau 2
        </button>
      </Link>
    </section>
  );
}

export default LevelGame2;
