import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function FormContainer({ children }) {
  return (
    <Container className="p-3">
      <Row className="justify-content-center">
        <Col >
          {children}
        </Col>
      </Row>
    </Container>
  );
}

export default FormContainer;
