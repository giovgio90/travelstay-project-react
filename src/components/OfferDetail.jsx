import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header";
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";
import FooterTravelStay from "./FooterTravelStay";
import { PinMapFill } from "react-bootstrap-icons";
import ReservationForm from "./ReservationForm";

const OfferDetail = () => {
  const { id } = useParams();
  const travelData = useSelector((state) => state.data);

  const offer = travelData.find((offer) => offer.id.toString() === id);
  console.log(offer);

  if (!offer) {
    return <div>Offerta non trovata.</div>;
  }

  return (
    <>
      <Header />
      <Container style={{ marginTop: "120px" }}>
        <h4 className="d-flex align-items-center">
          <PinMapFill className="me-2" style={{ fontSize: "1.4rem" }} />
          {offer.destination}
        </h4>
        <Row>
          <Col md={6}>
            <Carousel
              className="carousel mb-3 rounded-4"
              style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}
            >
              <Carousel.Item>
                <img className="w-100 rounded-4" src={offer.image_two} style={{ height: "350px" }} alt="first slide" />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="w-100 rounded-4"
                  src={offer.image_three}
                  style={{ height: "350px" }}
                  alt="second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img className="w-100 rounded-4" src={offer.image_four} style={{ height: "350px" }} alt="third slide" />
              </Carousel.Item>
            </Carousel>
          </Col>
          <Col md={6}>
            <Row>
              <Col md={6}>
                <Card className="m-1" style={{ height: "170px", width: "255px" }}>
                  <Card.Img src={offer.hotel.images[0]} alt="Immagine 1" />
                </Card>
                <Card className="m-1 " style={{ height: "170px", width: "255px" }}>
                  <Card.Img src={offer.hotel.images[1]} alt="Immagine 2" />
                </Card>
              </Col>
              <Col md={6}>
                <Card className="m-1" style={{ height: "170px", width: "255px" }}>
                  <Card.Img src={offer.hotel.images[2]} alt="Immagine 3" />
                </Card>
                <Card className="m-1" style={{ height: "170px", width: "255px" }}>
                  <Card.Img src={offer.hotel.images[3]} alt="Immagine 4" style={{ height: "170px", width: "255px" }} />
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="position-relative">
          <Col md={7}>
            <div>
              <p>{offer.description}</p>
              <p>
                <strong>Duration:</strong> {offer.duration}
              </p>

              <h4>Dove alloggerai</h4>
              <p>Hotel: {offer.hotel.name}</p>
              <p className="me-2">{offer.hotel.amenities}</p>
            </div>
          </Col>
          <Col md={4} className="ms-auto">
            <div className="position-sticky" style={{ top: "110px" }}>
              <ReservationForm />
            </div>
          </Col>
        </Row>
      </Container>
      <FooterTravelStay />
    </>
  );
};

export default OfferDetail;
