import { Badge, Button, ListGroup } from "react-bootstrap";
import CheckoutScreen from "../screens/CheckoutScreen";
import LogInDetails from "./LogInDetails";

function ListGroupItem({
  handleChange,
  activeStep,
  badgeNumber,
  heading,
}) {
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
          <span>{heading}</span>
        </div>
        {activeStep > badgeNumber && (
          <Button
            className="bg-white text-primary fw-bold rounded-0 px-4 py-2 border"
            variant="outline-secondary"
            onClick={() => handleChange(1)}
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
            <LogInDetails
              handleGoToNextStep={handleChange}
              currentStep={badgeNumber}
            />
          )}
          {activeStep === 4 && (
            <LogInDetails
              handleGoToNextStep={handleChange}
              currentStep={badgeNumber}
            />
          )}
        </ListGroup.Item>
      )}
    </>
  );
}

export default ListGroupItem;
