import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import "./App.css";
import Home from "./assets/images/home.png";
import { AuthProvider } from "./pages/Context/AuthContext";
import { AvatarProvider } from "./pages/Context/AvatarContext";

function App() {
  const { name } = useParams();
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
          <p>{name}</p>
        </header>
      )}
      <AuthProvider>
        <AvatarProvider>
          <Outlet />
        </AvatarProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
