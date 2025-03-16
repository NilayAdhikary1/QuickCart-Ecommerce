import { Badge } from "react-bootstrap";

function CartBadge({ numberOfCartItems }) {
  return (
    <Badge pill bg="danger" className="custom-cart-badge">
      {numberOfCartItems}
    </Badge>
  );
}

export default CartBadge;
