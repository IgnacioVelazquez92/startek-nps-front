import React, { useState, useContext, useEffect } from "react";
import { ApiClient } from "../../api/services";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Loader from "../Loader/Loader";
import CaculoNPS from "../Charts/CalculoNPS";
import TablaDatos from "./TablaDatos";
import AbmContext from "../../context/Abncontext";

const InputMail = () => {
  const apiClient = new ApiClient();
  const { cliente, setCliente } = useContext(AbmContext);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(cliente.email); // Inicializa el email desde el contexto

  const handleChange = (e) => {
    setEmail(e.target.value.toUpperCase());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    setLoading(true);

    try {
      const response = await apiClient.getNpsbyEmail(email);
      if (response) {
        setCliente({ ...cliente, email, encuestas: response.data });
      } else {
        setCliente({ ...cliente, email: "", encuestas: [] });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Actualiza el email en el estado local cuando cambia en el contexto
    setEmail(cliente.email);
  }, [cliente.email]);

  useEffect(() => {
    // Configura el estado inicial cuando se monta el componente
    if (cliente.email) {
      setEmail(cliente.email);
    }
  }, [cliente.email]);

  return (
    <>
      <h1 className="text-center">Búsqueda de clientes vía mail</h1>
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
          value={email}
        />

        <Button variant="primary" type="submit" className="ms-2">
          Buscar
        </Button>
      </Form>
      {loading && <Loader className="mx-auto" />}

      {cliente.encuestas.length > 0 && <CaculoNPS data={cliente.encuestas} />}
      {cliente.encuestas.length > 0 && (
        <TablaDatos encuestas={cliente.encuestas} />
      )}
      {cliente.encuestas.length === 0 && (
        <p className="my-2 text-center">No se encontraron registros del mail</p>
      )}
    </>
  );
};

export default InputMail;
