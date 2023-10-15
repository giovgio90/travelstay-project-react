import { useState } from "react";
import Logo from "../assets/Logo.png";
import { Container, Row, Col, Form, Button, Modal, Navbar, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUser } from "../redux/actions";
import FooterTravelStay from "./FooterTravelStay";

const ContactPage = () => {
  const username = useSelector((state) => state.user.username);
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Puoi inserire qui la logica per l'invio del messaggio o gestire lo stato successivamente.

    // Mostra l'alert
    setShowAlert(true);

    // Nascondi l'alert dopo 2 secondi
    setTimeout(() => setShowAlert(false), 2000);
  };

  const handleLogout = () => {
    dispatch(setUser(null));
  };

  return (
    <>
      <Navbar expand="lg" className="navbar-head py-3">
        <Container>
          <Navbar.Brand className="d-flex">
            <div className="me-1">
              <img src={Logo} width="30" height="40" className="d-inline-block" alt="Logo" />
            </div>
            <div className="align-self-center">
              <h4 className="mb-0 text-white">TRAVELSTAY</h4>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="text-sm-center mx-lg-auto">
              <Nav.Link className="pe-lg-5 text-white" href="/">
                HOME
              </Nav.Link>
              <Nav.Link className="pe-lg-5 text-white" href="/about-us">
                CHI SIAMO
              </Nav.Link>
              <Nav.Link className="pe-lg-5 text-white" href="/explore">
                OFFERTE
              </Nav.Link>
              <Nav.Link className="pe-lg-5 text-white" href="/contact">
                CONTATTI
              </Nav.Link>
            </Nav>
            <Form className="d-flex justify-content-center">
              <Row>
                <Col>
                  {username ? (
                    <div>
                      <span className="text-white me-2">
                        {username.gender === "female" ? "Benvenuta," : "Benvenuto,"} {username.username}
                      </span>
                      <Link to="/login" onClick={handleLogout}>
                        <Button variant="trasparent" className="text-white align-self-center pt-0">
                          Logout
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="d-flex">
                        <Nav.Link className="pe-lg-4 text-white" href="/login">
                          ACCEDI
                        </Nav.Link>
                        <Nav.Link className="pe-lg-4 text-white" href="/register">
                          REGISTRATI
                        </Nav.Link>
                      </div>
                    </>
                  )}
                </Col>
              </Row>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ marginTop: "120px", marginBottom: "60px" }}>
        <Container>
          <h2 className="mt-5 mb-4">Contattaci</h2>
          <Row>
            <Col md={6}>
              <p>
                Hai domande o hai bisogno di assistenza? Non esitare a contattarci. Compila il modulo sottostante e ti
                risponderemo al più presto.
              </p>
              <p>Indirizzo: Via Viaggiatore Felice, 123</p>
              <p>Città: Vacanze Mare</p>
              <p>Telefono: +123 456 7890</p>
              <p>Email: info@vacanzemare.com</p>
            </Col>
            <Col md={6}>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control type="text" placeholder="Inserisci il tuo nome" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Inserisci il tuo indirizzo email" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Messaggio</Form.Label>
                  <Form.Control as="textarea" rows={5} placeholder="Inserisci il tuo messaggio" required />
                </Form.Group>
                <Button variant="primary" type="submit">
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
