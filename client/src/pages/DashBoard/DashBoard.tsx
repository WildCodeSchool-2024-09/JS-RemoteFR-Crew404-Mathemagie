import { useEffect, useState } from "react";
import { BsFillEnvelopePlusFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import api from "../../services/api";
import { errorToast } from "../../services/toasts";
import "./DashBoard.css";

interface ChildProfile {
  id_user: string;
  name: string;
  picture: string;
}

function Dashboard() {
  const [children, setChildren] = useState<ChildProfile[]>([]);
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await api.get("/api/users");
        setChildren(response.data);
      } catch (error) {
        errorToast("Oups, une erreur est survenue");
        console.error(error);
      }
    }
    fetchUsers();
  }, []);

  const handleSelectProfile = (child: ChildProfile) => {
    navigate(`/gameshome/${child.id_user}`);
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
              key={user.id_user}
              className="profile-card"
              onClick={() => handleSelectProfile(user)}
              onKeyUp={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleSelectProfile(user);
                }
              }}
            >
              <img
                src={user.picture}
                alt={user.name}
                className="profile-avatar"
              />
              <p className="profile-name">{user.name}</p>
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
        <Link to="/contact">
          <div className="contact-button">
            <button type="button">Nous contacter</button>
            <BsFillEnvelopePlusFill size={30} />
          </div>
        </Link>
        <button type="button" onClick={handleLogout}>
          <img src="/logout.png" alt="Déconnexion" className="Home" />
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
