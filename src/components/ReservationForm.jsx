import { useState } from "react";
import { Button, Col, Dropdown, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addToCart } from "../redux/actions";

const ReservationForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const travelData = useSelector((state) => state.travel.data);

  const offer = travelData.find((offer) => offer.id.toString() === id);

  console.log(offer);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const calculateTotalPrice = () => {
    const adultPrice = offer.price;
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

  const handleBookNowClick = () => {
    const totalPeople = adults + children;
    const productToAddToCart = {
      id: offer.id,
      name: offer.destination,
      price: calculateTotalPrice(),
      quantity: totalPeople,
    };
    dispatch(addToCart(productToAddToCart));
  };

  return (
    <div className="reservation-form-container border border-1 p-3">
      <Form className="reservation-form">
        <h6>Prezzo adulti: {offer.price}€</h6>
        <h6>Prezzo bambini: {offer.price_per_child}€</h6>
        <h4 className="mt-4">Prezzo totale: ${calculateTotalPrice()}</h4>
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            {adults + children} Persone
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={(e) => e.stopPropagation()}>
              <Row className="align-items-center">
                <Form.Group controlId="adults" className="d-flex mb-0">
                  <Col xs={3}>
                    <Form.Label className="m-0">Adulti:</Form.Label>
                  </Col>
                  <Col xs={3}>
                    <Form.Control type="number" size="sm" value={adults} onChange={handleAdultsChange} min={1} />
                  </Col>
                </Form.Group>
              </Row>
            </Dropdown.Item>
            <Dropdown.Item onClick={(e) => e.stopPropagation()}>
              <Row className="align-items-center">
                <Form.Group controlId="children" className="d-flex mb-0">
                  <Col xs={3}>
                    <Form.Label>Bambini:</Form.Label>
                  </Col>
                  <Col xs={3}>
                    <Form.Control type="number" size="sm" value={children} onChange={handleChildrenChange} min={0} />
                  </Col>
                </Form.Group>
              </Row>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Link to="/cart">
          <Button className="btn-explore mt-3" variant="primary" type="button" onClick={handleBookNowClick}>
            Vai al carrello
          </Button>
        </Link>
      </Form>
    </div>
  );
};

export default ReservationForm;
