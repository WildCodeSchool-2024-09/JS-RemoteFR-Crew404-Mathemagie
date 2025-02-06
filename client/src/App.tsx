import { FcGraduationCap } from "react-icons/fc";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAvatar } from "./Context/AvatarContext";
import { errorToast } from "./services/toasts";
import "./App.css";

function App() {
  // Import de mon context
  const { avatar } = useAvatar();
  // Redirection via react router dom
  const location = useLocation();
  const navigate = useNavigate();

  const pathsToHideStatsBar = [
    "/signup",
    "/login",
    "/notfound",
    "/forgotpassword",
    "/auth",
    "/avatar",
  ];

  // Si la page actuelle est dans la liste des pages à cacher, on cache la barre de stats
  const shouldHideStatsBar = pathsToHideStatsBar.includes(location.pathname);

  const handleHomeClick = () => {
    const savedAvatar = localStorage.getItem("avatar");

    /**
     * Si l'avatar est trouvé, on le redirige vers la page d'accueil
     */
    if (savedAvatar) {
      const avatar = JSON.parse(savedAvatar);
      navigate(`/gameshome/${avatar.name}/${encodeURIComponent(avatar.photo)}`);
    } else {
      errorToast("Avatar non trouvé !");
    }
  };

  return (
    <div className="layout">
      {!shouldHideStatsBar && (
        <header id="statsBar">
          <button type="button" onClick={handleHomeClick}>
            <img src="/home.png" alt="Page d'accueil" className="Home" />
          </button>
          <p> Tes points cumulés : </p>
          <p>{avatar.prenom}</p>

          <Link to="/dashboard" className="lien-dashboard">
            <div className="icon-container">
              <FcGraduationCap size={40} />
            </div>{" "}
            {avatar.prenom}
          </Link>
        </header>
      )}
      <Outlet />
    </div>
  );
}

export default App;
