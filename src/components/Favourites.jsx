import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite, toggleFavoriteTwo } from "../redux/actions";
import FooterTravelStay from "./FooterTravelStay";

import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ArrowLeftCircleFill } from "react-bootstrap-icons";
import { useEffect, useState } from "react";

import LoadingThree from "./LoadingThree";
import HeaderTwo from "./HeaderTwo";

const Favourites = () => {
  const favoritesTravel = useSelector((state) => state.travel.favorites);
  const favoritesStay = useSelector((state) => state.stay.favorites);
  const travelData = useSelector((state) => state.travel.data);
  const stayData = useSelector((state) => state.stay.data);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleRemoveFromFavorites = (offerId) => {
    dispatch(toggleFavorite(offerId));
  };

  const handleRemoveFromFavoritesTwo = (offerId) => {
    dispatch(toggleFavoriteTwo(offerId));
  };

  return (
    <div>
      <HeaderTwo />
      <Container style={{ marginTop: "120px", minHeight: "70vh" }}>
        {isLoading ? (
          ""
        ) : (
          <Link to="/">
            <ArrowLeftCircleFill className="mt-2 mb-4" style={{ fontSize: "1.7rem", color: "#203040" }} />
          </Link>
        )}

        <Row>
          {isLoading ? (
            <LoadingThree />
          ) : (
            <>
              <Col xs={12} md={12} lg={6} className="mb-3">
                <h2 className="favorite-title" style={{ fontFamily: "Impact, sans-serif", fontSize: "2.5rem" }}>
                  Viaggi preferiti
                </h2>
                {favoritesTravel.length === 0 ? (
                  <p style={{ fontFamily: "Montserrat, sans-serif" }}>Non hai viaggi tra i preferiti al momento.</p>
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
                                      className="rounded-2"
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
                  <p style={{ fontFamily: "Montserrat, sans-serif" }}>Non hai soggiorni tra i preferiti al momento.</p>
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
                                      className="rounded-2"
                                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
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
            </>
          )}
        </Row>
      </Container>

      <FooterTravelStay />
    </div>
  );
};

export default Favourites;
