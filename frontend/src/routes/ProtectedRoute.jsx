import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.authStatus.isLoggedIn);

  return isLoggedIn ? children : <Navigate to={"/login"} />;
}

export default ProtectedRoute;
