import { thunk } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

// local state slices...
import authReducer from "./slices/authSlice";
import currentlyActiveUserReducer from "./slices/userInfoSlice";
import { checkoutSlice } from './slices/checkoutSlice';

const store = configureStore({
  reducer: {
    authStatus: authReducer,
    currentlyActiveUser: currentlyActiveUserReducer,
    checkoutDetails : checkoutSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, apiSlice.middleware),
  devTools: true, // it means i can use redux devtools...
});

setupListeners(store.dispatch); // this checks our application all time. Suppose we are working in mutiple tabs. Now when we switch to the next tab and then come back again after few time, our application refreshes automatically so that any changes in the meantime can be reflected...

export default store;
