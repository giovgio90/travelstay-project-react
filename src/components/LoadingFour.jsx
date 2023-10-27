import { Card, Col, Row, Spinner } from "react-bootstrap";

const LoadingFour = () => {
  return (
    <div className="d-flex">
      <Card className="card-loading mb-4 mt-0 rounded-3 w-100" style={{ backgroundColor: "white" }}>
        <div
          className="rounded-top-3"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",

            height: "340px",
            backgroundColor: "#203040",
          }}
        >
          <Spinner animation="border border-grey" variant="light" />
        </div>
        <Card.Body className="rounded-bottom-2" style={{ backgroundColor: "#203040" }}>
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

export default LoadingFour;
