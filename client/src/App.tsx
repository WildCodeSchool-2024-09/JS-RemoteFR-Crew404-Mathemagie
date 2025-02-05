import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import "./App.css";
import { FcGraduationCap } from "react-icons/fc";
import { AvatarProvider } from "./pages/Context/AvatarContext";

function App() {
  const { name } = useParams();
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

  const shouldHideStatsBar = pathsToHideStatsBar.includes(location.pathname);

  const handleHomeClick = () => {
    const savedAvatar = localStorage.getItem("avatar");

    if (savedAvatar) {
      const avatar = JSON.parse(savedAvatar);

      navigate(`/gameshome/${avatar.name}/${encodeURIComponent(avatar.photo)}`);
    } else {
      console.error("Avatar non trouvé !");
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

          <a href="/Dashboard" className="lien-dashboard">
            <div className="icon-container">
              <FcGraduationCap size={40} />
            </div>{" "}
            {name}
          </a>
        </header>
      )}
      <AvatarProvider>
        <Outlet />
      </AvatarProvider>
    </div>
  );
}

export default App;
