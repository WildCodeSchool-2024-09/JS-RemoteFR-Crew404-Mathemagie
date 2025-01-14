import { Link, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="layout">
      <header id="statsBar">
        <p>Niveau X</p>
        <p>X/X</p>
        <Link to="/avatar"> Conçois ton avatar !</Link>
        <Link to="/gameOne"> Premier jeu !</Link>
      </header>
      <Outlet />
      <footer>Codé avec le ❤️ par la team @Crew404 </footer>
    </div>
  );
}
export default App;
