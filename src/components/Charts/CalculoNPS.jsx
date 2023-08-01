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

   //filtro de Pilares Cordialidad, conocimiento , Claridad

  const calculoPilares = (filtro) =>{    
    const muySatisfecho = data.filter(item => item[filtro] === 'Muy satisfecho').length;
    const bastanteSatisfecho = data.filter(item => item[filtro] === 'Bastante satisfecho').length;
    const niSatNiInsat = data.filter(item => item[filtro] === 'Ni satisfecho ni insatisfecho').length;
    const pocoSatisfecho = data.filter(item => item[filtro] === 'Poco satisfecho').length;
    const nadaSatisfecho = data.filter(item => item[filtro] === 'Nada satisfecho').length;
  
  
    const metricaPilar = (muySatisfecho + bastanteSatisfecho)/(muySatisfecho+bastanteSatisfecho+niSatNiInsat+pocoSatisfecho+nadaSatisfecho) *100
  

    return metricaPilar.toFixed(2)
  }

  const calculoResolución = () =>{    
    const resuelto = data.filter(item => item.Resolucion === 'Si').length;
    const noResuelto = data.filter(item => item.Resolucion === 'No').length;

  
    const metricaPilar = resuelto /(resuelto+noResuelto) *100
  

    return metricaPilar.toFixed(2)
  }


  const Cordialidad = calculoPilares("Cordialidad");
  const Claridad = calculoPilares("Claridad");
  const Conocimiento = calculoPilares("Conocimiento");
  const Resolucion = calculoResolución();



  // Calcular el NPS
  const totalResponses = promoters + detractors + neutrals;
  const nps = calculateNps(promoters, detractors, totalResponses);


  return (

    <>
    <h1 className='text-center'>Resultados:</h1>
      <div className='d-lg-flex justify-content-evenly '>
        <table className="table table-hover my-3 responsive container table-bordered ">
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

        <table className="table table-hover my-3 responsive container table-bordered table-striped table-success">
          <tbody>
          <tr >
            <th scope="row">Cordialidad</th>
            <td>{Cordialidad}%</td>
          </tr>

          <tr >
            <th scope="row">Claridad</th>
            <td>{Claridad}%</td>
          </tr>

          <tr >
            <th scope="row">Conocimiento</th>
            <td>{Conocimiento}%</td>
          </tr>

          <tr >
            <th scope="row">Resolucion</th>
            <td>{Resolucion}%</td>
          </tr>
          </tbody>
        </table>
      </div>
    </>

  );
}

export default CalculoNPS