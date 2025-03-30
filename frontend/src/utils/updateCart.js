// import formattedPrice from "./formattedPrice";

// function updateCart(state) {
//   // calculate itemsPrice:================
//   state.itemsPrice = formattedPrice(
//     state.cartItems.reduce(
//       (acc, cartItem) => acc + cartItem.price * cartItem.quantity,
//       0
//     )
//   );
//   // calculate shippingPrice :===================
//   state.shippingPrice = formattedPrice(state.itemsPrice > 499 ? 0 : 40);

//   // calculate taxPrice(GST) :===================
//   state.taxPrice = formattedPrice((state.itemsPrice * 15) / 100);

//   // calculate totalPrice :======================
//   state.totalPrice = formattedPrice(
//     state.itemsPrice + state.shippingPrice + state.taxPrice
//   );
// }

// export default updateCart;


// -----------------------------------------------------------------------------------------

import formattedPrice from "./formattedPrice";

function updateCart(cart) {
  // Calculate prices
  const itemsPrice = cart.cartItems.reduce(
    (acc, cartItem) => acc + cartItem.price * cartItem.quantity,
    0
  );
  const shippingPrice = itemsPrice > 499 ? 0 : 40;
  const taxPrice = (itemsPrice * 15) / 100;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  // Return a new updated cart (DO NOT MUTATE ORIGINAL)
  return {
    ...cart,
    itemsPrice: formattedPrice(itemsPrice),
    shippingPrice: formattedPrice(shippingPrice),
    taxPrice: formattedPrice(taxPrice),
    totalPrice: formattedPrice(totalPrice),
  };
}

export default updateCart;
