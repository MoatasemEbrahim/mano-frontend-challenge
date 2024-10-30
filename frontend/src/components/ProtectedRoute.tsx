import { Navigate, Outlet } from "react-router-dom";

interface IProtectedRouteProps {
  isAuthenticated: boolean
}
const ProtectedRoute = ({ isAuthenticated }:IProtectedRouteProps) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
  
}

export default ProtectedRoute;
