import { Container, Row, Col, Image } from "react-bootstrap";
import Logo from "../assets/Logo.png";

import { Link } from "react-router-dom";
import FooterTravelStay from "./FooterTravelStay";
import { ArrowLeftCircleFill } from "react-bootstrap-icons";
import HeaderTwo from "./HeaderTwo";

const AboutUsPage = () => {
  return (
    <>
      <HeaderTwo />
      <div style={{ marginTop: "120px", marginBottom: "60px" }}>
        <Container className="mt-3">
          <Link to="/">
            <ArrowLeftCircleFill style={{ fontSize: "1.7rem", color: "#203040" }} />
          </Link>
        </Container>
        <Container>
          <Row className="mt-4 align-items-center" style={{ minHeight: "60vh" }}>
            <Col xs={12} md={7}>
              <h2
                className="about-us-title"
                style={{
                  fontFamily: "Impact, sans-serif",
                }}
              >
                Chi Siamo
              </h2>
              <p
                style={{
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Benvenuti su TravelStay! Siamo un'agenzia specializzata in offerte di viaggi e soggiorno e solo
                soggiorno, in destinazioni straordinarie di tutta Italia. La nostra missione è rendere le tue vacanze
                indimenticabili offrendoti i migliori servizi e alloggi di qualità.
              </p>
              <p
                style={{
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Con anni di esperienza nel settore dei viaggi, collaboriamo con i migliori alberghi e servizi per
                offrirti le offerte più convenienti e le esperienze di viaggio più straordinarie.
              </p>
              <p
                style={{
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Grazie per aver scelto TravelStay come tua agenzia di viaggi. Siamo entusiasti di aiutarti a pianificare
                le tue prossime avventure e a creare ricordi indimenticabili. <a href="/contact">Contattaci</a> per
                qualsiasi domanda o informazione di cui hai bisogno.
              </p>
            </Col>
            <Col xs={12} md={5} className="text-center">
              <Image src={Logo} width={350} height={350} alt="Chi Siamo" />
            </Col>
          </Row>
        </Container>
      </div>
      <FooterTravelStay />
    </>
  );
};

export default AboutUsPage;
