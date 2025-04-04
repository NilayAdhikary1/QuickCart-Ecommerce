import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import ListGroupItem from "../components/ListGroupItem";
import { CHECKOUT_STEPS } from "../constants";

function CheckoutSteps({ initialStep }) {
  const [activeStep, setActiveStep] = useState(initialStep);

  const handleChange = (step) => {
    setActiveStep(step); // Set clicked step as active
  };

  return (
    <ListGroup className="gap-3" as="ol">
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
  );
}

export default CheckoutSteps;
