import { Link, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="layout">
      <header id="statsBar">
        <p>Niveau X</p>
        <p>X/X</p>
        <Link to="./avatar"> Conçois ton avatar !</Link>
        <Link to="./GameOne"> Premier jeu !</Link>
      </header>
      <Outlet />
      <footer>Codé avec les débris du ❤️ de Julie </footer>
    </div>
  );
}
export default App;
