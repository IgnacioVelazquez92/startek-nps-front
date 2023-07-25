import React from 'react';
import Table from 'react-bootstrap/Table';

const TablaDatos = ({ encuestas }) => {
  return (
    <div>
      {encuestas ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Nota</th>
              <th>Calificación</th>
              <th>Comentario</th>
            </tr>
          </thead>
          <tbody>
            {encuestas.map((encuesta) => (
              <tr key={encuesta._recordId}>
                <td>{encuesta["Datos embebidos - AGENTE_RP"]}</td>
                <td>{encuesta['2 - En base a tu último contacto realizado, ¿qué probabilidad hay de que recomi...']}</td>
                <td>{encuesta['(Grupo) 2_NPS_GROUP - En base a tu último contacto realizado, ¿qué probabilidad hay de que recomi...']}</td>
                <td>{encuesta['3 - ¿Cuál es el motivo de tu calificación?']}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No se encontró nada</p>
      )}
    </div>
  );
};

export default TablaDatos;
