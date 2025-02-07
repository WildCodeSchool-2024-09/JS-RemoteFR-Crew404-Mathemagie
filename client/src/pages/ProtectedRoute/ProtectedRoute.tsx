import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

function ProtectedRoute() {
  const { isLogged } = useAuth();
  return <>{isLogged ? <Outlet /> : <Navigate to="/login" />}</>;
}

export default ProtectedRoute;
