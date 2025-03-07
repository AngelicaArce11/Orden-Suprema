import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: string[];
}
// Restringe el acceso a las rutas según el rol del usuario autenticado
const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }

  const userRoles = role.split(",");
  const accessU = userRoles.some((roleU) => allowedRoles.includes(roleU));
  
  if (!accessU) {
    return <Navigate to="/login" replace />;
  }


  return <Outlet />;
};

export default ProtectedRoute;
