import { FcGraduationCap } from "react-icons/fc";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAvatar } from "./Context/AvatarContext";
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

  return (
    <div className="layout">
      {!shouldHideStatsBar && (
        <header id="statsBar">
          <div>
            <button
              type="button"
              onClick={() => navigate(`/gameshome/${avatar.id_user}`)}
            >
              <img src="/home.png" alt="Page d'accueil" className="Home" />
            </button>
          </div>
          <p> Tes points cumulés : </p>

          <Link to="/dashboard" className="lien-dashboard">
            <div className="icon-container">
              <FcGraduationCap size={40} />
            </div>{" "}
            {avatar.name}
          </Link>
        </header>
      )}
      <Outlet />
    </div>
  );
}

export default App;
