import { Button } from "react-bootstrap";

function OrderSummaryScreen({ handleGoToNextStep, currentStep }) {
  return (
    <div>
      <h1>This is my order summary...</h1>
      <Button onClick={() => handleGoToNextStep(currentStep + 1)}>
        Go to payment page...
      </Button>
    </div>
  );
}

export default OrderSummaryScreen;
