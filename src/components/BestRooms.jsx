import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
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
    // Simula il caricamento con un timeout (puoi rimuovere questo blocco in un'applicazione reale)
    setTimeout(() => {
      setLoading(false); // Imposta il caricamento su false per indicare che il caricamento è completo
    }, 2000); // Simula un tempo di caricamento di 2 secondi
  }, []);

  return (
    <Container className="mt-4">
      <h3 className="text-center mb-4" style={{ fontSize: "2.1rem" }}>
        LE MIGLIORI OFFERTE DI SOGGIORNO
      </h3>
      <Row>
        {roomData.map((room) => (
          <Col key={room.id} xs={12} md={6} lg={3}>
            {loading ? ( // Mostra il componente di caricamento durante il caricamento
              <LoadingCard />
            ) : (
              <Card
                className="hover-scale bg-dark text-white text-center border-0 me-2 my-3"
                style={{ height: "400px" }}
              >
                <Card.Img src={room.image} alt={room.name} style={{ objectFit: "cover", height: "100%" }} />
                <Card.ImgOverlay className="card-tours d-flex flex-column justify-content-center align-items-center">
                  <div className="mt-auto">
                    <Card.Text>{room.price}</Card.Text>
                    {isAdmin && (
                      <Button variant="primary" size="sm" className="ms-2" onClick={() => handleOpenModal(room)}>
                        Modifica
                      </Button>
                    )}
                  </div>
                  <div className="mt-auto">
                    <Button className="btn-tours">{room.name}</Button>
                  </div>
                </Card.ImgOverlay>
              </Card>
            )}
          </Col>
        ))}
      </Row>
      <Modal show={isModalOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Stanza</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="Nome della Stanza"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Prezzo della Stanza"
            value={roomPrice}
            onChange={(e) => setRoomPrice(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={handleRoomChange}>
            Salva
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BestRooms;
