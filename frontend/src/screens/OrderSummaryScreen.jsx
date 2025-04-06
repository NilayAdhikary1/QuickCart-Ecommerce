import { Button, Col, ListGroup } from "react-bootstrap";
import CartItem from "../components/cart/CartItem";
import { useSelector } from "react-redux";

function OrderSummaryScreen() {
  const checkoutCartItems = useSelector(
    (state) => state.checkoutDetails.checkoutCart.cartItems
  );
  
  return (
    <ListGroup variant="flush">
      {checkoutCartItems.map((item) => (
        <CartItem key={item._id} item={item} />
      ))}
    </ListGroup>
  );
}

export default OrderSummaryScreen;
