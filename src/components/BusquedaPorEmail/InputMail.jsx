import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { ApiClient } from "../../api/services";
import TablaDatos from "./TablaDatos";
import Loader from "../Loader/Loader";
import CaculoNPS from "../Charts/CalculoNPS";

const InputMail = () => {
  const apiClient = new ApiClient();
  const [email, setEmail] = useState("");
  const [encuestas, setEncuestas] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value.toUpperCase());
    console.log(e.target.value.toUpperCase());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setLoading(true);
    try {
      const response = await apiClient.getNpsbyEmail(email);
      if (response) {
        setEncuestas(response.data);
      } else {
        setEncuestas([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-center">Busqueda de clientes vía mail</h1>
      <h4 className="text-center my-3 bg-success rounded-3 p-2 text-light">
        Las encuestas NPS de los clientes son tesoros de personalización. Cada
        respuesta refleja sus necesidades. Al leerlas, puedes ajustar tu enfoque
        para conectar mejor, mostrando que valoras su opinión.
      </h4>
      <Form onSubmit={handleSubmit} className="d-flex justify-content-center">
        <Form.Control
          size="lg"
          type="email"
          placeholder="Introduce el email del cliente"
          name="email"
          id="email"
          onChange={handleChange}
          required
          pattern="^[^@]+@[^@]+\.[a-zA-Z]{2,}$"
        />

        <Button variant="primary" type="submit" className="ms-2">
          Buscar
        </Button>
      </Form>
      {loading && <Loader className="mx-auto" />}

      {encuestas && encuestas.length > 0 && <CaculoNPS data={encuestas} />}

      {encuestas && encuestas.length > 0 && (
        <TablaDatos encuestas={encuestas} />
      )}

      {encuestas && encuestas.length == 0 && (
        <p className="my-2 text-center">No se encontraron registros del mail</p>
      )}
    </>
  );
};

export default InputMail;
