import DatePicker from "react-datepicker";
import React, { useState, useEffect } from "react";
import { ApiClient } from "../../api/services";
import TablaPorU from "./TablaPorU";
import Loader from "../Loader/Loader";
import CalculoNPS from "../Charts/CalculoNPS";

const InputUsuarioU = () => {
  const apiClient = new ApiClient();
  const [formData, setFormData] = useState({
    startDate: null,
    endDate: new Date(),
    usuarioU: "",
  });
  const [encuestas, setEncuestas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Configurar la fecha "desde" por defecto al primer día del mes en curso
    const firstDayOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );
    setFormData((prevFormData) => ({
      ...prevFormData,
      startDate: firstDayOfMonth,
    }));
  }, []);

  const handleDateChange = (date, name) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: date,
    }));
  };

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      usuarioU: e.target.value.toUpperCase(),
    }));
  };

  const formatDate = (date) => {
    const formattedDate = date.toISOString();
    return formattedDate;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    // Verificar que ambas fechas estén seleccionadas
    if (!formData.startDate || !formData.endDate) return;

    setLoading(true);
    // Formatear las fechas para enviarlas al backend en formato ISO 8601
    const fromDate = formatDate(formData.startDate);
    const toDate = formatDate(formData.endDate);

    try {
      const fechaYU = {
        desde: fromDate,
        hasta: toDate,
        usuarioU: formData.usuarioU,
      };

      console.log(fechaYU);
      const response = await apiClient.getNpsbyDateAndU(fechaYU);
      setEncuestas(response.data);

      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="d-lg-flex flex-wrap justify-content-center my-3"
      >
        <div className="row g-3">
          <div className="col">
            <DatePicker
              selected={formData.startDate}
              onChange={(date) => handleDateChange(date, "startDate")}
              selectsStart
              startDate={formData.startDate}
              endDate={formData.endDate}
              dateFormat="dd/MM/yyyy"
              isClearable
              placeholderText="Desde"
              className="me-3 mb-2 rounded py-1 form-control form-control-lg"
            />
          </div>
          <div className="col">
            <DatePicker
              selected={formData.endDate}
              onChange={(date) => handleDateChange(date, "endDate")}
              selectsEnd
              startDate={formData.startDate}
              endDate={formData.endDate}
              minDate={formData.startDate}
              dateFormat="dd/MM/yyyy"
              isClearable
              placeholderText="Hasta"
              className="mb-2 rounded py-1 form-control form-control-lg"
            />
          </div>
        </div>

        <div className="row g-3">
          <div className="col-9">
            <input
              type="text"
              value={formData.usuarioU}
              onChange={handleChange}
              className="form-control form-control-lg"
              placeholder="Ingresa tu usuario U"
              aria-label="Ingresa tu usuario-u"
              pattern="^(u|U)\d{6}$"
              required
            />
          </div>

          <div className="col-3">
            <button type="submit" className="btn btn-outline-primary btn-lg">
              Calcular
            </button>
          </div>
        </div>
      </form>
      {loading ? (
        <Loader />
      ) : encuestas ? (
        <div>
          <CalculoNPS data={encuestas} />
          <TablaPorU encuestas={encuestas} />
        </div>
      ) : (
        <p>no se encontraron datos</p>
      )}
    </>
  );
};

export default InputUsuarioU;
