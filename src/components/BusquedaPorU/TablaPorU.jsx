import React from 'react';
import Table from 'react-bootstrap/Table';

const TablaDatos = ({ encuestas }) => {
  // Función para formatear la fecha en formato "MM/DD/YYYY" a "DD/MM/YYYY"
  const formatFecha = (fechaString) => {
    // Separa la fecha y la hora si es que viene en el formato completo
    const fechaSolo = fechaString.split('T')[0];
    
    // Obtén los componentes de la fecha
    const [year, month, day] = fechaSolo.split('-');
    
    // Crea el objeto Date con los componentes de la fecha
    const fechaObj = new Date(`${year}-${month}-${day}T00:00:00Z`);
    
    // Ahora puedes formatear la fecha como desees
    return fechaObj.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className='my-2'>
      {
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Fecha</th>
              <th>Nota</th>
              <th>Calificación</th>
              <th>Comentario</th>
            </tr>
          </thead>
          <tbody>
            {encuestas.map((encuesta) => (
              <tr key={encuesta._recordId}>
                <td>{encuesta["Datos embebidos - AGENTE_RP"]}</td>
                <td>{formatFecha(encuesta["Fecha"])}</td>
                <td>{encuesta['2 - En base a tu último contacto realizado, ¿qué probabilidad hay de que recomi...']}</td>
                <td>{encuesta['(Grupo) 2_NPS_GROUP - En base a tu último contacto realizado, ¿qué probabilidad hay de que recomi...']}</td>
                <td>{encuesta['3 - ¿Cuál es el motivo de tu calificación?']}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      }
    </div>
  );
};

export default TablaDatos;

