import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: JSON.parse(localStorage.getItem("userDetails")) || "",
};

const updateUserDetailsSlice = createSlice({
  name: "currentlyActiveUser",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const { setUserDetails } = updateUserDetailsSlice.actions;

// Thunk action to update LocalStorage and Redux...
export const setUserInfo = (userDetails) => (dispatch) => {
  localStorage.setItem("userDetails", JSON.stringify(userDetails));
  dispatch(setUserDetails(userDetails));
};

// Thunk action to clear localStorage and redux state...
export const clearUserInfo = () => (dispatch) => {
  localStorage.removeItem("userDetails");
  dispatch(setUserDetails(""));
};

export default updateUserDetailsSlice.reducer;
