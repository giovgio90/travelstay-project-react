import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header";
import { Button, Card, Carousel, Col, Container, Modal, Row } from "react-bootstrap";
import FooterTravelStay from "./FooterTravelStay";
import { PinMapFill, StarFill } from "react-bootstrap-icons";
import ReservationForm from "./ReservationForm";
import { useEffect, useState } from "react";

const OfferDetail = () => {
  const { id } = useParams();
  const travelData = useSelector((state) => state.travel.data);

  const offer = travelData.find((offer) => offer.id.toString() === id);
  console.log(offer);

  const [isSticky, setIsSticky] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!offer) {
    return <div>Offerta non trovata.</div>;
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const homeClassName = isSticky ? "div-sticky" : "div-no-sticky";

  const handleScroll = () => {
    if (window.scrollY > 30) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  return (
    <>
      <Header />
      <Container className={homeClassName}>
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
        </Row>
        <Row className="position-relative">
          <Col md={8}>
            <h4>Dove alloggerai</h4>
            <Row>
              <Col md={12} className="d-flex">
                <Card className="m-1" style={{ height: "170px", width: "280px" }}>
                  <Card.Img src={offer.hotel.images[0]} alt="Immagine 1" />
                </Card>

                <Card className="m-1 " style={{ height: "185px", width: "280px" }}>
                  <Card.Img src={offer.hotel.images[1]} alt="Immagine 2" />
                </Card>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={12} className="d-flex">
                <Card className="m-1" style={{ height: "170px", width: "280px" }}>
                  <Card.Img src={offer.hotel.images[2]} alt="Immagine 3" />
                </Card>

                <Card className="m-1" style={{ height: "185px", width: "280px" }}>
                  <Card.Img src={offer.hotel.images[3]} alt="Immagine 4" style={{ height: "185px", width: "280px" }} />
                </Card>
              </Col>
            </Row>
            <div className="d-flex align-items-center mb-3">
              <p className="mb-0" style={{ fontWeight: "500" }}>
                {offer.hotel.name}
              </p>
              <Button className="py-0" variant="trasparent" onClick={() => setShowModal(true)}>
                {offer.hotel.reviews.length > 0 && (
                  <span className="d-flex" style={{ marginLeft: "5px" }}>
                    <div>
                      <StarFill className="pb-1" style={{ color: "yellow", fontSize: "1.2rem" }} />{" "}
                    </div>
                    <div>
                      <strong>
                        {(
                          offer.hotel.reviews.reduce((total, review) => total + review.rating, 0) /
                          offer.hotel.reviews.length
                        ).toFixed(2)}
                      </strong>
                      {"  "} {offer.hotel.reviews.length} recensioni
                    </div>
                  </span>
                )}
              </Button>
            </div>

            <div className="me-auto">
              <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Recensioni</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {offer.hotel.reviews.map((review, index) => (
                    <div key={index}>
                      <h5>{review.user}</h5>
                      <p>Rating: {review.rating}</p>
                      <p>{review.comment}</p>
                    </div>
                  ))}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Chiudi
                  </Button>
                </Modal.Footer>
              </Modal>
              <p>{offer.description}</p>
            </div>

            <Row>
              <Col md={10}>
                <div>
                  <div className="info-hotel border border-1 mb-2 p-3">
                    <Row>
                      <Col md={3}>
                        <p>
                          <strong>Duration:</strong>
                        </p>
                      </Col>
                      <Col md={6}>{offer.duration}</Col>
                    </Row>
                    <Row>
                      <Col md={3}>
                        <p>
                          <strong>Host:</strong>
                        </p>
                      </Col>
                      <Col md={6}>{offer.host.name}</Col>
                    </Row>
                    <Row>
                      <Col md={3}>
                        <p>
                          <strong>Stanze:</strong>
                        </p>
                      </Col>
                      <Col md={6}>{offer.hotel.bedrooms}</Col>
                    </Row>
                    <Row>
                      <Col md={3}>
                        <p>
                          <strong>Bagni:</strong>
                        </p>
                      </Col>
                      <Col md={6}>{offer.hotel.bathrooms}</Col>
                    </Row>
                    <Row>
                      <Col md={3}>
                        <p>
                          <strong>Servizi:</strong>
                        </p>
                      </Col>
                      <Col md={6}>{offer.hotel.amenities.join(", ")}</Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
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
