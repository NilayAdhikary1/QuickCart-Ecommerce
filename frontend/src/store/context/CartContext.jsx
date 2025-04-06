import { createContext, useEffect, useState } from "react";
import updateCart from "../../utils/updateCart";

export const CartContext = createContext({
  cart: {},
  addItemToCart: () => {},
  decreaseItemFromCart: () => {},
  removeItemFromCart: () => {},
  clearCartOnLogout: () => {},
  emptyCartAfterOrder: () => {},
});
const initialCart = {
  cartItems: [],
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
};
export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : initialCart;
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

  const emptyCartAfterOrder = () => {
    // here we don't remove the localstorage just updating the cart to the old one...
    setCart(initialCart);
  }

  const clearCartOnLogout = () => {
    localStorage.removeItem("cart");
    setCart(initialCart);
  };

  const ctxVal = {
    cart,
    addItemToCart,
    decreaseItemFromCart,
    removeItemFromCart,
    clearCartOnLogout,
    emptyCartAfterOrder
  };

  return <CartContext.Provider value={ctxVal}>{children}</CartContext.Provider>;
}
