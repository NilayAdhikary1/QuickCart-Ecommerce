import { Button, Container } from "react-bootstrap";
import EMPTY_CART from "/images/empty_cart.webp";
import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <Container>
      <main className="d-flex flex-column align-items-center  mt-4 text-center">
        <img style={{maxWidth : "20vw", height : "auto"}} src={EMPTY_CART} alt="empty_cart!!" />
        <p className="fs-5">Your cart is empty!</p>
        <p>Add items to it now.</p>
        <Link to={"/"}>
          <Button className="px-5"  variant="primary">Shop Now</Button>
        </Link>
      </main>
    </Container>
  )
}

export default EmptyCart
