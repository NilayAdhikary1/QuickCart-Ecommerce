import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import CartBadge from "../UI/CartBadge";
import { NavDropdown } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useContext } from "react";
import { CartContext } from "../store/context/CartContext";

function Header() {
  // const numberOfCartItems = useSelector((state) => state.cart.cartItems.length);
  const { cart } = useContext(CartContext);
  const numberOfCartItems = cart.cartItems.length;
  const isLoggedIn = useSelector((state) => state.authStatus.isLoggedIn);
  const userName = useSelector((state) => state.updateUserDetails?.userName?.split(" ")[0]);

  const { logOut } = useAuth(); // useAuth is a custom hook which helps in clearing localStorage and updating local state...


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

              {isLoggedIn ? (
                <NavDropdown
                  title={userName}
                  id="collapsible-nav-dropdown"
                  className="mt-1"
                >
                  <NavDropdown.Item as={NavLink} to="/profile">
                    My Profile
                  </NavDropdown.Item>

                  <NavDropdown.Item onClick={logOut}>Log Out</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link
                  as={NavLink}
                  to="/login"
                  className="d-flex flex-column align-items-center mt-1"
                >
                  <FaUser />
                  <span>Sign In</span>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
