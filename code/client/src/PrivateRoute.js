import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import AuthContext from "./AuthContext";

const PrivateRoute = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  return !user ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default PrivateRoute;
