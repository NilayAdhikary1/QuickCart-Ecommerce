import { Badge, Button, ListGroup } from "react-bootstrap";
import ShippingScreen from "../screens/ShippingScreen";
import LogInDetails from "./LogInDetails";
import PaymentScreen from "../screens/PaymentScreen";
import OrderSummaryScreen from "../screens/OrderSummaryScreen";
import { useContext } from "react";
import { CartContext } from "../store/context/CartContext";
import { useSelector } from "react-redux";
import PaymentTimer from "./PaymentTimer";

function ListGroupItem({ handleChange, activeStep, badgeNumber, title }) {
  // this is done to open any address related details if user has no cart items...
  const { cart } = useContext(CartContext);
  const userEmail = useSelector(
    (state) => state.currentlyActiveUser?.userDetails?.email
  );

  return (
    <>
      <ListGroup.Item
        as="li"
        active={activeStep === badgeNumber}
        className={`${badgeNumber === 4? '' : 'mb-3'} p-3 d-flex justify-content-between align-items-center ${
          activeStep !== null && badgeNumber > activeStep ? "opacity-50" : ""
        }`}
      >
        <div className="d-flex align-items-center">
          <Badge className="ms-1 me-2" bg="secondary">
            {badgeNumber}
          </Badge>
          <span>{title}</span>
        </div>
        {activeStep > badgeNumber && (
          <Button
            className="bg-white text-primary fw-bold rounded-0 px-4 py-2 border"
            variant="outline-secondary"
            onClick={() => handleChange(badgeNumber)}
          >
            Change
          </Button>
        )}
      </ListGroup.Item>

      {cart.cartItems.length > 0 && activeStep == badgeNumber && (
        <>
          {activeStep === 1 && (
            <ListGroup.Item
              as="li"
              className={`shadow-sm mb-2 bg-body-tertiary rounded`}
            >
              <LogInDetails
                handleGoToNextStep={handleChange}
                currentStep={badgeNumber}
              />
            </ListGroup.Item>
          )}

          {activeStep === 2 && (
            <ListGroup.Item
              as="li"
              className={`shadow-sm mb-2 bg-body-tertiary rounded`}
            >
              <ShippingScreen
                currentStep={badgeNumber}
                handleGoToNextStep={handleChange}
              />
            </ListGroup.Item>
          )}

          {activeStep === 3 && (
            <>
              <ListGroup.Item
                as="li"
                className={`shadow-sm mb-2 bg-body-tertiary rounded`}
              >
                <OrderSummaryScreen />
              </ListGroup.Item>

              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-center shadow-sm mb-2 bg-body-tertiary rounded px-3 py-3"
              >
                <p className="m-0">
                  Order confirmation email will be sent to{" "}
                  <strong>{userEmail}</strong>
                </p>
                <Button
                  onClick={() => handleChange(badgeNumber + 1)}
                  className="rounded-0 px-4 fw-bold"
                  variant="warning"
                >
                  CONTINUE
                </Button>
              </ListGroup.Item>
            </>
          )}

          {activeStep === 4 && (
            <>
              <PaymentTimer/>
              <ListGroup.Item
                as="li"
                className={`shadow-sm mb-2 bg-body-tertiary rounded`}
              >
                <PaymentScreen />
              </ListGroup.Item>
            </>
          )}
        </>
      )}
    </>
  );
}
export default ListGroupItem;
