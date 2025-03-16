// Your application is expected to have only one createApi call in it..................
// 'createSlice' is used for regular slices, but since we need data from backend Api, we use 'createApi' which works bit differently...
// 'fetchBaseQuery' is a small wrapper around fetch that aims to simplify HTTP requests. RTK Query can be used to cache the result of any async request...
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../../constants.js";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Product", "Order", "User"],
  
  refetchOnFocus: true, // after switching tab when we come back, the app refreshes automaticlly.

  //   Endpoints can be queries, which return data for caching, or mutations, which send an update to the server. The endpoints are defined using a callback function that accepts a builder parameter and returns an object containing endpoint definitions created with builder.query() and builder.mutation().
  endpoints: () => ({}),
});


// RTK Query's React integration will automatically generate React hooks for every endpoint we define! These hooks encapsulate the process of triggering a request when a component mounts, and re-rendering the component as the request is processed and data is available. We can export those hooks out of this API slice file for use in our React components.
export const { useGetProductsQuery, useGetSelectedProductQuery } = apiSlice;
