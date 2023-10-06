import React, { useState } from "react";
import Logo from "../assets/Logo.png";
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
                <Form onSubmit={handleSubmit} className="text-center">
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      style={{ background: "#ffffff90" }}
                      type="text"
                      size="sm"
                      placeholder="Username"
                      value={username}
                      onChange={handleUsernameChange}
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
                      onChange={handlePasswordChange}
                      required
                    />
                  </Form.Group>
                  {isFormValid ? (
                    <Link to="/">
                      <Button variant="primary" type="submit" size="lg" className="btn-explore mt-4 rounded-5 px-5 ">
                        Login
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="trasparent"
                      type="submit"
                      size="lg"
                      className="custom-button btn-explore mt-4 rounded-5 px-5 "
                      disabled
                    >
                      Login
                    </Button>
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
