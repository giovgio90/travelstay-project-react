import React, { useState, useEffect } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateTour } from "../redux/actions";
import { Link } from "react-router-dom";

const BestTours = () => {
  const tours = useSelector((state) => state.tours);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.username);
  const [tourData, setTourData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tourCity, setTourCity] = useState("");
  const [editingTourId, setEditingTourId] = useState(null);
  const [tourPrice, setTourPrice] = useState("");

  const cleanedEmail = user && user.email ? user.email.trim().toLowerCase() : "";
  const isAdmin = cleanedEmail === "giovanni@gmail.com";

  useEffect(() => {
    const randomTours = [];
    const usedIndexes = new Set();

    while (randomTours.length < 3 && randomTours.length < tours.length) {
      const randomIndex = Math.floor(Math.random() * tours.length);

      if (!usedIndexes.has(randomIndex)) {
        randomTours.push(tours[randomIndex]);
        usedIndexes.add(randomIndex);
      }
    }

    setTourData(randomTours);
  }, [tours]);

  const handleOpenModal = (tour) => {
    setIsModalOpen(true);
    setTourCity(tour.city);
    setTourPrice(tour.price);
    setEditingTourId(tour.id);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTourCity("");
    setEditingTourId(null);
  };

  const handleTourChange = () => {
    if (isAdmin) {
      dispatch(updateTour({ id: editingTourId, city: tourCity, price: tourPrice }));
      handleCloseModal();
    }
  };

  return (
    <Row className="my-4">
      {tourData.map((tour) => (
        <Col key={tour.id} xs={12} md={12} lg={4}>
          <Card className="bg-dark text-white text-center border-0 me-2 mb-3 hover-scale" style={{ height: "400px" }}>
            <Card.Img src={tour.image} alt={tour.city} style={{ objectFit: "cover", height: "100%" }} />
            <Card.ImgOverlay className="card-tours d-flex flex-column justify-content-center align-items-center">
              <div className="mt-auto">
                {isAdmin && (
                  <Button variant="primary" size="sm" className="button-search" onClick={() => handleOpenModal(tour)}>
                    Modifica
                  </Button>
                )}
                <Card.Title className="display-3 pt-3 fw-bolder">
                  {tour.id === editingTourId ? (
                    <input
                      type="text"
                      value={tourCity}
                      onChange={(e) => setTourCity(e.target.value)}
                      style={{ display: isModalOpen ? "none" : "block" }}
                    />
                  ) : (
                    tour.city
                  )}
                </Card.Title>
              </div>
              <div className="mt-auto">
                <Card.Text>A partire da {tour.price},00 €</Card.Text>
                <Link to={`/tour-detail/${tour.id}`}>
                  <Button className="button-search" style={{ fontWeight: "500" }}>
                    SCOPRI DI PIÚ
                  </Button>
                </Link>
              </div>
            </Card.ImgOverlay>
          </Card>
        </Col>
      ))}
      <Modal show={isModalOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontFamily: "Impact, san-serif", color: "#203040" }}>
            Modifica anteprima Tour
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
                placeholder="Inserisci il titolo del tour"
                value={tourCity}
                onChange={(e) => setTourCity(e.target.value)}
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
                Prezzo
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il prezzo del tour"
                value={tourPrice}
                onChange={(e) => setTourPrice(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="button-search" onClick={handleCloseModal}>
            Annulla
          </Button>
          <Button className="button-search" onClick={handleTourChange}>
            Salva
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
};

export default BestTours;
