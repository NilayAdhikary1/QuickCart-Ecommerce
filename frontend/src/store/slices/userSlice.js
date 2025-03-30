import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../../constants";

export const apiSliceWithUser = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (data) => ({
        url: `${USERS_URL}/signup`,
        method: "POST",
        body: data,
      }),
    }),
    loginUser: build.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    getUserDetails: build.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
      }),
      keepUnusedDataFor: 20,
    }),
    logOutUser: build.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useGetUserDetailsQuery,
  useLogOutUserMutation,
  useRegisterUserMutation,
} = apiSliceWithUser;
