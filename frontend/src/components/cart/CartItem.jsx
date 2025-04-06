import { Button, Col, Image, ListGroup, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../store/context/CartContext";
import { useDispatch } from "react-redux";
import { addItemsToCheckout } from "../../store/slices/checkoutSlice";
import { removeItemFromCheckout } from "../../store/slices/checkoutSlice";
import { decreaseItemCount } from "../../store/slices/checkoutSlice";

function CartItem({ item }) {
  const { addItemToCart, removeItemFromCart, decreaseItemFromCart } =
    useContext(CartContext);
  const dispatch = useDispatch();
  const location = useLocation();

  // to get back to the details page of the product...
  const prodId = item._id;

  function addItemToCartHandler() {
    if (location.pathname === "/checkout") {
      // This dispatches an action to the checkout slice...
      dispatch(addItemsToCheckout(prodId));
    } else {
      // this just updates to the CartContext
      addItemToCart(item);
    }
  }

  function decreaseCartItemHandler() {
    if (location.pathname === "/checkout") {
      // This dispatches an action to the checkout slice...
      dispatch(decreaseItemCount(prodId));
    } else {
      // this just adds to the CartContext
      decreaseItemFromCart(prodId);
    }
  }

  function removeItemFromCartHandler() {
    if (location.pathname === "/checkout") {
      // This dispatches an action to the checkout slice...
      dispatch(removeItemFromCheckout(prodId));
    } else {
      // this just adds to the CartContext
      removeItemFromCart(prodId);
    }
  }

  return (
    <ListGroup.Item className="py-4">
      <Row className="d-flex">
        {/* ================ Product Image =================== */}
        <Col md={3}>
          {location.pathname !== "/checkout" ? (
            <Link to={`/products/${prodId}`}>
              <Image src={item.image} alt={item.name} fluid rounded />
            </Link>
          ) : (
            <Image src={item.image} alt={item.name} fluid rounded />
          )}
        </Col>

        <Col md={8} className="d-flex flex-column">
          {/* ================ Product Details ===================== */}
          <div>
            <p className="fw-bold mb-1">{item.brand}</p>
            {location.pathname !== "/checkout" ? (
              <Link
                to={`/products/${prodId}`}
                className="text-dark text-decoration-none"
              >
                <p className="mb-2 on-hover-product-name">{item.name}</p>
              </Link>
            ) : (
              <p className="mb-2">{item.name}</p>
            )}

            <p>
              <span className="fw-bold">₹{item.price}</span>{" "}
            </p>
          </div>

          {/* ================= Quantity & Actions ==================== */}
          <div className="d-flex">
            <div className="d-flex align-items-center justify-content-end me-3">
              <Button
                onClick={decreaseCartItemHandler}
                className="rounded-circle increase-decrease-cart-items"
                variant="outline-secondary"
                size="sm"
                disabled={item.quantity === 1}
              >
                <span style={{ fontSize: "1.2rem" }} className="fw-bold">
                  -
                </span>
              </Button>
              <span className="mx-2">{item.quantity}</span>
              <Button
                disabled={item.countInStock <= item.quantity}
                onClick={addItemToCartHandler}
                className="rounded-circle increase-decrease-cart-items"
                variant="outline-secondary"
                size="sm"
              >
                <span style={{ fontSize: "1rem" }} className="fw-bold">
                  +
                </span>
              </Button>
            </div>
            <Button
              onClick={removeItemFromCartHandler}
              variant="link"
              size="sm"
              className="text-dark fw-bold text-decoration-none"
            >
              REMOVE
            </Button>
          </div>
        </Col>
      </Row>
    </ListGroup.Item>
  );
}

export default CartItem;
