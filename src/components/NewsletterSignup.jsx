import React, { useState } from "react";
import { Form, Button, Modal, Container, Row, Col, InputGroup } from "react-bootstrap";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
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
    <div className="newsletter pb-4 mt-3">
      <Container className="text-center">
        <h4 className="display-5 pt-3 text-light" style={{ fontWeight: "400" }}>
          Iscriviti alla nostra newsletter
        </h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label className="text-white fst-italic py-2">
              Non perdetevi le nostre incredibili offerte e le ultime notizie di viaggio! Iscrivetevi alla nostra
              newsletter per essere sempre aggiornati su itinerari emozionanti e destinazioni straordinarie. È il modo
              perfetto per iniziare il vostro viaggio verso nuove avventure! Iscrivetevi subito e non perdetevi
              esperienze uniche.
            </Form.Label>
            <Row className="justify-content-center">
              <Col lg={4}>
                <InputGroup>
                  <Form.Control
                    type="email"
                    placeholder="Il tuo indirizzo email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                  <Button variant="success" type="submit">
                    Iscriviti
                  </Button>
                </InputGroup>
              </Col>
            </Row>
          </Form.Group>
        </Form>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Welcome aboard!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Thank you for subscribing to our newsletter! You will soon receive our latest news.</Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
        <hr className="hr-style" />
      </Container>
    </div>
  );
};

export default NewsletterSignup;
