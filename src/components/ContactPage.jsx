import { useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import FooterTravelStay from "./FooterTravelStay";
import { ArrowLeftCircleFill } from "react-bootstrap-icons";
import HeaderTwo from "./HeaderTwo";

const ContactPage = () => {
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setShowAlert(true);

    setTimeout(() => setShowAlert(false), 2000);
  };

  return (
    <>
      <HeaderTwo />
      <div style={{ marginTop: "120px", marginBottom: "60px" }}>
        <Container className="mt-3 mb-2">
          <Link to="/">
            <ArrowLeftCircleFill style={{ fontSize: "1.7rem", color: "#203040" }} />
          </Link>
        </Container>
        <Container>
          <Row className="align-items-center" style={{ minHeight: "60vh" }}>
            <Col xs={12} md={6}>
              <h2
                className=" mb-2"
                style={{
                  fontFamily: "Impact, sans-serif",
                }}
              >
                Contattaci
              </h2>
              <p
                style={{
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Hai domande o hai bisogno di assistenza? Non esitare a contattarci. Compila il modulo e ti risponderemo
                al più presto.
              </p>
              <p
                style={{
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                <strong>Indirizzo:</strong> Via Giuseppe Verdi, 12345
              </p>
              <p
                style={{
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                <strong>Città:</strong> Salerno
              </p>
              <p
                style={{
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                <strong>Telefono:</strong> +39 334/1212121
              </p>
              <p
                style={{
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                <strong>Email:</strong> travelstay@gmail.com
              </p>
            </Col>
            <Col xs={12} md={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
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
                  <Form.Control type="text" placeholder="Inserisci il tuo nome" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "0.9rem",
                      color: "#203040",
                      fontWeight: "bolder",
                    }}
                    className="mb-0"
                  >
                    Email
                  </Form.Label>
                  <Form.Control type="email" placeholder="Inserisci il tuo indirizzo email" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "0.9rem",
                      color: "#203040",
                      fontWeight: "bolder",
                    }}
                    className="mb-0"
                  >
                    Messaggio
                  </Form.Label>
                  <Form.Control as="textarea" rows={5} placeholder="Inserisci il tuo messaggio" required />
                </Form.Group>
                <Button className="button-search" type="submit">
                  Invia
                </Button>
              </Form>
            </Col>
          </Row>
          <Modal show={showAlert} onHide={() => setShowAlert(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Messaggio inviato</Modal.Title>
            </Modal.Header>
            <Modal.Body>Riceverai supporto in breve tempo!</Modal.Body>
          </Modal>
        </Container>
      </div>
      <FooterTravelStay />
    </>
  );
};

export default ContactPage;
