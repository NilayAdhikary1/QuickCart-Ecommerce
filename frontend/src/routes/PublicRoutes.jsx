import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PublicRoutes({ children }) {
  const isLoggedIn = useSelector((state) => state.authStatus.isLoggedIn);

  return isLoggedIn ? <Navigate to={"/"} /> : children;
}

export default PublicRoutes;
