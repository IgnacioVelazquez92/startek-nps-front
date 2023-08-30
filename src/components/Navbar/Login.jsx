import { useState, useContext } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { ApiClient } from "../../api/services";
import Swal from "sweetalert2";
import Loader from "../Loader/Loader";
import UserContext from "../../../context/userContext";

function Login({ setShow }) {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formLog, setFormLog] = useState({
    email: "",
    password: "",
  });
  const { user, setUser } = useContext(UserContext);
  const apiClient = new ApiClient();

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    if (form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      try {
        setLoading(true);
        const response = await apiClient.login(formLog);
        Swal.fire({
          title: "¡Éxito!",
          text: response.data.msg,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        await changeUserContext(response);
        return;
      } catch (error) {
        Swal.fire({
          title: "¡Error!",
          text: error.response
            ? error.response.data.msg
            : "☹ ups.. algo fallo, intente más tarde",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      } finally {
        setShow(false);
        setLoading(false);
      }
    }
  };

  const handleChangeLog = (e) => {
    const { type, value } = e.target;
    setFormLog({ ...formLog, [type]: value });
    console.log(formLog);
  };

  const changeUserContext = async (response) => {
    const { userData } = response.data;
    const { id, email, lastName, name, legajoU } = userData;
    await setUser({
      ...user,
      id,
      email,
      lastName,
      name,
      legajoU,
    });
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
          <Form.Control
            required
            type="email"
            placeholder="Mail empresarial"
            pattern="^[^@]+@[^@]+\.[a-zA-Z]{2,}$"
            onChange={handleChangeLog}
          />
          <Form.Control.Feedback>Hecho!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            formato incorrecto
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom02">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Contraseña"
            onChange={handleChangeLog}
          />
          <Form.Control.Feedback>Hecho</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            formato incorrecto
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <button className="btn btn-outline-success" type="submit">
        Ingresar
      </button>
      {loading && <Loader className="mx-auto" />}
    </Form>
  );
}

export default Login;
