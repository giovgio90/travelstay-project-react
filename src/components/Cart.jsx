import { Button, Card, Col, Container, Row } from "react-bootstrap";

import Carrello from "../assets/Carrello.png";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTravelOffers,
  removeFromCartDeluxe,
  removeFromCartRoom,
  removeFromCartStay,
  removeFromCartTour,
  removeFromCartTravel,
} from "../redux/actions";
import FooterTravelStay from "./FooterTravelStay";

import { useEffect, useState } from "react";

import PaymentModal from "./PaymentModal";

import LoadingThree from "./LoadingThree";
import LoadingFive from "./LoadingFive";
import HeaderTwo from "./HeaderTwo";
import { Calendar2CheckFill, ClockFill, HouseAddFill, PersonFillExclamation } from "react-bootstrap-icons";
import { FaEuroSign, FaMapMarkerAlt, FaUser } from "react-icons/fa";

const Cart = () => {
  const cartItemsTravel = useSelector((state) => state.cart.cartItemsTravel);
  const cartItemsStay = useSelector((state) => state.cart.cartItemsStay);
  const cartItemsRoom = useSelector((state) => state.cart.cartItemsRoom);
  const cartItemsTour = useSelector((state) => state.cart.cartItemsTour);
  const [isLoading, setIsLoading] = useState(true);
  const cartItemsDeluxe = useSelector((state) => state.cart.cartItemsDeluxe);
  console.log(cartItemsTour);

  const cartItems = [...cartItemsTravel, ...cartItemsStay, ...cartItemsRoom, ...cartItemsTour, ...cartItemsDeluxe];

  console.log(cartItems);

  const dispatch = useDispatch();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const clearCart = () => {
    cartItemsTravel.forEach((item) => dispatch(removeFromCartTravel(item.id)));
    cartItemsStay.forEach((item) => dispatch(removeFromCartStay(item.id)));
    cartItemsRoom.forEach((room) => dispatch(removeFromCartRoom(room.id)));
    cartItemsTour.forEach((tour) => dispatch(removeFromCartTour(tour.id)));
    cartItemsDeluxe.forEach((deluxe) => dispatch(removeFromCartDeluxe(deluxe.id)));
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
    const itemToRemoveDeluxe = cartItemsDeluxe.find((item) => item.id === productId);

    if (itemToRemoveTravel) {
      dispatch(removeFromCartTravel(productId));
    } else if (itemToRemoveStay) {
      dispatch(removeFromCartStay(productId));
    } else if (itemToRemoveRoom) {
      dispatch(removeFromCartRoom(productId));
    } else if (itemToRemoveTour) {
      dispatch(removeFromCartTour(productId));
    } else if (itemToRemoveDeluxe) {
      dispatch(removeFromCartDeluxe(productId));
    }
  };
  const calculateTotal = () => {
    const totalAmount = cartItems.reduce((total, item) => total + item.price + item.tax, 0);
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
      <HeaderTwo />
      <Container>
        <div style={{ marginTop: "120px", marginBottom: "30px" }}>
          <Row>
            {cartItems.length === 0 ? (
              <div className="text-center">
                <div>
                  <p className="text-center mt-5" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "1.5rem" }}>
                    Il tuo carrello è in attesa di essere riempito di emozioni!
                  </p>
                </div>
                <div className="mt-5" style={{ height: "55vh" }}>
                  <img src={Carrello} width="170px" height="170px" alt="Carrello vuoto" />
                </div>
              </div>
            ) : (
              <>
                <h2 className=" mb-4" style={{ fontFamily: "Impact, sans-serif", fontSize: "2rem" }}>
                  Riepilogo ordine
                </h2>
                <Col xs={12} md={12} lg={8} style={{ minHeight: "60vh" }}>
                  {isLoading ? (
                    <LoadingThree />
                  ) : (
                    <>
                      {cartItems.map((item) => (
                        <Card key={item.id} className="card-order p-3 mb-3">
                          <Row className="d-flex">
                            <Col xs={5} md={4} lg={3}>
                              <div>
                                <img
                                  className="rounded-2 me-2"
                                  src={item.image}
                                  style={{ width: "150px", height: "150px", objectFit: "cover" }}
                                  alt="Struttura"
                                />
                              </div>{" "}
                            </Col>
                            <Col xs={7} md={8} lg={9}>
                              <div>
                                <Row className="d-flex w-100">
                                  <Col xs={12} md={8}>
                                    <div className="ms-4 ms-md-0">
                                      <Card.Title
                                        className="mb-3 "
                                        style={{
                                          fontFamily: "Montserrat, sans-serif",
                                          fontSize: "1.6rem",
                                          fontWeight: "600",
                                        }}
                                      >
                                        <div className="d-flex align-items-center mb-1">
                                          <div>
                                            <FaMapMarkerAlt className="pb-1" />
                                          </div>
                                          {item.destination || item.name}
                                        </div>
                                      </Card.Title>
                                    </div>
                                  </Col>
                                  <Col xs={12} md={4}>
                                    <div className="text-center text-lg-end">
                                      <Button size="sm" variant="danger" onClick={() => handleRemoveFromCart(item.id)}>
                                        Rimuovi dal carrello
                                      </Button>
                                    </div>
                                  </Col>
                                  <hr />
                                </Row>

                                <div>
                                  <Row className="mt-3">
                                    <div
                                      className="d-flex justify-column"
                                      style={{ fontFamily: "Montserrat, sans-serif" }}
                                    >
                                      {item.date ? (
                                        <Col xs={12} md={6} lg={3}>
                                          <Card.Text>
                                            <div className="d-flex align-items-center mb-1">
                                              <div>
                                                <Calendar2CheckFill className="pb-1" />
                                              </div>
                                              <span style={{ fontSize: "1rem", fontWeight: "600" }}>Data</span>{" "}
                                            </div>
                                            <p>{formatItalianDate(item.date)}</p>
                                          </Card.Text>
                                        </Col>
                                      ) : null}

                                      {item.type ? (
                                        <Col xs={12} md={6} lg={3}>
                                          <Card.Text>
                                            <div className="d-flex align-items-center mb-1">
                                              <div>
                                                <HouseAddFill className="pb-1" />
                                              </div>
                                              <span style={{ fontSize: "1rem", fontWeight: "600" }}>Struttura</span>{" "}
                                            </div>
                                            <p>{item.type}</p>
                                          </Card.Text>
                                        </Col>
                                      ) : null}

                                      <Col xs={12} md={6} lg={3}>
                                        <Card.Text>
                                          {item.adults > 0 || item.children > 0 ? (
                                            <Card.Text>
                                              <div className="d-flex align-items-center mb-1">
                                                <div>
                                                  <FaUser className="pb-1" />
                                                </div>
                                                <span style={{ fontSize: "1rem", fontWeight: "600" }}>Ospiti</span>{" "}
                                                <br />{" "}
                                              </div>
                                              {item.adults === 1
                                                ? "1 adulto"
                                                : item.adults > 1
                                                ? `${item.adults} adulti`
                                                : ""}
                                              {item.adults > 0 && item.children > 0 ? " - " : ""}
                                              {item.children === 1
                                                ? "1 bambino"
                                                : item.children > 1
                                                ? `${item.children} bambini`
                                                : ""}
                                            </Card.Text>
                                          ) : null}
                                        </Card.Text>
                                      </Col>
                                      {/* {item.destination ? (
                              <Card.Text>
                                <span style={{ fontSize: "1.2rem", fontWeight: "600" }}>Località</span>{" "}
                                <p>{item.destination}</p>
                              </Card.Text>
                            ) : null} */}

                                      {item.duration ? (
                                        <Col xs={12} md={6} lg={3}>
                                          <Card.Text>
                                            <div className="d-flex align-items-center mb-1">
                                              <div>
                                                <ClockFill className="pb-1" />
                                              </div>
                                              <span style={{ fontSize: "1rem", fontWeight: "600" }}>Durata</span>{" "}
                                            </div>
                                            <p className="ps-1">{item.duration}</p>
                                          </Card.Text>
                                        </Col>
                                      ) : null}

                                      <Col xs={12} md={6} lg={3}>
                                        {console.log("Valore di item.duration:", item.duration)}
                                        <Card.Text>
                                          <div className="d-flex align-items-center mb-1">
                                            <div>
                                              <FaEuroSign className="pb-1" />
                                            </div>
                                            <span style={{ fontSize: "1rem", fontWeight: "600" }}>Prezzo finale</span>{" "}
                                          </div>
                                          <p className="ps-1">{item.price},00 €</p>
                                        </Card.Text>
                                      </Col>
                                    </div>
                                  </Row>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </Card>
                      ))}
                    </>
                  )}
                </Col>
              </>
            )}
            {cartItems.length > 0 && (
              <Col xs={12} md={12} lg={4} className="ms-auto">
                <div className="cart-summary p-3  cart-container">
                  <Container>
                    <h4>Dettaglio del prezzo</h4>
                    <hr />
                  </Container>
                  {cartItems.map((item) => (
                    <Container>
                      <Row>
                        {isLoading ? (
                          <LoadingFive />
                        ) : (
                          <>
                            <Col xs={12}>
                              <div key={item.id}>
                                <div className="d-flex" style={{ fontFamily: "Montserrat, sans-serif" }}>
                                  <p className="mb-0">{item.offer === "travel" ? <p>{item.price},00 €</p> : null}</p>
                                  <p className="mb-0">
                                    {item.offer === "stay" ? <p>{item.price},00 €/ notte</p> : null}
                                  </p>
                                  <p className="mb-0">
                                    {item.offer === "room" ? <p>{item.price},00 €/ notte</p> : null}
                                  </p>
                                  <p className="mb-0">{item.offer === "tour" ? <p>{item.price},00 €</p> : null}</p>
                                  <p className="mb-0">
                                    {item.type_offer === "deluxe" ? <p>{item.price},00 €</p> : null}
                                  </p>
                                  {item.offer === "travel" ? <span className="mx-1">•</span> : null}
                                  <p className="mb-0">{item.offer === "travel" ? <span>{item.duration}</span> : ""}</p>
                                </div>

                                <div style={{ fontFamily: "Montserrat, sans-serif" }}>
                                  <p className="mb-0">
                                    {item.offer === "travel" ? <p>Viaggio con soggiorno</p> : null}
                                  </p>
                                </div>
                                <div style={{ fontFamily: "Montserrat, sans-serif" }}>
                                  <p className="mb-0">{item.offer === "stay" ? <p>Soggiorno</p> : null}</p>
                                </div>
                                <div style={{ fontFamily: "Montserrat, sans-serif" }}>
                                  <p className="mb-0">{item.offer === "room" ? <p>{item.name}</p> : null}</p>
                                </div>
                                <div style={{ fontFamily: "Montserrat, sans-serif" }}>
                                  <p className="mb-0">{item.offer === "tour" ? <p>Tour - {item.duration}</p> : null}</p>
                                </div>
                                <div style={{ fontFamily: "Montserrat, sans-serif" }}>
                                  <p className="mb-0">
                                    {item.type_offer === "deluxe" ? (
                                      <p>
                                        {item.name} • {item.duration}
                                      </p>
                                    ) : null}
                                  </p>
                                </div>
                                <div style={{ fontFamily: "Montserrat, sans-serif" }}>
                                  <p className="mb-0">
                                    <span style={{ fontWeight: "600", textDecoration: "underline" }}>Tassa:</span>{" "}
                                    {item.tax},00 €
                                  </p>
                                </div>
                              </div>
                            </Col>

                            {/* <Col xs={5} className="text-end"> */}
                            {/* <div>
                                <img
                                  className="rounded-2"
                                  src={item.image}
                                  style={{ width: "150px", height: "150px", objectFit: "cover" }}
                                  alt="Struttura"
                                />
                              </div>{" "} */}
                            {/* </Col> */}
                          </>
                        )}
                      </Row>
                      <hr />
                    </Container>
                  ))}
                  <Container style={{ fontFamily: "Montserrat, sans-serif" }}>
                    {isLoading ? (
                      <h4 className="text-center text-white">""</h4>
                    ) : (
                      <h4 className="text-center">Da pagare: {total},00 €</h4>
                    )}
                  </Container>
                  <div className="text-center" style={{ fontSize: "1rem", fontFamily: "Montserrat, sans-serif" }}>
                    {isLoading ? (
                      ""
                    ) : (
                      <Button className="button-search btn-block" variant="primary" onClick={handleProceedToPurchase}>
                        Procedi all'acquisto
                      </Button>
                    )}
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
