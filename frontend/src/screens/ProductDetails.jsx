import { useParams } from "react-router-dom";
import { Card, Col, Container, Row, Image, Button } from "react-bootstrap";
import { LuIndianRupee } from "react-icons/lu";
import Ratings from "../components/Ratings";
import { FiShoppingBag } from "react-icons/fi";
import { useState } from "react";
import { getSelectedProduct } from "../services/GetServices";

function ProductDetails() {
  const [fetchedProduct, setFetchedProduct] = useState({});

  const params = useParams();
  const prodId = params.productId;

  const getSingleProduct = async () => {
    try {
      const prod = await getSelectedProduct(prodId);
      console.log(prod);
      setFetchedProduct(prod.data);
    } catch (error) {
      console.log(error);
    }
  }

  useState(() => {
    getSingleProduct();
  })

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col>
            <Image src={fetchedProduct.image} alt="" />
          </Col>
          <Col>
            {/* Product Name */}
            <h1>{fetchedProduct.name}</h1>

            {/* To show the rating and reviews */}
            <Card className="card-styles" body>
              <Ratings
                rating={fetchedProduct.rating}
                numReviews={fetchedProduct.numReviews}
              />
            </Card>

            <hr />

            {/* Product Price */}
            <div className="d-flex align-items-center">
              <h3>
                <LuIndianRupee />
                {" "}
                {fetchedProduct.price && fetchedProduct.price.toLocaleString("en-IN")}
              </h3>
              <p className="mx-2 fw-bold text-success">
                inclusive of all taxes
              </p>
            </div>

            {/* IN STOCK / OUT OF STOCK */}
            {fetchedProduct.countInStock > 0 ? (
              <Card className={`in-stock-out-of-stock in-stock`} body>
                <span className="text-success">In Stock</span>
              </Card>
            ) : (
              <Card className={`in-stock-out-of-stock out-of-stock`} body>
                <span className="text-danger">Out of Stock</span>
              </Card>
            )}

            {/* Add to Cart Button */}
            <div className="d-grid mt-4">
              <Button
                disabled={fetchedProduct.countInStock === 0}
                style={{
                  padding: "12px",
                  backgroundColor: "rgb(235, 54, 93)",
                  borderColor: "rgb(235, 54, 93)",
                }}
                className="d-grid d-flex align-items-center justify-content-center"
                size="lg"
              >
                <FiShoppingBag />
                <span className="ms-2">Add to Cart</span>
              </Button>
            </div>

            {/* Product Description */}
            <Card className="mt-5">
              <Card.Header as="h5">Product Description</Card.Header>
              <Card.Body>
                <Card.Text>{fetchedProduct.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProductDetails;
