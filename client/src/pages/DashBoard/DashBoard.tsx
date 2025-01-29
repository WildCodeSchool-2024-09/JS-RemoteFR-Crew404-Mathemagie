import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [children, setChildren] = useState([
    { id: 1, name: "Elsa" },
    { id: 2, name: "Jules" },
  ]);
  const [newChildName, setNewChildName] = useState("");

  const handleSelectChild = (childId: number) => {
    navigate(`/avatar?childId=${childId}`);
  };

  const handleAddChild = () => {
    if (newChildName.trim() === "") return;
    const newChild = { id: Date.now(), name: newChildName };
    setChildren([...children, newChild]);
    setNewChildName("");
  };

  return (
    <div className="dashboard-container">
      <h2>Choisis ton compte</h2>
      <ul className="children-list">
        {children.map((child) => (
          <button
            type="button"
            key={child.id}
            onClick={() => handleSelectChild(child.id)}
            onKeyUp={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleSelectChild(child.id);
              }
            }}
          >
            {child.name}
          </button>
        ))}
      </ul>
      <div className="add-child-section">
        <input
          type="text"
          placeholder="Nom de l'enfant"
          value={newChildName}
          onChange={(e) => setNewChildName(e.target.value)}
        />
        <button type="button" onClick={handleAddChild}>
          Ajouter
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
