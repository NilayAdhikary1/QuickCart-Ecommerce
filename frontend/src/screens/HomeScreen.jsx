import React from "react";
import products from "../products";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";

function HomeScreen() {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((prod) => (
          <Col key={prod._id} sm={12} md={6} lg={4} xl={3}>
            <Product
              name={prod.name}
              image={prod.image}
              price={prod.price}
              prodId={prod._id}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default HomeScreen;
