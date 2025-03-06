import { Navigate, Outlet } from "react-router-dom";

// Restringe el acceso a la ruta de login para usuarios autenticados
const PublicRoute = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token && role) {
    if (role === "assassin") {
      return <Navigate to="/missionsAssassin" replace />;
    } else if (role === "order") {
      return <Navigate to="/highProfile" replace />;
    }
  }

  return <Outlet />;
};
export default PublicRoute;
