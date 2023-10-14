import { Button, Card, Spinner } from "react-bootstrap";

const LoadingCard = () => {
  return (
    <Card className="card-loading mb-4 rounded-3" style={{ backgroundColor: "white" }}>
      <div
        className="rounded-top-3"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "230px",
          backgroundColor: "grey",
        }}
      >
        <Spinner animation="border" variant="light" />
      </div>
      <Card.Body>
        <Card.Title className="placeholder-glow">
          <span className="placeholder col-4"></span>
        </Card.Title>
        <Card.Text className="placeholder-glow">
          <span className="placeholder col-1"></span>
          <span className="placeholder col-1"></span>
          <span className="placeholder col-5"></span>
          <span className="placeholder col-9"></span>
          <span className="placeholder col-9"></span>
        </Card.Text>
        <div className="d-grid gap-2">
          <Button
            className="border border-none disabled placeholder mx-auto col-6 text-center"
            aria-disabled="true"
            style={{ height: "25px", backgroundColor: "#0d151d" }}
          ></Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default LoadingCard;
