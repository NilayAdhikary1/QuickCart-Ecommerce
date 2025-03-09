import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container>
        <Row className="py-3">
          <Col className="text-center">
            <h6>&copy;{currentYear} www.quickcart.com. All rights reserved.</h6>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
