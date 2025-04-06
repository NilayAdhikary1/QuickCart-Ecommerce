import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom"; // For navigation
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLoginUserMutation } from "../store/slices/userSlice.js";
import SIGNIN_IMG from "/images/signin.png";
import Loader from "../UI/Loader";
import useAuth from "../hooks/useAuth.js";

const Login = () => {
  const [enteredInput, setEnteredInput] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.authStatus.isLoggedIn);
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const location = useLocation(); // in location object I only need search property that contains Query string (after "?")...
  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get("redirect");

  useEffect(() => {
    if (isLoggedIn && redirect) {
      navigate(redirect); // ✅ Only navigate after Redux updates
    }
  }, [isLoggedIn, navigate, redirect]);

  const submitHander = async (e) => {
    e.preventDefault();
    try {
      const { name, email } = await loginUser({
        email: enteredInput.email,
        password: enteredInput.password,
      }).unwrap();
      if (name && email) {
        const userInfo = {
          name,
          email,
        };
        login(userInfo);
      }
      navigate(redirect);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (identifier, event) => {
    setEnteredInput((prevInput) => ({
      ...prevInput,
      [identifier]: event.target.value,
    }));
  };

  return (
    <Container fluid className="login-container d-flex align-items-center">
      {isLoading && <Loader />}
      <Row className="w-100">
        {/* Left Side - Form Section */}
        <Col
          md={7}
          className="p-5 d-flex flex-column align-items-center justify-content-center"
        >
          <Card className="square-card login">
            <Card.Body className="d-flex flex-column justify-content-center">
              <h2 className="text-danger mb-4">QuickCart</h2>
              <h5 className="mb-3 text-body-secondary">Welcome back !!!</h5>
              <h1 className="fw-bold mb-4">Sign in</h1>

              <Form noValidate onSubmit={submitHander}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    className="login-form-control"
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
                    className="login-form-control"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    onChange={(event) => handleInputChange("password", event)}
                    required
                  />
                  <div className="text-end mt-2">
                    <Link to="/forgot-password" className="text-muted">
                      Forgot Password?
                    </Link>
                  </div>
                </Form.Group>
                <Button
                  className="mx-auto customBtn mt-3 d-flex align-items-center justify-content-center"
                  type="submit"
                  disabled={isLoading}
                >
                  Sign In <span className="ms-2">→</span>
                </Button>

                <p className="mt-4 text-muted">
                  New to QuickCart? Create an account
                  <Link
                    to={
                      redirect ? `/register?redirect=${redirect}` : "/register"
                    }
                    className="text-danger mx-2"
                  >
                    Sign up
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
};

export default Login;
