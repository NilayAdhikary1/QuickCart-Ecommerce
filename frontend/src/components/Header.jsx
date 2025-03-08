import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";
import { LinkContainer } from "react-router-bootstrap";

function Header() {
  return (
    <header>
      <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                alt="QuickCart"
                src={logo}
                width="50"
                height="50"
                className="d-inline-block"
              />{" "}
              QuickCart
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto gap-2">
              <LinkContainer to="/">
                <Nav.Link className="d-flex flex-column align-items-center">
                  <FaShoppingCart />
                  <span>Cart</span>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/">
                <Nav.Link className="d-flex flex-column align-items-center">
                  <FaUser />
                  <span>Profile</span>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
