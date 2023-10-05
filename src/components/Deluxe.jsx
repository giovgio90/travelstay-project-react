import { Button, Card, Container } from "react-bootstrap";

const Deluxe = () => {
  return (
    <div className="deluxe d-flex justify-content-center align-items-center mb-5">
      <Container>
        <Card className="text-center py-5">
          <Card.Body>
            <Card.Title className="display-5 pb-4" style={{ fontWeight: "500" }}>
              MALDIVE DELUXE PACKAGE
            </Card.Title>
            <Card.Text className="px-2 fs-5 text-secondary" style={{ fontWeight: "400" }}>
              Explore the wonders of the Maldives with our deluxe package. A unique experience of relax and adventure in
              a tropical paradise.
            </Card.Text>
            <Button variant="primary" size="lg" className="btn-explore mt-4 rounded-5 px-5 ">
              BOOK NOW
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Deluxe;
