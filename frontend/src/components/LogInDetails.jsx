import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineAddAlert } from "react-icons/md";
import { MdStarRate } from "react-icons/md";
import useAuth from "../hooks/useAuth";

function LogInDetails({ handleGoToNextStep, currentStep }) {
  // const userName = useSelector((state) => state.updateUserDetails?.userName);
  const userName = useSelector(
    (state) => state.currentlyActiveUser?.userDetails?.name
  );
  const { logOut } = useAuth();

  return (
    <div className="px-4">
      <div className="d-flex justify-content-between">
        {/* Left Side (User Details) */}
        <div className="d-flex row-gap-1 flex-column">
          <div className="d-flex gap-3">
            <p className="mb-1 text-secondary">Name</p>
            <span className="fw-bold">{userName}</span>
          </div>
          <div className="d-flex gap-3">
            <p className="mb-1 text-secondary">Phone</p>
            <span className="fw-bold">+91 9586325698</span>
          </div>

          <Button
            variant="link"
            className="text-primary p-0 text-decoration-none"
            onClick={() => logOut()}
          >
            Logout & Sign in to another account
          </Button>

          <Button
            variant="success"
            className="fw-bold rounded-0 py-2 mt-2 text-white"
            onClick={() => handleGoToNextStep(currentStep + 1)}
          >
            CONTINUE CHECKOUT
          </Button>
        </div>

        {/* Right Side (Advantages) */}
        <div className="d-flex flex-column">
          <p className="fw-bold text-secondary">
            Advantages of our secure login
          </p>
          <div className="d-flex align-items-center gap-2">
            <TbTruckDelivery color="blue" />
            <span className="text-secondary">
              Easily Track Orders, Hassle-free Returns
            </span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <MdOutlineAddAlert color="blue" />
            <span className="text-secondary">
              Get Relevant Alerts and Recommendations
            </span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <MdStarRate color="blue" />
            <span className="text-secondary">
              Wishlist, Reviews, Ratings, and more
            </span>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <p className="mt-3 text-secondary">
        Please note that upon clicking "Logout" you will lose all items in the
        cart and will be redirected to the QuickCart home page.
      </p>
    </div>
  );
}

export default LogInDetails;
