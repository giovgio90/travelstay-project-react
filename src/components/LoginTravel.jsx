import Logo from "../assets/Logo.png";
import React, { useState } from "react";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/actions"; // Assicurati di importare setUser dall'azione corretta
import { Link } from "react-router-dom";

const LoginTravel = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.username); // Leggi lo stato dell'utente dallo store Redux
  const [showAlert, setShowAlert] = useState(false); // Inizializza showAlert a false

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulazione di una richiesta GET per ottenere gli utenti registrati
    try {
      const response = await fetch("http://localhost:3030/register");
      if (response.ok) {
        const registeredUsers = await response.json();

        // Verifica se le credenziali corrispondono a uno degli utenti registrati
        const foundUser = registeredUsers.find((user) => user.username === username && user.password === password);

        if (foundUser) {
          // Credenziali valide, effettua il login
          dispatch(setUser(foundUser)); // Invia un'azione per impostare l'utente nello stato Redux
          console.log("Accesso riuscito");
          // Reindirizza l'utente alla pagina successiva o effettua altre azioni dopo il login
        } else {
          // Credenziali non valide, mostra un messaggio di errore
          setShowAlert(true); // Imposta showAlert a true solo quando l'utente non è stato trovato
          console.log("Utente non trovato");
        }
      } else {
        // Gestione degli errori se la richiesta non va a buon fine
        console.error("Si è verificato un errore durante l'accesso");
      }
    } catch (error) {
      // Gestione degli errori in caso di eccezioni
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
