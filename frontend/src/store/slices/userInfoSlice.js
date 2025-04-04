import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: localStorage.getItem("userName") || "",
};

const updateUserDetailsSlice = createSlice({
  name: "updateUserDetails",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { setUserName } = updateUserDetailsSlice.actions;

// Thunk action to update LocalStorage and Redux...
export const setUserInfo = (userName) => (dispatch) => {
  localStorage.setItem("userName", userName);
  dispatch(setUserName(userName));
};

// Thunk action to clear localStorage and redux state...
export const clearUserInfo = () => (dispatch) => {
  localStorage.removeItem("userName");
  dispatch(setUserName(""));
};

export default updateUserDetailsSlice.reducer;
