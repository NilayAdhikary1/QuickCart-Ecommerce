import { Badge, Button, ListGroup } from "react-bootstrap";
import CheckoutScreen from "../screens/CheckoutScreen";
import LogInDetails from "./LogInDetails";
import PaymentScreen from "../screens/PaymentScreen";
import OrderSummaryScreen from "../screens/OrderSummaryScreen";

function ListGroupItem({ handleChange, activeStep, badgeNumber, title }) {
  // activeStep !== badgeNumber
  return (
    <>
      <ListGroup.Item
        as="li"
        active={activeStep === badgeNumber}
        className={`p-3 d-flex justify-content-between align-items-center ${
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
      {activeStep == badgeNumber && (
        <ListGroup.Item
          as="li"
          className={`shadow-sm mb-2 bg-body-tertiary rounded`}
        >
          {activeStep === 1 && (
            <LogInDetails
              handleGoToNextStep={handleChange}
              currentStep={badgeNumber}
            />
          )}
          {activeStep === 2 && (
            <CheckoutScreen
              currentStep={badgeNumber}
              handleGoToNextStep={handleChange}
            />
          )}
          {activeStep === 3 && (
            <OrderSummaryScreen
              handleGoToNextStep={handleChange}
              currentStep={badgeNumber}
            />
          )}
          {activeStep === 4 && <PaymentScreen />}
        </ListGroup.Item>
      )}
    </>
  );
}

export default ListGroupItem;
