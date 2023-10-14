import { Button, Card, Col, Container, Modal, Row, Form, Navbar, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Logo from "../assets/Logo.png";
import FooterTravelStay from "./FooterTravelStay";
import ReservationFormTwo from "./ReservationFormTwo";
import { useState } from "react";
import { setUser, updateStayOffer } from "../redux/actions";

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

  return (
    <>
      <Navbar expand="lg" className="navbar-head py-3">
        <Container>
          <Navbar.Brand className="d-flex">
            <div className="me-1">
              <img src={Logo} width="30" height="40" className="d-inline-block" alt="Logo" />
            </div>
            <div className="align-self-center">
              <h4 className="mb-0 text-white">TRAVELSTAY</h4>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="text-sm-center mx-lg-auto">
              <Nav.Link className="pe-lg-5 text-white" href="/">
                HOME
              </Nav.Link>
              <Nav.Link className="pe-lg-5 text-white" href="#about-us">
                CHI SIAMO
              </Nav.Link>
              <Nav.Link className="pe-lg-5 text-white" href="/explore">
                OFFERTE
              </Nav.Link>
              <Nav.Link className="pe-lg-5 text-white" href="#contact">
                CONTATTI
              </Nav.Link>
            </Nav>
            <Form className="d-flex justify-content-center">
              <Row>
                <Col>
                  {username ? (
                    <div>
                      <span className="text-white me-2">
                        {username.gender === "female" ? "Benvenuta," : "Benvenuto,"} {username.username}
                      </span>
                      <Link to="/login" onClick={handleLogout}>
                        <Button variant="trasparent" className="text-white align-self-center pt-0">
                          Logout
                        </Button>
                      </Link>
                    </div>
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
      <div style={{ marginTop: "120px" }}>
        <Container>
          <Link to="/explore">Torna alle offerte</Link>
          {isAdmin && (
            <Button variant="primary" onClick={handleEditOffer}>
              Edit
            </Button>
          )}
          {isAdmin && editedOffer && (
            <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Offer</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Nome Hotel</Form.Label>
                    <Form.Control
                      type="text"
                      value={editedOffer.name}
                      onChange={(e) => setEditedOffer({ ...editedOffer, name: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Località</Form.Label>
                    <Form.Control
                      type="text"
                      value={editedOffer.city}
                      onChange={(e) => setEditedOffer({ ...editedOffer, city: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Tipo struttura</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={editedOffer.type}
                      onChange={(e) => setEditedOffer({ ...editedOffer, type: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Prezzo adulti</Form.Label>
                    <Form.Control
                      type="text"
                      value={editedOffer.pric_per_adult}
                      onChange={(e) => setEditedOffer({ ...editedOffer, price_per_adult: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Prezzo bambini</Form.Label>
                    <Form.Control
                      type="text"
                      value={editedOffer.price_per_child}
                      onChange={(e) => setEditedOffer({ ...editedOffer, price_per_child: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Immagine URL 1</Form.Label>
                    <Form.Control
                      type="text"
                      value={editedOffer.images[0]}
                      onChange={(e) => setEditedOffer({ ...editedOffer, images: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Immagine URL 2</Form.Label>
                    <Form.Control
                      type="text"
                      value={editedOffer.images[1]}
                      onChange={(e) => setEditedOffer({ ...editedOffer, images: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Immagine URL 3</Form.Label>
                    <Form.Control
                      type="text"
                      value={editedOffer.images[2]}
                      onChange={(e) => setEditedOffer({ ...editedOffer, images: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Immagine URL 4</Form.Label>
                    <Form.Control
                      type="text"
                      value={editedOffer.images[3]}
                      onChange={(e) => setEditedOffer({ ...editedOffer, images: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Stanze</Form.Label>
                    <Form.Control
                      type="text"
                      value={editedOffer.bedrooms}
                      onChange={(e) => setEditedOffer({ ...editedOffer, bedrooms: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Bagni</Form.Label>
                    <Form.Control
                      type="number"
                      value={editedOffer.bathrooms}
                      onChange={(e) => setEditedOffer({ ...editedOffer, bathrooms: e.target.value })}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Servizi</Form.Label>
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
                  <Form.Group>
                    <Form.Label>Host Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={editedOffer.host}
                      onChange={(e) => setEditedOffer({ ...editedOffer, host: e.target.value })}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleUpdateOffer}>
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
          )}
          <Row>
            <Col md={8}>
              <Card>
                <Card.Img src={offer.images[0]} alt={offer.name} />
                <Card.Body>
                  <Card.Title>{offer.name}</Card.Title>
                  <Card.Text>Località: {offer.city}</Card.Text>
                  <Card.Text>Host: {offer.host}</Card.Text>
                  <Card.Text>Tipo struttura: {offer.type}</Card.Text>
                  <Card.Text>Prezzo per Adulti: ${offer.price_per_adult}</Card.Text>
                  <Card.Text>Prezzo per Bambini: ${offer.price_per_child}</Card.Text>
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
