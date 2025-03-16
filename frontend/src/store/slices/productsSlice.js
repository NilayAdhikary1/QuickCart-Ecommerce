import { PRODUCTS_URL } from "../../constants";
import { apiSlice } from "./apiSlice";

export const apiSliceWithProducts = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getProducts: builder.query({
        query: () => ({
          url: PRODUCTS_URL,
        }),
        providesTags: ["Product"],
        keepUnusedDataFor: 20,
      }),
      getSelectedProduct: builder.query({
        query: (prodId) => ({
          url: `${PRODUCTS_URL}/${prodId}`,
        }),
        keepUnusedDataFor: 20,
        providesTags: ["Product"],
      }),
    };
  },
});

export const { useGetProductsQuery, useGetSelectedProductQuery } =
  apiSliceWithProducts;
