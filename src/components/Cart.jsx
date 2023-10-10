import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/actions";
import FooterTravelStay from "./FooterTravelStay";
import Header from "./Header";
import { useEffect, useState } from "react";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const [isSticky, setIsSticky] = useState(false);

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
    dispatch(removeFromCart(productId));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const divClassName = isSticky ? "div-sticky" : "div-no-sticky";

  return (
    <>
      <Header />
      <div className={divClassName} style={{ padding: "30px 0" }}>
        <Container>
          <h2 className="text-center mb-4">Il tuo Carrello</h2>
          {cartItems.length === 0 ? (
            <p className="text-center">Il carrello è vuoto.</p>
          ) : (
            <Row
              className="justify-content-center
            "
            >
              {cartItems.map((item) => (
                <Col key={item.id} md={4} className="text-center">
                  <Card className="mb-4" style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}>
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>Prezzo: {item.price}€</Card.Text>
                      <Button variant="danger" onClick={() => handleRemoveFromCart(item.id)}>
                        Rimuovi dal carrello
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
          {cartItems.length > 0 && (
            <div
              className="cart-summary mt-4 text-center"
              style={{ background: "#fff", padding: "20px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}
            >
              <h3 className="text-center">Totale: {calculateTotal()}€</h3>
              <Button className="btn-primary btn-block" variant="primary">
                Procedi all'acquisto
              </Button>
            </div>
          )}
        </Container>
      </div>
      <FooterTravelStay />
    </>
  );
};

export default Cart;
