import "./App.css";
import { Link } from "react-router-dom";
import GamesHome from "./components/GamesHome";

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
