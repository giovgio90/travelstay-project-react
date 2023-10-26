import { useState } from "react";
import Logo from "../assets/Logo.png";
import { Container, Row, Col, Form, Button, Modal, Navbar, Nav, NavDropdown, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUser } from "../redux/actions";
import FooterTravelStay from "./FooterTravelStay";
import {
  AirplaneFill,
  ArrowLeftCircleFill,
  Cart3,
  EnvelopeFill,
  HouseFill,
  PersonCircle,
  PersonFill,
} from "react-bootstrap-icons";

const ContactPage = () => {
  const username = useSelector((state) => state.user.username);
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const cartItemsTravel = useSelector((state) => state.cart.cartItemsTravel);
  const cartItemsStay = useSelector((state) => state.cart.cartItemsStay);
  const cartItemsRoom = useSelector((state) => state.cart.cartItemsRoom);
  const cartItemsTour = useSelector((state) => state.cart.cartItemsTour);
  const cartItemsDeluxe = useSelector((state) => state.cart.cartItemsDeluxe);
  const cartItemCount =
    cartItemsTravel.length +
    cartItemsStay.length +
    cartItemsRoom.length +
    cartItemsTour.length +
    cartItemsDeluxe.length;

  const handleSubmit = (e) => {
    e.preventDefault();

    setShowAlert(true);

    setTimeout(() => setShowAlert(false), 2000);
  };

  const handleLogout = () => {
    dispatch(setUser(null));
  };

  return (
    <>
      <Navbar expand="lg" className="navbar-head py-0">
        <Container>
          <Navbar.Brand className="d-flex  ms-2 me-0 ps-auto ">
            <img src={Logo} width="80" height="80" alt="Logo" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="text-sm-center mx-lg-auto">
              <Nav.Link className="pe-lg-5 d-flex" href="/">
                <div className="d-flex align-items-center">
                  <HouseFill className="text-white" style={{ fontSize: "1.5rem" }} />{" "}
                  <h4 className="nav-link  mb-0">HOME</h4>
                </div>
              </Nav.Link>
              <Nav.Link className=" pe-lg-5 d-flex" href="/about-us">
                <div className="d-flex align-items-center">
                  <PersonFill className="text-white" style={{ fontSize: "1.5rem" }} />{" "}
                  <h4 className="nav-link  mb-0"> CHI SIAMO</h4>
                </div>
              </Nav.Link>

              <Nav.Link className="pe-lg-5 " href="/explore">
                <div className="nav-link d-flex align-items-center">
                  <AirplaneFill className="text-white" style={{ fontSize: "1.5rem" }} />{" "}
                  <h4 className="nav-link  mb-0">OFFERTE</h4>
                </div>
              </Nav.Link>
              <Nav.Link className=" pe-lg-5 " href="/contact">
                <div className=" nav-link d-flex align-items-center">
                  <EnvelopeFill className="text-white" style={{ fontSize: "1.5rem" }} />{" "}
                  <h4 className="nav-link  mb-0"> CONTATTI</h4>
                </div>
              </Nav.Link>
            </Nav>
            <Form className="d-flex justify-content-center">
              <Row>
                <Col>
                  {username ? (
                    <>
                      <div className="nav-link d-flex align-items-center">
                        <Nav.Link href="/cart">
                          <div className="d-flex align-items-center position-relative">
                            <Cart3 className="nav-link me-4" style={{ fontSize: "1.7rem" }} />
                            {cartItemCount > 0 && (
                              <Badge
                                pill
                                bg="danger"
                                className="cart-badge position-absolute top-0 end-0 translate-middle"
                              >
                                {cartItemCount}
                              </Badge>
                            )}
                          </div>
                        </Nav.Link>
                        <PersonCircle className="me-2 text-white" style={{ fontSize: "1.5rem" }} />
                        <NavDropdown title={username.username} id="basic-nav-dropdown">
                          <NavDropdown.Item as={Link} to="/preferiti">
                            Preferiti
                          </NavDropdown.Item>
                          <NavDropdown.Divider />
                          <Link to="/login" onClick={handleLogout}>
                            <Button variant="transparent" className="text-black align-self-center pt-0">
                              Logout
                            </Button>
                          </Link>
                        </NavDropdown>
                      </div>
                    </>
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
