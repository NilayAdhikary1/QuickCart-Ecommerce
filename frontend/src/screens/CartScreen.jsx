import { Button, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import EmptyCart from "../components/cart/EmptyCart";
import CartItem from "../components/cart/CartItem";
import CartPrice from "../components/cart/CartPrice";
import { useContext } from "react";
import { CartContext } from "../store/context/CartContext";

function CartScreen() {
  const { cart } = useContext(CartContext);
  const cartItems = cart.cartItems;

  return (
    <Row className="justify-content-center">
      {cartItems.length === 0 ? (
        <Col>
          <EmptyCart />
        </Col>
      ) : (
        <>
          <Col md={8}>
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <CartPrice cart={cart}/>
          </Col>
        </>
      )}
    </Row>
  );
}

export default CartScreen;
