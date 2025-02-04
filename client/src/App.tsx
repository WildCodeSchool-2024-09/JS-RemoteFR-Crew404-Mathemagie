import { Outlet, useLocation, useParams, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./assets/images/home.png";
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
    const avatar = savedAvatar ? JSON.parse(savedAvatar) : null;
    if (avatar) {
      navigate(`/gameshome/${avatar.name}/${encodeURIComponent(avatar.photo)}`);
    } else {
      console.error("Avatar non trouvé !");
    }
  };

  return (
    <div className="layout">
      {!shouldHideStatsBar && (
        <header id="statsBar">
          <button onClick={handleHomeClick}>
            <img src={Home} alt="Page d'accueil" className="Home" />
          </button>
          <p> Tes points cumulés : </p>
          <p>{name}</p>
        </header>
      )}
      <AvatarProvider>
        <Outlet />
      </AvatarProvider>
    </div>
  );
}

export default App;
