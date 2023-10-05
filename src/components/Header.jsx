import { Col, Container, Form, Nav, Navbar, Row } from "react-bootstrap";

import Logo from "../assets/Logo.png";

const Header = () => {
  return (
    <Navbar expand="lg" className="navbar-head py-4">
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
            <Nav.Link className="pe-lg-5 text-white" href="#about-us">
              ABOUT US
            </Nav.Link>
            <Nav.Link className="pe-lg-5 text-white" href="/explore">
              OFFERS
            </Nav.Link>
            <Nav.Link className="pe-lg-5 text-white" href="#contact">
              CONTACT
            </Nav.Link>
          </Nav>
          <Form className="d-flex justify-content-center">
            <Row>
              <Col>
                <Nav.Link className="pe-lg-5 text-white" href="/login">
                  LOGIN
                </Nav.Link>
              </Col>
            </Row>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
