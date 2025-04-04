import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PublicRoutes() {
  const isLoggedIn = useSelector((state) => state.authStatus.isLoggedIn);

  return isLoggedIn ? <Navigate to={"/"} /> : <Outlet />;
}

export default PublicRoutes;
