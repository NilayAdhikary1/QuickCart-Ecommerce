import { useNavigate, useParams } from "react-router-dom";
import { Card, Col, Container, Row, Image, Button } from "react-bootstrap";
import { LuIndianRupee } from "react-icons/lu";
import Ratings from "../components/Ratings";
import { FiShoppingBag } from "react-icons/fi";
import { useGetSelectedProductQuery } from "../store/slices/productsSlice";
import Loader from "../UI/Loader";
import ErrorScreen from "./ErrorScreen";
import { useContext } from "react";
import { CartContext } from "../store/context/CartContext";

function ProductDetails() {
  //This returns an array by which I can know whether this item already exists in cart or not!
  // const cartItems = useSelector((state) => state.cart.cartItems);
  // const cart = useSelector((state) => state.cart);
  const { cart, addItemToCart } = useContext(CartContext);

  const params = useParams();
  const prodId = params.productId;
  const navigate = useNavigate();

  // Instead of using Axios for data fetching, here I have used redux RTK Query...
  const {
    data: fetchedProduct,
    isLoading,
    error,
  } = useGetSelectedProductQuery(prodId);

  if (!isLoading && !fetchedProduct) {
    //navigating to the root error page...
    navigate("/error", { replace: true });
    return null; // this return statement blocks further any unnecessary rendering after navigating to '/error'...
  }

  let index = -1;
  // Now check alreday this fetchedProduct in the cart or not!!
  if (fetchedProduct) {
    index = cart.cartItems.findIndex(
      (cartItem) => cartItem._id == fetchedProduct._id
    );
  }

  function addToCartHandler() {
    navigate("/cart");
    if (index === -1) {
      // dispatch(addToCart({ ...fetchedProduct, quantity: 1 }));
      // localStorage.setItem('cart', JSON.stringify(cart));
      addItemToCart({...fetchedProduct, quantity : 1});
    }
  }

  return (
    <>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : error ? (
        <ErrorScreen />
      ) : (
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
                  <LuIndianRupee />{" "}
                  {fetchedProduct.price &&
                    fetchedProduct.price.toLocaleString("en-IN")}
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

              {/* Add to Cart or Go To Cart Button */}
              <div className="d-grid mt-4">
                <Button
                  onClick={addToCartHandler}
                  disabled={fetchedProduct.countInStock === 0}
                  style={{
                    padding: "10px",
                    backgroundColor: "rgb(235, 54, 93)",
                    borderColor: "rgb(235, 54, 93)",
                  }}
                  className="d-grid d-flex align-items-center justify-content-center"
                  size="lg"
                >
                  <FiShoppingBag />
                  <span className="ms-2">
                    {index === -1 ? "Add" : "Go"} to Cart
                  </span>
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
      )}
    </>
  );
}

export default ProductDetails;
