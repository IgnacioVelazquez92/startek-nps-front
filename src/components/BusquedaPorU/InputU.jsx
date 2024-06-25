import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import { ApiClient } from "../../api/services";
import TablaPorU from "./TablaPorU";
import Loader from "../Loader/Loader";
import CalculoNPS from "../Charts/CalculoNPS";
import AgentContext from "../../context/AgentContext";
import InputsFecha from "../generals/InputsFecha";

const InputUsuarioU = () => {
  const apiClient = new ApiClient();
  const { agente, setAgente } = useContext(AgentContext);

  const [loading, setLoading] = useState(false);

  const handleDateChange = (date, name) => {
    setAgente({
      ...agente,
      selectedDates: {
        ...agente.selectedDates,
        [name]: date,
      },
    });
  };

  const handleChange = (e) => {
    setAgente({
      ...agente,
      agenteU: e.target.value.toUpperCase(),
    });
  };

  const firstDayOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!agente.selectedDates.fromDate || !agente.selectedDates.toDate) return;

    setLoading(true);

    try {
      const fechaYU = {
        desde: agente.selectedDates.fromDate.toISOString(),
        hasta: agente.selectedDates.toDate.toISOString(),
        usuarioU: agente.agenteU,
      };

      console.log(fechaYU);
      const response = await apiClient.getNpsbyDateAndU(fechaYU);
      setAgente({
        ...agente,
        agenteEncuestas: response.data,
      });

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
          <div className="col-6">
            <InputsFecha context={agente} setContext={setAgente} />
          </div>
          <div className="col-3">
            <input
              type="text"
              value={agente.agenteU}
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
      {loading && <Loader className="mx-auto" />}
      <CalculoNPS data={agente.agenteEncuestas} />
      {agente.agenteEncuestas && agente.agenteEncuestas.length !== 0 && (
        <TablaPorU encuestas={agente.agenteEncuestas} />
      )}
    </>
  );
};

export default InputUsuarioU;
