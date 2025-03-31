import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authUser } from "../store/slices/authSlice";
import { useLogOutUserMutation } from "../store/slices/userSlice";
import { setUserInfo } from "../store/slices/userInfoSlice";
import { useContext } from "react";
import { CartContext } from "../store/context/CartContext";

function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clearCartOnLogout } = useContext(CartContext);
  const [logOutApiCall] = useLogOutUserMutation();

  // ✅ Helps user to store log in as well as sign up details in localStorage and redux...
  const login = (redirect, name) => {
    // ✅ Save login status to localStorage
    // ✅ Save the user details after login in userInfo...
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userName", name);
    dispatch(authUser({ isLoggedIn: true }));
    dispatch(setUserInfo({ userName: name }));
    navigate(redirect);
  };

  // ✅ Helps in clearing out localStorage as well as redux store...
  const logOut = async () => {
    try {
      await logOutApiCall().unwrap();

      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userName");
      clearCartOnLogout();
      dispatch(authUser({ isLoggedIn: false }));
      dispatch(setUserInfo({ userName: "" }));
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return { logOut, login };
}

export default useAuth;
