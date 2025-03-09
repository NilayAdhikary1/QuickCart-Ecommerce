import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import HomeScreen from "../screens/HomeScreen";
import ProductDetails from "../screens/ProductDetails";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <App />}>
          <Route path="" element = {<HomeScreen />} />
          {/* Add more child routes here */}
          <Route path="products/:productId"  element = {<ProductDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
