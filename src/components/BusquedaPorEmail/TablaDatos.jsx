import React from "react";
import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";
import { format, differenceInDays, parseISO } from "date-fns";

const TablaDatos = ({ encuestas }) => {
  const formatFecha = (fechaString) => {
    const fechaObj = new Date(fechaString);
    const formattedDate = format(fechaObj, "dd/MM/yyyy");
    return formattedDate;
  };

  return (
    <div className="my-2">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th scope="col">Usuario</th>
            <th>Fecha</th>
            <th>Nota</th>
            <th>Calificación</th>
            <th>Comentario</th>
            <th>Más información</th>
          </tr>
        </thead>
        <tbody>
          {encuestas.map((encuesta) => (
            <React.Fragment key={encuesta._recordId}>
              <tr>
                <td>{encuesta.UsuarioU}</td>
                <td>{formatFecha(encuesta.Fecha)}</td>
                <td>{encuesta.NPS_Calification}</td>
                <td>{encuesta.NPS_GROUP}</td>
                <td>{encuesta.Opinion}</td>

                <td colSpan="5">
                  <Accordion defaultActiveKey={null}>
                    <Accordion.Item eventKey={encuesta._recordId}>
                      <Accordion.Header>Ver +</Accordion.Header>
                      <Accordion.Body>
                        <ul>
                          <li>Ani: {encuesta.ANI}</li>
                          <li>
                            {`Demora en responder: ${differenceInDays(
                              parseISO(encuesta.Fecha_Resp),
                              parseISO(encuesta.Fecha)
                            )} días`}
                          </li>
                          <li>Tab_1: {encuesta.Tab_1}</li>
                          <li>Tab_2: {encuesta.Tab_2}</li>
                          <li>Tab_3: {encuesta.Tab_3}</li>
                          <li>Tab_4: {encuesta.Tab_4}</li>
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TablaDatos;
