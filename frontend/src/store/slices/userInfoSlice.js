import { createSlice } from "@reduxjs/toolkit";

const updateUserDetailsSlice = createSlice({
  name: "updateUserDetails",
  initialState: {userName: ""},
  reducers: {
    setUserInfo: (state, action) => {
      state.userName = action.payload.userName;
    },
    clearUserInfo: (state, action) => {
      state.userInfo = action.payload.userName;
    },
  },
});

export const { setUserInfo, clearUserInfo } = updateUserDetailsSlice.actions;
export default updateUserDetailsSlice.reducer;
