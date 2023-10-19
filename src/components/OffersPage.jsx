import { useDispatch, useSelector } from "react-redux";
import { createTravelOffer, deleteTravelOffer, fetchTravelOffers, setUser, updateTravelOffer } from "../redux/actions";
import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  DropdownButton,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Nav,
  NavDropdown,
  Navbar,
  Row,
} from "react-bootstrap";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import FooterTravelStay from "./FooterTravelStay";
import StayOffers from "./StayOffers";
import LoadingCard from "./LoadingCard";

import { AirplaneFill, Cart3, EnvelopeFill, HouseFill, PersonCircle, PersonFill } from "react-bootstrap-icons";
import { Scrollbar } from "react-scrollbars-custom";

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
  const loading = useSelector((state) => state.travel.loading);
  const [showModal, setShowModal] = useState(false);
  const [updateCount, setUpdateCount] = useState(0);
  const [newOfferData, setNewOfferData] = useState({
    destination: "",
    duration: "",
    date: "",
    description: "",
    price: 0,
    price_per_adult: 0,
    price_per_child: 0,
    image: "",
    image_two: "",
    image_three: "",
    image_four: "",
    hotel: {
      name: "",
      type: "",
      bedrooms: 0,
      bathrooms: 0,
      guests: 0,
      amenities: [],
      images: [],
    },
    reviews: [],
    host: "",
  });
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartItemCount = cartItems.length;

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
    setSelectedBudget(budget);
  };

  const handleCreateOffer = () => {
    fetch("http://localhost:3030/travel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOfferData),
    })
      .then((response) => response.json())
      .then((newOffer) => {
        setShowModal(false);

        dispatch(createTravelOffer(newOffer));

        setNewOfferData({});
      })
      .catch((error) => {
        console.error("Errore durante la creazione dell'offerta:", error);
      });
  };

  const handleDeleteOffer = async (offerId) => {
    if (isAdmin && window.confirm("Sei sicuro di voler eliminare questa offerta?")) {
      try {
        const response = await fetch(`http://localhost:3030/travel/${offerId}`, {
          method: "DELETE",
        });

        if (response.status === 204) {
          await dispatch(deleteTravelOffer(offerId));
          setUpdateCount(updateCount + 1);
        } else {
          console.error("Errore durante l'eliminazione dell'offerta");
        }
      } catch (error) {
        console.error("Errore durante l'eliminazione dell'offerta:", error);
      }
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
      <div style={{ marginTop: "120px" }}>
        <Container>
          <div className="d-flex mb-3 align-items-center">
            <div>
              <Modal show={showModal} size="lg" onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                  <Modal.Title style={{ fontFamily: "Impact, san-serif", color: "#203040" }}>
                    Inserisci una nuova offerta
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
                          Destinazione
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={newOfferData.destination || ""}
                          onChange={(e) => setNewOfferData({ ...newOfferData, destination: e.target.value })}
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
                          value={newOfferData.duration || ""}
                          onChange={(e) => setNewOfferData({ ...newOfferData, duration: e.target.value })}
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
                          Data
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={newOfferData.date || ""}
                          onChange={(e) => setNewOfferData({ ...newOfferData, date: e.target.value })}
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
                          value={newOfferData.description || ""}
                          onChange={(e) => setNewOfferData({ ...newOfferData, description: e.target.value })}
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
                          Prezzo per Adulti
                        </Form.Label>
                        <Form.Control
                          type="number"
                          value={newOfferData.price_per_adult || ""}
                          onChange={(e) =>
                            setNewOfferData({ ...newOfferData, price_per_adult: parseFloat(e.target.value) })
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
                          Prezzo per Bambini
                        </Form.Label>
                        <Form.Control
                          type="number"
                          value={newOfferData.price_per_child || ""}
                          onChange={(e) =>
                            setNewOfferData({ ...newOfferData, price_per_child: parseFloat(e.target.value) })
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
                          Immagine (URL)
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={newOfferData.image || ""}
                          onChange={(e) => setNewOfferData({ ...newOfferData, image: e.target.value })}
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
                          Seconda Immagine (URL)
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={newOfferData.image_two || ""}
                          onChange={(e) => setNewOfferData({ ...newOfferData, image_two: e.target.value })}
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
                          Terza Immagine (URL)
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={newOfferData.image_three || ""}
                          onChange={(e) => setNewOfferData({ ...newOfferData, image_three: e.target.value })}
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
                          Quarta Immagine (URL)
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={newOfferData.image_four || ""}
                          onChange={(e) => setNewOfferData({ ...newOfferData, image_four: e.target.value })}
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
                          Nome Hotel
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={newOfferData.hotel ? newOfferData.hotel.name || "" : ""}
                          onChange={(e) =>
                            setNewOfferData({ ...newOfferData, hotel: { ...newOfferData.hotel, name: e.target.value } })
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
                          Tipo Hotel
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={newOfferData.hotel ? newOfferData.hotel.type || "" : ""}
                          onChange={(e) =>
                            setNewOfferData({ ...newOfferData, hotel: { ...newOfferData.hotel, type: e.target.value } })
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
                          Camere da Letto
                        </Form.Label>
                        <Form.Control
                          type="number"
                          value={newOfferData.hotel ? newOfferData.hotel.bedrooms || "" : ""}
                          onChange={(e) =>
                            setNewOfferData({
                              ...newOfferData,
                              hotel: { ...newOfferData.hotel, bedrooms: parseInt(e.target.value) || 0 },
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
                          value={newOfferData.hotel ? newOfferData.hotel.bathrooms || "" : ""}
                          onChange={(e) =>
                            setNewOfferData({
                              ...newOfferData,
                              hotel: { ...newOfferData.hotel, bathrooms: parseInt(e.target.value) || 0 },
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
                          Ospiti
                        </Form.Label>
                        <Form.Control
                          type="number"
                          value={newOfferData.hotel ? newOfferData.hotel.guests || "" : ""}
                          onChange={(e) =>
                            setNewOfferData({
                              ...newOfferData,
                              hotel: { ...newOfferData.hotel, guests: parseInt(e.target.value) || 0 },
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
                          Servizi (separati da virgola)
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={newOfferData.hotel ? newOfferData.hotel.amenities.join(",") || "" : ""}
                          onChange={(e) =>
                            setNewOfferData({
                              ...newOfferData,
                              hotel: { ...newOfferData.hotel, amenities: e.target.value.split(",") },
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
                          Immagini Hotel (URL separati da virgola)
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={newOfferData.hotel ? newOfferData.hotel.images.join(", ") || "" : ""}
                          onChange={(e) =>
                            setNewOfferData({
                              ...newOfferData,
                              hotel: { ...newOfferData.hotel, images: e.target.value.split(",") },
                            })
                          }
                        />
                      </Form.Group>
                    </Form>
                  </Scrollbar>
                </Modal.Body>
                <Modal.Footer>
                  <Button className="button-search" onClick={() => setShowModal(false)}>
                    Annulla
                  </Button>
                  <Button className="button-search" onClick={handleCreateOffer}>
                    Conferma
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
            <div className="ms-auto">
              <DropdownButton
                variant="transparent"
                className="dropdown-basic-button  rounded-2"
                style={{ fontFamily: "Montserrat, sans-serif", border: "3px solid #203040" }}
                title={isDropdownOpen ? "Filtra" : "Filtra" || selectedItem}
                onSelect={handleSelect}
                onToggle={(isOpen) => setIsDropdownOpen(isOpen)}
                drop="left"
              >
                <Form className="px-3">
                  <Form.Check
                    type="checkbox"
                    label="Solo viaggi con soggiorno"
                    checked={selectedItem === "Elemento 1"}
                    onChange={() => handleSelect("Elemento 1")}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Solo soggiorno"
                    checked={selectedItem === "Elemento 2"}
                    onChange={() => handleSelect("Elemento 2")}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Visualizza entrambe"
                    checked={selectedItem === "Elemento 3"}
                    onChange={() => handleSelect("Elemento 3")}
                  />
                </Form>
                <InputGroup className="mt-3 mx-2">
                  <FormControl
                    type="number"
                    placeholder="Budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                  <Button className="button-search me-3" onClick={handleApplyFilter}>
                    Applica
                  </Button>
                </InputGroup>
              </DropdownButton>
            </div>
          </div>
          <Row>
            {(selectedItem === "Elemento 1" || selectedItem === "Elemento 3") && (
              <div className="d-flex align-items-center mb-2">
                <h4 className="mb-0" style={{ fontSize: "2rem", fontFamily: "Impact, san-serif", color: "#203040" }}>
                  Viaggi con soggiorno
                </h4>
                {isAdmin && (
                  <Button className="button-search mx-3" onClick={() => setShowModal(true)}>
                    Aggiungi nuova offerte
                  </Button>
                )}
              </div>
            )}
            {(selectedItem === "Elemento 1" || selectedItem === "Elemento 3") &&
              (selectedBudget
                ? travelData.filter((offer) => offer.price_per_adult <= selectedBudget).slice(0, visibleOffers)
                : travelData.slice(0, visibleOffers)
              ).map((offer, id) => (
                <Col key={id} xs={12} md={6} lg={3}>
                  {loading ? (
                    <LoadingCard />
                  ) : (
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
                              size="sm"
                              className="ms-auto button-search"
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
                            {offer.duration ? offer.duration.toUpperCase() : ""}
                          </span>
                        </Card.Text>
                        <Card.Text className="pt-auto mb-0">
                          <strong style={{ fontWeight: "500" }}>Prezzo:</strong>
                          <span
                            className="text-white px-2 mx-2 rounded-2"
                            style={{ fontWeight: "500", fontSize: "0.9rem", background: "red" }}
                          >
                            {offer.price}€
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
                      <div className="text-center">
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

                        {isAdmin && (
                          <Button
                            variant="danger"
                            size="sm"
                            className=" button-search rounded-5 bg-danger border border-danger mb-2"
                            onClick={() => handleDeleteOffer(offer.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </Button>
                        )}
                      </div>
                    </Card>
                  )}
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
            <Modal.Title style={{ fontFamily: "Impact, san-serif", color: "#203040" }}>Modifica Offerta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-2">
                <Form.Label
                  className="mb-0"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "0.9rem",
                    color: "#203040",
                    fontWeight: "bolder",
                  }}
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
                  className="mb-0"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "0.9rem",
                    color: "#203040",
                    fontWeight: "bolder",
                  }}
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
                  className="mb-0"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "0.9rem",
                    color: "#203040",
                    fontWeight: "bolder",
                  }}
                >
                  Prezzo per Adulti
                </Form.Label>
                <Form.Control
                  type="text"
                  value={editedOffer.price}
                  onChange={(e) => setEditedOffer({ ...editedOffer, price: parseFloat(e.target.value) })}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label
                  className="mb-0"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "0.9rem",
                    color: "#203040",
                    fontWeight: "bolder",
                  }}
                >
                  Prezzo per Bambini
                </Form.Label>
                <Form.Control
                  type="text"
                  value={editedOffer.price_per_child}
                  onChange={(e) => setEditedOffer({ ...editedOffer, price_per_child: parseFloat(e.target.value) })}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="button-search" onClick={() => setIsModalOpen(false)}>
              Annulla
            </Button>
            <Button className="button-search" onClick={handleUpdateTravelOffer}>
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
