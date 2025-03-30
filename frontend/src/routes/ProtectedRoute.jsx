import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.authStatus.isLoggedIn);

  {
    !isLoggedIn ? <Navigate to="/login" /> : children;
  }
}

export default ProtectedRoute;
