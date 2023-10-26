import { Button, Card, Col, Placeholder, Row, Spinner } from "react-bootstrap";

const LoadingTwo = () => {
  return (
    <div className="d-flex">
      <Card className="card-loading mb-4 mt-4 rounded-3 w-50" style={{ backgroundColor: "white" }}>
        <div
          className="rounded-top-3"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "170px",
            backgroundColor: "#75a6ff",
          }}
        >
          <Spinner animation="border border-grey" variant="light" />
        </div>
        <Card.Body className="rounded-bottom-2" style={{ backgroundColor: "#75a6ff" }}>
          <Row>
            <Col xs={12} lg={6} className="px-0">
              <Card.Title className="placeholder-glow"></Card.Title>
            </Col>
            <Col xs={12} lg={6} className="ps-2 py-1">
              <div className="d-grid gap-2"></div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoadingTwo;
