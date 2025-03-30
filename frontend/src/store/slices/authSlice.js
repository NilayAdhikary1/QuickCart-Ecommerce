
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name : 'authStatus',
    initialState : {isLoggedIn : false},
    reducers : {
        authUser(state, action){
            state.isLoggedIn = action.payload.isLoggedIn;
        },
    }
});

export const { authUser } = authSlice.actions;
export default authSlice.reducer;