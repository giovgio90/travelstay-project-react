import { useDispatch, useSelector } from "react-redux";
import { fetchTravelOffers, setUser, updateTravelOffer } from "../redux/actions";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import FooterTravelStay from "./FooterTravelStay";
import StayOffers from "./StayOffers";

const OffersPage = ({ travel }) => {
  const dispatch = useDispatch();
  const travelData = useSelector((state) => state.travel.data);
  const [visibleOffers, setVisibleOffers] = useState(8);
  const [selectedItem, setSelectedItem] = useState("Elemento 3");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [budget, setBudget] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedOffer, setEditedOffer] = useState(null);

  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  const username = useSelector((state) => state.user.username);
  const handleLogout = () => {
    dispatch(setUser(null));
  };

  const cleanedEmail = username && username.email ? username.email.trim().toLowerCase() : "";
  const isAdmin = cleanedEmail === "giovanni@gmail.com";

  useEffect(() => {
    dispatch(fetchTravelOffers());
  }, [dispatch]);

  const handleUpdateTravelOffer = () => {
    if (isAdmin && editedOffer) {
      dispatch(updateTravelOffer(editedOffer));
      setIsModalOpen(false);
    }
  };

  const handleShowMoreClick = () => {
    setVisibleOffers((prevVisibleOffers) => prevVisibleOffers + 4);
  };

  const handleApplyFilter = () => {
    // Memorizza il budget selezionato nello stato
    setSelectedBudget(budget);
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
                      <Link to="/" onClick={handleLogout}>
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
          <div className="d-flex mb-3 align-items-center">
            <div className="ms-auto">
              <DropdownButton
                variant="transparent"
                className="dropdown-basic-button"
                title={isDropdownOpen ? "Filtra" : "Filtra" || selectedItem}
                onSelect={handleSelect}
                onToggle={(isOpen) => setIsDropdownOpen(isOpen)}
              >
                <Dropdown.Item eventKey="Elemento 1">Solo viaggi con soggiorno</Dropdown.Item>
                <Dropdown.Item eventKey="Elemento 2">Solo soggiorno</Dropdown.Item>
                <Dropdown.Item eventKey="Elemento 3">Visualizza entrambe</Dropdown.Item>
                <InputGroup className="mt-3">
                  <FormControl
                    type="number"
                    placeholder="Budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                  <Button variant="outline-secondary" onClick={handleApplyFilter}>
                    Applica
                  </Button>
                </InputGroup>
              </DropdownButton>
            </div>
          </div>
          <Row>
            {(selectedItem === "Elemento 1" || selectedItem === "Elemento 3") && (
              <div>
                <h4 className="mb-0" style={{ paddingBottom: "5px" }}>
                  Viaggi con soggiorno:
                </h4>
              </div>
            )}
            {(selectedItem === "Elemento 1" || selectedItem === "Elemento 3") &&
              (selectedBudget
                ? travelData.filter((offer) => offer.price_per_adult <= selectedBudget).slice(0, visibleOffers)
                : travelData.slice(0, visibleOffers)
              ).map((offer, id) => (
                <Col key={id} xs={12} md={6} lg={3}>
                  <Card className="offer-card mb-4 border-0">
                    <Card.Img
                      variant="top"
                      src={offer.image}
                      className="border-0 image-hover-scale"
                      style={{ height: "230px", objectFit: "cover" }}
                    />
                    <Card.Body className="pb-2">
                      <div className="d-flex">
                        <Card.Title style={{ fontSize: "1.2rem" }}>{offer.destination}</Card.Title>
                        {isAdmin && (
                          <Button
                            variant="primary"
                            className="ms-auto"
                            onClick={() => {
                              setEditedOffer(offer);
                              setIsModalOpen(true);
                            }}
                          >
                            Modifica
                          </Button>
                        )}
                      </div>
                      <Card.Text>
                        <strong style={{ fontWeight: "500" }}>Durata:</strong>
                        <span
                          className="text-white px-2 mx-2 rounded-2"
                          style={{ fontWeight: "500", fontSize: "0.9rem", background: "#203040" }}
                        >
                          {offer.duration.toUpperCase()}
                        </span>
                      </Card.Text>
                      <Card.Text className="pt-auto mb-0">
                        <strong style={{ fontWeight: "500" }}>Prezzo:</strong>
                        <span
                          className="text-white px-2 mx-2 rounded-2"
                          style={{ fontWeight: "500", fontSize: "0.9rem", background: "red" }}
                        >
                          {offer.price_per_adult}€
                        </span>
                        <span className="ps-0">adulti</span>
                      </Card.Text>
                      <Card.Text>
                        <strong style={{ fontWeight: "500" }}>Prezzo:</strong>
                        <span
                          className="text-white px-2 mx-2 rounded-2"
                          style={{ fontWeight: "500", fontSize: "0.9rem", background: "red" }}
                        >
                          {offer.price_per_child}€
                        </span>
                        <span className="ps-0">bambini</span>
                      </Card.Text>
                    </Card.Body>
                    <Link to={`/explore/${offer.id}`} key={id} className="text-center">
                      <Button
                        variant="trasparent"
                        className="mx-auto pt-0 pb-2 w-50"
                        style={{
                          fontWeight: "500",
                        }}
                      >
                        Scopri di più
                      </Button>
                    </Link>
                  </Card>
                </Col>
              ))}
            {(selectedItem === "Elemento 1" || selectedItem === "Elemento 3") &&
              selectedItem === "Elemento 3" &&
              selectedBudget &&
              !travelData.some((offer) => offer.price_per_adult <= selectedBudget) && <p>Nessun risultato trovato</p>}
          </Row>

          {(selectedItem === "Elemento 1" || selectedItem === "Elemento 3") && visibleOffers < travelData.length && (
            <div className="text-center mt-1">
              <Button
                variant="transparent"
                className="mx-auto pt-0 pb-2"
                style={{
                  fontWeight: "500",
                }}
                onClick={handleShowMoreClick}
              >
                Visualizza Altro
              </Button>
            </div>
          )}
        </Container>
      </div>
      {(selectedItem === "Elemento 2" || selectedItem === "Elemento 3") && (
        <div className={`margin-top-${selectedItem === "Elemento 2" ? "solo-soggiorno" : "viaggi-con-soggiorno"}`}>
          <StayOffers selectedBudget={selectedBudget} setSelectedBudget={setSelectedBudget} />
        </div>
      )}
      {isAdmin && editedOffer && (
        <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Modifica Offerta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Destinazione</Form.Label>
                <Form.Control
                  type="text"
                  value={editedOffer.destination}
                  onChange={(e) => setEditedOffer({ ...editedOffer, destination: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Durata</Form.Label>
                <Form.Control
                  type="text"
                  value={editedOffer.duration}
                  onChange={(e) => setEditedOffer({ ...editedOffer, duration: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Prezzo per Adulti</Form.Label>
                <Form.Control
                  type="text"
                  value={editedOffer.price_per_adult}
                  onChange={(e) => setEditedOffer({ ...editedOffer, price_per_adult: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Prezzo per Bambini</Form.Label>
                <Form.Control
                  type="text"
                  value={editedOffer.price_per_child}
                  onChange={(e) => setEditedOffer({ ...editedOffer, price_per_child: e.target.value })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Chiudi
            </Button>
            <Button variant="primary" onClick={handleUpdateTravelOffer}>
              Salva
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <FooterTravelStay />
    </>
  );
};

export default OffersPage;
