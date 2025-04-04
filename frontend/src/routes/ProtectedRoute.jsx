import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

function ProtectedRoute() {
  const isLoggedIn = useSelector((state) => state.authStatus.isLoggedIn);

  return isLoggedIn ? <Outlet/> : <Navigate to={"/login"} />;
}

export default ProtectedRoute;
