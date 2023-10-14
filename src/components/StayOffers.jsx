import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Modal, Row, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchstayOffers, updateStayOffer } from "../redux/actions";

const StayOffers = ({ selectedBudget }) => {
  const dispatch = useDispatch();
  const travelData = useSelector((state) => state.stay.data);
  const [visibleOffers, setVisibleOffers] = useState(8);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedOffer, setEditedOffer] = useState(null);

  const username = useSelector((state) => state.user.username);

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

  return (
    <Container>
      <h4>Soggiorno</h4>
      <Row>
        {filteredOffers.length > 0 ? (
          filteredOffers.slice(0, visibleOffers).map((offer, id) => (
            <Col key={id} xs={12} md={6} lg={3}>
              <Card className="offer-card mb-4 border-0">
                <Card.Img
                  variant="top"
                  src={offer.image}
                  className="border-0"
                  style={{ height: "230px", objectFit: "cover" }}
                />
                <Card.Body className="pb-2">
                  <div className="d-flex">
                    <Card.Title style={{ fontSize: "1.2rem" }}>{offer.name}</Card.Title>
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
                    <strong style={{ fontWeight: "500" }}>Località:</strong>
                    <span
                      className="text-white px-2 mx-2 rounded-2"
                      style={{ fontWeight: "500", fontSize: "0.9rem", background: "#203040" }}
                    >
                      {offer.city}
                    </span>
                  </Card.Text>
                  <Card.Text>
                    <strong style={{ fontWeight: "500" }}>Host:</strong>
                    <span
                      className="text-white px-2 mx-2 rounded-2"
                      style={{ fontWeight: "500", fontSize: "0.9rem", background: "#203040" }}
                    >
                      {offer.host}
                    </span>
                  </Card.Text>
                  <Card.Text>
                    <strong style={{ fontWeight: "500" }}>Tipo struttura:</strong>
                    <span
                      className="text-white px-2 mx-2 rounded-2"
                      style={{ fontWeight: "500", fontSize: "0.9rem", background: "#203040" }}
                    >
                      {offer.type}
                    </span>
                  </Card.Text>

                  <Card.Text className="pt-auto mb-0">
                    <strong style={{ fontWeight: "500" }}>Prezzo:</strong>
                    <span
                      className="text-white px-2 mx-2 rounded-2"
                      style={{ fontWeight: "500", fontSize: "0.9rem", background: "red" }}
                    >
                      ${offer.price_per_adult}
                    </span>
                    <span className="ps-0">adulti</span>
                  </Card.Text>
                  <Card.Text>
                    <strong style={{ fontWeight: "500" }}>Prezzo:</strong>
                    <span
                      className="text-white px-2 mx-2 rounded-2"
                      style={{ fontWeight: "500", fontSize: "0.9rem", background: "red" }}
                    >
                      ${offer.price_per_child}
                    </span>
                    <span className="ps-0">bambini</span>
                  </Card.Text>
                </Card.Body>
                <Link to={`/stay-offer/${offer.id}`} key={id} className="text-center">
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
          ))
        ) : (
          <p>Nessun risultato trovato</p>
        )}
      </Row>
      {visibleOffers < travelData.length && (
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
      {isAdmin && editedOffer && (
        <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Modifica Offerta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Image URL 1</Form.Label>
                <Form.Control
                  type="text"
                  value={editedOffer.image}
                  onChange={(e) => setEditedOffer({ ...editedOffer, image: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Nome struttura</Form.Label>
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
                <Form.Label>Host</Form.Label>
                <Form.Control
                  type="text"
                  value={editedOffer.host}
                  onChange={(e) => setEditedOffer({ ...editedOffer, host: e.target.value })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Tipo struttura</Form.Label>
                <Form.Control
                  type="text"
                  value={editedOffer.type}
                  onChange={(e) => setEditedOffer({ ...editedOffer, type: e.target.value })}
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
            <Button variant="primary" onClick={handleUpdateStayOffer}>
              Salva
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default StayOffers;
