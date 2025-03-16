import { Button, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart, updateCartItems } from "../../store/slices/cartSlice";
import { Link } from "react-router-dom";

function CartItem({ item }) {
  const dispatch = useDispatch();

  // to get back to the details page of the product...
  const prodId = item._id;


  function addMoreItemsToCartHandler() {
    //I am just  sending the selected item from cartItems to the addToCart reducer...
    dispatch(addToCart(item));
  }

  function decreaseItemFromCartHandler() {
    //I am just sending the id of the item which I received to the updateCartItems reducer...
    dispatch(updateCartItems({ _id: item._id, type: "decrease" }));
  }
  function removeElementFromCartHandler() {
    //I am just  sending the id of the item which I received to the updateCartItems reducer...
    dispatch(updateCartItems({ _id: item._id, type: "remove" }));
  }


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
                onClick={decreaseItemFromCartHandler}
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
                onClick={addMoreItemsToCartHandler}
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
              onClick={removeElementFromCartHandler}
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
