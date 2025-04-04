import { Button } from "react-bootstrap";

function PaymentScreen() {
    const paymentHandler = () => {
        console.log("Thank you for your payment!!");
    }

  return (
    <div>
      <h1>This is my payment page</h1>
      <Button onClick={paymentHandler}>Confirm payment</Button>
    </div>
  );
}

export default PaymentScreen;
