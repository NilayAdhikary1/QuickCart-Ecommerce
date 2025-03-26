import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../../constants";

export const apiSliceWithUser = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    loginUser : build.mutation({
        query : (data) => ({
            url : `${USERS_URL}/login`,
            method : "POST",
            body : data
        })
    })
  }),
});

export const { useLoginUserMutation } = apiSliceWithUser;
