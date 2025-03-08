import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App now only contains <Outlet />
    children: [
      { index: true, element: <HomeScreen /> },
      // Add more routes here
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
