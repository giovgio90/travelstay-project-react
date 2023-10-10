import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setFormData, registerUser } from "../redux/actions";
import { Link } from "react-router-dom";

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
      setShowSuccessAlert(true);

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
        <Col md={6}>
          <h2>Registrazione</h2>
          {showSuccessAlert && (
            <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
              Registrazione avvenuta con successo!
            </Alert>
          )}
          {showUserExistsAlert && (
            <Alert variant="danger" onClose={() => setShowUserExistsAlert(false)} dismissible>
              Utente già registrato!
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Nome utente</Form.Label>
              <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="gender">
              <Form.Label>Genere</Form.Label>
              <Form.Control as="select" name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Seleziona il tuo genere</option>
                <option value="male">Maschio</option>
                <option value="female">Femmina</option>
              </Form.Control>
            </Form.Group>

            <Button className="btn-explore mt-3 me-4" variant="primary" type="submit">
              Registrati
            </Button>
            <Link to="/login">
              <Button className="btn-explore mt-3" variant="primary" type="submit">
                Accedi
              </Button>
            </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterPage;
