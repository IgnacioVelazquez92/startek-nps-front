import React, { useContext, useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import UserContext from "../../../context/UserContext";

const InicioSesion = () => {
  const { user, setUser } = useContext(UserContext);

  const cerrarSesión = () => {
    setUser("");
    localStorage.removeItem("user");
  };

  return (
    <div className="dropdown">
      <button
        className="btn text-center text-light border-0 "
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <strong className="d-flex align-items-center">
          <i className="bi bi-person-check-fill h3 me-2"></i>
          {user.name}
        </strong>
      </button>
      <ul className="dropdown-menu">
        <li>
          <a role="button" className="dropdown-item ">
            Configuraciones
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <a role="button" className="dropdown-item" onClick={cerrarSesión}>
            Cerrar sesión
          </a>
        </li>
      </ul>
    </div>
  );
};

export default InicioSesion;
