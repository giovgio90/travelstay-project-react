import { Col, Container, Row } from "react-bootstrap";
import BestTours from "./BestTours";
import { useEffect, useState } from "react";
import LoadingCard from "./LoadingCard";

const IntroSection = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simula il caricamento con un timeout (puoi rimuovere questo blocco in un'applicazione reale)
    setTimeout(() => {
      setLoading(false); // Imposta il caricamento su false per indicare che il caricamento è completo
    }, 1000); // Simula un tempo di caricamento di 2 secondi
  }, []);
  return (
    <Container>
      <Row className="justify-content-center pt-3">
        <Col xs={10} md={10} lg={10}>
          <div className="intro text-center mt-3">
            <h3>I migliori tour</h3>
            <p className="text-secondary fst-italic pt-2">
              Ecco i migliori tour per soddisfare la vostra sete di avventura! Con la nostra selezione di tour
              eccellenti, potrete esplorare i luoghi più straordinari d'Italia.
            </p>
          </div>
        </Col>
      </Row>
      {loading ? (
        <div className="d-flex">
          <Row className="w-100">
            <Col xs={12} md={12} lg={4}>
              <LoadingCard />
            </Col>
            <Col xs={12} md={12} lg={4}>
              <LoadingCard />
            </Col>
            <Col xs={12} md={12} lg={4}>
              <LoadingCard />
            </Col>
          </Row>
        </div>
      ) : (
        <BestTours />
      )}
    </Container>
  );
};

export default IntroSection;
