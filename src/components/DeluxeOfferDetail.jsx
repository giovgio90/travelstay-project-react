import { useEffect, useState } from "react";

import { Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { ArrowLeftCircleFill, ClockFill, StarFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { addReviewFour, updateDeluxe } from "../redux/actions";
import { Scrollbar } from "react-scrollbars-custom";

import FooterTravelStay from "./FooterTravelStay";
import Rating from "react-rating";

import ReservationFormFive from "./ReservationFive";
import { FaCog } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Navigation } from "swiper/modules";

import LoadingFour from "./LoadingFour";
import HeaderTwo from "./HeaderTwo";

const DeluxeOfferDetail = () => {
  const { deluxeId } = useParams();
  const deluxe = useSelector((state) => state.deluxe.find((r) => r.id === parseInt(deluxeId)));
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const username = useSelector((state) => state.user.username);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedOffer, setEditedOffer] = useState(null);

  const handleEditOffer = () => {
    setEditedOffer(deluxe);
    setIsModalOpen(true);
  };

  const handleUpdateOffer = () => {
    if (isAdmin && editedOffer) {
      dispatch(updateDeluxe(editedOffer));
      setIsModalOpen(false);
    }
  };

  const handleAddReview = () => {
    if (newReview.rating > 0 && newReview.comment.trim() !== "") {
      dispatch(addReviewFour(deluxe.id, username.username, newReview.rating, newReview.comment));

      setNewReview({ rating: 0, comment: "" });
    }
  };

  const [newReview, setNewReview] = useState([{ user: username.username, rating: "", comment: "" }]);

  const isAdmin = username && username.email === "giovanni@gmail.com";

  if (!deluxe) {
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
                        Nome Pacchetto
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={editedOffer.name}
                        onChange={(e) => setEditedOffer({ ...editedOffer, name: e.target.value })}
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
                        Servizi inclusi
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={editedOffer.includedServices.join(", ")}
                        onChange={(e) =>
                          setEditedOffer({
                            ...editedOffer,
                            includedServices: e.target.value.split(", "),
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
                        onChange={(e) => setEditedOffer({ ...editedOffer, image_one: e.target.value })}
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
                        onChange={(e) => setEditedOffer({ ...editedOffer, image_one: e.target.value })}
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
                        onChange={(e) => setEditedOffer({ ...editedOffer, image_two: e.target.value })}
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
                        onChange={(e) => setEditedOffer({ ...editedOffer, image_three: e.target.value })}
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
          <div className="d-flex align-items-center mt-3 mb-0">
            <div className="d-flex  mt-4">
              <StarFill className="me-2 pt-1" style={{ color: "rgb(197, 235, 27)", fontSize: "2.8rem" }} />
              <h4
                style={{ fontSize: "2.5rem", fontFamily: "Impact, sans-serif", color: "#203040" }}
                className="mb-0 mb-4"
              >
                {deluxe.name}
              </h4>
            </div>
            <div className="ms-auto " style={{ fontFamily: "Montserrat, sans-serif" }}>
              {isAdmin && (
                <Button className="button-search" onClick={handleEditOffer}>
                  Modifica offerta
                </Button>
              )}
            </div>
          </div>
          <Row className="mb-5" style={{ fontFamily: "Montserrat, sans-serif" }}>
            <Col xs={12} md={12} lg={7} className="mt-3">
              <p>{deluxe.description}</p>

              <Modal show={showModal} size="lg" onHide={handleCloseModal}>
                <Modal.Header closeButton style={{ backgroundColor: "#203040" }}>
                  <Modal.Title style={{ color: "white", fontFamily: "Impact, sans-serif", fontSize: "2rem" }}>
                    Recensioni
                  </Modal.Title>
                </Modal.Header>
                <Scrollbar style={{ width: "100%", height: 360, color: "#203040" }}>
                  <Modal.Body>
                    {deluxe.reviews.map((review, index) => (
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
              {isLoading ? (
                <LoadingFour />
              ) : (
                <Swiper
                  grabCursor={true}
                  effect={"creative"}
                  navigation={true}
                  creativeEffect={{
                    prev: {
                      shadow: true,
                      translate: [0, 0, -400],
                    },
                    next: {
                      translate: ["100%", 0, 0],
                    },
                  }}
                  modules={[Navigation, EffectCreative]}
                  className="mySwiper mb-4"
                  style={{ width: "100%", height: "400px" }}
                >
                  {deluxe.images.map((image, index) => (
                    <SwiperSlide key={index} style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src={image}
                        alt={deluxe.name}
                        className="rounded-3"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
              <Card className="mb-2">
                <Card.Body>
                  <Row>
                    <Col xs={3} md={3} className="d-flex align-items-center">
                      <div>
                        <ClockFill className="me-1" />
                      </div>
                      <div>
                        <p className="mb-0">
                          <strong>Durata:</strong>
                        </p>
                      </div>
                    </Col>
                    <Col xs={9} md={9}>
                      {deluxe.duration}
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col xs={3} md={3} className="d-flex align-items-center">
                      <div>
                        <FaCog className="me-1" />
                      </div>
                      <div>
                        <p className="mb-0">
                          <strong>Servizi:</strong>
                        </p>
                      </div>
                    </Col>
                    <Col xs={9} md={9} className="mb-2">
                      {deluxe.includedServices.join(", ")}
                    </Col>
                  </Row>
                  <div className="text-end">
                    <Button className="ms-auto py-0" variant="transparent" onClick={openModal}>
                      {deluxe.reviews.length > 0 && (
                        <span className="d-flex" style={{ marginLeft: "5px" }}>
                          <div>
                            <StarFill className="pb-1" style={{ color: "rgb(197, 235, 27)", fontSize: "1.5rem" }} />{" "}
                          </div>
                          <div className="text-black">
                            <strong>
                              {(
                                deluxe.reviews.reduce((total, review) => total + review.rating, 0) /
                                deluxe.reviews.length
                              ).toFixed(2)}
                            </strong>
                            {"  "} {deluxe.reviews.length} recensioni
                          </div>
                        </span>
                      )}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={12} lg={4} className="ms-auto">
              <div className="position-sticky mt-3" style={{ top: "110px" }}>
                <ReservationFormFive />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <FooterTravelStay />
    </>
  );
};

export default DeluxeOfferDetail;
