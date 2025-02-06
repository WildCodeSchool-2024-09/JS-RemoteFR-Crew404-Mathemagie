import { Link, Outlet, useLocation } from "react-router-dom";
import { useAvatar } from "./Context/AvatarContext";
import Home from "./assets/images/home.png";
import "./App.css";

function App() {
  // Import de mon context
  const { avatar } = useAvatar();
  // Redirection via react router dom
  const location = useLocation();

  const pathsToHideStatsBar = [
    "/signup",
    "/login",
    "/notfound",
    "/forgotpassword",
    "/auth",
    "/avatar",
  ];

  const shouldHideStatsBar = pathsToHideStatsBar.includes(location.pathname);
  return (
    <div className="layout">
      {!shouldHideStatsBar && (
        <header id="statsBar">
          <Link to="/">
            <img src={Home} alt="Page d'accueil" className="Home" />
          </Link>
          <p> Tes points cumulés : </p>
          <p>{avatar.prenom}</p>
        </header>
      )}
      <Outlet />
    </div>
  );
}

export default App;
