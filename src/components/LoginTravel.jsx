import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const LoginTravel = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const isFormValid = username.trim() !== "" && password.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div>
              <h2>Login</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Inserisci email"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Inserisci password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </Form.Group>
                {isFormValid ? (
                  <Link to="/">
                    <Button variant="primary" type="submit">
                      Accedi
                    </Button>
                  </Link>
                ) : (
                  <Button variant="primary" type="button" disabled>
                    Accedi
                  </Button>
                )}
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginTravel;
