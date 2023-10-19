import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setFormData, registerUser } from "../redux/actions";

import Swal from "sweetalert2";

function RegisterPage() {
  const formData = useSelector((state) => state.register.formData);
  const dispatch = useDispatch();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showUserExistsAlert, setShowUserExistsAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ ...formData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await dispatch(registerUser(formData));

    if (response && response.userExists) {
      setShowUserExistsAlert(true);
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Registrazione avvenuta con successo!",
        showConfirmButton: false,
        timer: 2500,
      });
      dispatch(setFormData({ username: "", email: "", password: "", gender: "" }));
    }
  };

  useEffect(() => {
    if (showSuccessAlert) {
      const timer = setTimeout(() => {
        setShowSuccessAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showSuccessAlert]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={10}>
          <h2 className="text-center mt-2" style={{ fontSize: "2.2rem", fontFamily: "Impact, san-serif" }}>
            Ti diamo il benvenuto!
          </h2>

          {showUserExistsAlert && (
            <Alert variant="danger" onClose={() => setShowUserExistsAlert(false)} dismissible>
              Utente già registrato!
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
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
                className="mb-2"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="email">
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
                EMAIL
              </Form.Label>
              <Form.Control
                className="mb-2"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="password">
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
                className="mb-2"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="gender">
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
                GENERE
              </Form.Label>
              <Form.Control
                className="mb-2"
                as="select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Seleziona il tuo genere</option>
                <option value="male">Maschio</option>
                <option value="female">Femmina</option>
              </Form.Control>
            </Form.Group>
            <div className="text-center">
              <Button className="btn-explore mt-3 px-4 py-2" variant="primary" type="submit">
                REGISTRATI
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterPage;
