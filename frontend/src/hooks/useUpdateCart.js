import { useState, useEffect } from "react";
import updateCart from "../utils/updateCart";

function useCart() {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage on initial render
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

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addItemToCart = (item) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      const index = updatedCart.cartItems.findIndex(
        (cartItem) => cartItem._id === item._id
      );
      if (index === -1) {
        updatedCart.cartItems.push(item);
      } else {
        updatedCart.cartItems[index].quantity += 1;
      }
      return updateCart(updatedCart);
    });
  };

  const decreaseItemFromCart = (id) => {
    setCart(prevCart => {
        const updatedCart = { ...prevCart };
        const index = updatedCart.cartItems.findIndex(item => item._id === id);
        updatedCart.cartItems[index].quantity -= 1;
        return updateCart(updatedCart);
    });
  };
  
  const removeItemFromCart = (id) => {
    setCart(prevCart => {
        const updatedCart = { ...prevCart };
        const newItemsArr = updatedCart.cartItems.filter(item => item._id !== id);
        return updateCart(newItemsArr);
    });
  };

  return { cart, addItemToCart, decreaseItemFromCart, removeItemFromCart };
}

export default useCart;
