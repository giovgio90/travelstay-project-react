import { Col, Container, Row } from "react-bootstrap";
import BestTours from "./BestTours";

const IntroSection = () => {
  return (
    <Container>
      <Row className="justify-content-center pt-3">
        <Col xs={10} md={10} lg={10}>
          <div className="intro text-center mt-3">
            <h3>We have the best tours</h3>
            <p className="text-secondary fst-italic pt-2">
              Here are the best tours to satisfy your thirst for adventure! With our selection of excellent tours, you
              can explore the most extraordinary places in the world.
            </p>
          </div>
        </Col>
      </Row>
      <BestTours />
    </Container>
  );
};

export default IntroSection;
