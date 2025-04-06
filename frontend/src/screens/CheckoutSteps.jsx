import { useEffect, useState } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import ListGroupItem from "../components/ListGroupItem";
import { CHECKOUT_STEPS } from "../constants";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../store/context/CartContext";
import Swal from "sweetalert2";
import CartPrice from "../components/cart/CartPrice";
import { useDispatch, useSelector } from "react-redux";
import { initializeCheckoutCart } from "../store/slices/checkoutSlice";

function CheckoutSteps({ initialStep }) {
  const [activeStep, setActiveStep] = useState(initialStep);
  const navigate = useNavigate();
  const { cart } = useContext(CartContext); // this cart is to check whether the user is trying to access '/checkout' route or not. If yes then redirect him/her to cart page...
  const dispatch = useDispatch();

  const checkoutCart = useSelector(
    (state) => state.checkoutDetails.checkoutCart
  );

  // This useEffect is to block user from accessing '/checkout' manually when cart is empty...
  useEffect(() => {
    if (cart.cartItems.length === 0) {
      const handleEmptyCart = async () => {
        const res = await Swal.fire({
          icon: "warning",
          title: "Your cart is empty!",
          text: "Please add items to your cart before checking out.",
          confirmButtonText: "Go to Cart",
          confirmButtonColor: "#3085d6",
          allowEscapeKey: false,
          allowOutsideClick: false,
        });

        if (res.isConfirmed) {
          navigate("/cart");
        }
      };
      handleEmptyCart();
    }
  }, [cart, dispatch, navigate]);

  // Sync context cart to Redux checkoutCart when cart changes
  useEffect(() => {
    if (cart.cartItems.length > 0) {
      dispatch(initializeCheckoutCart(cart));
    }
  }, [cart, dispatch]);

  const handleChange = (step) => {
    setActiveStep(step); // Set clicked step as active
  };

  return (
    <Row>
      <Col
        className={`${
          checkoutCart && checkoutCart.cartItems?.length > 0 ? "col-8" : ""
        }`}
      >
        <ListGroup as="ol">
          {CHECKOUT_STEPS.map((item, index) => (
            <ListGroupItem
              key={index}
              handleChange={handleChange}
              activeStep={activeStep}
              title={item.title}
              badgeNumber={item.badgeNumber}
            />
          ))}
        </ListGroup>
      </Col>
      {checkoutCart && checkoutCart.cartItems?.length > 0 && (
        <Col className="col-4">
          <CartPrice cart={checkoutCart} showCheckoutButton={false} />
        </Col>
      )}
    </Row>
  );
}

export default CheckoutSteps;
