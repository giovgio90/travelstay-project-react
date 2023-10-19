import { Col, Container, NavLink, Row } from "react-bootstrap";
import { Facebook, Instagram, Twitter } from "react-bootstrap-icons";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

const FooterTravelStay = () => {
  return (
    <>
      <footer className="footer-travel text-light pb-3">
        <Container className="pt-2">
          <Row>
            <Col xs={12} md={7} className="mb-4 mb-lg-0">
              <div className="d-flex ">
                <div className="me-4 mb-0 mt-3 mt-md-0">
                  <img src={Logo} width="130" height="130" alt="Logo" />
                </div>
                <div className="mt-3">
                  <h6 className="mb-3">
                    <strong style={{ fontFamily: "Montserrat, sans-serif" }}>Informazioni di contatto</strong>
                  </h6>
                  <div className="mb-0 d-flex align-items-center" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    <strong style={{ fontFamily: "Montserrat, sans-serif" }}>Indirizzo:</strong>
                    <h6 className="mb-0 ms-1" style={{ color: "#CBCBCB", fontFamily: "Montserrat, sans-serif" }}>
                      {" "}
                      Via Giuseppe Verdi, 12345, Salerno
                    </h6>{" "}
                  </div>
                  <div className="mb-0 d-flex align-items-center" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    <strong style={{ fontFamily: "Montserrat, sans-serif" }}>Email:</strong>{" "}
                    <h6 className="mb-0 ms-1" style={{ color: "#CBCBCB", fontFamily: "Montserrat, sans-serif" }}>
                      tavelstay@gmail.com
                    </h6>
                  </div>
                  <div className="mb-0 d-flex align-items-center" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    <strong style={{ fontFamily: "Montserrat, sans-serif" }}>Telefono:</strong>{" "}
                    <h6 className="mb-0 ms-1" style={{ color: "#CBCBCB", fontFamily: "Montserrat, sans-serif" }}>
                      +39 334/1212121
                    </h6>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={9} md={3} className="align-items-top">
              <h6 className="mb-3 mt-3">
                <strong style={{ fontFamily: "Montserrat, sans-serif" }}>Link utili</strong>
              </h6>
              <div>
                <Link to="/about-us" className="text-decoration-none">
                  <p className="mb-0 button-footer" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Chi siamo
                  </p>
                </Link>

                <Link to="/services" className=" text-decoration-none">
                  <p className="mb-0 button-footer" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Servizi
                  </p>
                </Link>

                <Link to="/contact" className=" text-decoration-none">
                  <p className="mb-0 button-footer" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Contattaci
                  </p>
                </Link>
              </div>
            </Col>
            <Col xs={3} md={2}>
              <h6 className="mb-3 mt-3">
                <strong style={{ fontFamily: "Montserrat, sans-serif" }}>Seguici</strong>
              </h6>
              <div className=" d-flex align-items-top">
                <NavLink to="#" className="social  me-2">
                  <Facebook />
                </NavLink>
                <NavLink to="#" className="social me-2">
                  <Twitter />
                </NavLink>
                <NavLink to="#" className="social  me-2">
                  <Instagram />
                </NavLink>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
      <footer style={{ background: " #f1f1f1", color: "#203040", borderBottom: "5px solid #203040" }}>
        <Container>
          <Row>
            <div className="text-center">
              <p
                className="my-auto py-1"
                style={{ fontSize: "0.8rem", fontFamily: "Montserrat, sans-serif", fontWeight: "bolder" }}
              >
                Copyright &copy; 2023 TravelStay
              </p>
            </div>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default FooterTravelStay;
