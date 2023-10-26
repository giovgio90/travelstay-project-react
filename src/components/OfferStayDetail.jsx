import "swiper/css";
import "swiper/css/effect-creative";

import { Button, Card, Col, Container, Modal, Row, Form, Navbar, Nav, NavDropdown, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Logo from "../assets/Logo.png";
import FooterTravelStay from "./FooterTravelStay";
import ReservationFormTwo from "./ReservationFormTwo";
import { useState } from "react";
import { setUser, updateStayOffer } from "../redux/actions";
import {
  AirplaneFill,
  ArrowLeftCircleFill,
  Cart3,
  EnvelopeFill,
  HouseFill,
  PersonCircle,
  PersonFill,
  StarFill,
} from "react-bootstrap-icons";
import { Scrollbar } from "react-scrollbars-custom";
import Rating from "react-rating";

import { EffectCreative, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaBath, FaBed, FaCog, FaHotel, FaMapMarkerAlt, FaUser } from "react-icons/fa";

const OfferStayDetail = () => {
  const { stayId } = useParams();
  const travelData = useSelector((state) => state.stay.data);
  const username = useSelector((state) => state.user.username);

  const handleLogout = () => {
    dispatch(setUser(null));
  };

  const isAdmin = username && username.email === "giovanni@gmail.com";

  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedOffer, setEditedOffer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newReview, setNewReview] = useState([{ user: username.username, rating: "", comment: "" }]);
  const cartItemsTravel = useSelector((state) => state.cart.cartItemsTravel);
  const cartItemsStay = useSelector((state) => state.cart.cartItemsStay);
  const cartItemsRoom = useSelector((state) => state.cart.cartItemsRoom);
  const cartItemsTour = useSelector((state) => state.cart.cartItemsTour);
  const cartItemsDeluxe = useSelector((state) => state.cart.cartItemsDeluxe);
  const cartItemCount =
    cartItemsTravel.length +
    cartItemsStay.length +
    cartItemsRoom.length +
    cartItemsTour.length +
    cartItemsDeluxe.length;

  const offer = travelData.find((offer) => offer.id.toString() === stayId);

  if (!offer) {
    return <div>Offerta non trovata</div>;
  }

  const handleEditOffer = () => {
    setEditedOffer(offer);
    setIsModalOpen(true);
  };

  const handleUpdateOffer = () => {
    if (isAdmin && editedOffer) {
      dispatch(updateStayOffer(editedOffer));
      setIsModalOpen(false);
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();

    if (newReview.rating && newReview.comment) {
      const reviewToAdd = {
        user: username.username,
        rating: newReview.rating,
        comment: newReview.comment,
      };

      try {
        const response = await fetch(`http://localhost:3030/hotels/${stayId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reviews: [...offer.reviews, reviewToAdd] }),
        });

        if (response.ok) {
          const updatedOffer = {
            ...offer,
            reviews: [...offer.reviews, reviewToAdd],
          };

          dispatch(updateStayOffer(updatedOffer));

          setShowModal(false);
          setNewReview({ user: username.username, rating: "", comment: "" });
        } else {
          console.error("Errore nell'aggiunta della recensione:", response.status);
        }
      } catch (error) {
        console.error("Errore nell'aggiunta della recensione:", error);
      }
    } else {
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Navbar expand="lg" className="navbar-head py-0">
        <Container>
          <Navbar.Brand className="d-flex align-center ms-2 me-0 ps-auto">
            <img src={Logo} width="80" height="80" alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="text-sm-center mx-lg-auto">
              <Nav.Link className="pe-lg-5 d-flex" href="/">
                <div className="d-flex align-items-center">
                  <HouseFill className="text-white" style={{ fontSize: "1.5rem" }} />{" "}
                  <h4 className="nav-link  mb-0">HOME</h4>
                </div>
              </Nav.Link>
              <Nav.Link className=" pe-lg-5 d-flex" href="/about-us">
                <div className="d-flex align-items-center">
                  <PersonFill className="text-white" style={{ fontSize: "1.5rem" }} />{" "}
                  <h4 className="nav-link  mb-0"> CHI SIAMO</h4>
                </div>
              </Nav.Link>

              <Nav.Link className="pe-lg-5 " href="/explore">
                <div className="nav-link d-flex align-items-center">
                  <AirplaneFill className="text-white" style={{ fontSize: "1.5rem" }} />{" "}
                  <h4 className="nav-link  mb-0">OFFERTE</h4>
                </div>
              </Nav.Link>
              <Nav.Link className=" pe-lg-5 " href="/contact">
                <div className=" nav-link d-flex align-items-center">
                  <EnvelopeFill className="text-white" style={{ fontSize: "1.5rem" }} />{" "}
                  <h4 className="nav-link  mb-0"> CONTATTI</h4>
                </div>
              </Nav.Link>
            </Nav>
            <Form className="d-flex justify-content-center">
              <Row>
                <Col>
                  {username ? (
                    <>
                      <div className="nav-link d-flex align-items-center">
                        <Nav.Link href="/cart">
                          <div className="d-flex align-items-center position-relative">
                            <Cart3 className="nav-link me-4" style={{ fontSize: "1.7rem" }} />
                            {cartItemCount > 0 && (
                              <Badge
                                pill
                                bg="danger"
                                className="cart-badge position-absolute top-0 end-0 translate-middle"
                              >
                                {cartItemCount}
                              </Badge>
                            )}
                          </div>
                        </Nav.Link>
                        <PersonCircle className="me-2 text-white" style={{ fontSize: "1.5rem" }} />
                        <NavDropdown title={username.username} id="basic-nav-dropdown">
                          <NavDropdown.Item as={Link} to="/preferiti">
                            Preferiti
                          </NavDropdown.Item>
                          <NavDropdown.Divider />
                          <Link to="/login" onClick={handleLogout}>
                            <Button variant="transparent" className="text-black align-self-center pt-0">
                              Logout
                            </Button>
                          </Link>
                        </NavDropdown>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="d-flex">
                        <Nav.Link className="pe-lg-4 text-white" href="/login">
                          ACCEDI
                        </Nav.Link>
                        <Nav.Link className="pe-lg-4 text-white" href="/register">
                          REGISTRATI
                        </Nav.Link>
                      </div>
                    </>
                  )}
                </Col>
              </Row>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ marginTop: "110px" }}>
        <Container>
          <Link to="/explore">
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
                        Nome Hotel
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
                        Località
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={editedOffer.city}
                        onChange={(e) => setEditedOffer({ ...editedOffer, city: e.target.value })}
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
                        Tipo struttura
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={editedOffer.type}
                        onChange={(e) => setEditedOffer({ ...editedOffer, type: e.target.value })}
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
                        value={editedOffer.price_per_adult}
                        onChange={(e) => {
                          const price_per_adult = parseFloat(e.target.value);
                          setEditedOffer({ ...editedOffer, price_per_adult });
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
                        value={editedOffer.price_per_child}
                        onChange={(e) => {
                          const price_per_child = parseFloat(e.target.value);
                          setEditedOffer({ ...editedOffer, price_per_child });
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
                        Immagine 2 (URL)
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
                        Immagine 3 (URL)
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={editedOffer.images[2]}
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
                        value={editedOffer.images[3]}
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
                        Stanze
                      </Form.Label>
                      <Form.Control
                        type="number"
                        value={editedOffer.bedrooms}
                        onChange={(e) => setEditedOffer({ ...editedOffer, bedrooms: parseFloat(e.target.value) })}
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
                        Bagni
                      </Form.Label>
                      <Form.Control
                        type="number"
                        value={editedOffer.bathrooms}
                        onChange={(e) => setEditedOffer({ ...editedOffer, bathrooms: parseFloat(e.target.value) })}
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
                        Servizi
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={editedOffer.amenities.join(", ")}
                        onChange={(e) =>
                          setEditedOffer({
                            ...editedOffer,
                            amenities: e.target.value.split(", "),
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
                        Host
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={editedOffer.host}
                        onChange={(e) => setEditedOffer({ ...editedOffer, host: e.target.value })}
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
          <Row>
            <div className="d-flex align-items-center mb-3 mt-4">
              <div className="d-flex align-items-center">
                <FaMapMarkerAlt className="me-2" style={{ color: "#203040", fontSize: "2.3rem" }} />
                <h4 style={{ fontSize: "2.5rem", fontFamily: "Impact, san-serif", color: "#203040" }} className="mb-0">
                  {offer.name}
                </h4>
              </div>
              <div className="ms-auto">
                {isAdmin && (
                  <Button className="button-search" onClick={handleEditOffer}>
                    Modifica
                  </Button>
                )}
              </div>
            </div>
            <Col xs={12} md={12} lg={7} className="mt-4">
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
                className="mySwiper"
              >
                {offer.images.map((image, index) => (
                  <SwiperSlide key={index} style={{ maxHeight: "410px" }}>
                    <img
                      src={image}
                      alt={offer.name}
                      className="rounded-3"
                      style={{ maxHeight: "380px", width: "100%" }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="me-auto">
                <Modal show={showModal} size="lg" onHide={handleCloseModal}>
                  <Modal.Header closeButton style={{ backgroundColor: "#203040" }}>
                    <Modal.Title style={{ color: "white", fontFamily: "Impact, sans-serif", fontSize: "2rem" }}>
                      Recensioni
                    </Modal.Title>
                  </Modal.Header>
                  <Scrollbar style={{ width: "100%", height: 360, color: "#203040" }}>
                    <Modal.Body>
                      {offer.reviews.map((review, index) => (
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
                <div className="d-flex align-items-center mt-3 mb-3">
                  <div>
                    <h4 className="mb-0">
                      {offer.city} - {offer.region}
                    </h4>
                  </div>
                  <div className="ms-auto">
                    <Button className="py-0" variant="trasparent" onClick={() => setShowModal(true)}>
                      {offer.reviews.length > 0 && (
                        <span className="d-flex" style={{ marginLeft: "5px" }}>
                          <div>
                            <StarFill className="pb-1" style={{ color: "rgb(197, 235, 27)", fontSize: "1.5rem" }} />{" "}
                          </div>
                          <div className="text-black">
                            <strong>
                              {(
                                offer.reviews.reduce((total, review) => total + review.rating, 0) / offer.reviews.length
                              ).toFixed(2)}
                            </strong>
                            {"  "} {offer.reviews.length} recensioni
                          </div>
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
                <p style={{ fontFamily: "Montserrat, sans-serif" }}>{offer.description}</p>
              </div>
              <Card style={{ fontFamily: "Montserrat, sans-serif" }} className="info-hotel mt-5 mb-5 p-3">
                <Card.Body>
                  <Row>
                    <Col md={12}>
                      <Row>
                        <Col xs={6} lg={4} className="d-flex align-items-center">
                          <div>
                            <FaUser className="me-1" />
                          </div>
                          <div>
                            <p className="mb-0">
                              <strong>Host:</strong>
                            </p>
                          </div>
                        </Col>
                        <Col xs={6} lg={8}>
                          {offer.host}
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col xs={6} lg={4} className="d-flex align-items-center">
                          <div>
                            <FaHotel className="me-1" />
                          </div>
                          <div>
                            <p className="mb-0">
                              <strong>Tipo struttura:</strong>
                            </p>
                          </div>
                        </Col>
                        <Col xs={6} lg={8}>
                          {offer.type}
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col xs={6} lg={4} className="d-flex align-items-center">
                          <div>
                            <FaBed className="me-1" />
                          </div>
                          <div>
                            <p className="mb-0">
                              <strong>Stanze:</strong>
                            </p>
                          </div>
                        </Col>
                        <Col xs={6} lg={8}>
                          {offer.bedrooms}
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col xs={6} lg={4} className="d-flex align-items-center">
                          <div>
                            <FaBath className="me-1" />
                          </div>
                          <div>
                            <p className="mb-0">
                              <strong>Bagni:</strong>
                            </p>
                          </div>
                        </Col>
                        <Col xs={6} lg={8}>
                          {offer.bathrooms}
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col xs={6} lg={4} className="d-flex align-items-center">
                          <div>
                            <FaCog className="me-1" />
                          </div>
                          <div>
                            <p className="mb-0">
                              <strong>Servizi:</strong>
                            </p>
                          </div>
                        </Col>
                        <Col xs={6} lg={8}>
                          {offer.amenities.join(", ")}
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={12} lg={4} className="ms-auto">
              <div className="position-sticky" style={{ top: "110px", marginBottom: "60px" }}>
                <ReservationFormTwo />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <FooterTravelStay />
    </>
  );
};

export default OfferStayDetail;
