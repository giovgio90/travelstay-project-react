import { Col, Container, NavLink, Row } from "react-bootstrap";
import { Facebook, Instagram, Twitter } from "react-bootstrap-icons";

const FooterTravelStay = () => {
  return (
    <footer className="footer-travel text-light pb-3">
      <Container className="pt-2">
        <Row>
          <Col md={6}>
            <h5 className="mb-3">
              <strong>Informazioni di contatto</strong>
            </h5>
            <p className="mb-1">
              <strong>Indirizzo:</strong> Via Giuseppe Verdi, 12345, Roma
            </p>
            <p className="mb-1">
              <strong>Email:</strong> giovanni@gmail.com
            </p>
            <p className="mb-1">
              <strong>Telefono:</strong> +39 334/1212121
            </p>
          </Col>
          <Col md={3}>
            <h5>
              <strong>Link utili</strong>
            </h5>
            <div>
              <NavLink to="/about" className="text-light">
                <p className="mb-1">Chi siamo</p>
              </NavLink>

              <NavLink to="/services" className="text-light">
                <p className="mb-1">Servizi</p>
              </NavLink>

              <NavLink to="/contact" className="text-light">
                <p className="mb-1">Contattaci</p>
              </NavLink>
            </div>
          </Col>
          <Col md={3}>
            <h5>
              <strong>Seguici</strong>
            </h5>
            <div className="d-flex">
              <NavLink to="#" className="text-light me-2">
                <Facebook />
              </NavLink>
              <NavLink to="#" className="text-light me-2">
                <Twitter />
              </NavLink>
              <NavLink to="#" className="text-light me-2">
                <Instagram />
              </NavLink>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterTravelStay;
