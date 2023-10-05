import { Col, Container, NavLink, Row } from "react-bootstrap";
import { Facebook, Instagram, Twitter } from "react-bootstrap-icons";

const FooterTravelStay = () => {
  return (
    <footer className="footer-travel text-light pb-3">
      <Container className="pt-2">
        <Row>
          <Col md={6}>
            <h5 className="mb-3">
              <strong>Contact Information</strong>
            </h5>
            <p className="mb-1">
              <strong>Address:</strong> Via Giuseppe Verdi, 12345, Roma
            </p>
            <p className="mb-1">
              <strong>Email:</strong> giovanni@gmail.com
            </p>
            <p className="mb-1">
              <strong>Telephone:</strong> +39 334/1212121
            </p>
          </Col>
          <Col md={3}>
            <h5>
              <strong>Useful Links</strong>
            </h5>
            <div>
              <NavLink to="/home" className="text-light">
                <p className="mb-1">Home</p>
              </NavLink>

              <NavLink to="/about" className="text-light">
                <p className="mb-1">About us</p>
              </NavLink>

              <NavLink to="/services" className="text-light">
                <p className="mb-1">Services</p>
              </NavLink>

              <NavLink to="/contact" className="text-light">
                <p className="mb-1">Contact us</p>
              </NavLink>
            </div>
          </Col>
          <Col md={3}>
            <h5>
              <strong>Follow us</strong>
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
