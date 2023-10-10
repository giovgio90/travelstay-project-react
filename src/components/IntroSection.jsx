import { Col, Container, Row } from "react-bootstrap";
import BestTours from "./BestTours";

const IntroSection = () => {
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
      <BestTours />
    </Container>
  );
};

export default IntroSection;
