import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import HomeScreen from "../screens/HomeScreen";
import ProductDetails from "../screens/ProductDetails";
import ErrorScreen from "../screens/ErrorScreen";
import CartScreen from "../screens/CartScreen";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<HomeScreen />} index />
          {/* Add more child routes here */}

          {/* These all paths I have added below are absolute paths because they starts with /. If a path starts with /, then the absolute path will be added directly after the DOMAIN NAME, not after the CURRENTLY ACTIVE PATH */}
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<CartScreen />} />
        </Route>

        {/* Catch-all route for unknown pages - outside App layout */}
        <Route path="*" element={<ErrorScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
