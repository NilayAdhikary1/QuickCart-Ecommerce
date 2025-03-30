import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import Loader from "../UI/Loader";
import SIGNIN_IMG from "/images/signin.png";
import { useRegisterUserMutation } from "../store/slices/userSlice";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";

function Signup() {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get("redirect");

  const isLoggedIn = useSelector((state) => state.authStatus.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(redirect);
    }
  }, [isLoggedIn, navigate, redirect]);


  async function submitHander(event) {
    event.preventDefault();
    
    if (userData.password !== userData.confirmPassword) {
      console.error("Passwords do not match!");
      return;
    }
    try {
      const { user } = await registerUser({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      }).unwrap();
      if (user) {
        login(redirect, user.name);
      }
    } catch (error) {
      console.log("User Registration failed!!");
      console.log("Error : ", error);
    }
  }

  function handleInputChange(identifier, event) {
    setUserData((prev) => ({
      ...prev,
      [identifier]: event.target.value,
    }));
  }

  return (
    <Container fluid className="login-container d-flex align-items-center">
      {isLoading && <Loader />}
      <Row className="w-100">
        {/* Left Side - Form Section */}
        <Col md={7} className="p-5 d-flex flex-column justify-content-center">
          <Card className="square-card register">
            <Card.Body className="d-flex flex-column justify-content-center">
              <h2 className="text-danger mb-4">QuickCart</h2>
              <h5 className="mb-3 text-body-secondary">Welcome!!</h5>
              <h1 className="fw-bold mb-4">Register here</h1>

              <Form noValidate onSubmit={submitHander}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    className="form-control"
                    type="text"
                    placeholder="Enter your name"
                    autoComplete="name"
                    onChange={(event) => handleInputChange("name", event)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    className="form-control"
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    onChange={(event) => handleInputChange("email", event)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    className="form-control"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    onChange={(event) => handleInputChange("password", event)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    className="form-control"
                    type="password"
                    placeholder="Re-enter your password"
                    autoComplete="reenter-password"
                    onChange={(event) =>
                      handleInputChange("confirmPassword", event)
                    }
                    required
                  />
                </Form.Group>
                <Button
                  className="mx-auto customBtn mt-3 d-flex align-items-center justify-content-center"
                  type="submit"
                  disabled={isLoading}
                >
                  Register <span className="ms-2">→</span>
                </Button>

                <p className="mt-4 text-muted">
                  Already have an Account?
                  <Link
                    to={redirect ? `/login?redirect=${redirect}` : `/login`}
                    className="text-danger mx-2"
                  >
                    Log in
                  </Link>
                </p>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Side - Illustration Section */}
        <Col
          md={5}
          className="bg-light d-flex align-items-center justify-content-start illustration-section"
        >
          <img
            src={SIGNIN_IMG}
            alt="Custom Design"
            className="img-fluid customImage"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;
