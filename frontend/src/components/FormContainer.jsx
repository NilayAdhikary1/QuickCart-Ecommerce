import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function FormContainer({ children }) {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
}

export default FormContainer;
