import Card from "react-bootstrap/Card";
import { LuIndianRupee } from "react-icons/lu";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";

function Product({ product }) {
  return (
    <Card style={{ width: "18rem" }} className="my-3 p-3 rounded">
      <Link to={`products/${product._id}`}>
        <Card.Img variant="top" src={product.image} />
      </Link>
      <Card.Body>
        <Link to={`products/${product._id}`}>
          <Card.Title className="product-title" as={"div"}>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Ratings numReviews={product.numReviews} rating={product.rating}/>
        <Card.Text as={"h3"}>
          <LuIndianRupee />
          {product.price.toLocaleString("en-IN")}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
