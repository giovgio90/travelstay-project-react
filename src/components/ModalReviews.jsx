import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchTravelOffers } from "../redux/actions";

const ModalReviews = () => {
  const dispatch = useDispatch();
  const travelData = useSelector((state) => state.travel.data);

  const [showModal, setShowModal] = useState(false); // Definisci showModal e setShowModal
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    dispatch(fetchTravelOffers());
  }, [dispatch]);

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Recensioni</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Inserisci qui il contenuto delle recensioni */}
        {/* Ad esempio, puoi mappare le recensioni da un array */}
        {travelData.map((review, index) => (
          <div key={index}>
            <h5>{review.hotel.reviews[0]}</h5>
            <p>{review.hotel.reviews[2]}</p>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Chiudi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalReviews;
