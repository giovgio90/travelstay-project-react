import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ReservationForm = () => {
  const { id } = useParams();
  const travelData = useSelector((state) => state.data);

  const offer = travelData.find((offer) => offer.id.toString() === id);

  console.log(offer);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const calculateTotalPrice = () => {
    const adultPrice = offer.price_per_adult;
    const childPrice = offer.price_per_child;
    const totalAdultPrice = adults * adultPrice;
    const totalChildPrice = children * childPrice;
    return totalAdultPrice + totalChildPrice;
  };

  const handleAdultsChange = (e) => {
    const value = parseInt(e.target.value);
    setAdults(value >= 0 ? value : 0);
  };

  const handleChildrenChange = (e) => {
    const value = parseInt(e.target.value);
    setChildren(value >= 0 ? value : 0);
  };

  return (
    <div
      className="border border-1 p-1 rounded-2"
      style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}
    >
      <Form
        className=" p-4 rounded-2"
        style={{
          border: "3px solid #203040",
        }}
      >
        <h4>Total Price: ${calculateTotalPrice()}</h4>
        <Form.Group controlId="adults">
          <Form.Label>ADULTS:</Form.Label>
          <Form.Control type="number" value={adults} onChange={handleAdultsChange} min={1} />
        </Form.Group>
        <Form.Group controlId="children">
          <Form.Label>CHILDS:</Form.Label>
          <Form.Control type="number" value={children} onChange={handleChildrenChange} min={0} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Prenota
        </Button>
      </Form>
    </div>
  );
};

export default ReservationForm;
