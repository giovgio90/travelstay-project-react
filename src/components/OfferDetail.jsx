import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../assets/Logo.png";
import { Badge, Button, Card, Col, Container, Form, Modal, Nav, NavDropdown, Navbar, Row } from "react-bootstrap";
import FooterTravelStay from "./FooterTravelStay";
import {
  AirplaneFill,
  ArrowLeftCircleFill,
  Cart3,
  EnvelopeFill,
  HouseFill,
  PersonCircle,
  PersonFill,
  PinMapFill,
  StarFill,
} from "react-bootstrap-icons";
import ReservationForm from "./ReservationForm";
import { useState } from "react";
import { setUser, updateTravelOffer } from "../redux/actions";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Scrollbar } from "react-scrollbars-custom";

const OfferDetail = () => {
  const { id } = useParams();
  const travelData = useSelector((state) => state.travel.data);
  const username = useSelector((state) => state.user.username);
  const handleLogout = () => {
    dispatch(setUser(null));
  };

  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedOffer, setEditedOffer] = useState(null);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartItemCount = cartItems.length;

  const isAdmin = username && username.email === "giovanni@gmail.com";

  const offer = travelData.find((offer) => offer.id.toString() === id);
  console.log(offer);

  const [showModal, setShowModal] = useState(false);
  const [newReview, setNewReview] = useState([{ user: username.username, rating: "", comment: "" }]);

  const handleAddReview = async (e) => {
    e.preventDefault();

    if (newReview.rating && newReview.comment) {
      const reviewToAdd = {
        user: username.username,
        rating: parseFloat(newReview.rating),
        comment: newReview.comment,
      };

      try {
        const response = await fetch(`http://localhost:3030/travel/${offer.id}`, {
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

          dispatch(updateTravelOffer(updatedOffer));

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

  if (!offer) {
    return <div>Offerta non trovata.</div>;
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEditOffer = () => {
    setEditedOffer(offer);
    setIsModalOpen(true);
  };

  const handleUpdateOffer = () => {
    if (isAdmin && editedOffer) {
      dispatch(updateTravelOffer(editedOffer));
      setIsModalOpen(false);
    }
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
                  <HouseFill style={{ fontSize: "1.5rem" }} /> <h4 className="nav-link  mb-0">HOME</h4>
                </div>
              </Nav.Link>
              <Nav.Link className=" pe-lg-5 d-flex" href="/about-us">
                <div className="d-flex align-items-center">
                  <PersonFill style={{ fontSize: "1.5rem" }} /> <h4 className="nav-link  mb-0"> CHI SIAMO</h4>
                </div>
              </Nav.Link>

              <Nav.Link className="pe-lg-5 " href="/explore">
                <div className="nav-link d-flex align-items-center">
                  <AirplaneFill style={{ fontSize: "1.5rem" }} /> <h4 className="nav-link  mb-0">OFFERTE</h4>
                </div>
              </Nav.Link>
              <Nav.Link className=" pe-lg-5 " href="/contact">
                <div className=" nav-link d-flex align-items-center">
                  <EnvelopeFill style={{ fontSize: "1.5rem" }} /> <h4 className="nav-link  mb-0"> CONTATTI</h4>
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
                            <Cart3 className="nav-link me-4 text-white" style={{ fontSize: "1.7rem" }} />
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
                        <PersonCircle className="me-2" style={{ fontSize: "1.5rem" }} />
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
        <Container className="mt-3">
          <Link to="/explore">
            <ArrowLeftCircleFill style={{ fontSize: "1.7rem", color: "#203040" }} />
          </Link>
        </Container>
        <Container>
          <div className="d-flex align-items-center">
            <div>
              <h4
                className="d-flex align-items-center mt-4 mb-0"
                style={{ fontSize: "2.5rem", fontFamily: "Impact, san-serif", color: "#203040" }}
              >
                <PinMapFill className="me-2" style={{ fontSize: "2.5rem" }} />
                {offer.destination}
              </h4>
            </div>
            <div className="ms-5 mt-4">
              {isAdmin && (
                <Button className="button-search" onClick={handleEditOffer}>
                  Modifica
                </Button>
              )}
            </div>
          </div>
          <Row>
            <Col md={12} className="my-2">
              <Swiper
                effect={"coverflow"}
                grabCursor={true}
                slidesPerView={3}
                spaceBetween={10}
                loop={true}
                centeredSlides={true}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mySwiper swiper my-3"
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
              >
                <SwiperSlide className="my-2">
                  <img src={offer.image_two} alt={offer.destination} />
                </SwiperSlide>
                <SwiperSlide className="my-2">
                  <img src={offer.image_three} alt={offer.destination} />
                </SwiperSlide>
                <SwiperSlide className="my-2">
                  <img src={offer.image_four} alt={offer.destination} />
                </SwiperSlide>
                <SwiperSlide className="my-2">
                  <img src={offer.image_two} alt={offer.destination} />
                </SwiperSlide>
                <SwiperSlide className="my-2">
                  <img src={offer.image_three} alt={offer.destination} />
                </SwiperSlide>
                <SwiperSlide className="my-2">
                  <img src={offer.image_four} alt={offer.destination} />
                </SwiperSlide>
              </Swiper>
            </Col>
          </Row>
          <Row className="position-relative">
            <div>
              {isAdmin && editedOffer && (
                <Modal show={isModalOpen} size="lg" onHide={() => setIsModalOpen(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title style={{ fontFamily: "Impact, san-serif", color: "#203040" }}>
                      Modifica offerta
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Scrollbar style={{ width: "100%", height: 360, color: "#203040" }}>
                      <Form style={{ width: "99%" }}>
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
                            Destinazione
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
                            Descrizione
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
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
                            Prezzo adulti
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={editedOffer.price}
                            onChange={(e) => {
                              const price = parseFloat(e.target.value);
                              setEditedOffer({ ...editedOffer, price });
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
                            value={editedOffer.image_one}
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
                            value={editedOffer.image_two}
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
                            Immagine 3 (URL)
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={editedOffer.image_three}
                            onChange={(e) => setEditedOffer({ ...editedOffer, image_three: e.target.value })}
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
                            value={editedOffer.image_four}
                            onChange={(e) => setEditedOffer({ ...editedOffer, image_four: e.target.value })}
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
                            Hotel
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={editedOffer.hotel.name}
                            onChange={(e) =>
                              setEditedOffer({ ...editedOffer, hotel: { ...editedOffer.hotel, name: e.target.value } })
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
                            Camere
                          </Form.Label>
                          <Form.Control
                            type="number"
                            value={editedOffer.hotel.bedrooms}
                            onChange={(e) =>
                              setEditedOffer({
                                ...editedOffer,
                                hotel: { ...editedOffer.hotel, bedrooms: parseInt(e.target.value) },
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
                            Bagni
                          </Form.Label>
                          <Form.Control
                            type="number"
                            value={editedOffer.hotel.bathrooms}
                            onChange={(e) =>
                              setEditedOffer({
                                ...editedOffer,
                                hotel: { ...editedOffer.hotel, bathrooms: parseInt(e.target.value) },
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
                            Servizi
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={editedOffer.hotel.amenities.join(", ")}
                            onChange={(e) =>
                              setEditedOffer({
                                ...editedOffer,
                                hotel: { ...editedOffer.hotel, amenities: e.target.value.split(", ") },
                              })
                            }
                          />
                        </Form.Group>
                        <Form.Group>
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
                            onChange={(e) =>
                              setEditedOffer({ ...editedOffer, host: { ...editedOffer.host, name: e.target.value } })
                            }
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
            </div>
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
                    <Card.Img
                      src={offer.hotel.images[3]}
                      alt="Immagine 4"
                      style={{ height: "185px", width: "280px" }}
                    />
                  </Card>
                </Col>
              </Row>
              <div className="d-flex align-items-center mb-3">
                <p className="mb-0" style={{ fontWeight: "500" }}>
                  {offer.hotel.name}
                </p>

                <Button className="py-0" variant="trasparent" onClick={() => setShowModal(true)}>
                  {offer.reviews.length > 0 && (
                    <span className="d-flex" style={{ marginLeft: "5px" }}>
                      <div>
                        <StarFill className="pb-1" style={{ color: "yellow", fontSize: "1.2rem" }} />{" "}
                      </div>
                      <div>
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

              <div className="me-auto">
                <Modal show={showModal} onHide={handleCloseModal}>
                  <Modal.Header closeButton>
                    <Modal.Title>Recensioni</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {offer.reviews.map((review, index) => (
                      <div key={index}>
                        <h5>{review.user}</h5>
                        <p>Rating: {review.rating}</p>
                        <p>{review.comment}</p>
                      </div>
                    ))}
                    <Form onSubmit={handleAddReview}>
                      <Form.Group>
                        <Form.Label>{username.username}</Form.Label>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Valutazione</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Inserisci la tua valutazione"
                          value={newReview.rating}
                          onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Commento</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Inserisci il tuo commento"
                          value={newReview.comment}
                          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        />
                      </Form.Group>
                      <Button variant="primary" type="submit">
                        Aggiungi Recensione
                      </Button>
                    </Form>
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
                        <Col md={6}>{offer.host}</Col>
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
      </div>
      <FooterTravelStay />
    </>
  );
};

export default OfferDetail;
