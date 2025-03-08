import Card from "react-bootstrap/Card";
import { LuIndianRupee } from "react-icons/lu";
import { Link } from "react-router-dom";

function Product({ name, image, price, prodId }) {
  return (
    <Card style={{ width: "18rem" }} className="my-3 p-3 rounded">
      <Link to={`/product/${prodId}`}>
        <Card.Img variant="top" src={image} />
      </Link>
      <Card.Body>
        <Link to={`/product/${prodId}`}>
          <Card.Title as={"div"}>
            <strong>{name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as={"h3"}>
          <LuIndianRupee />
          {price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
