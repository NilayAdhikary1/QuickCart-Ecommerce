import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useState } from "react";

function ShippingScreen({ handleGoToNextStep, currentStep }) {
  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    street: "",
    city: "",
    country: "",
    state: "",
    pincode: "",
    landmark: "",
    addressType: "",
    defaultAddress: false,
  });

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(shippingDetails);
    handleGoToNextStep(currentStep + 1);
  };

  const handleChange = (event) => {
    const { value, id, type, checked } = event.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <FormContainer>
      <h5 className="mb-3">ADD A NEW ADDRESS</h5>
      <Form noValidate onSubmit={submitHandler}>
        <div className="d-flex gap-3">
          {/* FULL NAME */}
          <Form.Floating className="mb-3 flex-fill">
            <Form.Control
              id="fullName"
              type="text"
              onChange={handleChange}
              value={shippingDetails.fullName}
              placeholder="Enter full name"
            />
            <label htmlFor="fullName">Full Name</label>
          </Form.Floating>

          {/* City/District/Town */}
          <Form.Floating className="mb-3 flex-fill">
            <Form.Control
              id="city"
              type="text"
              onChange={handleChange}
              value={shippingDetails.city}
              placeholder="Enter your city name"
            />
            <label htmlFor="city">City/District/Town</label>
          </Form.Floating>
        </div>

        {/* STREET */}
        <FloatingLabel
          controlId="street"
          label="Address (Area and Street)"
          className="mb-3"
        >
          <Form.Control
            as="textarea"
            placeholder="Enter your street name"
            rows={3}
            value={shippingDetails.street}
            onChange={handleChange}
            style={{ height: "100px" }}
          />
        </FloatingLabel>

        <div className="d-flex gap-3">
          {/* This will be select list for countries... */}
          <FloatingLabel
            className="mb-3 flex-fill"
            controlId="selectCountry"
            label="Country"
          >
            <Form.Select
              alue={shippingDetails.country}
              onChange={handleChange}
              id="country"
              aria-label="Floating label select example"
            >
              <option value={""}>--Select Country--</option>
              <option value={"India"}>India</option>
              <option value={"USA"}>USA</option>
              <option value={"Australia"}>Australia</option>
            </Form.Select>
          </FloatingLabel>

          {/* This will be select list for states... */}
          <FloatingLabel
            className="mb-3 flex-fill"
            controlId="selectState"
            label="State"
          >
            <Form.Select
              value={shippingDetails.state}
              onChange={handleChange}
              id="state"
              aria-label="Floating label select example"
            >
              <option value={""}>--Select State--</option>
              <option value={"West Bengal"}>West Bengal</option>
              <option value={"Gujarat"}>Gujarat</option>
              <option value={"Punjab"}>Punjab</option>
            </Form.Select>
          </FloatingLabel>
        </div>

        <div className="d-flex gap-3">
          {/* Pin code */}
          <Form.Floating className="mb-3 flex-fill">
            <Form.Control
              id="pincode"
              type="number"
              placeholder="Enter your pincode"
              onChange={handleChange}
              value={shippingDetails.pincode}
            />
            <label htmlFor="pincode">Pincode</label>
          </Form.Floating>

          {/* LANDMARK */}
          <Form.Floating className="mb-3 flex-fill">
            <Form.Control
              id="landmark"
              type="text"
              onChange={handleChange}
              value={shippingDetails.landmark}
              placeholder="Enter your landmark"
            />
            <label htmlFor="fullName">Landmark (Optional)</label>
          </Form.Floating>
        </div>

        {/* This will be inline radio buttons... */}
        <Form.Group className="mb-4" controlId="addressType">
          <Form.Label>Address Type</Form.Label>
          <div className="mb-3">
            <Form.Check
              inline
              label="Home (All day delivery)"
              name="addressType"
              type="radio"
              id="home"
              value="Home"
              checked={shippingDetails.addressType === "Home"}
              onChange={(e) =>
                setShippingDetails((prevDetails) => ({
                  ...prevDetails,
                  addressType: e.target.value,
                }))
              }
            />
            <Form.Check
              inline
              label="Work (Delivery between 10 AM - 5 PM)"
              name="Work"
              type={"radio"}
              value="Work"
              id="work"
              checked={shippingDetails.addressType === "Work"}
              onChange={(e) =>
                setShippingDetails((prevDetails) => ({
                  ...prevDetails,
                  addressType: e.target.value,
                }))
              }
            />
          </div>
        </Form.Group>

        {/* This will be a checkbox... */}
        <Form.Check
          type={"checkbox"}
          id={`defaultAddress`}
          label={"Mark as Default Address"}
          className="mb-3"
          checked={shippingDetails.defaultAddress}
          value={shippingDetails.defaultAddress}
          onChange={handleChange}
        />

        <Form.Group as={Row} className="align-items-center">
          <Col xs="auto">
            <Button
              type="submit"
              className="rounded-0 fw-bold px-4 py-2"
              style={{ backgroundColor: "#f7631b", border: "none" }}
            >
              SAVE AND DELIVER HERE
            </Button>
          </Col>

          <Col xs="auto">
            <Button
              variant="link"
              size="sm"
              className="text-primary text-uppercase fw-semibold text-decoration-none p-0"
            >
              Cancel
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;
