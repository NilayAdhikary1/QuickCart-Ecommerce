import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { getProducts } from "../services/GetServices";

function HomeScreen() {

  const [products,setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const products = await getProducts();
      console.log(products);
      setProducts(products.data);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((prod) => (
          <Col key={prod._id} sm={12} md={6} lg={4} xl={3}>
            <Product
              product = {prod}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default HomeScreen;
