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

    // Ripristina il campo email dopo qualche secondo
    setTimeout(() => {
      setEmail("");
      setShowModal(false);
    }, 5000);
  };

  return (
    <div className="newsletter pb-4 mt-3">
      <Container className="text-center">
        <h4 className="display-5 pt-3 text-light" style={{ fontWeight: "400" }}>
          Sign up for our newsletter
        </h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label className="text-white fst-italic py-2">
              Don't miss our incredible offers and the latest travel news! Sign up for our newsletter to keep up to date
              with exciting itineraries and extraordinary destinations. It is the perfect way to start your journey to
              new adventures! Sign up now and don't miss out on unique experiences.
            </Form.Label>
            <Row className="justify-content-center">
              <Col lg={4}>
                <InputGroup>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                  <Button variant="success" type="submit">
                    Sign up
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
