import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Logo from "../assets/Logo.png";
import LoadingCard from "./LoadingCard";
import { Link, useLocation, useParams } from "react-router-dom";
import { fetchResultsOffers, fetchTravelOffers, setUser } from "../redux/actions";
import { Badge, Button, Card, Col, Container, Form, Nav, NavDropdown, Navbar, Row } from "react-bootstrap";
import FooterTravelStay from "./FooterTravelStay";
import { AirplaneFill, Cart3, EnvelopeFill, HouseFill, PersonCircle, PersonFill } from "react-bootstrap-icons";

const SearchResults = () => {
  const { query } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const { results, error } = useSelector((state) => state.search);
  const searchParams = new URLSearchParams(location.search);
  const formattedStartDate = searchParams.get("startDate");

  const budget = parseFloat(searchParams.get("budget"));
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const username = useSelector((state) => state.user.username);
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
    dispatch(fetchResultsOffers(query));
    dispatch(fetchTravelOffers());
  }, [dispatch, query]);

  const filteredResults = results
    .filter(
      (offer) =>
        offer.destination.toLowerCase().includes(query.toLowerCase()) ||
        offer.region.toLowerCase().includes(query.toLowerCase())
    )

    .filter((offer) => (budget ? offer.price_per_adult <= budget : true))
    .filter((offer) => (formattedStartDate ? offer.date === formattedStartDate : true));

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbar expand="lg" className="navbar-head py-0">
        <Container>
          <Navbar.Brand className="d-flex">
            <Navbar.Brand className="d-flex  ms-2 me-0 ps-auto p-0">
              <img src={Logo} width="80" height="80" alt="Logo" />
            </Navbar.Brand>
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

      <Container>
        <div className="search-results">
          <h4>Risultati di ricerca per: {query}</h4>

          {filteredResults.length === 0 ? (
            <p style={{ height: "65vh" }}>Nessun risultato trovato</p>
          ) : (
            <Row>
              {filteredResults.map((offer, id) => (
                <Col key={id} xs={12} md={6} lg={3}>
                  {loading ? (
                    <LoadingCard />
                  ) : (
                    <Card className="offer-card mb-4 border-0">
                      <Card.Img
                        variant="top"
                        src={offer.image}
                        className="border-0 image-hover-scale"
                        style={{ height: "230px", objectFit: "cover" }}
                      />
                      <Card.Body className="pb-2">
                        <Card.Title style={{ fontSize: "1.2rem" }}>{offer.destination}</Card.Title>
                        <Card.Text className="mb-0">
                          <strong style={{ fontWeight: "500" }}>Data:</strong>
                          <span
                            className="text-white px-2 mx-2 rounded-2"
                            style={{ fontWeight: "500", fontSize: "0,9rem", background: "#203040" }}
                          >
                            {offer.date.split("-").reverse().join("/")}
                          </span>
                        </Card.Text>
                        <Card.Text>
                          <strong style={{ fontWeight: "500" }}>Durata:</strong>
                          <span
                            className="text-white px-2 mx-2 rounded-2"
                            style={{ fontWeight: "500", fontSize: "0.9rem", background: "#203040" }}
                          >
                            {offer.duration.toUpperCase()}
                          </span>
                        </Card.Text>

                        <Card.Text className="pt-auto mb-0">
                          <strong style={{ fontWeight: "500" }}>Prezzo adulto:</strong>
                          <span
                            className="text-white px-2 mx-2 rounded-2"
                            style={{ fontWeight: "500", fontSize: "0.9rem", background: "red" }}
                          >
                            {offer.price_per_adult},00 €
                          </span>
                        </Card.Text>
                        <Card.Text>
                          <strong style={{ fontWeight: "500" }}>Prezzo bambino:</strong>
                          <span
                            className="text-white px-2 mx-2 rounded-2"
                            style={{ fontWeight: "500", fontSize: "0.9rem", background: "red" }}
                          >
                            {offer.price_per_child},00 €
                          </span>
                        </Card.Text>
                      </Card.Body>
                      <Link to={`/explore/${offer.id}`} key={id} className="text-center">
                        <Button
                          variant="trasparent"
                          className="button-discover mx-auto pt-0 pb-2 w-50"
                          style={{
                            fontWeight: "500",
                            color: "#203040",
                          }}
                        >
                          Scopri di più
                        </Button>
                      </Link>
                    </Card>
                  )}
                </Col>
              ))}
            </Row>
          )}
        </div>
      </Container>
      <FooterTravelStay />
    </>
  );
};

export default SearchResults;
