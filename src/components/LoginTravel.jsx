import "../login.css";
import Logo from "../assets/Logo.png";
import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/actions";
import { Link } from "react-router-dom";
import RegisterPage from "./RegisterPage";
import Swal from "sweetalert2";

const LoginTravel = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.username);

  const [showRegisterPage, setShowRegisterPage] = useState(false);

  const handleSignUpClick = () => {
    setShowRegisterPage(true);
  };

  const handleLoginClick = () => {
    setShowRegisterPage(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3030/register");
      if (response.ok) {
        const registeredUsers = await response.json();

        const foundUser = registeredUsers.find((user) => user.username === username && user.password === password);

        if (foundUser) {
          dispatch(setUser(foundUser));
          console.log("Accesso riuscito");
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Utente non esistente",
            showConfirmButton: false,
            timer: 2500,
          });
        }
      } else {
        console.error("Si è verificato un errore durante l'accesso");
      }
    } catch (error) {
      console.error("Si è verificato un errore durante l'accesso:", error);
    }
  };

  return (
    <section className="user">
      <div className="user_options-container">
        <div className="user_options-text">
          <Row>
            <Col lg={1}></Col>
            <Col lg={3} className="pe-0 ms-auto">
              <div className="d-flex align-items-center h-100">
                <img src={Logo} width="200" height="200" alt="Logo TravelStay" />
              </div>
            </Col>
            <Col lg={1}></Col>
            <Col lg={7}>
              <div className="user_options-unregistered px-0">
                <h2
                  className="user_unregistered-title "
                  style={{ fontSize: "1.5rem", fontFamily: "Impact, san-serif", width: "250px" }}
                >
                  Non hai un account?
                </h2>
                <p
                  className="user_unregistered-text"
                  style={{ fontSize: "1rem", fontFamily: "Montserrat, sans-serif" }}
                >
                  Registrati e scopri le fantastiche offerte di viaggi e soggiorno su TravelStay!
                </p>
                <button className="user_unregistered-signup" onClick={handleSignUpClick}>
                  Registrati
                </button>
              </div>
            </Col>
          </Row>

          <div className="user_options-registered">
            <h2 className="user_registered-title" style={{ fontSize: "1.6rem", fontFamily: "Impact, san-serif" }}>
              Hai un account?
            </h2>
            <p
              className="user_registered-text"
              style={{ fontSize: "1rem", fontFamily: "Montserrat, sans-serif", fontWeight: "400" }}
            >
              Effettua l'accesso al tuo account
            </p>
            <button className="user_registered-login" onClick={handleLoginClick}>
              Accedi
            </button>
          </div>
        </div>

        <div className={`user_options-forms ${showRegisterPage ? "bounceLeft" : "bounceRight"}`}>
          {showRegisterPage ? (
            <RegisterPage />
          ) : (
            <Container>
              <Row className="justify-content-center">
                <Col md={10}>
                  <h2 className="text-center mt-2" style={{ fontFamily: "Impact, san-serif", fontSize: "2.2rem" }}>
                    Accesso
                  </h2>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label
                        className="mb-0"
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: "0.8rem",
                          color: "#203040",
                          fontWeight: "bolder",
                          letterSpacing: "0.1rem",
                        }}
                      >
                        NOME UTENTE
                      </Form.Label>
                      <Form.Control
                        style={{ background: "#ffffff90" }}
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mb-3"
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label
                        className="mb-0"
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: "0.8rem",
                          color: "#203040",
                          fontWeight: "bolder",
                          letterSpacing: "0.1rem",
                        }}
                      >
                        PASSWORD
                      </Form.Label>
                      <Form.Control
                        className="mb-3"
                        style={{ background: "#ffffff90" }}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Form.Group>
                    {user ? (
                      <Link to="/">
                        <div className="text-center mt-5">
                          <Button size="lg" className="btn-explore mt-4  px-5 ">
                            ACCEDI
                          </Button>
                        </div>
                      </Link>
                    ) : (
                      <>
                        <div className="text-center mt-4">
                          <Button type="submit" size="lg" className="btn-explore mt-5  px-5 ">
                            ACCEDI
                          </Button>
                        </div>
                      </>
                    )}
                  </Form>
                </Col>
              </Row>
            </Container>
          )}
        </div>
      </div>
    </section>
  );
};

export default LoginTravel;
