import React from 'react'


const CalculoNPS = ({ data }) => {
  // Función para calcular el NPS
  const calculateNps = (promoters, detractors, totalResponses) => {
    const nps = ((promoters - detractors) / totalResponses) * 100;
    return nps.toFixed(2);
  };

  // Filtrar los registros según el valor de "NPS_GROUP"
  const promoters = data.filter(item => item.NPS_GROUP === 'Promotor').length;
  const detractors = data.filter(item => item.NPS_GROUP === 'Detractor').length;
  const neutrals = data.filter(item => item.NPS_GROUP === 'Pasivo').length;

  // Calcular el NPS
  const totalResponses = promoters + detractors + neutrals;
  const nps = calculateNps(promoters, detractors, totalResponses);

// //empaquetar

// const data = [
//   { Clientes: 'Promotores', count: promoters },
//   { Clientes: 'Detractores', count: detractors },
//   { Clientes: 'Neutros', count: neutrals },
// ];

  return (

    <>
    <h1 className='text-center'>Resultados:</h1>
    <table className="table table-hover my-3 responsive container">
      <tbody>
      <tr className="table-success">
        <th scope="row">Promotores</th>
        <td>{promoters}</td>
      </tr>

      <tr className="table-danger">
        <th scope="row">Detractores</th>
        <td>{detractors}</td>
      </tr>

      <tr className="table-warning">
        <th scope="row">Neutros</th>
        <td>{neutrals}</td>
      </tr>

      <tr className="table-light">
        <th scope="row">Total de respuestas:</th>
        <td>{totalResponses}</td>
      </tr>
      <tr className="table-info">
        <th scope="row">NPS</th>
        <td>{nps}%</td>
      </tr>
      </tbody>
    </table>
    </>

  );
}

export default CalculoNPS