import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Logo from "../assets/Logo.png";
import { Link, useParams } from "react-router-dom";
import { fetchResultsOffers, fetchTravelOffers, setUser } from "../redux/actions";
import { Button, Card, Col, Container, Form, Nav, Navbar, Row } from "react-bootstrap";
import FooterTravelStay from "./FooterTravelStay";

const SearchResults = () => {
  const { query } = useParams();
  const dispatch = useDispatch();
  const { results, loading, error } = useSelector((state) => state.search);

  const username = useSelector((state) => state.user.username);

  const handleLogout = () => {
    dispatch(setUser(null));
  };

  useEffect(() => {
    dispatch(fetchResultsOffers(query));
    dispatch(fetchTravelOffers());
  }, [dispatch, query]);

  const filteredResults = results.filter((offer) => offer.destination.toLowerCase().includes(query.toLowerCase()));

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbar expand="lg" className="navbar-head py-3">
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
                      <Link to="/" onClick={handleLogout}>
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
      <Container>
        <div className="search-results">
          <h4>Risultati di ricerca per: {query}</h4>
          <Row>
            {filteredResults.map((offer, id) => (
              <Col key={id} xs={12} md={6} lg={3}>
                <Card className="offer-card mb-4 border-0">
                  <Card.Img
                    variant="top"
                    src={offer.image}
                    className="border-0 image-hover-scale"
                    style={{ height: "230px", objectFit: "cover" }}
                  />
                  <Card.Body className="pb-2">
                    <Card.Title style={{ fontSize: "1.2rem" }}>{offer.destination}</Card.Title>
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
                      <strong style={{ fontWeight: "500" }}>Prezzo:</strong>
                      <span
                        className="text-white px-2 mx-2 rounded-2"
                        style={{ fontWeight: "500", fontSize: "0.9rem", background: "red" }}
                      >
                        {offer.price_per_adult}€
                      </span>
                      <span className="ps-0">adulti</span>
                    </Card.Text>
                    <Card.Text>
                      <strong style={{ fontWeight: "500" }}>Prezzo:</strong>
                      <span
                        className="text-white px-2 mx-2 rounded-2"
                        style={{ fontWeight: "500", fontSize: "0.9rem", background: "red" }}
                      >
                        {offer.price_per_child}€
                      </span>
                      <span className="ps-0">bambini</span>
                    </Card.Text>
                  </Card.Body>
                  <Link to={`/explore/${offer.id}`} key={id} className="text-center">
                    <Button
                      variant="trasparent"
                      className="mx-auto pt-0 pb-2 w-50"
                      style={{
                        fontWeight: "500",
                      }}
                    >
                      Scopri di più
                    </Button>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
      <FooterTravelStay />
    </>
  );
};

export default SearchResults;
