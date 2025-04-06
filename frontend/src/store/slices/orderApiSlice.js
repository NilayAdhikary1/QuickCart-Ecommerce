import { ORDERS_URL } from "../../constants";
import { apiSlice } from "./apiSlice";

export const apiSliceWithOrder = apiSlice.injectEndpoints({
  endpoints: (build) => {
    return {
      createOrder: build.mutation({
        query: (orderData) => ({
          url: `${ORDERS_URL}`,
          method: "POST",
          body: orderData,
        }),
      }),

      getMyOrders: build.query({
        query: () => ({
          url: `${ORDERS_URL}/myorders`,
        }),
      }),

      getOrderById: build.query({
        query: (orderId) => ({
          url: `${ORDERS_URL}/${orderId}`,
        }),
      }),
    };
  },
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
} = apiSliceWithOrder;
