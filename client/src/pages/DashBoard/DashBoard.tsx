import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DashBoard.css";

interface ChildProfile {
  id: string;
  prenom: string;
  photo: string;
}

function Dashboard() {
  const [children, setChildren] = useState<ChildProfile[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/users`, {
        withCredentials: true,
      })
      .then((response) => {
        setChildren(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des utilisateurs", error);
      });
  }, []);

  const handleSelectProfile = (child: ChildProfile) => {
    navigate(`/gameshome/${child.prenom}/${encodeURIComponent(child.photo)}`);
  };

  const handleAddChild = () => {
    navigate("/avatar");
  };

  return (
    <div className="dashboard-background">
      <div className="dashboard-container">
        <div className="profile-list">
          {children.map((user) => (
            <button
              type="button"
              key={user.id}
              className="profile-card"
              onClick={() => handleSelectProfile(user)}
              onKeyUp={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleSelectProfile(user);
                }
              }}
            >
              <img
                src={user.photo}
                alt={user.prenom}
                className="profile-avatar"
              />
              <p className="profile-name">{user.prenom}</p>
            </button>
          ))}

          {children.length < 5 && (
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
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
