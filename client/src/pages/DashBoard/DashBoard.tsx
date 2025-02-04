import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DashBoard.css";

interface ChildProfile {
  id: string;
  name: string;
  photo: string;
}

function Dashboard() {
  const [children, setChildren] = useState<ChildProfile[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Récupérer les profils des enfants depuis l'API
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/children`, {
        withCredentials: true,
      })
      .then((response) => {
        setChildren(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des enfants", error);
      });
  }, []);

  const handleSelectProfile = (child: ChildProfile) => {
    navigate(`/gameshome/${child.name}`);
  };

  const handleAddChild = () => {
    navigate("/avatar");
  };

  return (
    <div className="dashboard-background">
      <div className="dashboard-container">
        <div className="profile-list">
          {children.map((child) => (
            <button
              type="button"
              key={child.id}
              className="profile-card"
              onClick={() => handleSelectProfile(child)}
              onKeyUp={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleSelectProfile(child);
                }
              }}
            >
              <img
                src={child.photo}
                alt={child.name}
                className="profile-avatar"
              />
              <p className="profile-name">{child.name}</p>
            </button>
          ))}
          {/* Bouton "Ajouter un Profil" avec une couleur dynamique pour le texte */}
          <button
            type="button"
            className="profile-card add-profile"
            onClick={handleAddChild}
            onKeyUp={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleAddChild();
              }
            }}
          >
            <p className="ajout"> Ajouter un profil</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
