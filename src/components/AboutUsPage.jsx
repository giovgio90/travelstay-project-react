import { Container, Row, Col, Image, Navbar, Nav, Form, Button, NavDropdown, Badge } from "react-bootstrap";
import Logo from "../assets/Logo.png";
import { setUser } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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

const AboutUsPage = () => {
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  const cartItemsTravel = useSelector((state) => state.cart.cartItemsTravel);
  const cartItemsStay = useSelector((state) => state.cart.cartItemsStay);
  const cartItemsRoom = useSelector((state) => state.cart.cartItemsRoom);
  const cartItemCount = cartItemsTravel.length + cartItemsStay.length + cartItemsRoom.length;

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
                  <HouseFill style={{ fontSize: "1.5rem" }} /> <h4 className="nav-link  mb-0">HOME</h4>
                </div>
              </Nav.Link>
              <Nav.Link className=" pe-lg-5 d-flex" href="/about-us">
                <div className="d-flex align-items-center">
                  <PersonFill style={{ fontSize: "1.5rem" }} /> <h4 className="nav-link  mb-0"> CHI SIAMO</h4>
                </div>
              </Nav.Link>

              <Nav.Link className="pe-lg-5 " href="/explore">
                <div className="nav-link d-flex align-items-center">
                  <AirplaneFill style={{ fontSize: "1.5rem" }} /> <h4 className="nav-link  mb-0">OFFERTE</h4>
                </div>
              </Nav.Link>
              <Nav.Link className=" pe-lg-5 " href="/contact">
                <div className=" nav-link d-flex align-items-center">
                  <EnvelopeFill style={{ fontSize: "1.5rem" }} /> <h4 className="nav-link  mb-0"> CONTATTI</h4>
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
                            <Cart3 className="nav-link me-4 text-white" style={{ fontSize: "1.7rem" }} />
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
                        <PersonCircle className="me-2" style={{ fontSize: "1.5rem" }} />
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
        <Container className="mt-3">
          <Link to="/">
            <ArrowLeftCircleFill style={{ fontSize: "1.7rem", color: "#203040" }} />
          </Link>
        </Container>
        <Container>
          <Row className="mt-4 align-items-center" style={{ height: "60vh" }}>
            <Col xs={12} md={7}>
              <h2
                style={{
                  fontFamily: "Impact, sans-serif",
                }}
              >
                Chi Siamo
              </h2>
              <p
                style={{
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Benvenuti su TravelStay! Siamo un'agenzia specializzata in offerte di viaggi e soggiorno e solo
                soggiorno, in destinazioni straordinarie di tutta Italia. La nostra missione è rendere le tue vacanze
                indimenticabili offrendoti i migliori servizi e alloggi di qualità.
              </p>
              <p
                style={{
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Con anni di esperienza nel settore dei viaggi, collaboriamo con i migliori alberghi e servizi per
                offrirti le offerte più convenienti e le esperienze di viaggio più straordinarie.
              </p>
              <p
                style={{
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Grazie per aver scelto TravelStay come tua agenzia di viaggi. Siamo entusiasti di aiutarti a pianificare
                le tue prossime avventure e a creare ricordi indimenticabili. <a href="/contact">Contattaci</a> per
                qualsiasi domanda o informazione di cui hai bisogno.
              </p>
            </Col>
            <Col xs={12} md={5} className="text-center">
              <Image src={Logo} width={350} height={350} alt="Chi Siamo" />
            </Col>
          </Row>
        </Container>
      </div>
      <FooterTravelStay />
    </>
  );
};

export default AboutUsPage;
