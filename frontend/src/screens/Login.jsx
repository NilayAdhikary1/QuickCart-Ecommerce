import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom"; // For navigation
import "./login.css"; // Custom styling
import SIGNIN_IMG from "/images/signin.png";

const Login = () => {
  const submitHander = (e) => {
    e.preventDefault();
    console.log("Submitted!!");
  };

  return (
    <Container
      fluid
      className="login-container vh-100 d-flex align-items-center"
    >
      <Row className="w-100">
        {/* Left Side - Form Section */}
        <Col
          md={7}
          className="p-5 d-flex flex-column align-items-center justify-content-center"
        >
          <Card className="square-card">
            <Card.Body className="d-flex flex-column justify-content-center">
              <h2 className="text-danger mb-4">Logo Here</h2>
              <h5 className="mb-3 text-body-secondary">Welcome back !!!</h5>
              <h1 className="fw-bold mb-4">Sign in</h1>

              <Form onSubmit={submitHander}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                  <div className="text-end mt-2">
                    <Link to="/forgot-password" className="text-muted">
                      Forgot Password?
                    </Link>
                  </div>
                </Form.Group>
                <Button
                  variant="danger"
                  className="w-50 mt-3 d-flex align-items-center justify-content-center"
                  type="submit"
                >
                  Sign In <span className="ms-2">→</span>
                </Button>

                <p className="mt-4 text-muted">
                  New to QuickCart? Create an account
                  <Link to="/signup" className="text-danger mx-2">
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
          className="bg-light d-flex align-items-center justify-content-center illustration-section"
        >
          <img src={SIGNIN_IMG} alt="Custom Design" className="img-fluid" />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
