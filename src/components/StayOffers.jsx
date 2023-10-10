import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchstayOffers } from "../redux/actions";

const StayOffers = () => {
  const dispatch = useDispatch();
  const travelData = useSelector((state) => state.stay.data);
  const [visibleOffers, setVisibleOffers] = useState(4);

  useEffect(() => {
    dispatch(fetchstayOffers());
  }, [dispatch]);

  const handleShowMoreClick = () => {
    setVisibleOffers((prevVisibleOffers) => prevVisibleOffers + 4);
  };
  return (
    <div className="mt-5">
      <Container>
        <h4>Soggiorno</h4>
        <Row>
          {travelData.slice(0, visibleOffers).map((offer, id) => (
            <Col key={id} xs={12} md={6} lg={3}>
              <Card className="offer-card mb-4 border-0">
                <Card.Img
                  variant="top"
                  src={offer.image}
                  className="border-0"
                  style={{ height: "230px", objectFit: "cover" }}
                />
                <Card.Body className="pb-2">
                  <Card.Title style={{ fontSize: "1.2rem" }}>{offer.name}</Card.Title>
                  <Card.Text>
                    <strong style={{ fontWeight: "500" }}>Località:</strong>
                    <span
                      className="text-white px-2 mx-2 rounded-2"
                      style={{ fontWeight: "500", fontSize: "0.9rem", background: "#203040" }}
                    >
                      {offer.city}
                    </span>
                  </Card.Text>
                  <Card.Text>
                    <strong style={{ fontWeight: "500" }}>Host:</strong>
                    <span
                      className="text-white px-2 mx-2 rounded-2"
                      style={{ fontWeight: "500", fontSize: "0.9rem", background: "#203040" }}
                    >
                      {offer.host.name}
                    </span>
                  </Card.Text>
                  <Card.Text>
                    <strong style={{ fontWeight: "500" }}>Tipo struttura:</strong>
                    <span
                      className="text-white px-2 mx-2 rounded-2"
                      style={{ fontWeight: "500", fontSize: "0.9rem", background: "#203040" }}
                    >
                      {offer.type}
                    </span>
                  </Card.Text>

                  <Card.Text className="pt-auto mb-0">
                    <strong style={{ fontWeight: "500" }}>Prezzo:</strong>
                    <span
                      className="text-white px-2 mx-2 rounded-2"
                      style={{ fontWeight: "500", fontSize: "0.9rem", background: "red" }}
                    >
                      ${offer.price_per_adult}
                    </span>
                    <span className="ps-0">adulti</span>
                  </Card.Text>
                  <Card.Text>
                    <strong style={{ fontWeight: "500" }}>Prezzo:</strong>
                    <span
                      className="text-white px-2 mx-2 rounded-2"
                      style={{ fontWeight: "500", fontSize: "0.9rem", background: "red" }}
                    >
                      ${offer.price_per_child}
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
        {visibleOffers < travelData.length && (
          <div className="text-center mt-1">
            <Button
              variant="transparent"
              className="mx-auto pt-0 pb-2"
              style={{
                fontWeight: "500",
              }}
              onClick={handleShowMoreClick}
            >
              Visualizza Altro
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default StayOffers;
