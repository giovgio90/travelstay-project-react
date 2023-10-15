import { Container, Row, Col, Image, Navbar, Nav, Form, Button } from "react-bootstrap";
import Logo from "../assets/Logo.png";
import { setUser } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FooterTravelStay from "./FooterTravelStay";

const AboutUsPage = () => {
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();

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
        <Container className="mt-5">
          <h2>Chi Siamo</h2>
          <Row className="mt-4">
            <Col md={6}>
              <p>
                Benvenuti su TravelStay! Siamo un'azienda di viaggi specializzata in offerte di viaggi e soggiorno e
                solo soggiorno, in destinazioni straordinarie di tutta Italia. La nostra missione è rendere le tue
                vacanze indimenticabili offrendoti i migliori servizi e alloggi di qualità.
              </p>
              <p>
                Con anni di esperienza nel settore dei viaggi, collaboriamo con i migliori alberghi e servizi per
                offrirti le offerte più convenienti e le esperienze di viaggio più straordinarie.
              </p>
              <p>
                Grazie per aver scelto TravelStay come tua agenzia di viaggi. Siamo entusiasti di aiutarti a pianificare
                le tue prossime avventure e a creare ricordi indimenticabili. <a href="/contact">Contattaci</a> per
                qualsiasi domanda o informazione di cui hai bisogno.
              </p>
            </Col>
            <Col md={6}>
              <Image src="https://via.placeholder.com/400" alt="Chi Siamo" fluid />
            </Col>
          </Row>
        </Container>
      </div>
      <FooterTravelStay />
    </>
  );
};

export default AboutUsPage;
