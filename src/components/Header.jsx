import { Badge, Col, Container, Form, Nav, NavDropdown, Navbar, Row } from "react-bootstrap";
import Logo from "../assets/Logo.png";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTravelOffers, setUser } from "../redux/actions";
import { AirplaneFill, Cart3, EnvelopeFill, HouseFill, PersonCircle, PersonFill } from "react-bootstrap-icons";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const username = useSelector((state) => state.user.username);
  const travelData = useSelector((state) => state.travel.data);
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

  const headerClassName = `navbar-head py-0 ${isSticky ? "navbar-head" : "sticky-header"}`;

  return (
    <>
      <div className="box-scrolls pt-1">
        <Container>
          <Row style={{ fontFamily: "Montserrat, sans-serif" }}>
            <div className="d-flex px-0" style={{ backgroundColor: "#203040" }}>
              <Col xs={6} md={4} lg={3} className="text-center text-lg-end">
                <Container className="static-text ">
                  <h6 style={{ fontWeight: "600" }}>Da non perdere:</h6>{" "}
                </Container>
              </Col>
              <Col xs={6} md={8} lg={9} className="align-self-center ">
                <div className="scrolling-text-container d-flex">
                  {randomOffers.map((offer, id) => (
                    <div key={id} className={`scrolling-text ${id > 0 ? "d-none d-md-block" : ""}`}>
                      <Link to={`/explore/${offer.id}`} className="text-decoration-none text-white">
                        <h6 className="mb-1 me-md-5 me-lg-4">
                          {offer.destination} - {offer.duration} -{" "}
                          <span className="bg-danger text-white px-1 rounded-3" style={{ fontWeight: "600" }}>
                            {offer.price},00 €
                          </span>
                        </h6>
                      </Link>
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
          <Navbar.Brand className="d-flex  ms-2 me-0 ps-auto">
            <img src={Logo} width="80" height="80" alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="fullscreen-navbar-collapse ">
            <Nav className="justify-content-center mx-lg-auto">
              <Nav.Link className="link-hover pe-lg-5 d-flex justify-content-center" href="/">
                <div className="d-flex align-items-center justify-content-center">
                  <HouseFill className="text-white" style={{ fontSize: "1.5rem" }} />{" "}
                  <h4 className="nav-link  mb-0">HOME</h4>
                </div>
              </Nav.Link>
              <Nav.Link className=" pe-lg-5 d-flex justify-content-center" href="/about-us">
                <div className="d-flex align-items-center">
                  <PersonFill className="text-white" style={{ fontSize: "1.5rem" }} />{" "}
                  <h4 className="nav-link  mb-0"> CHI SIAMO</h4>
                </div>
              </Nav.Link>

              <Nav.Link className="pe-lg-5 d-flex justify-content-center" href="/explore">
                <div className="d-flex align-items-center">
                  <AirplaneFill className="text-white" style={{ fontSize: "1.5rem" }} />{" "}
                  <h4 className="nav-link  mb-0">OFFERTE</h4>
                </div>
              </Nav.Link>
              <Nav.Link className=" pe-lg-5 d-flex justify-content-center" href="/contact">
                <div className=" d-flex align-items-center">
                  <EnvelopeFill className="text-white" style={{ fontSize: "1.5rem" }} />{" "}
                  <h4 className="nav-link  mb-0"> CONTATTI</h4>
                </div>
              </Nav.Link>
            </Nav>
            <Form className="d-flex justify-content-center justify-content-start">
              {username ? (
                <>
                  <div className=" d-flex align-items-center">
                    <Nav.Link href="/cart">
                      <div className="d-flex align-items-center position-relative">
                        <Cart3 className="nav-link me-4" style={{ fontSize: "1.7rem" }} />
                        {cartItemCount > 0 && (
                          <Badge pill bg="danger" className="cart-badge position-absolute top-0 end-0 translate-middle">
                            {cartItemCount}
                          </Badge>
                        )}
                      </div>
                    </Nav.Link>
                    <div className="nav-link d-flex align-items-center">
                      <PersonCircle className="nav-link me-2 text-white" style={{ fontSize: "1.5rem" }} />
                      <NavDropdown title={username.username} id="basic-nav-dropdown-head">
                        <NavDropdown.Item
                          className=" navdrop-item text-white"
                          as={Link}
                          to="/preferiti"
                          style={{ fontFamily: "Montserrat, sans-serif", fontWeight: "600" }}
                        >
                          Preferiti
                        </NavDropdown.Item>

                        <NavDropdown.Divider />
                        <NavDropdown.Item
                          className=" text-white"
                          as={Link}
                          onClick={handleLogout}
                          to="/login"
                          style={{ fontFamily: "Montserrat, sans-serif", fontWeight: "600" }}
                        >
                          Esci
                        </NavDropdown.Item>
                      </NavDropdown>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="d-flex">
                    <Nav.Link className="pe-lg-4 text-white" href="/login">
                      ACCEDI
                    </Nav.Link>
                  </div>
                </>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
