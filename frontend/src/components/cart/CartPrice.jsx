import { Button, Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function CartPrice({ cart }) {
  const navigate = useNavigate();

  function proceedToCheckOutHandler(){
    navigate('/login?')
  }

  return (
    <Card className="border-0 mt-2 shadow-sm">
      <Card.Header className="fw-bold bg-light">PRICE DETAILS</Card.Header>
      <Card.Body className="fs-6">
        {/* .......... Product Price ............ */}
        <div className="d-flex justify-content-between  mb-2">
          <span>Price (2 items)</span>
          <span>₹{cart.itemsPrice.toLocaleString()}</span>
        </div>

        {/* ........TAX PRICE............ */}
        <div className="d-flex justify-content-between  mb-2 ">
          <span>Tax{" "}(15%)</span>
          <span> ₹{cart.taxPrice.toLocaleString()}</span>
        </div>

        {/* .......Delivery Charges....... */}
        <div className="d-flex justify-content-between  mb-2 ">
          <span>Delivery Charges</span>
          <span className="text-success">
            <s className="text-muted">₹{cart.shippingPrice.toLocaleString()}</s>{" "}
            Free
          </span>
        </div>

        {/* ...........Total Cart Amount And Place Your Order.......... */}
        <hr />
        <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
          <span>Total Amount</span>
          <span>₹{cart.totalPrice.toLocaleString()}</span>
        </div>

        <div className="d-grid">
          <Button
          onClick={proceedToCheckOutHandler}
            style={{
              backgroundColor: "rgb(235, 54, 93)",
              borderColor: "rgb(235, 54, 93)",
            }}
            size="lg"
            className="rounded-0"
          >
            Place Order
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CartPrice;
