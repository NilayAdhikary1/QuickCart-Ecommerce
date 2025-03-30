import { createContext, useEffect, useState } from "react";
import updateCart from "../../utils/updateCart";

export const CartContext = createContext({
  cart: {},
  addItemToCart: () => {},
  decreaseItemFromCart: () => {},
  removeItemFromCart: () => {},
});

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart
      ? JSON.parse(storedCart)
      : {
          cartItems: [],
          itemsPrice: 0,
          shippingPrice: 0,
          taxPrice: 0,
          totalPrice: 0,
        };
  });

  // Sync localStorage whenever cart updates...
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addItemToCart = (item) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      const existingCartItemIndex = updatedCart.cartItems.findIndex(
        (cartItem) => cartItem._id === item._id
      );
      if (existingCartItemIndex === -1) {
        //MEANS THE ITEM IS NOT PRESENT IN THE ARRAY...
        updatedCart.cartItems.push(item);
      } else {
        //MEANS THE ITEM IS ALREADY PRESENT IN THE ARRAY. SO JUST INCREASE IT'S QUANTITY...
        updatedCart.cartItems[existingCartItemIndex].quantity += 1;
      }
      return updateCart(updatedCart);
    });
  };

  const decreaseItemFromCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      const existingCartItemIndex = updatedCart.cartItems.findIndex(
        (item) => item._id === id
      );
      updatedCart.cartItems[existingCartItemIndex].quantity -= 1;
      return updateCart(updatedCart);
    });
  };

  const removeItemFromCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      const newItemsArr = updatedCart.cartItems.filter(
        (item) => item._id !== id
      );
      return updateCart(newItemsArr);
    });
  };

  const ctxVal = {
    cart,
    addItemToCart,
    decreaseItemFromCart,
    removeItemFromCart,
  };

  return <CartContext.Provider value={ctxVal}>{children}</CartContext.Provider>;
}
