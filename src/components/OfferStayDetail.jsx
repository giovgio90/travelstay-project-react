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
  PinMapFill,
  StarFill,
} from "react-bootstrap-icons";
import { Scrollbar } from "react-scrollbars-custom";

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
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartItemCount = cartItems.length;

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
          <Link to="/explore">
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
            <Col md={8} className="mt-4">
              <div className="d-flex align-items-center mb-3">
                <div className="d-flex align-items-center">
                  <PinMapFill className="me-2" style={{ fontSize: "2.5rem" }} />
                  <h4
                    style={{ fontSize: "2.5rem", fontFamily: "Impact, san-serif", color: "#203040" }}
                    className="mb-0"
                  >
                    {offer.name}
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
                <Card.Img src={offer.images[0]} alt={offer.name} />
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
                <div className="me-auto">
                  <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Recensioni</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {offer.reviews.map((review, index) => (
                        <div key={index}>
                          <h5>{review.user}</h5>
                          <p>Valutazione: {review.rating}</p>
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
                  <h4>{offer.name}</h4>
                </div>
                <Card.Body>
                  <Card.Title>{offer.name}</Card.Title>
                  <Card.Text>Località: {offer.city}</Card.Text>
                  <Card.Text>Host: {offer.host}</Card.Text>
                  <Card.Text>Tipo struttura: {offer.type}</Card.Text>
                  <Card.Text>Prezzo per Adulti: {offer.price_per_adult}€</Card.Text>
                  <Card.Text>Prezzo per Bambini: {offer.price_per_child}€</Card.Text>
                  <Card.Text>Stanze: {offer.bedrooms}</Card.Text>
                  <Card.Text>Bagni: {offer.bathrooms}</Card.Text>
                  <Card.Text>Servizi: {offer.amenities.join(", ")}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="ms-auto">
              <div className="position-sticky" style={{ top: "110px" }}>
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
