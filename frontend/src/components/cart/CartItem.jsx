import { Button, Col, Image, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../store/context/CartContext";

function CartItem({ item }) {
  const { addItemToCart, removeItemFromCart, decreaseItemFromCart } =
    useContext(CartContext);

  // to get back to the details page of the product...
  const prodId = item._id;

  return (
    <ListGroup.Item className="py-4">
      <Row className="d-flex">
        {/* Product Image */}
        <Col md={3}>
          <Link to={`/products/${prodId}`}>
            <Image src={item.image} alt={item.name} fluid rounded />
          </Link>
        </Col>

        <Col md={8} className="d-flex flex-column">
          {/* Product Details */}
          <div>
            <p className="fw-bold mb-1">{item.brand}</p>
            <Link
              to={`/products/${prodId}`}
              className="text-dark text-decoration-none"
            >
              <p className="mb-2 on-hover-product-name">{item.name}</p>
            </Link>
            <p>
              <span className="fw-bold">₹{item.price}</span>{" "}
            </p>
          </div>
          {/* Quantity & Actions */}
          <div className="d-flex">
            <div className="d-flex align-items-center justify-content-end me-3">
              <Button
                onClick={() => decreaseItemFromCart(prodId)}
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
                onClick={() => addItemToCart(item)}
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
              onClick={() => removeItemFromCart(prodId)}
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
