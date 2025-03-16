import { Col, Row, Spinner } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../store/slices/productsSlice";
import ErrorScreen from "../screens/ErrorScreen";
import Loader from "../UI/Loader";

function HomeScreen() {
  // Here I have used React RTK Queries to get the products from database instead of Axios...
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <>
          <h1>Latest Products</h1>
          <Loader/>
        </>
      ) : error ? (
        <ErrorScreen />
      ) : (
        <>
          <Row>
            <h1>Latest Products</h1>
            {products.map((prod) => (
              <Col key={prod._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={prod} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
}

export default HomeScreen;
