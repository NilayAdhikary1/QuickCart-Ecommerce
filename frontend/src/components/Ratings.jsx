import { FaStar } from "react-icons/fa";

function Ratings({ rating, numReviews }) {
  const fillPercentage = (rating / 5) * 100; // Convert rating (out of 5) to percentage

  return (
    <div className="d-flex align-items-center">
      <span className="rating-text me-1">{rating}</span>
      <div className="star-wrapper">
        {/* Empty Star (Gray) */}
        <FaStar className="empty-star" size={15} />

        {/* Filled Star (Gold) with Gradient Mask */}
        <FaStar
          className="filled-star"
          size={15}
          style={{
            clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`, // Clip the star dynamically
          }}
        />
      </div>

      {/* Vertical Divider */}
      <div
        className="vr mx-2"
        style={{ width: "2px", backgroundColor: "black" }}
      ></div>

      {/* Number of Reviews */}
      <span className="rating-text">{numReviews}k Reviews</span>
    </div>
  );
}

export default Ratings;
