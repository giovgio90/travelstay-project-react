import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Search from "../assets/Search.png";
import LoadingCard from "./LoadingCard";
import { Link, useLocation, useParams } from "react-router-dom";
import { fetchResultsOffers, fetchTravelOffers } from "../redux/actions";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import FooterTravelStay from "./FooterTravelStay";
import { ArrowLeftCircleFill, Calendar2CheckFill, ClockFill } from "react-bootstrap-icons";
import { FaEuroSign, FaMapMarkerAlt } from "react-icons/fa";
import HeaderTwo from "./HeaderTwo";

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

  useEffect(() => {
    dispatch(fetchResultsOffers(query));
    dispatch(fetchTravelOffers());
  }, [dispatch, query]);

  const filteredResults = results
    .filter(
      (offer) =>
        (query && offer.destination.toLowerCase() === query.toLowerCase()) ||
        (query && offer.region.toLowerCase() === query.toLowerCase())
    )
    .filter((offer) => (budget ? offer.price_per_adult <= budget : true))
    .filter((offer) => (formattedStartDate ? offer.date === formattedStartDate : true));

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <HeaderTwo />
      <Container>
        <div className="search-results" style={{ fontFamily: "Montserrat, sans-serif" }}>
          <Link to="/">
            <ArrowLeftCircleFill style={{ fontSize: "1.7rem", color: "#203040" }} />
          </Link>
          <h4 className="mt-4">
            Risultati di ricerca per: <strong>{query}</strong>
          </h4>

          {filteredResults.length === 0 ? (
            <>
              <p className="mt-5 text-center" style={{ fontSize: "1.5rem" }}>
                Nessun risultato trovato!
              </p>
              <div className="w-100 text-center" style={{ height: "65vh" }}>
                <img src={Search} width="150px" height="150px" alt="Search-not-found" />
              </div>
            </>
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
                      <Card.Body className="pb-2" style={{ fontFamily: "Montserrat, sans-serif" }}>
                        <div className="d-flex align-items-center mb-2">
                          <div>
                            <FaMapMarkerAlt className="pb-1" />
                          </div>
                          <div>
                            <Card.Title className="mb-0" style={{ fontSize: "1.2rem", fontWeight: "600" }}>
                              {offer.destination}
                            </Card.Title>
                          </div>
                        </div>
                        <div className="d-flex align-items-center mb-1">
                          <div>
                            <Calendar2CheckFill className="pb-1" />
                          </div>
                          <Card.Text className="mb-0">
                            <strong style={{ fontWeight: "500" }}>Data:</strong>
                            <span
                              className="text-white px-2 mx-2 rounded-2"
                              style={{ fontWeight: "500", fontSize: "0,9rem", background: "#203040" }}
                            >
                              {offer.date.split("-").reverse().join("/")}
                            </span>
                          </Card.Text>
                        </div>
                        <div className="d-flex align-items-center mb-1">
                          <div>
                            <ClockFill className="pb-1" />
                          </div>
                          <Card.Text>
                            <strong style={{ fontWeight: "500" }}>Durata:</strong>
                            <span
                              className="text-white px-2 mx-2 rounded-2"
                              style={{ fontWeight: "500", fontSize: "0.9rem", background: "#203040" }}
                            >
                              {offer.duration.toUpperCase()}
                            </span>
                          </Card.Text>
                        </div>
                        <div className="d-flex align-items-center mb-1">
                          <div>
                            <FaEuroSign className="pb-1" />
                          </div>
                          <Card.Text className="pt-auto mb-0">
                            <strong style={{ fontWeight: "500" }}>Prezzo adulto:</strong>
                            <span
                              className="text-white px-2 mx-2 rounded-2"
                              style={{ fontWeight: "500", fontSize: "0.9rem", background: "red" }}
                            >
                              {offer.price_per_adult},00 €
                            </span>
                          </Card.Text>
                        </div>
                        <div className="d-flex align-items-center">
                          <div>
                            <FaEuroSign className="pb-1" />
                          </div>
                          <Card.Text>
                            <strong style={{ fontWeight: "500" }}>Prezzo bambino:</strong>
                            <span
                              className="text-white px-2 mx-2 rounded-2"
                              style={{ fontWeight: "500", fontSize: "0.9rem", background: "red" }}
                            >
                              {offer.price_per_child},00 €
                            </span>
                          </Card.Text>
                        </div>
                      </Card.Body>
                      <Link to={`/explore/${offer.id}`} key={id} className="text-center">
                        <Button
                          variant="trasparent"
                          className="button-discover mx-auto pt-0 pb-2 w-50"
                          style={{
                            fontWeight: "600",
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
