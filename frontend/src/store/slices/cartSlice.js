import { createSlice } from "@reduxjs/toolkit";
import updateCart from "../../utils/updateCart";

const initialState = {
  cartItems: [],
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const index = state.cartItems.findIndex(
        (cartItem) => cartItem._id === item._id
      );
      if (index === -1) {
        //item not in the cart...
        state.cartItems.push(item);
      } else {
        // just update the quantity...
        state.cartItems[index].quantity += 1;
      }
      updateCart(state);
    },

    updateCartItems: (state, action) => {
      const { _id, type } = action.payload;
      const index = state.cartItems.findIndex((item) => item._id === _id);
      if (type === "decrease") {
        state.cartItems[index].quantity -= 1;
      } else {
        state.cartItems = state.cartItems = state.cartItems.filter(
          (item) => item._id != _id
        );
      }

      updateCart(state);
    },
  },
});
export const { addToCart, updateCartItems } = cartSlice.actions;
export default cartSlice.reducer;
