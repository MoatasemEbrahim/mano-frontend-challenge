import { Navigate, Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores/StoreContext";

const ProtectedRoute = observer(() => {
  const { authStore } = useStore();
  return authStore.isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
  
})

export default ProtectedRoute;
