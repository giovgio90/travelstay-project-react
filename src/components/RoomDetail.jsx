import { useState } from "react";
import Logo from "../assets/Logo.png";
import { Badge, Button, Card, Col, Container, Form, Modal, Nav, NavDropdown, Navbar, Row } from "react-bootstrap";
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
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { addReviewTwo, setUser, updateOffer } from "../redux/actions";
import { Scrollbar } from "react-scrollbars-custom";
import ReservationFormThree from "./ReservationFormThree";
import FooterTravelStay from "./FooterTravelStay";
import Rating from "react-rating";

const RoomDetail = () => {
  const { id } = useParams();
  const room = useSelector((state) => state.rooms.find((r) => r.id === parseInt(id)));
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const username = useSelector((state) => state.user.username);

  const handleLogout = () => {
    dispatch(setUser(null));
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedOffer, setEditedOffer] = useState(null);

  const handleEditOffer = () => {
    setEditedOffer(room);
    setIsModalOpen(true);
  };

  const handleUpdateOffer = () => {
    if (isAdmin && editedOffer) {
      dispatch(updateOffer(editedOffer));
      setIsModalOpen(false);
    }
  };

  const handleAddReview = () => {
    if (newReview.rating > 0 && newReview.comment.trim() !== "") {
      dispatch(addReviewTwo(room.id, username.username, newReview.rating, newReview.comment));

      setNewReview({ rating: 0, comment: "" });
    }
  };

  const [newReview, setNewReview] = useState([{ user: username.username, rating: "", comment: "" }]);
  const cartItemsTravel = useSelector((state) => state.cart.cartItemsTravel);
  const cartItemsStay = useSelector((state) => state.cart.cartItemsStay);
  const cartItemsRoom = useSelector((state) => state.cart.cartItemsRoom);
  const cartItemCount = cartItemsTravel.length + cartItemsStay.length + cartItemsRoom.length;

  const isAdmin = username && username.email === "giovanni@gmail.com";

  if (!room) {
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
        <Container>
          <Link to="/">
            <ArrowLeftCircleFill className="mt-2" style={{ fontSize: "1.7rem", color: "#203040" }} />
          </Link>
        </Container>
        <Container>
          {isAdmin && editedOffer && (
            <Modal show={isModalOpen} size="lg" onHide={() => setIsModalOpen(false)}>
              <Modal.Header closeButton>
                <Modal.Title style={{ fontFamily: "Impact, san-serif", color: "#203040" }}>
                  Modifica offerta
                </Modal.Title>
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
                        Nome Camera
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
                        Prezzo adulti
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={editedOffer.price_per_adult === null ? "" : editedOffer.price_per_adult}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          const numericValue = inputValue.trim() === "" ? null : parseFloat(inputValue);
                          setEditedOffer({ ...editedOffer, price_per_adult: numericValue });
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
            <Col md={8} className="mt-4">
              <div className="d-flex align-items-center mb-3">
                <div className="d-flex align-items-center">
                  <PinMapFill className="me-2" style={{ fontSize: "2.5rem" }} />
                  <h4
                    style={{ fontSize: "2.5rem", fontFamily: "Impact, sans-serif", color: "#203040" }}
                    className="mb-0"
                  >
                    {room.name}
                  </h4>
                </div>
                <div className="mx-5">
                  {isAdmin && (
                    <Button className="button-search" onClick={handleEditOffer}>
                      Modifica
                    </Button>
                  )}
                </div>
              </div>
              <Card>
                <Card.Img src={room.images[0]} alt={room.name} />
                <Button className="py-0" variant="transparent" onClick={openModal}>
                  {room.reviews.length > 0 && (
                    <span className="d-flex" style={{ marginLeft: "5px" }}>
                      <div>
                        <StarFill className="pb-1" style={{ color: "yellow", fontSize: "1.2rem" }} />
                      </div>
                      <div className="text-black">
                        <strong>
                          {(
                            room.reviews.reduce((total, review) => total + review.rating, 0) / room.reviews.length
                          ).toFixed(2)}
                        </strong>
                        {"  "} {room.reviews.length} recensioni
                      </div>
                    </span>
                  )}
                </Button>
                <Modal show={showModal} size="lg" onHide={handleCloseModal}>
                  <Modal.Header closeButton style={{ backgroundColor: "#203040" }}>
                    <Modal.Title style={{ color: "white", fontFamily: "Impact, sans-serif", fontSize: "2rem" }}>
                      Recensioni
                    </Modal.Title>
                  </Modal.Header>
                  <Scrollbar style={{ width: "100%", height: 360, color: "#203040" }}>
                    <Modal.Body>
                      {room.reviews.map((review, index) => (
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

                <Card.Body>
                  <Card.Title>{room.name}</Card.Title>
                  <Card.Text>Descrizione: {room.description}</Card.Text>
                  <Card.Text>Località: {room.city}</Card.Text>
                  <Card.Text>Host: {room.host}</Card.Text>

                  <Card.Text>Prezzo per Adulti: {room.price_per_adult}€</Card.Text>
                  <Card.Text>Prezzo per Bambini: {room.price_per_child}€</Card.Text>
                  <Card.Text>Stanze: {room.bedrooms}</Card.Text>
                  <Card.Text>Bagni: {room.bathrooms}</Card.Text>
                  <Card.Text>Servizi: {room.amenities.join(", ")}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="ms-auto">
              <div className="position-sticky" style={{ top: "110px" }}>
                <ReservationFormThree />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <FooterTravelStay />
    </>
  );
};

export default RoomDetail;
