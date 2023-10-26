import { Badge, Button, Col, Container, Form, Nav, NavDropdown, Navbar, Row } from "react-bootstrap";
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
          <Row>
            <div className="d-flex  px-0" style={{ backgroundColor: "#203040" }}>
              <Col x6={5} md={4} lg={3} className="text-end">
                <Container className="static-text pe-3">
                  <h6>Da non perdere:</h6>{" "}
                </Container>
              </Col>
              <Col xs={7} md={8} lg={9} className="align-self-center ">
                <div className="scrolling-text-container d-flex ">
                  {randomOffers.map((offer, id) => (
                    <div key={id} className="scrolling-text ">
                      <Link to={`/explore/${offer.id}`} className="text-decoration-none text-white">
                        <h6 className="mb-1 pe-5 pe-sm-0 pe-md-0">
                          {offer.destination} - {offer.duration} -{" "}
                          <span className="bg-danger text-white px-1 rounded-3">{offer.price}€</span>
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
          <Navbar.Collapse id="basic-navbar-nav" className="fullscreen-navbar-collapse">
            <Nav className="justify-content-center mx-lg-auto">
              <Nav.Link className="link-hover pe-lg-5 d-flex" href="/">
                <div className="d-flex align-items-center justify-content-center">
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
            <Form className="d-flex justify-content-start">
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
                      <NavDropdown title={username.username} id="basic-nav-dropdown">
                        <Link to="/preferiti">
                          <Button variant="transparent" className="text-black align-self-center pt-0">
                            Preferiti
                          </Button>
                        </Link>
                        <NavDropdown.Divider />
                        <Link to="/login" onClick={handleLogout}>
                          <Button variant="transparent" className="text-black align-self-center pt-0">
                            Logout
                          </Button>
                        </Link>
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
