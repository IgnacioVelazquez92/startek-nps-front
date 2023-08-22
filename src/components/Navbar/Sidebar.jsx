import "./sidebar.css";

import React from "react";
import SidemarModal from "./SidebarModal";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark sidebar"
      style={{ width: "280px" }}
    >
      <Link
        as={Link}
        to="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <img className="img-fluid" src="/SRT_BIG-dark.svg" />
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink
            as={Link}
            to="/"
            className="nav-link text-white sidebar__link"
            activeclassname="active"
          >
            <i className="bi bi-house-door me-1"></i>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink
            as={Link}
            to="/email"
            className="nav-link text-white sidebar__link"
          >
            <i className="bi bi-people-fill  me-1"></i>
            Clientes
          </NavLink>
        </li>
        <li>
          <NavLink
            as={Link}
            to="/user"
            className="nav-link text-white sidebar__link"
          >
            <i className="bi bi-headset me-1"></i>
            Agente
          </NavLink>
        </li>
        <li>
          <NavLink
            as={Link}
            to="/lider"
            className="nav-link text-white sidebar__link"
          >
            <i className="bi bi-star-fill me-1"></i>
            Lider
          </NavLink>
        </li>
        <li>
          <NavLink
            as={Link}
            to="/cuenta"
            className="nav-link text-white sidebar__link"
          >
            <i className="bi bi-graph-up-arrow me-1"></i>
            Cuenta
          </NavLink>
        </li>
      </ul>
      <hr />
      <SidemarModal />
    </div>
  );
};

export default Sidebar;
