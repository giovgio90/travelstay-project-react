import { useState } from "react";
import { Button, Col, Dropdown, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addToCartDeluxe } from "../redux/actions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReservationFormFive = () => {
  const { deluxeId } = useParams();
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState("");
  const deluxe = useSelector((state) => state.deluxe.find((d) => d.id === parseInt(deluxeId)));
  console.log(deluxe);

  let offer;

  if (deluxe.offer) {
    const matchingOffers = deluxe.offers.filter((offer) => offer.id.toString() === deluxeId);
    if (matchingOffers.length > 0) {
      // eslint-disable-next-line no-unused-vars
      offer = matchingOffers[0];
    }
  }

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const calculateTotalPrice = () => {
    const adultPrice = deluxe.price;
    const childPrice = deluxe.price_per_child;
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

  const handleBookClick = () => {
    const totalPeople = adults + children;
    const productToAddToCart = {
      id: deluxe.id,
      name: deluxe.name,
      image: deluxe.image,
      type_offer: deluxe.type_offer,
      duration: deluxe.duration,
      price: calculateTotalPrice(),
      quantity: totalPeople,
      adults: adults,
      children: children,
      date: selectedDate,
    };
    dispatch(addToCartDeluxe(productToAddToCart));
  };

  return (
    <div className="reservation-form-container rounded-2 p-3">
      <Form className="reservation-form">
        <h6 style={{ fontFamily: "Montserrat, sans-serif" }}>
          <span> Prezzo per adulto:</span>{" "}
          <span className="p-1 rounded-2" style={{ fontWeight: "600" }}>
            {deluxe.price},00 €
          </span>
        </h6>
        <h6 style={{ fontFamily: "Montserrat, sans-serif" }}>
          <span>Prezzo per bambino:</span>{" "}
          <span className="p-1 rounded-2" style={{ fontWeight: "600" }}>
            {deluxe.price_per_child},00 €
          </span>
        </h6>

        <Dropdown>
          <div className="d-flex align-items-center">
            <Dropdown.Toggle className="button-search button-filter" variant="white">
              {adults + children} Ospite
            </Dropdown.Toggle>
            <div className="mx-3">
              <DatePicker
                className="rounded-2 ps-1 mx-3 custom-datepicker"
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Data"
                style={{ width: "150px", fontSize: "14px" }}
              />
            </div>
          </div>
          <Dropdown.Menu>
            <Dropdown.Item onClick={(e) => e.stopPropagation()}>
              <Row className="align-items-center">
                <Form.Group controlId="adults" className="d-flex mb-0">
                  <Col xs={3}>
                    <Form.Label className="me-5" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      <h6 className="mb-0">Adulti:</h6>
                    </Form.Label>
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
                    <Form.Label style={{ fontFamily: "Montserrat, sans-serif" }}>
                      <h6 className="mb-0">Bambini:</h6>
                    </Form.Label>
                  </Col>
                  <Col xs={3}>
                    <Form.Control type="number" size="sm" value={children} onChange={handleChildrenChange} min={0} />
                  </Col>
                </Form.Group>
              </Row>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <hr />
        <h4 className="mt-4" style={{ fontFamily: "Montserrat, sans-serif" }}>
          Prezzo totale:{" "}
          <span className="p-1 rounded-2" style={{ fontWeight: "600" }}>
            {calculateTotalPrice()},00 €
          </span>
        </h4>
        <Row>
          <Col xs={12} md={3} lg={6}>
            <Button className="button-search mt-3 px-5" type="button" onClick={handleBookClick}>
              Prenota
            </Button>
          </Col>
          <Col xs={12} md={6} lg={6}>
            <Link to="/cart">
              <Button className="button-search mt-3 px-4" type="button">
                Vai al carrello
              </Button>
            </Link>
          </Col>
        </Row>
        <p className="mt-2 mb-0" style={{ fontFamily: "Montserrat, sans-serif" }}>
          Il prezzo totale del soggiorno include l'IVA e tutti i costi applicabili
        </p>
      </Form>
    </div>
  );
};

export default ReservationFormFive;
