import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { MdOutlineTimer } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const TIMER = 5745 * 60;
// const TIMER = 14 * 60;

function PaymentTimer() {
  const [remainingTime, setRemainingTime] = useState(TIMER);
  const navigate = useNavigate();

  //  Only start the interval once on mount and clear it on unmount:
  useEffect(() => {
    // if (remainingTime <= 0) {
    // This is to a different useEffect as I dont want to clear interval on every second. If I did that, then after checking remaining time every second this would run and interval would be cleared as well again start. This is unnecessary overhead and can lead to glitches or missed intervals if React batching or re-renders don't behave as expected. So I would delete the interval only after the component unmounts...
    // }
    const interval = setInterval(function () {
      console.log("Interval sets...");
      setRemainingTime((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);

    return () => {
      console.log("Interval cleaned up...");
      clearInterval(interval); // ✅ Cleans up on unmount
    };
  }, []);

  // And to handle time expiration, add a second useEffect like this...
  useEffect(() => {
    if (remainingTime <= 0) {
      const handleExpiredTimer = async () => {
        const res = await Swal.fire({
          icon: "warning",
          text: "The reserved time for one or more items in your basket has expired. These items are no longer reserved.",
          confirmButtonText: "Go to Cart",
          confirmButtonColor: "#3085d6",
          allowEscapeKey: false,
          allowOutsideClick: false,
          theme: "dark",
        });

        if (res.isConfirmed) {
          navigate("/cart");
        }
      };
      handleExpiredTimer();
      return;
    }
  }, [remainingTime, navigate]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `00 : ${minutes} : ${seconds}`;
  };

  return (
    <ListGroup.Item
      as="li"
      className="shadow-sm mb-3 bg-warning-subtle d-flex align-items-center gap-2 p-3 rounded"
    >
      <strong className="me-2">Complete payment in</strong>
      <MdOutlineTimer size={20} />
      <span className="fw-semibold text-danger">
        {formatTime(remainingTime)}
      </span>
    </ListGroup.Item>
  );
}

export default PaymentTimer;
