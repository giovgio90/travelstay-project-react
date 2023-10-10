import React, { useState, useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Italy from "../assets/Italy.jpg";
import Greece from "../assets/Greece.jpg";
import Ireland from "../assets/Ireland.jpg";
import Dubai from "../assets/Dubai.jpg";
import France from "../assets/France.jpg";
import Spain from "../assets/Spain.jpg";

const allTourData = [
  {
    id: 1,
    title: "ROMA",
    price: "A partire da 299€",
    imageSrc: Italy,
  },
  {
    id: 2,
    title: "VENEZIA",
    price: "A partire da 399€",
    imageSrc: Greece,
  },
  {
    id: 3,
    title: "FIRENZE",
    price: "A partire da 449€",
    imageSrc: Ireland,
  },
  {
    id: 4,
    title: "AMALFI",
    price: "A partire da 789€",
    imageSrc: Dubai,
  },
  {
    id: 5,
    title: "CINQUE TERRE",
    price: "A partire da 219€",
    imageSrc: France,
  },
  {
    id: 6,
    title: "TAORMINA",
    price: "A partire da 329€",
    imageSrc: Spain,
  },
];

const BestTours = () => {
  const [tourData, setTourData] = useState([]);

  useEffect(() => {
    const randomTours = [];
    while (randomTours.length < 3) {
      const randomIndex = Math.floor(Math.random() * allTourData.length);
      const selectedTour = allTourData[randomIndex];
      if (!randomTours.find((tour) => tour.id === selectedTour.id)) {
        randomTours.push(selectedTour);
      }
    }
    setTourData(randomTours);
  }, []);

  return (
    <Row className="my-4">
      {tourData.map((tour) => (
        <Col key={tour.id} xs={12} md={12} lg={4}>
          <Card className="bg-dark text-white text-center border-0 me-2 mb-3 hover-scale" style={{ height: "400px" }}>
            <Card.Img src={tour.imageSrc} alt={tour.title} style={{ objectFit: "cover", height: "100%" }} />
            <Card.ImgOverlay className="card-tours d-flex flex-column justify-content-center align-items-center">
              <div className="mt-auto">
                <Card.Title className="display-3 pt-3 fw-bolder">{tour.title}</Card.Title>
              </div>
              <div className="mt-auto">
                <Card.Text>{tour.price}</Card.Text>
                <Button className="btn-tours rounded-5">SCOPRI DI PIÚ</Button>
              </div>
            </Card.ImgOverlay>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default BestTours;
