import { Button, Col, Container, Form, Nav, Navbar, Row } from "react-bootstrap";
import Logo from "../assets/Logo.png";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTravelOffers, setUser } from "../redux/actions";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const username = useSelector((state) => state.user.username);
  const travelData = useSelector((state) => state.travel.data);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setUser(null));
  };

  useEffect(() => {
    dispatch(fetchTravelOffers());

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch]);

  const handleScroll = () => {
    if (window.scrollY > 30) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  const getRandomOffers = (count) => {
    const shuffledData = [...travelData];
    for (let i = shuffledData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
    }
    return shuffledData.slice(0, count);
  };

  const randomOffers = getRandomOffers(3);

  const headerClassName = `navbar-head py-3 ${isSticky ? "navbar-head" : "sticky-header"}`;

  return (
    <>
      <div className="box-scrolls pt-1">
        <Container>
          <Row>
            <div className="d-flex" style={{ backgroundColor: "#203040" }}>
              <Col md={4} lg={3} className="text-end">
                <div className="static-text pe-3">
                  <h6>Offerte da non perdere:</h6>{" "}
                </div>
              </Col>
              <Col xs={12} md={8} lg={9} className="align-self-center">
                <div className="scrolling-text-container d-flex">
                  {randomOffers.map((offer, id) => (
                    <div key={id} className="scrolling-text">
                      <h6>
                        {offer.destination} - {offer.duration} -{" "}
                        <span className="bg-danger text-white px-1 rounded-3">{offer.price}€</span>
                      </h6>
                    </div>
                  ))}
                </div>
              </Col>
            </div>
          </Row>
        </Container>
      </div>

      <Navbar expand="lg" className={headerClassName}>
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
                CHI SIAMO
              </Nav.Link>
              <Nav.Link className="pe-lg-5 text-white" href="/explore">
                OFFERTE
              </Nav.Link>
              <Nav.Link className="pe-lg-5 text-white" href="#contact">
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
    </>
  );
};

export default Header;
