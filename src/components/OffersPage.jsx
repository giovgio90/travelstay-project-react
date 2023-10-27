import { useDispatch, useSelector } from "react-redux";
import {
  createTravelOffer,
  deleteTravelOffer,
  fetchTravelOffers,
  toggleFavorite,
  updateTravelOffer,
} from "../redux/actions";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  DropdownButton,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import FooterTravelStay from "./FooterTravelStay";
import StayOffers from "./StayOffers";
import LoadingCard from "./LoadingCard";

import { BookmarkStar, BookmarkStarFill, Calendar2CheckFill, ClockFill } from "react-bootstrap-icons";
import { Scrollbar } from "react-scrollbars-custom";
import { FaEuroSign } from "react-icons/fa";
import HeaderTwo from "./HeaderTwo";

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
  const favorites = useSelector((state) => state.travel.favorites);
  const [updateCount, setUpdateCount] = useState(0);
  const [newOfferData, setNewOfferData] = useState({
    destination: "",
    duration: "",
    date: "",
    description: "",
    offer: "stay",
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

  const dropdownRef = useRef(null);

  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  const [tempSelectedItem, setTempSelectedItem] = useState(selectedItem);

  const username = useSelector((state) => state.user.username);

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
    setSelectedItem(tempSelectedItem);
    setSelectedBudget(budget);
    setIsDropdownOpen(false);
    if (dropdownRef.current) {
      dropdownRef.current.click();
    }
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

  const handleToggleFavorite = (offerId) => {
    dispatch(toggleFavorite(offerId));
  };

  return (
    <>
      <HeaderTwo />
      <div style={{ marginTop: "120px" }}>
        <Container>
          <div className="d-flex mb-3 align-items-center">
            <div>
              <Modal show={showModal} size="lg" onHide={() => setShowModal(false)}>
                <Modal.Header style={{ backgroundColor: "#203040" }} closeButton>
                  <Modal.Title style={{ fontFamily: "Impact, san-serif", color: "white" }}>
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
                className="button-filter rounded-2 "
                title={isDropdownOpen ? "Filtra" : "Filtra" || selectedItem}
                onSelect={handleSelect}
                onToggle={(isOpen) => setIsDropdownOpen(isOpen)}
                drop="left"
                ref={dropdownRef}
              >
                <Form className="px-3" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  <Form.Check
                    type="checkbox"
                    label="Solo viaggi con soggiorno"
                    checked={tempSelectedItem === "Elemento 1"}
                    onChange={() => setTempSelectedItem("Elemento 1")}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Solo soggiorno"
                    checked={tempSelectedItem === "Elemento 2"}
                    onChange={() => setTempSelectedItem("Elemento 2")}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Visualizza entrambe"
                    checked={tempSelectedItem === "Elemento 3"}
                    onChange={() => setTempSelectedItem("Elemento 3")}
                  />
                </Form>
                <div className="d-flex align-items-center justify-content-center">
                  <div>
                    <FaEuroSign />
                  </div>
                  <div>
                    <Form.Label className="mb-0 ms-2 mt-1">Imposta budget a persona</Form.Label>
                  </div>
                </div>
                <InputGroup className="mt-0 d-flex">
                  <FormControl
                    className="m-2"
                    type="number"
                    size="mlg"
                    placeholder="Budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                </InputGroup>
                <div className="text-center">
                  <Button className="button-search" onClick={handleApplyFilter}>
                    Applica filtri
                  </Button>
                </div>
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
                    Aggiungi nuovi viaggi
                  </Button>
                )}
              </div>
            )}
            {(selectedItem === "Elemento 1" || selectedItem === "Elemento 3") &&
              (selectedBudget ? travelData.filter((offer) => offer.price_per_adult <= selectedBudget) : travelData)
                .slice(0, visibleOffers)
                .map((offer, id) => (
                  <Col key={id} xs={12} md={6} lg={3}>
                    {loading ? (
                      <LoadingCard />
                    ) : (
                      <Card className="offer-card mb-4 border-0" style={{ fontFamily: "Montserrat, sans-serif" }}>
                        <div style={{ position: "relative" }}>
                          <Link to={`/explore/${offer.id}`} key={id} className="text-center">
                            <Card.Img
                              variant="top"
                              src={offer.image}
                              className="border-0 image-hover-scale"
                              style={{ height: "230px", objectFit: "cover" }}
                            />
                          </Link>
                          <div
                            style={{
                              position: "absolute",
                              top: "10px",
                              right: "10px",

                              fontSize: "24px", // Dimensione dell'icona del cuore
                              cursor: "pointer",
                            }}
                            onClick={() => handleToggleFavorite(offer.id)}
                          >
                            {favorites.includes(offer.id) ? (
                              <BookmarkStarFill color="red" />
                            ) : (
                              <BookmarkStar color="red" />
                            )}
                          </div>
                        </div>
                        <Card.Body className="pb-2">
                          <div className="d-flex align-items-center mb-2">
                            <div>
                              <Card.Title className="mb-0" style={{ fontSize: "1.2rem", fontWeight: "600" }}>
                                {offer.destination}
                              </Card.Title>
                            </div>
                            {isAdmin && (
                              <div className="ms-auto">
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
                              </div>
                            )}
                          </div>

                          <div className="d-flex align-items-center mb-1">
                            <div>
                              <Calendar2CheckFill className="pb-1" />
                            </div>

                            <Card.Text className="mb-0">
                              <strong style={{ fontWeight: "500" }}>Data:</strong>
                              <span
                                className="text-white px-2 mx-2 rounded-2"
                                style={{ fontWeight: "500", fontSize: "0,9rem", background: "#203040" }}
                              >
                                {offer.date.split("-").reverse().join("/")}
                              </span>
                            </Card.Text>
                          </div>
                          <div className="d-flex align-items-center mb-1">
                            <div>
                              <ClockFill className="pb-1" />
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
                          </div>
                          <div className="d-flex align-items-center mb-1">
                            <div>
                              <FaEuroSign className="pb-1" />
                            </div>
                            <Card.Text className=" mb-0">
                              <strong style={{ fontWeight: "500" }}>Adulto:</strong>
                              <span
                                className="text-white px-2 mx-2 rounded-2"
                                style={{ fontWeight: "500", fontSize: "0.9rem", background: "red" }}
                              >
                                {offer.price},00 €
                              </span>
                            </Card.Text>
                          </div>
                          <div className="d-flex align-items-center">
                            <div>
                              <FaEuroSign className="pb-1" />
                            </div>
                            <Card.Text>
                              <strong style={{ fontWeight: "500" }}>Bambino:</strong>
                              <span
                                className="text-white px-2 mx-2 rounded-2"
                                style={{ fontWeight: "500", fontSize: "0.9rem", background: "red" }}
                              >
                                {offer.price_per_child},00 €
                              </span>
                            </Card.Text>
                          </div>
                        </Card.Body>
                        <div className="text-center">
                          <Link to={`/explore/${offer.id}`} key={id} className="text-center">
                            <Button
                              variant="trasparent"
                              className="button-discover mx-auto pt-0 pb-2 w-50"
                              style={{
                                fontWeight: "600",
                                color: "#203040",
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
            {(selectedItem === "Elemento 1" && selectedBudget
              ? travelData.filter((offer) => offer.price_per_adult <= selectedBudget).length === 0
              : travelData.length === 0) && (
              <p style={{ fontWeight: "1.8rem", fontFamily: "Montserrat, sans-serif", height: "60vh" }}>
                Nessun risultato trovato
              </p>
            )}
            {(selectedItem === "Elemento 1" || selectedItem === "Elemento 3") &&
              selectedItem === "Elemento 3" &&
              selectedBudget &&
              !travelData.some((offer) => offer.price_per_adult <= selectedBudget) && (
                <p style={{ fontWeight: "1.8rem", fontFamily: "Montserrat, sans-serif" }}>Nessun risultato trovato</p>
              )}
          </Row>

          {(selectedItem === "Elemento 1" || selectedItem === "Elemento 3") &&
            (selectedBudget ? travelData.filter((offer) => offer.price_per_adult <= selectedBudget) : travelData)
              .length > 8 && (
              <div className="text-center mt-1">
                <Button
                  variant="transparent"
                  className="mx-auto pt-0 pb-2"
                  style={{
                    fontWeight: "600",
                    color: "#203040",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                  onClick={handleShowMoreClick}
                >
                  Visualizza altro
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
          <Modal.Header style={{ backgroundColor: "#203040" }} closeButton>
            <Modal.Title style={{ fontFamily: "Impact, san-serif", color: "white" }}>Modifica Offerta</Modal.Title>
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
