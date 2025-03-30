import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import HomeScreen from "../screens/HomeScreen";
import ProductDetails from "../screens/ProductDetails";
import ErrorScreen from "../screens/ErrorScreen";
import CartScreen from "../screens/CartScreen";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import PublicRoutes from "./PublicRoutes";
import { useDispatch } from "react-redux";
import { authUser } from "../store/slices/authSlice";
import { setUserInfo } from "../store/slices/userInfoSlice";

function AppRoutes() {

  // ✅ Restore login state from localStorage on component mount. This does not run on re-renders as dispatch does not change on every re-renders. But if the entire app relaods(page refresh), this useEffect runs again...
  // ✅ If localStorage has "isLoggedIn": "true",const isLoggedIn = "true" === "true"; which is true indeed...
  // ✅ If localStorage is missing the key(i.e. null) (or it’s anything but "true"), const isLoggedIn = "false" === "true" or null === "true"; which is false indeed...
  const dispatch = useDispatch();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    dispatch(authUser({ isLoggedIn }));
    if (isLoggedIn) {
      // set username accordingly...
      dispatch(setUserInfo({ userName: localStorage.getItem("userName") }));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<HomeScreen />} index />
          {/* Add more child routes here */}

          {/* These all paths I have added below are absolute paths because they starts with /. If a path starts with /, then the absolute path will be added directly after the DOMAIN NAME, not after the CURRENTLY ACTIVE PATH */}
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route
            path="/login"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoutes>
                <Signup />
              </PublicRoutes>
            }
          />
        </Route>

        {/* Catch-all route for unknown pages - outside App layout */}
        <Route path="*" element={<ErrorScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
