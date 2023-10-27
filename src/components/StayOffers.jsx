import { useEffect, useState } from "react";

import { Button, Card, Col, Container, Modal, Row, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addStayOffer, deleteStayOffer, fetchstayOffers, toggleFavoriteTwo, updateStayOffer } from "../redux/actions";
import LoadingCard from "./LoadingCard";
import { Scrollbar } from "react-scrollbars-custom";
import { BookmarkStar, BookmarkStarFill } from "react-bootstrap-icons";
import { FaEuroSign, FaHouseUser, FaMapMarkerAlt, FaUser } from "react-icons/fa";

const StayOffers = ({ selectedBudget }) => {
  const dispatch = useDispatch();
  const travelData = useSelector((state) => state.stay.data);
  const [visibleOffers, setVisibleOffers] = useState(8);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editedOffer, setEditedOffer] = useState(null);
  const loading = useSelector((state) => state.stay.loading);
  const favorites = useSelector((state) => state.stay.favorites);

  const username = useSelector((state) => state.user.username);
  const [newOffer, setNewOffer] = useState({
    name: "",
    city: "",
    type: "",
    image: "",
    bedrooms: "",
    bathrooms: "",
    guests: "",
    amenities: [],
    reviews: [],
    images: [],
    price_per_adult: 0,
    price_per_child: 0,
    host: "",
  });

  const handleAddOffer = () => {
    dispatch(addStayOffer(newOffer));
    setNewOffer({
      name: "",
      city: "",
      type: "",
      offer: "stay",
      image: "",
      bedrooms: "",
      bathrooms: "",
      guests: "",
      amenities: [],
      reviews: [],
      images: [],
      price_per_adult: 0,
      price_per_child: 0,
      host: "",
    });
    setShowModal(false);
  };

  const cleanedEmail = username && username.email ? username.email.trim().toLowerCase() : "";
  const isAdmin = cleanedEmail === "giovanni@gmail.com";

  const handleUpdateStayOffer = () => {
    if (isAdmin && editedOffer) {
      dispatch(updateStayOffer(editedOffer));
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    dispatch(fetchstayOffers());
  }, [dispatch]);

  const handleShowMoreClick = () => {
    const remainingOffers = filteredOffers.length - visibleOffers;
    const offersToShow = Math.min(4, remainingOffers);
    setVisibleOffers(visibleOffers + offersToShow);
  };

  const filteredOffers = selectedBudget
    ? travelData.filter((offer) => offer.price_per_adult <= selectedBudget)
    : travelData;

  const handleDeleteOffer = (offerId) => {
    if (isAdmin && window.confirm("Sei sicuro di voler eliminare questa offerta?")) {
      dispatch(deleteStayOffer(offerId));
    }
  };
  const handleToggleFavorite = (offerId) => {
    dispatch(toggleFavoriteTwo(offerId));
  };

  return (
    <Container>
      <div className="d-flex align-items-center mb-2">
        <h4 className="mb-0" style={{ fontSize: "2rem", fontFamily: "Impact, san-serif", color: "#203040" }}>
          Soggiorno
        </h4>
        {isAdmin && (
          <div>
            <Button className="button-search mx-3" onClick={() => setShowModal(true)}>
              Aggiungi nuovi soggiorni
            </Button>
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
                        Nome
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={newOffer.name}
                        onChange={(e) => setNewOffer({ ...newOffer, name: e.target.value })}
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
                        Città
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={newOffer.city}
                        onChange={(e) => setNewOffer({ ...newOffer, city: e.target.value })}
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
                        Tipo Struttura
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={newOffer.type}
                        onChange={(e) => setNewOffer({ ...newOffer, type: e.target.value })}
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
                        Immagine copertina (URL)
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={newOffer.image}
                        onChange={(e) => setNewOffer({ ...newOffer, image: e.target.value })}
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
                        type="text"
                        value={newOffer.bedrooms}
                        onChange={(e) => setNewOffer({ ...newOffer, bedrooms: e.target.value })}
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
                        type="text"
                        value={newOffer.bathrooms}
                        onChange={(e) => setNewOffer({ ...newOffer, bathrooms: e.target.value })}
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
                        type="text"
                        value={newOffer.guests}
                        onChange={(e) => setNewOffer({ ...newOffer, guests: e.target.value })}
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
                        Prezzo adulto
                      </Form.Label>
                      <Form.Control
                        type="number"
                        value={newOffer.price_per_adult}
                        onChange={(e) => setNewOffer({ ...newOffer, price_per_adult: e.target.value })}
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
                        Prezzo bambino
                      </Form.Label>
                      <Form.Control
                        type="number"
                        value={newOffer.price_per_child}
                        onChange={(e) => setNewOffer({ ...newOffer, price_per_child: e.target.value })}
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
                        value={newOffer.host}
                        onChange={(e) => setNewOffer({ ...newOffer, host: e.target.value })}
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
                        Servizi (separati da virgole)
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={newOffer.amenities.join(",")}
                        onChange={(e) => setNewOffer({ ...newOffer, amenities: e.target.value.split(",") })}
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
                        Immagini (URL separati da virgole)
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={newOffer.images.join(",")}
                        onChange={(e) => setNewOffer({ ...newOffer, images: e.target.value.split(",") })}
                      />
                    </Form.Group>
                  </Form>
                </Scrollbar>
              </Modal.Body>
              <Modal.Footer>
                <Button className="button-search" onClick={() => setShowModal(false)}>
                  Annulla
                </Button>
                <Button className="button-search" onClick={handleAddOffer}>
                  Salva
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        )}
      </div>
      <Row>
        {filteredOffers.length > 0 ? (
          filteredOffers.slice(0, visibleOffers).map((offer, id) => (
            <Col key={id} xs={12} md={6} lg={3}>
              {loading ? (
                <LoadingCard />
              ) : (
                <Card className="offer-card mb-4 border-0" style={{ fontFamily: "Montserrat, sans-serif" }}>
                  <div style={{ position: "relative" }}>
                    <Link to={`/stay-offer/${offer.id}`} key={id} className="text-center">
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

                        fontSize: "24px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleToggleFavorite(offer.id)}
                    >
                      {favorites.includes(offer.id) ? <BookmarkStarFill color="red" /> : <BookmarkStar color="red" />}
                    </div>
                  </div>

                  <Card.Body className="pb-2">
                    <div className="d-flex align-items-center mb-2">
                      <div>
                        <Card.Title className="mb-0" style={{ fontSize: "1.2rem", fontWeight: "600" }}>
                          {offer.name}
                        </Card.Title>
                      </div>
                      <div className="ms-auto">
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
                    </div>
                    <div className="d-flex align-items-center mb-1">
                      <div>
                        <FaMapMarkerAlt className="pb-1" />
                      </div>
                      <Card.Text>
                        <strong style={{ fontWeight: "500" }}>Località:</strong>
                        <span
                          className="text-white px-2 mx-2 rounded-2"
                          style={{ fontWeight: "500", fontSize: "0.9rem", background: "#203040" }}
                        >
                          {offer.city}
                        </span>
                      </Card.Text>
                    </div>
                    <div className="d-flex align-items-center mb-1">
                      <div>
                        <FaUser className="pb-1" />
                      </div>
                      <Card.Text>
                        <strong style={{ fontWeight: "500" }}>Host:</strong>
                        <span
                          className="text-white px-2 mx-2 rounded-2"
                          style={{ fontWeight: "500", fontSize: "0.9rem", background: "#203040" }}
                        >
                          {offer.host}
                        </span>
                      </Card.Text>
                    </div>
                    <div className="d-flex align-items-center mb-1">
                      <div>
                        <FaHouseUser className="pb-1" />
                      </div>
                      <Card.Text>
                        <strong style={{ fontWeight: "500" }}>Tipo struttura:</strong>
                        <span
                          className="text-white px-2 mx-2 rounded-2"
                          style={{ fontWeight: "500", fontSize: "0.9rem", background: "#203040" }}
                        >
                          {offer.type}
                        </span>
                      </Card.Text>
                    </div>
                    <div className="d-flex align-items-center mb-1">
                      <div>
                        <FaEuroSign className="pb-1" />
                      </div>
                      <Card.Text className="pt-auto mb-0">
                        <strong style={{ fontWeight: "500" }}>Adulto:</strong>
                        <span
                          className="text-white px-2 mx-2 rounded-2"
                          style={{ fontWeight: "500", fontSize: "0.9rem", background: "red" }}
                        >
                          {offer.price_per_adult},00 €
                        </span>
                      </Card.Text>
                    </div>
                    <div className="d-flex align-items-center mb-1">
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
                    <Link to={`/stay-offer/${offer.id}`} key={id} className="text-center">
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
                        onClick={() => handleDeleteOffer(offer.id)}
                        className=" button-search rounded-5 bg-danger border border-danger mb-2"
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    )}
                  </div>
                </Card>
              )}
            </Col>
          ))
        ) : (
          <p style={{ height: "60vh", fontFamily: "MOntserrat, sans-serif" }}>Nessun risultato trovato</p>
        )}
      </Row>
      {filteredOffers.length > 8 && (
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
      {isAdmin && editedOffer && (
        <Modal className="custom-modal" show={isModalOpen} size="lg" onHide={() => setIsModalOpen(false)}>
          <Modal.Header style={{ backgroundColor: "#203040" }} closeButton>
            <Modal.Title style={{ fontFamily: "Impact, san-serif", color: "white" }}>Modifica Offerta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Scrollbar style={{ width: "100%", height: 360, color: "#203040" }}>
              <Form className="modal-content border border-white ms-1" style={{ width: "99%" }}>
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
                    Immagine copertina (URL)
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={editedOffer.image}
                    onChange={(e) => setEditedOffer({ ...editedOffer, image: e.target.value })}
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
                    Nome struttura
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={editedOffer.name}
                    onChange={(e) => setEditedOffer({ ...editedOffer, name: e.target.value })}
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
                    className="mb-0"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "0.9rem",
                      color: "#203040",
                      fontWeight: "bolder",
                    }}
                  >
                    Host
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={editedOffer.host}
                    onChange={(e) => setEditedOffer({ ...editedOffer, host: e.target.value })}
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
                    Tipo struttura
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={editedOffer.type}
                    onChange={(e) => setEditedOffer({ ...editedOffer, type: e.target.value })}
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
                    value={editedOffer.price_per_adult}
                    onChange={(e) => setEditedOffer({ ...editedOffer, price_per_adult: parseFloat(e.target.value) })}
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
            </Scrollbar>
          </Modal.Body>
          <Modal.Footer>
            <Button className="button-search" onClick={() => setIsModalOpen(false)}>
              Annulla
            </Button>
            <Button className="button-search" onClick={handleUpdateStayOffer}>
              Salva
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default StayOffers;
