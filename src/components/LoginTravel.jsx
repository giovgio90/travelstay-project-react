import Logo from "../assets/Logo.png";
import React, { useState } from "react";
import { Form, Button, Alert, Container, Row, Col, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/actions";
import { Link } from "react-router-dom";

const LoginTravel = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.username);
  const [showAlert, setShowAlert] = useState(false);

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
          setShowAlert(true);
          console.log("Utente non trovato");
        }
      } else {
        console.error("Si è verificato un errore durante l'accesso");
      }
    } catch (error) {
      console.error("Si è verificato un errore durante l'accesso:", error);
    }
  };

  return (
    <div className="login">
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <div className=" d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
              <div className="login-input">
                <div className="d-flex mb-5">
                  <div className="me-1">
                    <img src={Logo} width="25" height="35" className="d-inline-block" alt="Logo" />
                  </div>
                  <div className="align-self-center">
                    <h4 className="mb-0 text-black" style={{ fontSize: "1.3rem" }}>
                      TRAVELSTAY
                    </h4>
                  </div>
                </div>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      style={{ background: "#ffffff90" }}
                      type="text"
                      size="sm"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="mb-3"
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Control
                      className="mb-3"
                      size="sm"
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
                      <Button variant="success" size="lg" className="btn-explore mt-4 rounded-5 px-5 ">
                        Accedi
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Button variant="primary" type="submit" size="lg" className="btn-explore mt-4 rounded-5 px-5 ">
                        Login
                      </Button>
                      <Nav.Link className="pe-lg-4 text-white" href="/register">
                        Registrati
                      </Nav.Link>
                      {showAlert && (
                        <Alert variant="danger" className="mt-3">
                          Utente non trovato
                        </Alert>
                      )}
                    </>
                  )}
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginTravel;
