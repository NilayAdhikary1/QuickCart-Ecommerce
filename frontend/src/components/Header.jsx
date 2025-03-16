import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import CartBadge from "../UI/CartBadge";

function Header() {
  const numberOfCartItems = useSelector((state) => state.cart.cartItems.length);

  return (
    <header>
      <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg">
        <Container>
          <Nav.Link as={NavLink} to={""}>
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
          </Nav.Link>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto gap-2">
              <Nav.Link
                as={NavLink}
                to="/cart"
                className="position-relative d-flex flex-column align-items-center"
              >
                <FaShoppingCart size={20} />
                {numberOfCartItems > 0 && (
                  <CartBadge numberOfCartItems={numberOfCartItems} />
                )}
                <span>Cart</span>
              </Nav.Link>

              <Nav.Link
                as={NavLink}
                to="/profile"
                className="d-flex flex-column align-items-center mt-1"
              >
                <FaUser />
                <span>Profile</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
