import "./App.css";
import GamesHome from "./components/GamesHome";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <GamesHome />
      <div>
        <Link to="./avatar"> Conçois ton avatar !</Link>
      </div>
    </>
  );
}

export default App;
