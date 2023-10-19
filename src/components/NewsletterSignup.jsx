import React, { useState } from "react";
import { Form, Button, Modal, Container, Row, Col, InputGroup } from "react-bootstrap";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isPlaceholderVisible, setPlaceholderVisible] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailFocus = () => {
    setPlaceholderVisible(false);
    const placeholder = document.getElementById("email-placeholder");
    if (placeholder) {
      placeholder.style.display = "none";
    }
  };

  const handleEmailBlur = () => {
    if (email === "") {
      setPlaceholderVisible(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setShowModal(true);

    setTimeout(() => {
      setEmail("");
      setShowModal(false);
    }, 5000);
  };

  return (
    <div className="newsletter pb-1 mt-3">
      <Container className="text-center">
        <Row>
          <Col md={6}>
            <h4 className="pt-3 text-light" style={{ fontFamily: "Impact", fontSize: "2rem" }}>
              Iscriviti alla nostra newsletter
            </h4>
            <h6 className="text-white fst-italic py-2 fw-normal mb-3 mb-lg-2">
              Non perdetevi le nostre incredibili offerte e le ultime notizie di viaggio! Iscrivetevi alla nostra
              newsletter per essere sempre aggiornati su itinerari emozionanti e destinazioni straordinarie. È il modo
              perfetto per iniziare il vostro viaggio verso nuove avventure! Iscrivetevi subito e non perdetevi
              esperienze uniche.
            </h6>
          </Col>
          <Col md={6} className="mb-3 mb-lg-0 d-flex justify-content-center align-items-center">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email">
                <Row className="justify-content-center">
                  <Form.Label
                    className={`text-start text-white mb-1 ${isPlaceholderVisible ? "invisible" : "upwards-animation"}`}
                    htmlFor="email"
                  >
                    Il tuo indirizzo email
                  </Form.Label>
                  <Col lg={12}>
                    <InputGroup className="d-flex justify-content-between ">
                      <Form.Control
                        className="pe-5"
                        size="sm"
                        type="email"
                        value={email}
                        placeholder={isPlaceholderVisible ? "Il tuo indirizzo email" : ""}
                        onChange={handleEmailChange}
                        onFocus={handleEmailFocus}
                        onBlur={handleEmailBlur}
                        required
                      />
                      <Button className="button-news" type="submit">
                        Iscriviti
                      </Button>
                    </InputGroup>
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Col>

          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Welcome aboard!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Thank you for subscribing to our newsletter! You will soon receive our latest news.</Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
          <hr className="hr-style" />
        </Row>
      </Container>
    </div>
  );
};

export default NewsletterSignup;
