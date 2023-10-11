import { useDispatch, useSelector } from "react-redux";
import { fetchTravelOffers } from "../redux/actions";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Dropdown, DropdownButton, Row } from "react-bootstrap";
import Header from "./Header";
import { Link } from "react-router-dom";
import FooterTravelStay from "./FooterTravelStay";
import StayOffers from "./StayOffers";

const OffersPage = ({ travel }) => {
  const [isSticky, setIsSticky] = useState(false);
  const dispatch = useDispatch();
  const travelData = useSelector((state) => state.travel.data);
  const [visibleOffers, setVisibleOffers] = useState(4);

  useEffect(() => {
    dispatch(fetchTravelOffers());
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

  const handleShowMoreClick = () => {
    setVisibleOffers((prevVisibleOffers) => prevVisibleOffers + 4);
  };

  const divClassName = isSticky ? "div-sticky" : "div-no-sticky";

  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <>
      <Header />
      <div className={divClassName}>
        <Container>
          <div className="d-flex mb-3 align-items-center">
            <div>
              <h4 className="mb-0" style={{ paddingBottom: "5px" }}>
                Viaggi con soggiorno:
              </h4>
            </div>
            <div className="ms-auto">
              <DropdownButton
                variant="trasparent"
                className="dropdown-basic-button"
                title={selectedItem || "Filtra"}
                onSelect={handleSelect}
              >
                <Dropdown.Item eventKey="Elemento 1">Elemento 1</Dropdown.Item>
                <Dropdown.Item eventKey="Elemento 2">Elemento 2</Dropdown.Item>
                <Dropdown.Item eventKey="Elemento 3">Elemento 3</Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
          <Row>
            {travelData.slice(0, visibleOffers).map((offer, id) => (
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
      <StayOffers />
      <FooterTravelStay />
    </>
  );
};

export default OffersPage;
