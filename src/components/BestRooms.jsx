import { Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRoom } from "../redux/actions";
import LoadingCard from "./LoadingCard";

const BestRooms = () => {
  const roomData = useSelector((state) => state.rooms);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [roomPrice, setRoomPrice] = useState("");
  const [editingRoomId, setEditingRoomId] = useState(null);
  const user = useSelector((state) => state.user.username);

  const cleanedEmail = user && user.email ? user.email.trim().toLowerCase() : "";
  const isAdmin = cleanedEmail === "giovanni@gmail.com";
  // console.log(isAdmin);

  const [loading, setLoading] = useState(true);

  const handleOpenModal = (room) => {
    if (isAdmin) {
      setIsModalOpen(true);
      setRoomName(room.name);
      setRoomPrice(room.price);
      setEditingRoomId(room.id);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setRoomName("");
    setRoomPrice("");
    setEditingRoomId(null);
  };

  const handleRoomChange = () => {
    if (isAdmin) {
      dispatch(updateRoom(editingRoomId, roomName, roomPrice));
      handleCloseModal();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Container>
      <h3 className="text-center mb-4" style={{ fontSize: "2.4rem", fontFamily: "Impact, sans-serif" }}>
        LE MIGLIORI OFFERTE DI SOGGIORNO
      </h3>
      <Row>
        {roomData.map((room) => (
          <Col key={room.id} xs={12} md={6} lg={3}>
            {loading ? (
              <LoadingCard />
            ) : (
              <Card
                className="hover-scale bg-dark text-white text-center border-0 me-2 my-3"
                style={{ height: "400px" }}
              >
                <Card.Img src={room.image} alt={room.name} style={{ objectFit: "cover", height: "100%" }} />
                <Card.ImgOverlay className="card-tours d-flex flex-column justify-content-center align-items-center">
                  <div className="mt-auto">
                    {isAdmin && (
                      <Button className="button-search ms-2" size="sm" onClick={() => handleOpenModal(room)}>
                        Modifica
                      </Button>
                    )}
                    <Card.Text>{room.price}€/notte</Card.Text>
                  </div>
                  <div className="mt-auto">
                    <Button className=" button-search" style={{ fontWeight: "500" }}>
                      {room.name}
                    </Button>
                  </div>
                </Card.ImgOverlay>
              </Card>
            )}
          </Col>
        ))}
      </Row>
      <Modal show={isModalOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontFamily: "Impact, san-serif", color: "#203040" }}>
            Modifica anteprima stanza
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
                Nome stanza
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il titolo del tour"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
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
                Prezzo
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Inserisci il titolo del tour"
                value={roomPrice}
                onChange={(e) => setRoomPrice(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="button-search" onClick={handleCloseModal}>
            Annulla
          </Button>
          <Button className="button-search" onClick={handleRoomChange}>
            Salva
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BestRooms;
