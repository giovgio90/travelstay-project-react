import { useDispatch, useSelector } from "react-redux";
import { setUser, toggleFavorite, toggleFavoriteTwo } from "../redux/actions";
import FooterTravelStay from "./FooterTravelStay";
import Logo from "../assets/Logo.png";
import { Badge, Button, Col, Container, Form, Nav, NavDropdown, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  AirplaneFill,
  ArrowLeftCircleFill,
  Cart3,
  EnvelopeFill,
  HouseFill,
  PersonCircle,
  PersonFill,
} from "react-bootstrap-icons";

const Favourites = () => {
  const favoritesTravel = useSelector((state) => state.travel.favorites);
  const favoritesStay = useSelector((state) => state.stay.favorites);
  const travelData = useSelector((state) => state.travel.data);
  const stayData = useSelector((state) => state.stay.data);
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
  const username = useSelector((state) => state.user.username);
  const handleLogout = () => {
    dispatch(setUser(null));
  };

  const handleRemoveFromFavorites = (offerId) => {
    dispatch(toggleFavorite(offerId));
  };

  const handleRemoveFromFavoritesTwo = (offerId) => {
    dispatch(toggleFavoriteTwo(offerId));
  };

  return (
    <div>
      <Navbar expand="lg" className="navbar-head py-0" style={{ zIndex: "1000" }}>
        <Container>
          <Navbar.Brand className="d-flex align-center ms-2 me-0 ps-auto">
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

      <Container style={{ marginTop: "120px", minHeight: "70vh" }}>
        <Link to="/">
          <ArrowLeftCircleFill className="mt-2 mb-4" style={{ fontSize: "1.7rem", color: "#203040" }} />
        </Link>

        <Row>
          <Col xs={12} md={12} lg={6} className="mb-3">
            <h2 className="favorite-title" style={{ fontFamily: "Impact, sans-serif", fontSize: "2.5rem" }}>
              Viaggi preferiti
            </h2>
            {favoritesTravel.length === 0 ? (
              <p style={{ fontFamily: "Montserrat, sans-serif" }}>Non ci sono offerte favorite al momento.</p>
            ) : (
              <>
                {favoritesTravel.map((offerId) => {
                  const offer = travelData.find((offer) => offer.id === offerId);
                  return (
                    <Container>
                      <div key={offerId} className="mb-2">
                        <Row className="w-70">
                          <div className="d-flex  ps-0 pe-1">
                            <Col xs={5} md={3}>
                              <div>
                                <img
                                  style={{ width: "100px", height: "100px" }}
                                  src={offer.image}
                                  alt={offer.destination}
                                />
                              </div>
                            </Col>
                            <Col xs={5} md={4}>
                              <Link to={`/explore/${offerId}`} className="text-decoration-none">
                                <h4 className="text-black" style={{ fontFamily: "Montserrat, sans-serif" }}>
                                  {offer.destination}
                                </h4>
                                <p className="text-black" style={{ fontFamily: "Montserrat, sans-serif" }}>
                                  {offer.price},00 €
                                </p>
                                <p className="text-black" style={{ fontFamily: "Montserrat, sans-serif" }}>
                                  {offer.duration}
                                </p>
                              </Link>
                            </Col>
                            <Col xs={2} md={4}>
                              <div>
                                <Button
                                  size="sm"
                                  className="button-search bg-danger border-danger"
                                  onClick={() => handleRemoveFromFavorites(offerId)}
                                >
                                  <i className="bi bi-trash text-white"></i>
                                </Button>
                              </div>
                            </Col>
                          </div>
                        </Row>
                      </div>
                    </Container>
                  );
                })}
              </>
            )}
          </Col>
          <Col xs={12} md={12} lg={6} className="mb-3">
            <h2 className="favorite-title" style={{ fontFamily: "Impact, sans-serif", fontSize: "2.5rem" }}>
              Soggiorni preferiti
            </h2>
            {favoritesStay.length === 0 ? (
              <p style={{ fontFamily: "Montserrat, sans-serif" }}>Non ci sono offerte favorite al momento.</p>
            ) : (
              <>
                {favoritesStay.map((offerId) => {
                  const offer = stayData.find((offer) => offer.id === offerId);
                  return (
                    <Container>
                      <div key={offerId} className="mb-4">
                        <Row className="w-70">
                          <div className="d-flex  ps-0 pe-1">
                            <Col xs={5} md={3}>
                              <div>
                                <img
                                  style={{ width: "100px", height: "100px" }}
                                  src={offer.image}
                                  alt={offer.destination}
                                />
                              </div>
                            </Col>
                            <Col xs={5} md={5}>
                              <Link to={`/explore/${offerId}`} className="text-decoration-none">
                                <h4 className="text-black" style={{ fontFamily: "Montserrat, sans-serif" }}>
                                  {offer.name}
                                </h4>
                                <p className="text-black" style={{ fontFamily: "Montserrat, sans-serif" }}>
                                  {offer.price_per_adult},00 € /notte
                                </p>
                                <p className="text-black" style={{ fontFamily: "Montserrat, sans-serif" }}>
                                  {offer.duration}
                                </p>
                              </Link>
                            </Col>
                            <Col xs={2} md={4}>
                              <div>
                                <Button
                                  size="sm"
                                  className="button-search bg-danger border-danger"
                                  onClick={() => handleRemoveFromFavoritesTwo(offerId)}
                                >
                                  <i className="bi bi-trash text-white"></i>
                                </Button>
                              </div>
                            </Col>
                          </div>
                        </Row>
                      </div>
                    </Container>
                  );
                })}
              </>
            )}
          </Col>
        </Row>
      </Container>

      <FooterTravelStay />
    </div>
  );
};

export default Favourites;
