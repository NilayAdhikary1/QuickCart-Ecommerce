
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn : localStorage.getItem("isLoggedIn") === "true"
}

export const authSlice = createSlice({
    name : 'authStatus',
    initialState ,
    reducers : {
        setAuthState(state, action){
            state.isLoggedIn = action.payload;
        },
    }
});

export const { setAuthState } = authSlice.actions;

// Thunk action to update LocalStorage and Redux...
export const authUser = (isLoggedIn) => (dispatch) => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    dispatch(setAuthState(isLoggedIn));
}

export default authSlice.reducer;