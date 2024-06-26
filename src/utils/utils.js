// Función para calcular el NPS
export function calcularNPS(encuestas) {
  if (encuestas.length == 0) {
    return "S/D";
  }

  const promotores = encuestas.filter(
    (encuesta) => encuesta.NPS_GROUP == "Promotor"
  ).length;

  const detractores = encuestas.filter(
    (encuesta) => encuesta.NPS_GROUP == "Detractor"
  ).length;

  const neutros = encuestas.filter(
    (encuesta) => encuesta.NPS_GROUP == "Pasivo"
  ).length;

  const total = neutros + promotores + detractores;
  const nps = (((promotores - detractores) / total) * 100).toFixed(2);

  const resultado = {
    promotores,
    detractores,
    neutros,
    total,
    nps,
  };

  return resultado;
}

// Función para calcular los pilares
export const calculoPilares = (encuestas, pilar) => {
  if (encuestas.length == 0) {
    return "S/D";
  }

  const muySatisfecho = encuestas.filter(
    (encuesta) => encuesta[pilar] === "Muy satisfecho"
  ).length;

  const bastanteSatisfecho = encuestas.filter(
    (encuesta) => encuesta[pilar] === "Bastante satisfecho"
  ).length;
  const niSatNiInsat = encuestas.filter(
    (encuesta) => encuesta[pilar] === "Ni satisfecho ni insatisfecho"
  ).length;
  const pocoSatisfecho = encuestas.filter(
    (encuesta) => encuesta[pilar] === "Poco satisfecho"
  ).length;
  const nadaSatisfecho = encuestas.filter(
    (encuesta) => encuesta[pilar] === "Nada satisfecho"
  ).length;

  const metricaPilar = (
    ((muySatisfecho + bastanteSatisfecho) /
      (muySatisfecho +
        bastanteSatisfecho +
        niSatNiInsat +
        pocoSatisfecho +
        nadaSatisfecho)) *
    100
  ).toFixed(2);

  return {
    muySatisfecho,
    bastanteSatisfecho,
    niSatNiInsat,
    pocoSatisfecho,
    nadaSatisfecho,
    metricaPilar,
  };
};

export const calculoResolucion = (encuestas) => {
  if (encuestas.length == 0) {
    return "S/D";
  }

  const resuelto = encuestas.filter((item) => item.Resolucion === "Si").length;
  const noResuelto = encuestas.filter(
    (item) => item.Resolucion === "No"
  ).length;

  const metricaPilar = ((resuelto / (resuelto + noResuelto)) * 100).toFixed(2);

  return {
    resuelto,
    noResuelto,
    metricaPilar,
  };
};

// Función para agrupar por una clave específica
export const agruparPor = (array, key) => {
  return array.reduce((result, currentValue) => {
    // Obtener el valor de la clave especificada
    const groupKey = currentValue[key];

    // Si el grupo ya existe, agregar el valor actual al grupo
    if (!result[groupKey]) {
      result[groupKey] = [];
    }

    // Agregar el valor actual al grupo
    result[groupKey].push(currentValue);

    return result;
  }, {});
};

export const filtrarYAgrupar = (array, filters, key) => {
  return array.reduce((result, item) => {
    // Verificar si el item cumple con todos los filtros
    const cumpleFiltros = filters.every((filter) => {
      if (Array.isArray(filter.value)) {
        // Si el valor del filtro es un array, comprobar si el item[key] está en el array
        return filter.value.includes(item[filter.key]);
      } else {
        // Si el valor del filtro no es un array, comprobar igualdad simple
        return item[filter.key] === filter.value;
      }
    });

    // Si cumple con los filtros, agrupar por la clave especificada
    if (cumpleFiltros) {
      const groupKey = item[key];
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(item);
    }

    return result;
  }, {});
};
