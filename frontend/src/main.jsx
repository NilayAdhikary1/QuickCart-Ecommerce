import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import AppRoutes from "./routes/AppRoutes.jsx";
import "./assets/styles/index.css";
import { Provider } from "react-redux";
import store from "./store/mainStore.jsx";
import CartContextProvider from "./store/context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <CartContextProvider>
        <AppRoutes />
      </CartContextProvider>
    </Provider>
  </StrictMode>
);
