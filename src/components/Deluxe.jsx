import { Button, Card, Container } from "react-bootstrap";
import { StarFill } from "react-bootstrap-icons";

const Deluxe = () => {
  return (
    <div className="deluxe d-flex justify-content-center align-items-center mb-5">
      <Container>
        <Card className="text-center py-5">
          <div style={{ fontSize: "2rem", color: "rgb(197, 235, 27)" }}>
            <StarFill />
            <StarFill className="mx-1" />
            <StarFill />
            <StarFill className="mx-1" />
            <StarFill />
          </div>
          <Card.Body>
            <Card.Title className="display-5 pb-4" style={{ fontSize: "4rem", fontFamily: "Impact, sans-serif" }}>
              PACCHETTO COSTA AMALFITANA DELUXE
            </Card.Title>
            <Card.Text
              className="px-2 fs-5 text-secondary"
              style={{ fontWeight: "400", fontFamily: "Montserrat, sans-serif" }}
            >
              Esplora le meraviglie della Costa Amalfitana con il nostro pacchetto Deluxe. Un'esperienza unica di relax
              e avventura in un paradiso italiano.
            </Card.Text>
            <Button variant="primary" size="lg" className="button-search mt-4  px-5 ">
              PRENOTA ORA
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Deluxe;
