import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./slices/authSlice";
import updateUserDetailsReducer from './slices/userInfoSlice';

const store = configureStore({
  reducer: {
    authStatus: authReducer,
    updateUserDetails : updateUserDetailsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true, // it means i can use redux devtools
});

setupListeners(store.dispatch); // this checks our application all time. Suppose we are working in mutiple tabs. Now when we switch to the next tab and then come back again after few time, our application refreshes automatically so that any changes in the meantime can be reflected...

export default store;
