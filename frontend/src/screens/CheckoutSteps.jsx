import { useState } from "react";
import { Badge, ListGroup, Button } from "react-bootstrap";
import CheckoutScreen from "./CheckoutScreen";
import ListGroupItem from "../components/ListGroupItem";

const arr = [
  { heading: "Sign in", badgeNumber: 1 },
  { heading: "Delivery Address", badgeNumber: 2 },
  { heading: "Order Summary", badgeNumber: 3 },
  { heading: "Payment Options", badgeNumber: 4 },
];

function CheckoutSteps({ initialStep }) {
  const [activeStep, setActiveStep] = useState(initialStep);

  const handleChange = (step) => {
    setActiveStep(step); // Set clicked step as active
  };

  return (
    <ListGroup className="gap-3" as="ol">
      {arr.map((item, index) => (
        <ListGroupItem
          key={index}
          handleChange={handleChange}
          activeStep={activeStep}
          heading={item.heading}
          badgeNumber={item.badgeNumber}
        />
      ))}
    </ListGroup>
  );
}

export default CheckoutSteps;
