import { useEffect, useState } from "react";

import { Button, Card, Col, Container, Form, Image, Modal, Row } from "react-bootstrap";
import { ArrowLeftCircleFill, StarFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { addReviewThree, updateTour } from "../redux/actions";
import { Scrollbar } from "react-scrollbars-custom";

import FooterTravelStay from "./FooterTravelStay";
import Rating from "react-rating";
import ReservationFormFour from "./ReservationFormFour";
import { FaMapMarkerAlt } from "react-icons/fa";
import LoadingTwo from "./LoadingTwo";
import HeaderTwo from "./HeaderTwo";

const TourDetail = () => {
  const { tourId } = useParams();
  const tour = useSelector((state) => state.tours.find((r) => r.id === parseInt(tourId)));
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const username = useSelector((state) => state.user.username);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedOffer, setEditedOffer] = useState(null);

  const handleEditOffer = () => {
    setEditedOffer(tour);
    setIsModalOpen(true);
  };

  const handleUpdateOffer = () => {
    if (isAdmin && editedOffer) {
      dispatch(updateTour(editedOffer));
      setIsModalOpen(false);
    }
  };

  const handleAddReview = () => {
    if (newReview.rating > 0 && newReview.comment.trim() !== "") {
      dispatch(addReviewThree(tour.id, username.username, newReview.rating, newReview.comment));

      setNewReview({ rating: 0, comment: "" });
    }
  };

  const [newReview, setNewReview] = useState([{ user: username.username, rating: "", comment: "" }]);

  const isAdmin = username && username.email === "giovanni@gmail.com";

  if (!tour) {
    return <div>Offerta non trovata</div>;
  }

  const openModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <HeaderTwo />
      <div style={{ marginTop: "110px" }}>
        <Container>
          <Link to="/">
            <ArrowLeftCircleFill className="mt-2" style={{ fontSize: "1.7rem", color: "#203040" }} />
          </Link>
        </Container>
        <Container>
          {isAdmin && editedOffer && (
            <Modal show={isModalOpen} size="lg" onHide={() => setIsModalOpen(false)}>
              <Modal.Header style={{ backgroundColor: "#203040" }} closeButton>
                <Modal.Title style={{ fontFamily: "Impact, san-serif", color: "white" }}>Modifica offerta</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Scrollbar style={{ width: "100%", height: 360, color: "#203040" }}>
                  <Form className="mx-2">
                    <Form.Group className="mb-2">
                      <Form.Label
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: "0.9rem",
                          color: "#203040",
                          fontWeight: "bolder",
                        }}
                        className="mb-0"
                      >
                        Località
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={editedOffer.destination}
                        onChange={(e) => setEditedOffer({ ...editedOffer, destination: e.target.value })}
                      />
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: "0.9rem",
                          color: "#203040",
                          fontWeight: "bolder",
                        }}
                        className="mb-0"
                      >
                        Regione
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={editedOffer.region}
                        onChange={(e) => setEditedOffer({ ...editedOffer, region: e.target.value })}
                      />
                    </Form.Group>

                    <Form.Group className="mb-2">
                      <Form.Label
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: "0.9rem",
                          color: "#203040",
                          fontWeight: "bolder",
                        }}
                        className="mb-0"
                      >
                        Descrizione
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={editedOffer.description}
                        onChange={(e) => setEditedOffer({ ...editedOffer, description: e.target.value })}
                      />
                    </Form.Group>

                    <Form.Group className="mb-2">
                      <Form.Label
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: "0.9rem",
                          color: "#203040",
                          fontWeight: "bolder",
                        }}
                        className="mb-0"
                      >
                        Durata
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={editedOffer.duration}
                        onChange={(e) => setEditedOffer({ ...editedOffer, duration: e.target.value })}
                      />
                    </Form.Group>

                    <Form.Group className="mb-2">
                      <Form.Label
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: "0.9rem",
                          color: "#203040",
                          fontWeight: "bolder",
                        }}
                        className="mb-0"
                      >
                        Tappe
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={editedOffer.highlights.join(", ")}
                        onChange={(e) =>
                          setEditedOffer({
                            ...editedOffer,
                            highlights: e.target.value.split(", "),
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: "0.9rem",
                          color: "#203040",
                          fontWeight: "bolder",
                        }}
                        className="mb-0"
                      >
                        Descrizione tappe
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={editedOffer.highlights_description.join(", ")}
                        onChange={(e) =>
                          setEditedOffer({
                            ...editedOffer,
                            highlights_description: e.target.value.split(", "),
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-2">
                      <Form.Label
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: "0.9rem",
                          color: "#203040",
                          fontWeight: "bolder",
                        }}
                        className="mb-0"
                      >
                        Prezzo adulti
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={editedOffer.price === null ? "" : editedOffer.price}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          const numericValue = inputValue.trim() === "" ? null : parseFloat(inputValue);
                          setEditedOffer({ ...editedOffer, price: numericValue });
                        }}
                      />
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: "0.9rem",
                          color: "#203040",
                          fontWeight: "bolder",
                        }}
                        className="mb-0"
                      >
                        Prezzo bambini
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={editedOffer.price_per_child === null ? "" : editedOffer.price_per_child}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          const numericValue = inputValue.trim() === "" ? null : parseFloat(inputValue);
                          setEditedOffer({ ...editedOffer, price_per_child: numericValue });
                        }}
                      />
                    </Form.Group>

                    <Form.Group className="mb-2">
                      <Form.Label
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: "0.9rem",
                          color: "#203040",
                          fontWeight: "bolder",
                        }}
                        className="mb-0"
                      >
                        Immagine 1 (URL)
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={editedOffer.image}
                        onChange={(e) => setEditedOffer({ ...editedOffer, image: e.target.value })}
                      />
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: "0.9rem",
                          color: "#203040",
                          fontWeight: "bolder",
                        }}
                        className="mb-0"
                      >
                        Immagine 2 (URL)
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={editedOffer.images[0]}
                        onChange={(e) => setEditedOffer({ ...editedOffer, images: e.target.value })}
                      />
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: "0.9rem",
                          color: "#203040",
                          fontWeight: "bolder",
                        }}
                        className="mb-0"
                      >
                        Immagine 3 (URL)
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={editedOffer.images[1]}
                        onChange={(e) => setEditedOffer({ ...editedOffer, images: e.target.value })}
                      />
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: "0.9rem",
                          color: "#203040",
                          fontWeight: "bolder",
                        }}
                        className="mb-0"
                      >
                        Immagine 4 (URL)
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={editedOffer.images[2]}
                        onChange={(e) => setEditedOffer({ ...editedOffer, images: e.target.value })}
                      />
                    </Form.Group>
                  </Form>
                </Scrollbar>
              </Modal.Body>
              <Modal.Footer>
                <Button className="button-search" onClick={() => setIsModalOpen(false)}>
                  Annulla
                </Button>
                <Button className="button-search" onClick={handleUpdateOffer}>
                  Salva
                </Button>
              </Modal.Footer>
            </Modal>
          )}
          <div className="d-flex align-items-center mt-4 mb-2">
            <div className="d-flex align-items-center">
              <FaMapMarkerAlt className="me-2" style={{ color: "#203040", fontSize: "2.3rem" }} />
              <h4 style={{ fontSize: "2.5rem", fontFamily: "Impact, sans-serif", color: "#203040" }} className="mb-0">
                {tour.destination} - {tour.region}
              </h4>
            </div>

            <div className="ms-auto">
              {isAdmin && (
                <Button className="button-search" onClick={handleEditOffer}>
                  Modifica offerta
                </Button>
              )}
            </div>
          </div>
          <Row className="mb-5">
            <Col xs={12} md={12} lg={7} className="mt-4">
              <p style={{ fontFamily: "Montserrat, sans-serif" }}>{tour.description}</p>
              <Modal show={showModal} size="lg" onHide={handleCloseModal}>
                <Modal.Header closeButton style={{ backgroundColor: "#203040" }}>
                  <Modal.Title style={{ color: "white", fontFamily: "Impact, sans-serif", fontSize: "2rem" }}>
                    Recensioni
                  </Modal.Title>
                </Modal.Header>
                <Scrollbar style={{ width: "100%", height: 360, color: "#203040" }}>
                  <Modal.Body>
                    {tour.reviews.map((review, index) => (
                      <div key={index}>
                        <h5 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: "700" }}>{review.user}</h5>
                        <div className="d-flex align-items-center">
                          <div>
                            <p className="mb-0 me-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
                              Valutazione:
                            </p>
                          </div>
                          <div className="p-1 rounded-2" style={{ backgroundColor: "#203040" }}>
                            <strong className="text-white">{review.rating}</strong>
                            <StarFill className="pb-1" style={{ color: "rgb(197, 235, 27)", fontSize: "1.5rem" }} />
                          </div>
                        </div>
                        <p className="mt-2">
                          <span className="me-2" style={{ fontFamily: "Montserrat. sans-serif" }}>
                            Commento:
                          </span>
                          <span style={{ fontStyle: "italic", fontWeight: "500" }}>"{review.comment}"</span>
                        </p>
                        <hr />
                      </div>
                    ))}
                    <Form onSubmit={handleAddReview}>
                      <Form.Group>
                        <Form.Label>
                          {" "}
                          <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "1.3rem" }}>
                            {" "}
                            <strong>{username.username}</strong>, lascia una recensione!
                          </p>
                        </Form.Label>
                      </Form.Group>
                      <Form.Group className="d-flex align-items-center">
                        <div>
                          <Form.Label
                            style={{
                              fontFamily: "Montserrat, sans-serif",
                              fontSize: "0.9rem",
                              color: "#203040",
                              fontWeight: "bolder",
                            }}
                            className="mb-0 me-2"
                          >
                            Valutazione:{" "}
                          </Form.Label>
                        </div>
                        <div>
                          <Rating
                            initialRating={newReview.rating}
                            emptySymbol={<span className="rating-icon">&#9734;</span>}
                            fullSymbol={<span className="rating-icon">&#9733;</span>}
                            onClick={(value) => setNewReview({ ...newReview, rating: value })}
                          />
                        </div>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label
                          className="mb-0"
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            fontSize: "0.9rem",
                            color: "#203040",
                            fontWeight: "bolder",
                          }}
                        >
                          Commento
                        </Form.Label>
                        <Form.Control
                          className="mb-2"
                          as="textarea"
                          rows={3}
                          placeholder="Inserisci il tuo commento"
                          value={newReview.comment}
                          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        />
                      </Form.Group>
                      <div className="text-center">
                        <Button className="button-search" type="submit">
                          Aggiungi Recensione
                        </Button>
                      </div>
                    </Form>
                  </Modal.Body>
                </Scrollbar>
                <Modal.Footer>
                  <Button className="button-search" onClick={handleCloseModal}>
                    Chiudi
                  </Button>
                </Modal.Footer>
              </Modal>
              <h4 className="mb-0 mt-5" style={{ fontFamily: "Montserrat, sans-serif" }}>
                Tour - {tour.duration}
              </h4>
              {loading ? (
                <LoadingTwo />
              ) : (
                <Card className="border-white" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  <Card.Body>
                    <Row>
                      <Col xs={12} md={12} lg={6} className="px-0">
                        <Image src={tour.images[0]} className="w-100 rounded-2" />
                      </Col>

                      <Col xs={12} md={12} lg={6} className="ps-2 py-1">
                        <Card.Text className="mb-1" style={{ fontWeight: "600" }}>
                          {" "}
                          {tour.highlights[0]}
                        </Card.Text>
                        <Card.Text> {tour.highlights_description[0]}</Card.Text>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              )}
              <hr />
              {loading ? (
                <LoadingTwo />
              ) : (
                <Card className="border-white" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  <Card.Body>
                    <Row>
                      <Col xs={12} md={12} lg={6} className="px-0">
                        <Image src={tour.images[1]} className="w-100 rounded-2" />
                      </Col>
                      <Col xs={12} md={12} lg={6} className="ps-2 py-1">
                        <Card.Text className="mb-1" style={{ fontWeight: "600" }}>
                          {" "}
                          {tour.highlights[1]}
                        </Card.Text>
                        <Card.Text> {tour.highlights_description[1]}</Card.Text>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              )}
              <hr />
              {loading ? (
                <LoadingTwo />
              ) : (
                <Card className="border-white" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  <Card.Body>
                    <Row>
                      <Col xs={12} md={12} lg={6} className="px-0">
                        <Image src={tour.images[2]} className="w-100 rounded-2" />
                      </Col>
                      <Col xs={12} md={12} lg={6} className="ps-2 py-1">
                        <Card.Text className="mb-1" style={{ fontWeight: "600" }}>
                          {" "}
                          {tour.highlights[2]}
                        </Card.Text>
                        <Card.Text> {tour.highlights_description[2]}</Card.Text>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              )}
              <div className="text-end">
                <Button className="py-0" variant="transparent" onClick={openModal}>
                  {tour.reviews.length > 0 && (
                    <span className="d-flex" style={{ marginLeft: "5px" }}>
                      <div>
                        <StarFill className="pb-1" style={{ color: "rgb(197, 235, 27)", fontSize: "1.5rem" }} />{" "}
                      </div>
                      <div className="text-black">
                        <strong>
                          {(
                            tour.reviews.reduce((total, review) => total + review.rating, 0) / tour.reviews.length
                          ).toFixed(2)}
                        </strong>
                        {"  "} {tour.reviews.length} recensioni
                      </div>
                    </span>
                  )}
                </Button>
              </div>
            </Col>
            <Col xs={12} md={12} lg={4} className="ms-auto">
              <div className="position-sticky" style={{ top: "110px" }}>
                <ReservationFormFour />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <FooterTravelStay />
    </>
  );
};

export default TourDetail;
