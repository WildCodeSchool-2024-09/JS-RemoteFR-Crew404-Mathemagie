import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function ProtectedRoute() {
  const { isLogged } = useAuth();
  return (
    <>
      {
        /**
         * Si je suis loggé, alors, retourne les pages protégées
         * Sinon, je redirige vers la page de login
         */

        isLogged ? <Outlet /> : <Navigate to="/login" />
      }
    </>
  );
}

export default ProtectedRoute;
