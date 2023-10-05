import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Standard from "../assets/rooms/Standard.jpg";
import Deluxe from "../assets/rooms/Deluxe.jpg";
import Executive from "../assets/rooms/Executive.jpg";
import Family from "../assets/rooms/Family.jpg";
import Ocean from "../assets/rooms/Ocean.jpg";
import Presidential from "../assets/rooms/Presidential.jpg";
import Cozy from "../assets/rooms/Cozy.jpeg";
import Mountain from "../assets/rooms/Mountain.jpg";

const BestRooms = () => {
  const hotelRooms = [
    {
      id: 1,
      name: "Standard Room",
      price: "$99/night",
      description: "Comfortable room with all basic amenities.",
      image: Standard,
    },
    {
      id: 2,
      name: "Deluxe Room",
      price: "$149/night",
      description: "Spacious and luxurious room with a great view.",
      image: Deluxe,
    },
    {
      id: 3,
      name: "Executive Suite",
      price: "$249/night",
      description: "A suite with premium amenities and services.",
      image: Executive,
    },
    {
      id: 4,
      name: "Family Suite",
      price: "$199/night",
      description: "Perfect for families with additional space and features.",
      image: Family,
    },
    {
      id: 5,
      name: "Ocean View Suite",
      price: "$299/night",
      description: "Enjoy stunning ocean views from your suite.",
      image: Ocean,
    },
    {
      id: 6,
      name: "Presidential Suite",
      price: "$499/night",
      description: "Experience luxury at its finest in our presidential suite.",
      image: Presidential,
    },
    {
      id: 7,
      name: "Cozy Cabin",
      price: "$79/night",
      description: "A cozy cabin in the woods, perfect for a peaceful getaway.",
      image: Cozy,
    },
    {
      id: 8,
      name: "Mountain View Retreat",
      price: "$199/night",
      description: "Escape to the mountains in our serene mountain view retreat.",
      image: Mountain,
    },
  ];

  return (
    <Container className="mt-4">
      <h3 className="text-center mb-4" style={{ fontSize: "2.1rem" }}>
        THE BEST OFFERS ROOMS
      </h3>
      <Row>
        {hotelRooms.map((room) => (
          <Col key={room.id} xs={12} md={6} lg={3}>
            <Card className="bg-dark text-white text-center border-0 me-2 mb-3" style={{ height: "400px" }}>
              <Card.Img src={room.image} alt={room.name} style={{ objectFit: "cover", height: "100%" }} />
              <Card.ImgOverlay className="card-tours d-flex flex-column justify-content-center align-items-center">
                <div className="mt-auto">
                  <Card.Text>{room.price}</Card.Text>
                  <Button className="btn-tours">{room.name}</Button>
                </div>
              </Card.ImgOverlay>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BestRooms;
