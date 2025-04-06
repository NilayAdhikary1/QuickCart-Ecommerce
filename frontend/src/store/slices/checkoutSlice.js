import { createSlice } from "@reduxjs/toolkit";
import updateCart from "../../utils/updateCart";

const initialState = {
  checkoutCart: {},
  shippingAddress: {}, // it will be set to
  paymentMethod: "", //this is fallback option and later will be changed...
};

export const checkoutSlice = createSlice({
  name: "checkoutDetails",
  initialState,
  reducers: {
    initializeCheckoutCart: (state, action) => {
      state.checkoutCart = action.payload;
    },
    addItemsToCheckout: (state, action) => {
      const prodId = action.payload;
      const existingIndex = state.checkoutCart.cartItems.findIndex(
        (item) => item._id === prodId
      );
      if (existingIndex !== -1) {
        state.checkoutCart.cartItems[existingIndex].quantity += 1;
      }
      state.checkoutCart = updateCart(state.checkoutCart);
      // I am not updating anything here in localStorage as it is not required here...
    },
    decreaseItemCount: (state, action) => {
      const prodId = action.payload;
      const existingIndex = state.checkoutCart.cartItems.findIndex(
        (item) => item._id === prodId
      );
      if (existingIndex !== -1) {
        state.checkoutCart.cartItems[existingIndex].quantity -= 1;
      }
      state.checkoutCart = updateCart(state.checkoutCart);
      // I am not updating anything here in localStorage as it is not required here...
    },
    removeItemFromCheckout: (state, action) => {
      const prodId = action.payload;
      state.checkoutCart.cartItems = state.checkoutCart.cartItems.filter(
        (item) => item._id !== prodId
      );
      state.checkoutCart = updateCart(state.checkoutCart);
      // I am not updating anything here in localStorage as it is not required here...
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
  },
});

export const {
  addItemsToCheckout,
  decreaseItemCount,
  removeItemFromCheckout,
  savePaymentMethod,
  saveShippingAddress,
  initializeCheckoutCart
} = checkoutSlice.actions;
