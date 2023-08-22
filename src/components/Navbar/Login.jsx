import { useState } from "react";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import Row from "react-bootstrap/Row";

function Login() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Form
      className="d-flex flex-column"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom01">
          <Form.Label>Usuario</Form.Label>
          <Form.Control required type="text" placeholder="Usuario u" />
          <Form.Control.Feedback>Hecho!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Ingrese usuario valido
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom02">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control required type="password" placeholder="Contraseña" />
          <Form.Control.Feedback>Hecho</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            +6 caracteres
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <button className="btn btn-outline-success" type="submit">
        Ingresar
      </button>
    </Form>
  );
}

export default Login;
