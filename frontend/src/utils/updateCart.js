import formattedPrice from "./formattedPrice";

function updateCart(state) {
  // calculate itemsPrice:================
  state.itemsPrice = formattedPrice(
    state.cartItems.reduce(
      (acc, cartItem) => acc + cartItem.price * cartItem.quantity,
      0
    )
  );
  // calculate shippingPrice :===================
  state.shippingPrice = formattedPrice(state.itemsPrice > 499 ? 0 : 40);

  // calculate taxPrice(GST) :===================
  state.taxPrice = formattedPrice((state.itemsPrice * 15) / 100);

  // calculate totalPrice :======================
  state.totalPrice = formattedPrice(
    state.itemsPrice + state.shippingPrice + state.taxPrice
  );
}

export default updateCart;
