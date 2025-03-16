import { Button, Container, Navbar } from "react-bootstrap";
import ERROR_IMAGE from "/images/error_image.png";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function ErrorScreen() {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand className="mx-auto">
          <img
            alt="QuickCart"
            src={logo}
            width="60"
            height="60"
            className="d-inline-block"
          />{" "}
          QuickCart
        </Navbar.Brand>
      </Navbar>
      <Container>
        <main className="d-flex flex-column align-items-center gap-3 mt-4 text-center">
          <img src={ERROR_IMAGE} alt="Error Occured!!" />
          <p className="fs-5 fw-medium">
            Unfortunately the page you are looking for has been moved or deleted
          </p>
          <Link to={'/'}>
            <Button variant="primary">GO TO HOMEPAGE</Button>
          </Link>
        </main>
      </Container>
    </>
  );
}

export default ErrorScreen;
