import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useState } from "react";

function CheckoutScreen({ handleGoToNextStep, currentStep }) {
  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    street: "",
    city: "",
    country: "",
    state: "",
    pincode: "",
    addressType: "",
    defaultAddress: false,
  });

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(shippingDetails);
    handleGoToNextStep(currentStep+1);
  };

  const handleChange = (event) => {
    const { value, id, type, checked } = event.target;
    setShippingDetails(prevDetails => ({
      ...prevDetails,
      [id] : type === 'checkbox'? checked : value
    }))
  };

  return (
    <FormContainer>
      <h5 className="mb-3">ADD A NEW ADDRESS</h5>
      <Form noValidate onSubmit={submitHandler}>
        <Form.Floating className="mb-3">
          <Form.Control
            id="fullName"
            type="text"
            onChange={handleChange}
            value={shippingDetails.fullName}
            placeholder="Enter full name"
          />
          <label htmlFor="fullName">Full Name</label>
        </Form.Floating>

        <Form.Floating className="mb-3">
          <Form.Control
            id="street"
            type="text"
            onChange={handleChange}
            value={shippingDetails.street}
            placeholder="Enter your street name"
          />
          <label htmlFor="street">Street</label>
        </Form.Floating>

        <Form.Floating className="mb-3">
          <Form.Control
            id="city"
            type="text"
            onChange={handleChange}
            value={shippingDetails.city}
            placeholder="Enter your city name"
          />
          <label htmlFor="city">City/District/Town</label>
        </Form.Floating>

        {/* This will be select list for countries... */}
        <FloatingLabel
          className="mb-3"
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
        <FloatingLabel className="mb-3" controlId="selectState" label="State">
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

        <Form.Floating className="mb-3">
          <Form.Control
            id="pincode"
            type="number"
            placeholder="Enter your pincode"
            onChange={handleChange}
            value={shippingDetails.pincode}
          />
          <label htmlFor="pincode">Pincode</label>
        </Form.Floating>

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
        <Form.Check // prettier-ignore
          type={"checkbox"}
          id={`defaultAddress`}
          label={"Mark as Default Address"}
          className="mb-3"
          checked={shippingDetails.defaultAddress}
          value={shippingDetails.defaultAddress}
          onChange={handleChange}
        />

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">SAVE AND DELIVER HERE</Button>
          </Col>
        </Form.Group>
      </Form>
    </FormContainer>
  );
}

export default CheckoutScreen;
