import { Badge, Button, Card, Col, Container, Form, Nav, NavDropdown, Navbar, Row } from "react-bootstrap";
import Logo from "../assets/Logo.png";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTravelOffers,
  removeFromCartRoom,
  removeFromCartStay,
  removeFromCartTour,
  removeFromCartTravel,
  setUser,
} from "../redux/actions";
import FooterTravelStay from "./FooterTravelStay";

import { useEffect, useState } from "react";
import { AirplaneFill, Cart3, EnvelopeFill, HouseFill, PersonCircle, PersonFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import PaymentModal from "./PaymentModal";

const Cart = () => {
  const cartItemsTravel = useSelector((state) => state.cart.cartItemsTravel);
  const cartItemsStay = useSelector((state) => state.cart.cartItemsStay);
  const cartItemsRoom = useSelector((state) => state.cart.cartItemsRoom);
  const cartItemsTour = useSelector((state) => state.cart.cartItemsTour);
  console.log(cartItemsTour);
  const cartItemCount = cartItemsTravel.length + cartItemsStay.length + cartItemsRoom.length + cartItemsTour.length;
  const cartItems = [...cartItemsTravel, ...cartItemsStay, ...cartItemsRoom, ...cartItemsTour];

  console.log(cartItems);

  const dispatch = useDispatch();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [total, setTotal] = useState(0);
  const username = useSelector((state) => state.user.username);

  const handleLogout = () => {
    dispatch(setUser(null));
  };

  const clearCart = () => {
    cartItemsTravel.forEach((item) => dispatch(removeFromCartTravel(item.id)));
    cartItemsStay.forEach((item) => dispatch(removeFromCartStay(item.id)));
    cartItemsRoom.forEach((room) => dispatch(removeFromCartRoom(room.id)));
    cartItemsTour.forEach((tour) => dispatch(removeFromCartTour(tour.id)));
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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleRemoveFromCart = (productId) => {
    const itemToRemoveTravel = cartItemsTravel.find((item) => item.id === productId);
    const itemToRemoveStay = cartItemsStay.find((item) => item.id === productId);
    const itemToRemoveRoom = cartItemsRoom.find((item) => item.id === productId);
    const itemToRemoveTour = cartItemsTour.find((item) => item.id === productId);

    if (itemToRemoveTravel) {
      dispatch(removeFromCartTravel(productId));
    } else if (itemToRemoveStay) {
      dispatch(removeFromCartStay(productId));
    } else if (itemToRemoveRoom) {
      dispatch(removeFromCartRoom(productId));
    } else if (itemToRemoveTour) {
      dispatch(removeFromCartTour(productId));
    }
  };
  const calculateTotal = () => {
    const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);
    return totalAmount;
  };

  const handleProceedToPurchase = () => {
    setShowPaymentModal(true);
  };

  useEffect(() => {
    setTotal(calculateTotal());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  function formatItalianDate(dateString) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("it-IT", options);
  }

  return (
    <>
      <Navbar expand="lg" className="navbar-head py-0">
        <Container>
          <Navbar.Brand className="d-flex  ms-2 me-0 ps-auto">
            <img src={Logo} width="80" height="80" alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-center mx-lg-auto">
              <Nav.Link className="pe-lg-5 d-flex" href="/">
                <div className="d-flex align-items-center justify-content-center">
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
            <Form className="d-flex justify-content-start">
              {username ? (
                <>
                  <div className="nav-link d-flex align-items-center">
                    <Nav.Link href="/cart">
                      <div className="d-flex align-items-center position-relative">
                        <Cart3 className="nav-link me-4 text-white" style={{ fontSize: "1.7rem" }} />
                        {cartItemCount > 0 && (
                          <Badge pill bg="danger" className="cart-badge position-absolute top-0 end-0 translate-middle">
                            {cartItemCount}
                          </Badge>
                        )}
                      </div>
                    </Nav.Link>
                    <PersonCircle className="me-2" style={{ fontSize: "1.5rem" }} />
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

      <Container>
        <div style={{ marginTop: "120px", marginBottom: "30px" }}>
          <Row>
            {cartItems.length === 0 ? (
              <p className="text-center" style={{ height: "60vh" }}>
                Il carrello è vuoto.
              </p>
            ) : (
              <>
                <h2 className=" mb-4" style={{ fontFamily: "Impact, sans-serif", fontSize: "2rem" }}>
                  Riepilogo ordine
                </h2>
                <Col xs={12} md={12} lg={6} style={{ minHeight: "60vh" }}>
                  {cartItems.map((item) => (
                    <div key={item.id}>
                      <div style={{ fontFamily: "Montserrat, sans-serif" }}>
                        <div className="d-flex align-items-center">
                          <Card.Title className="mb-3" style={{ fontSize: "1.6rem", fontWeight: "600" }}>
                            {item.destination || item.name || item.city}
                          </Card.Title>
                          <Button
                            className="ms-auto"
                            size="sm"
                            variant="danger"
                            onClick={() => handleRemoveFromCart(item.id)}
                          >
                            Rimuovi dal carrello
                          </Button>
                        </div>
                        {item.type ? (
                          <Card.Text>
                            <span style={{ fontSize: "1.2rem", fontWeight: "600" }}>Tipo struttura</span>{" "}
                            <p>{item.type}</p>
                          </Card.Text>
                        ) : null}
                        <Card.Text>
                          {item.adults > 0 || item.children > 0 ? (
                            <Card.Text>
                              <span style={{ fontSize: "1.2rem", fontWeight: "600" }}>Ospiti</span> <br />{" "}
                              {item.adults === 1 ? "1 adulto" : item.adults > 1 ? `${item.adults} adulti` : ""}
                              {item.adults > 0 && item.children > 0 ? " - " : ""}
                              {item.children === 1 ? "1 bambino" : item.children > 1 ? `${item.children} bambini` : ""}
                            </Card.Text>
                          ) : null}
                        </Card.Text>
                        {item.city ? (
                          <Card.Text>
                            <span style={{ fontSize: "1.2rem", fontWeight: "600" }}>Località</span> <p>{item.city}</p>
                          </Card.Text>
                        ) : null}
                        {item.duration ? (
                          <Card.Text>
                            <span style={{ fontSize: "1.2rem", fontWeight: "600" }}>Data</span>{" "}
                            <p>{formatItalianDate(item.date)}</p>
                          </Card.Text>
                        ) : null}

                        {item.duration ? (
                          <Card.Text>
                            <span style={{ fontSize: "1.2rem", fontWeight: "600" }}>Durata</span> <p>{item.duration}</p>
                          </Card.Text>
                        ) : null}

                        {console.log("Valore di item.duration:", item.duration)}
                        <Card.Text>
                          <span style={{ fontSize: "1.2rem", fontWeight: "600" }}>Prezzo finale</span>{" "}
                          <p>{item.price},00 €</p>
                        </Card.Text>
                        <hr />
                      </div>
                    </div>
                  ))}
                </Col>
              </>
            )}
            {cartItems.length > 0 && (
              <Col xs={12} md={12} lg={6} className="ms-auto">
                <div className="cart-summary p-3  cart-container">
                  <Container>
                    <h4>Dettaglio del prezzo</h4>
                    <hr />
                  </Container>
                  {cartItems.map((item) => (
                    <Container>
                      <Row>
                        <Col xs={7}>
                          <div key={item.id}>
                            <div className="d-flex">
                              <p className="mb-0">{item.price},00 €</p>
                              {item.duration ? <span className="mx-1">•</span> : null}
                              <p className="mb-0">{item.duration ? <span>{item.duration}</span> : ""}</p>
                            </div>
                            <div>
                              <p className="mb-0">{item.duration ? <p>Viaggio con soggiorno</p> : null}</p>
                            </div>
                          </div>
                        </Col>

                        <Col xs={5} className="text-end">
                          <div>
                            <img
                              className="rounded-2"
                              src={item.image}
                              style={{ width: "150px", height: "150px" }}
                              alt="Struttura"
                            />
                          </div>{" "}
                        </Col>
                      </Row>
                      <hr />
                    </Container>
                  ))}
                  <Container>
                    <h4 className="text-center">Totale da pagare: {total},00 €</h4>
                  </Container>
                  <div className="text-center">
                    <Button className="button-search btn-block" variant="primary" onClick={handleProceedToPurchase}>
                      Procedi all'acquisto
                    </Button>
                  </div>
                </div>
              </Col>
            )}
          </Row>
        </div>
      </Container>

      <PaymentModal
        show={showPaymentModal}
        onHide={() => setShowPaymentModal(false)}
        total={total}
        onPaymentSuccess={clearCart}
      />
      <FooterTravelStay />
    </>
  );
};

export default Cart;
