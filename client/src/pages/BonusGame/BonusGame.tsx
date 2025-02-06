import "./BonusGame.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAvatar } from "../../Context/AvatarContext";

interface FallingObject {
  id: number;
  type: "pair" | "impair";
  content: number;
  position: number;
  top: number;
}

function Bonus() {
  const { name } = useParams();
  const [characterPosition, setCharacterPosition] = useState(50);
  const [fallingObjects, setFallingObjects] = useState<FallingObject[]>([]);
  const [score, setScore] = useState(0);
  const { avatar } = useAvatar();
  const [time, setTime] = useState(60);
  const [gameOver, setGameOver] = useState(false);

  // je gère le chrono
  useEffect(() => {
    if (time === 0) {
      setGameOver(true); // Arrête le jeu
      return;
    }

    const timer = setInterval(() => {
      setTime((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  // Je déplace mon avatar grâce aux touches
  useEffect(() => {
    if (gameOver) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCharacterPosition((pos) => Math.max(0, pos - 5));
      } else if (e.key === "ArrowRight") {
        setCharacterPosition((pos) => Math.min(100, pos + 5));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameOver]);

  // Mes chiffres tombent aléatoirement
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      const number = Math.floor(Math.random() * 100);
      const isEven = number % 2 === 0; // je véirfie que mon chiffre est pair

      // je rajoute de nouveaux chiffres dans mon tableau
      setFallingObjects((objs) => [
        ...objs,
        {
          id: Date.now(),
          type: isEven ? "pair" : "impair", // Type de l'objet (pair ou impair).
          content: number,
          position: Math.random() * 100,
          top: 0,
        },
      ]);
    }, 2000); // mes chiffres tombent toutes les 2 secondes

    return () => clearInterval(interval);
  }, [gameOver]);

  // Fait descendre les objets et vérifie les collisions.
  useEffect(() => {
    if (gameOver) return;
    const intervalTime = score < 100 ? 150 : 100; // La vitesse dépend du score (100)
    const interval = setInterval(() => {
      setFallingObjects((objs) =>
        objs
          .map((obj) => ({ ...obj, top: obj.top + 2 }))
          .filter((obj) => {
            if (obj.top > 90) {
              if (
                obj.position > characterPosition - 5 &&
                obj.position < characterPosition + 5
              ) {
                setScore((s) => s + (obj.type === "pair" ? 10 : -10));
              }
              return false;
            }
            return true;
          }),
      );
    }, intervalTime);

    return () => clearInterval(interval);
  }, [characterPosition, score, gameOver]);

  return (
    <>
      <section className="titres-jeu">
        <h1> Attrape les nombres pairs ! </h1>
        <p>
          Attrape les nombres pairs et évite les nombres impairs pour gagner des
          points. <br /> Attention au chronomètre !
        </p>
        <section className="time-remaining">
          ⏳ Temps restant : {time} secondes ⏳
        </section>
      </section>
      {gameOver ? (
        <section className="game-bonus-over">
          <h2>
            ⏳ <br /> Temps écoulé {name}! <br />⏳
          </h2>
          <p>
            Ton score final : {score} <br /> 🎉
          </p>
        </section>
      ) : (
        <section className="bonus-container">
          <section className="game-area">
            <section
              className="character"
              style={{ left: `${characterPosition}%` }}
            >
              <img
                src={avatar.picture || "/avatarphotos/chat/chat_bw.png"}
                className="avatar"
                alt="character"
              />
            </section>
            {fallingObjects.map((obj) => (
              <section
                key={obj.id}
                className={`falling-object ${obj.type}`}
                style={{
                  left: `${obj.position}%`,
                  top: `${obj.top}%`,
                }}
              >
                {obj.content}
              </section>
            ))}
          </section>

          <section className="score-bonus">Score : {score}</section>
        </section>
      )}
    </>
  );
}

export default Bonus;
