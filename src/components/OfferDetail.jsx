import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-creative";
import "swiper/css/scrollbar";
import { FaBath, FaBed, FaBuilding, FaCog, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../assets/Logo.png";
import { Badge, Button, Card, Col, Container, Form, Modal, Nav, NavDropdown, Navbar, Row } from "react-bootstrap";
import FooterTravelStay from "./FooterTravelStay";
import {
  AirplaneFill,
  ArrowLeftCircleFill,
  Calendar,
  Calendar2CheckFill,
  Cart3,
  ClockFill,
  EnvelopeFill,
  HouseFill,
  PersonCircle,
  PersonFill,
  StarFill,
} from "react-bootstrap-icons";
import ReservationForm from "./ReservationForm";
import { useState } from "react";
import { setUser, updateTravelOffer } from "../redux/actions";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, EffectCreative, Navigation, Pagination } from "swiper/modules";
import { Scrollbar } from "react-scrollbars-custom";
import Rating from "react-rating";

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

  const isAdmin = username && username.email === "giovanni@gmail.com";

  const offer = travelData.find((offer) => offer.id.toString() === id);
  console.log(offer);

  const [showModal, setShowModal] = useState(false);
  const [newReview, setNewReview] = useState([{ user: username.username, rating: "", comment: "" }]);

  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleShowFullDescription = () => {
    setShowFullDescription(true);
  };

  const handleShowLessDescription = () => {
    setShowFullDescription(false);
  };

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
                <FaMapMarkerAlt className="me-2" style={{ color: "#203040", fontSize: "2.3rem" }} />
                {offer.destination} - {offer.region}
              </h4>
            </div>
            <div className="ms-auto mt-4">
              {isAdmin && (
                <Button className="button-search" onClick={handleEditOffer}>
                  Modifica
                </Button>
              )}
            </div>
          </div>
          <Row>
            <Col md={12} className="my-2 d-lg-none">
              {" "}
              <Swiper
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
                style={{ width: "100%" }}
              >
                <SwiperSlide className="my-2 rounded-3">
                  <img src={offer.image_two} alt={offer.destination} className="rounded-3" />
                </SwiperSlide>
                <SwiperSlide className="my-2 rounded-3">
                  <img src={offer.image_three} alt={offer.destination} className="rounded-3" />
                </SwiperSlide>
                <SwiperSlide className="my-2 rounded-3">
                  <img src={offer.image_four} alt={offer.destination} className="rounded-2" />
                </SwiperSlide>
              </Swiper>
            </Col>
            <Col xs={12} className="my-2 d-none d-lg-block">
              {" "}
              <Swiper
                effect={"coverflow"}
                grabCursor={true}
                slidesPerView={3}
                spaceBetween={12}
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
                <SwiperSlide className="my-2 rounded-3">
                  <img src={offer.image_two} alt={offer.destination} className="rounded-3" />
                </SwiperSlide>
                <SwiperSlide className="my-2 rounded-3">
                  <img src={offer.image_three} alt={offer.destination} className="rounded-3" />
                </SwiperSlide>
                <SwiperSlide className="my-2 rounded-3">
                  <img src={offer.image_four} alt={offer.destination} className="rounded-2" />
                </SwiperSlide>
                <SwiperSlide className="my-2 rounded-3">
                  <img src={offer.image_two} alt={offer.destination} className="rounded-2" />
                </SwiperSlide>
                <SwiperSlide className="my-2 rounded-3">
                  <img src={offer.image_three} alt={offer.destination} className="rounded-2" />
                </SwiperSlide>
                <SwiperSlide className="my-2 rounded-3">
                  <img src={offer.image_four} alt={offer.destination} className="rounded-2" />
                </SwiperSlide>
              </Swiper>
            </Col>
          </Row>
          <Row className="position-relative">
            <div>
              {isAdmin && editedOffer && (
                <Modal show={isModalOpen} size="lg" onHide={() => setIsModalOpen(false)}>
                  <Modal.Header style={{ backgroundColor: "#203040" }} closeButton>
                    <Modal.Title style={{ fontFamily: "Impact, san-serif", color: "white" }}>
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
            <Col xs={12} md={12} lg={7}>
              <h4 style={{ fontFamily: "Montserrat, sans-serif", fontWeight: "600" }}>Dove alloggerai</h4>

              <Row>
                <Col xs={12} md={12} className="d-flex mb-2">
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
                    style={{ width: "100%" }}
                  >
                    {offer.hotel.images.map((image, index) => (
                      <SwiperSlide key={index} style={{ display: "flex", justifyContent: "center" }}>
                        <img
                          src={image}
                          alt="Immagine hotel"
                          className="rounded-3"
                          style={{ maxHeight: "380px", width: "100%" }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Col>
              </Row>
              <div className="d-flex align-items-center mb-3">
                <FaBuilding className="me-1" />{" "}
                <p
                  className="mb-0"
                  style={{ fontFamily: "Montserrat, sans-serif", fontSize: "1.2rem", fontWeight: "600" }}
                >
                  {offer.hotel.name}
                </p>
              </div>

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
                          <Form.Label className="mt-3">
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
                <p
                  className="mb-0"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: showFullDescription ? "inherit" : 4,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {offer.description}
                </p>
                {offer.description.length > 4 && (
                  <div className="text-center">
                    {showFullDescription ? (
                      <Button
                        className="bg-white border-white text-black"
                        style={{ fontWeight: "600" }}
                        onClick={handleShowLessDescription}
                      >
                        Mostra meno
                      </Button>
                    ) : (
                      <Button
                        className="bg-white border-white text-black"
                        style={{ fontWeight: "600" }}
                        onClick={handleShowFullDescription}
                      >
                        Mostra altro
                      </Button>
                    )}
                  </div>
                )}
              </div>

              <Row className="mt-3 mb-5">
                <Col md={12}>
                  <div>
                    <div
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                      className="info-hotel border border-1 mb-2 p-3"
                    >
                      <Row>
                        <Col xs={6} md={3} className="d-flex align-items-center">
                          <div>
                            <ClockFill className="me-1" />
                          </div>
                          <div>
                            <p className="mb-0">
                              <strong>Durata:</strong>
                            </p>
                          </div>
                        </Col>
                        <Col xs={6} md={6}>
                          {offer.duration}
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col xs={6} md={3} className="d-flex align-items-center">
                          <div>
                            <Calendar2CheckFill className="me-1" />
                          </div>
                          <div>
                            <p className="mb-0">
                              <strong>Data:</strong>
                            </p>
                          </div>
                        </Col>
                        <Col xs={6} md={6}>
                          {offer.date.split("-").reverse().join("/")}
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col xs={6} md={3} className="d-flex align-items-center ">
                          <div>
                            <FaUser className="me-1" />
                          </div>
                          <div>
                            <p className="mb-0">
                              <strong>Host:</strong>
                            </p>
                          </div>
                        </Col>
                        <Col xs={6} md={6}>
                          {offer.host}
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col xs={6} md={3} className="d-flex align-items-center ">
                          <div>
                            <FaBed className="me-1" />
                          </div>
                          <div>
                            <p className="mb-0">
                              <strong>Stanze:</strong>
                            </p>
                          </div>
                        </Col>
                        <Col xs={6} md={6}>
                          {offer.hotel.bedrooms}
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col xs={6} md={3} className="d-flex align-items-center">
                          <div>
                            <FaBath className="me-1" />
                          </div>
                          <div>
                            <p className="mb-0">
                              <strong>Bagni:</strong>
                            </p>
                          </div>
                        </Col>
                        <Col xs={6} md={6}>
                          {offer.hotel.bathrooms}
                        </Col>
                      </Row>
                      <hr />

                      <Row>
                        <Col xs={6} md={3} className="d-flex align-items-center">
                          <div>
                            <FaCog className="me-1" />
                          </div>
                          <div>
                            <p className="mb-0">
                              <strong>Servizi:</strong>
                            </p>
                          </div>
                        </Col>
                        <Col xs={6} md={9}>
                          {offer.hotel.amenities.join(", ")}
                        </Col>
                        <div className="text-end">
                          <Button className=" mt-2" variant="trasparent" onClick={() => setShowModal(true)}>
                            {offer.reviews.length > 0 && (
                              <span className="d-flex" style={{ marginLeft: "5px" }}>
                                <div>
                                  <StarFill
                                    className="pb-1"
                                    style={{ color: "rgb(197, 235, 27)", fontSize: "1.5rem" }}
                                  />{" "}
                                </div>
                                <div className="text-black">
                                  <strong>
                                    {(
                                      offer.reviews.reduce((total, review) => total + review.rating, 0) /
                                      offer.reviews.length
                                    ).toFixed(2)}
                                  </strong>
                                  {"  "} {offer.reviews.length} recensioni
                                </div>
                              </span>
                            )}
                          </Button>
                        </div>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={12} lg={4} className="ms-auto mb-5">
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
