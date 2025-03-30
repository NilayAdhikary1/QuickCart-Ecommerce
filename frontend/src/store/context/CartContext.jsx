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
      const existingCartItemIndex = prevCart.cartItems.findIndex(
        (cartItem) => cartItem._id === item._id
      );

      let updatedCartItems;
      if (existingCartItemIndex === -1) {
        updatedCartItems = [...prevCart.cartItems, { ...item, quantity: 1 }];
      } else {
        updatedCartItems = prevCart.cartItems.map((cartItem, index) =>
          index === existingCartItemIndex
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return updateCart({ ...prevCart, cartItems: updatedCartItems });
    });
  };

  const decreaseItemFromCart = (id) => {
    setCart((prevCart) => {
      const existingCartItemIndex = prevCart.cartItems.findIndex(
        (item) => item._id === id
      );
      const updatedCartItems = prevCart.cartItems.map((cartItem, index) =>
        index === existingCartItemIndex
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
      return updateCart({ ...prevCart, cartItems: updatedCartItems });
    });
  };

  const removeItemFromCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = {
        ...prevCart,
        cartItems: prevCart.cartItems.filter((item) => item._id !== id),
      };
      return updateCart(updatedCart);
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
