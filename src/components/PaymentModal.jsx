import Swal from "sweetalert2";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "animate.css";
import { Scrollbar } from "react-scrollbars-custom";

const PaymentModal = ({ show, onHide, total, onPaymentSuccess }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const [formErrors, setFormErrors] = useState({
    cardNumber: false,
    expirationDate: false,
    cvv: false,
    cardholderName: false,
  });

  const handlePayment = () => {
    const errors = {};
    if (cardNumber.trim() === "") {
      errors.cardNumber = true;
    }
    if (expirationDate.trim() === "") {
      errors.expirationDate = true;
    }
    if (cvv.trim() === "") {
      errors.cvv = true;
    }
    if (cardholderName.trim() === "") {
      errors.cardholderName = true;
    }

    setFormErrors(errors);

    if (Object.values(errors).some((error) => error)) {
      return;
    }

    setPaymentCompleted(true);
    onPaymentSuccess();

    setCardNumber("");
    setExpirationDate("");
    setCvv("");
    setCardholderName("");

    Swal.fire({
      icon: "success",
      title: "Grazie per l'acquisto e buon soggiorno!",
      showClass: {
        popup: "animate__animated animate__slideInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
      showConfirmButton: false,

      html: '<a href="/explore" class="button-payment">Vai alle offerte</a>',
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" className="custom-payment-modal">
      <Modal.Header closeButton className="custom-modal-header">
        <Modal.Title className="custom-modal-title">
          <h4 className="text-center">Totale da pagare: {total}€</h4>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="custom-modal-body pb-0">
        <Scrollbar style={{ width: "100%", height: 360, color: "#203040" }}>
          <Form className="me-2">
            <h4 style={{ fontFamily: "Montserrat, sans-serif" }}>Dati Utente</h4>
            <Form.Group>
              <Form.Label
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "1rem",
                  color: "#203040",
                  fontWeight: "bolder",
                }}
                className="mb-0 custom-form-label"
              >
                Nome
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il tuo nome"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`custom-form-control ${formErrors.firstName && "is-invalid"}`}
                style={{ marginBottom: "0" }}
              />
              {formErrors.firstName && <div className="invalid-feedback">Questo campo è obbligatorio.</div>}
            </Form.Group>
            <Form.Group>
              <Form.Label
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "1rem",
                  color: "#203040",
                  fontWeight: "bolder",
                }}
                className="mb-0 mt-2 custom-form-label"
              >
                Cognome
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il tuo cognome"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={`custom-form-control ${formErrors.lastName && "is-invalid"}`}
                style={{ marginBottom: "0" }}
              />
              {formErrors.lastName && <div className="invalid-feedback">Questo campo è obbligatorio.</div>}
            </Form.Group>
            <Form.Group>
              <Form.Label
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "1rem",
                  color: "#203040",
                  fontWeight: "bolder",
                }}
                className="mb-0 mt-2 custom-form-label"
              >
                Città
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci la tua città"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={`custom-form-control ${formErrors.city && "is-invalid"}`}
                style={{ marginBottom: "0" }}
              />
              {formErrors.city && <div className="invalid-feedback">Questo campo è obbligatorio.</div>}
            </Form.Group>
            <Form.Group>
              <Form.Label
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "1rem",
                  color: "#203040",
                  fontWeight: "bolder",
                }}
                className="mb-0 mt-2 custom-form-label"
              >
                Indirizzo
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il tuo indirizzo"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`custom-form-control ${formErrors.address && "is-invalid"}`}
                style={{ marginBottom: "0" }}
              />
              {formErrors.address && <div className="invalid-feedback">Questo campo è obbligatorio.</div>}
            </Form.Group>
            <Form.Group>
              <Form.Label
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "1rem",
                  color: "#203040",
                  fontWeight: "bolder",
                }}
                className="mb-0 mt-2 custom-form-label"
              >
                CAP
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il tuo CAP"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className={`custom-form-control ${formErrors.zipCode && "is-invalid"}`}
                style={{ marginBottom: "20px" }}
              />
              {formErrors.zipCode && <div className="invalid-feedback">Questo campo è obbligatorio.</div>}
            </Form.Group>
            <hr />
            <h4 style={{ fontFamily: "Montserrat, sans-serif" }}>Dati pagamento</h4>
            <Form.Group>
              <Form.Label
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "1rem",
                  color: "#203040",
                  fontWeight: "bolder",
                }}
                className="mb-0 custom-form-label"
              >
                Numero della carta di credito
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il numero della carta"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className={`custom-form-control ${formErrors.cardNumber && "is-invalid"}`}
                style={{ marginBottom: "0" }}
              />
              {formErrors.cardNumber && <div className="invalid-feedback">Questo campo è obbligatorio.</div>}
            </Form.Group>
            <Form.Group>
              <Form.Label
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "1rem",
                  color: "#203040",
                  fontWeight: "bolder",
                }}
                className="mb-0 mt-2 custom-form-label"
              >
                Data di scadenza
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci la data di scadenza (MM/YY)"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                className={`custom-form-control ${formErrors.expirationDate && "is-invalid"}`}
                style={{ marginBottom: "0" }}
              />
              {formErrors.expirationDate && <div className="invalid-feedback">Questo campo è obbligatorio.</div>}
            </Form.Group>
            <Form.Group>
              <Form.Label
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "1rem",
                  color: "#203040",
                  fontWeight: "bolder",
                }}
                className="mb-0 mt-2 custom-form-label"
              >
                CVV
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className={`custom-form-control ${formErrors.cvv && "is-invalid"}`}
                style={{ marginBottom: "0" }}
                required
              />
              {formErrors.cvv && <div className="invalid-feedback ">Questo campo è obbligatorio.</div>}
            </Form.Group>
            <Form.Group>
              <Form.Label
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "1rem",
                  color: "#203040",
                  fontWeight: "bolder",
                }}
                className="mb-0 mt-2 custom-form-label"
              >
                Titolare della carta
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci il nome del titolare"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                className={`custom-form-control ${formErrors.cardholderName && "is-invalid"}`}
                style={{ marginBottom: "0" }}
              />
              {formErrors.cardholderName && <div className="invalid-feedback ">Questo campo è obbligatorio.</div>}
            </Form.Group>
          </Form>
        </Scrollbar>
      </Modal.Body>
      <Modal.Footer className="custom-modal-footer pt-0">
        <Button className="button-search mt-3" onClick={handlePayment}>
          Paga
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;
